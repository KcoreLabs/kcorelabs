import { enabledServices } from "../src/config";
export interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  CONTACT_LIMITER?: {
    limit(input: { key: string }): Promise<{ success: boolean }>;
  };
  SITE_ORIGIN: string;
  EMAIL_PROVIDER?: string;
  RESEND_API_KEY?: string;
  CONTACT_FROM?: string;
  CONTACT_TO?: string;
  TURNSTILE_SECRET_KEY?: string;
  LOCAL_TEST_MODE?: string;
}
const limits = {
  name: 100,
  email: 254,
  business: 160,
  website: 500,
  projectType: 40,
  description: 5000,
  budget: 100,
  timing: 160,
} as const;
type Enquiry = Record<keyof typeof limits, string>;
const emailPattern = /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/;
export function validate(data: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  const value = {} as Enquiry;
  for (const [key, max] of Object.entries(limits)) {
    const raw = data[key];
    const text = typeof raw === "string" ? raw.trim() : "";
    value[key as keyof Enquiry] = text;
    if (raw !== undefined && typeof raw !== "string")
      errors[key] = "Enter a text value.";
    else if (text.length > max) errors[key] = `Use ${max} characters or fewer.`;
    else if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(text))
      errors[key] = "Remove unsupported characters.";
  }
  for (const key of ["name", "email", "projectType", "description"] as const)
    if (!value[key]) errors[key] = "This field is required.";
  if (value.email && !emailPattern.test(value.email))
    errors.email = "Enter a valid email address.";
  if (value.description && value.description.length < 20)
    errors.description = "Please add at least 20 characters.";
  if (
    ![...enabledServices.map((s) => s.id), "unsure"].includes(value.projectType)
  )
    errors.projectType = "Choose an available project type.";
  if (value.website) {
    try {
      if (!["https:", "http:"].includes(new URL(value.website).protocol))
        throw Error();
    } catch {
      errors.website = "Enter a full http or https website address.";
    }
  }
  return { value, errors };
}
export async function deliver(
  value: Enquiry,
  env: Env,
  fetcher: typeof fetch = fetch,
) {
  if (
    env.EMAIL_PROVIDER !== "resend" ||
    !env.RESEND_API_KEY ||
    !env.CONTACT_FROM ||
    !env.CONTACT_TO ||
    /[\r\n]/.test(env.CONTACT_FROM) ||
    !emailPattern.test(env.CONTACT_TO)
  )
    throw Error("configuration");
  const response = await fetcher("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: value.email,
      subject: "New Kcore Labs project enquiry",
      text: Object.entries(value)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n\n"),
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw Error("delivery");
  const result = (await response.json()) as { id?: string };
  if (!result.id) throw Error("delivery");
}
async function readBody(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 20000)
    throw Error("size");
  const reader = request.body?.getReader();
  if (!reader) throw Error("body");
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 20000) {
      await reader.cancel();
      throw Error("size");
    }
    chunks.push(value);
  }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.length;
  }
  return new Request(request.url, {
    method: "POST",
    headers: request.headers,
    body,
  });
}
export async function contact(
  request: Request,
  env: Env,
  fetcher: typeof fetch = fetch,
) {
  const json = (status: number, message: string, extra = {}) =>
    Response.json(
      { message, ...extra },
      {
        status,
        headers: {
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  if (request.method !== "POST")
    return new Response("Method not allowed", {
      status: 405,
      headers: { Allow: "POST" },
    });
  const url = new URL(request.url);
  const local =
    env.LOCAL_TEST_MODE === "true" &&
    ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  const origin = request.headers.get("origin");
  if (origin !== (local ? url.origin : env.SITE_ORIGIN))
    return json(
      403,
      "This request could not be verified. Please use the contact page.",
    );
  if (!local && !env.CONTACT_LIMITER)
    return json(
      503,
      "Enquiries are temporarily unavailable. Please try again later.",
    );
  if (env.CONTACT_LIMITER) {
    try {
      if (
        !(
          await env.CONTACT_LIMITER.limit({
            key: request.headers.get("CF-Connecting-IP") ?? "unknown",
          })
        ).success
      )
        return json(
          429,
          "Too many attempts. Please wait a minute before trying again.",
        );
    } catch {
      return json(503, "Enquiries are temporarily unavailable.");
    }
  }
  let data: Record<string, unknown>;
  try {
    const bounded = await readBody(request);
    const type = request.headers.get("content-type") ?? "";
    if (type.includes("application/json")) {
      data = (await bounded.json()) as Record<string, unknown>;
      if (!data || typeof data !== "object" || Array.isArray(data))
        throw Error("body");
    } else if (
      type.includes("multipart/form-data") ||
      type.includes("application/x-www-form-urlencoded")
    ) {
      data = Object.fromEntries(await bounded.formData());
    } else return json(415, "Unsupported form format.");
  } catch (error) {
    return json(
      error instanceof Error && error.message === "size" ? 413 : 400,
      "The form could not be read. Check the length of your message and try again.",
    );
  }
  if (data.company_url) return json(400, "This enquiry could not be accepted.");
  const { value, errors } = validate(data);
  if (Object.keys(errors).length)
    return json(400, "Please check the highlighted fields.", { errors });
  if (!local && !env.TURNSTILE_SECRET_KEY)
    return json(
      503,
      "Enquiries are temporarily unavailable. Please try again later.",
    );
  if (env.TURNSTILE_SECRET_KEY) {
    try {
      const token = data["cf-turnstile-response"];
      if (typeof token !== "string" || token.length > 2048)
        return json(400, "Please complete the spam-protection check.");
      const result = await fetcher(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: new URLSearchParams({
            secret: env.TURNSTILE_SECRET_KEY,
            response: token,
          }),
          signal: AbortSignal.timeout(10000),
        },
      );
      const verification = (await result.json()) as {
        success: boolean;
        hostname: string;
        action: string;
      };
      if (
        !result.ok ||
        !verification.success ||
        verification.hostname !== url.hostname ||
        verification.action !== "contact"
      )
        return json(
          400,
          "The spam-protection check expired. Please try again.",
        );
    } catch {
      return json(
        503,
        "Spam protection is temporarily unavailable. Please try again.",
      );
    }
  }
  if (local)
    return json(200, "Local test accepted. No email was sent.", {
      local: true,
    });
  try {
    await deliver(value, env, fetcher);
  } catch {
    return json(
      503,
      "Your enquiry could not be sent. Your entries have been kept; please try again later.",
    );
  }
  if (!(request.headers.get("accept") ?? "").includes("application/json"))
    return Response.redirect(new URL("/thank-you/", env.SITE_ORIGIN), 303);
  return json(200, "Your enquiry has been received.");
}
export default {
  async fetch(request: Request, env: Env) {
    const path = new URL(request.url).pathname;
    if (path === "/api/contact") return contact(request, env);
    if (path.startsWith("/api/"))
      return new Response("Not found", { status: 404 });
    return env.ASSETS.fetch(request);
  },
};
