import { test } from "node:test";
import assert from "node:assert/strict";
import { contact, deliver, validate, type Env } from "../worker/index";
const good = {
  name: "Test Visitor",
  email: "visitor@example.com",
  projectType: "websites",
  description: "A responsive business website for a small local shop.",
};
const env: Env = {
  ASSETS: { fetch: async () => new Response() },
  SITE_ORIGIN: "https://kcorelabs.com",
  EMAIL_PROVIDER: "resend",
  CONTACT_LIMITER: { limit: async () => ({ success: true }) },
  CONTACT_FROM: "website@kcorelabs.com",
  CONTACT_TO: "studio@example.com",
  RESEND_API_KEY: "test",
  TURNSTILE_SECRET_KEY: "test",
};
const req = (body: unknown = good, origin = "https://kcorelabs.com") =>
  new Request(`${origin}/api/contact`, {
    method: "POST",
    headers: {
      origin,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
const fetcher = (deliveryOk = true) =>
  (async (url: RequestInfo | URL) =>
    String(url).includes("siteverify")
      ? Response.json({
          success: true,
          hostname: "kcorelabs.com",
          action: "contact",
        })
      : deliveryOk
        ? Response.json({ id: "test-id" })
        : new Response("", { status: 500 })) as typeof fetch;
test("validates required fields, email injection, type, URL and lengths", () => {
  assert.deepEqual(validate(good).errors, {});
  for (const data of [
    {},
    { ...good, email: "a@b.com\r\nBcc:x@y.com" },
    { ...good, projectType: "bad" },
    { ...good, website: "javascript:alert(1)" },
    { ...good, name: "x".repeat(101) },
  ])
    assert.ok(Object.keys(validate(data).errors).length);
});
test("accepts only after provider acceptance", async () => {
  assert.equal(
    (
      await contact(
        req({ ...good, "cf-turnstile-response": "test" }),
        env,
        fetcher(),
      )
    ).status,
    200,
  );
  assert.equal(
    (
      await contact(
        req({ ...good, "cf-turnstile-response": "test" }),
        env,
        fetcher(false),
      )
    ).status,
    503,
  );
});
test("rejects origin, spam, rate limit, oversized payloads and malformed input", async () => {
  assert.equal(
    (await contact(req(good, "https://evil.example"), env)).status,
    403,
  );
  assert.equal(
    (await contact(req({ ...good, company_url: "spam" }), env)).status,
    400,
  );
  assert.equal(
    (
      await contact(req(), {
        ...env,
        CONTACT_LIMITER: { limit: async () => ({ success: false }) },
      })
    ).status,
    429,
  );
  assert.equal(
    (await contact(req({ ...good, description: "x".repeat(21000) }), env))
      .status,
    413,
  );
  assert.equal((await contact(req(null), env)).status, 400);
});
test("mock is localhost-only and production fails closed", async () => {
  assert.equal(
    (
      await contact(req(good, "http://localhost:8787"), {
        ...env,
        LOCAL_TEST_MODE: "true",
        TURNSTILE_SECRET_KEY: undefined,
      })
    ).status,
    200,
  );
  assert.equal(
    (
      await contact(req(), {
        ...env,
        LOCAL_TEST_MODE: "true",
        TURNSTILE_SECRET_KEY: undefined,
      })
    ).status,
    503,
  );
});
test("delivery fixes recipient and sender, uses visitor only as reply-to", async () => {
  let body: any;
  await deliver(validate(good).value, env, (async (_u, options) => {
    body = JSON.parse(String(options?.body));
    return Response.json({ id: "accepted" });
  }) as typeof fetch);
  assert.deepEqual(body.to, [env.CONTACT_TO]);
  assert.equal(body.from, env.CONTACT_FROM);
  assert.equal(body.reply_to, good.email);
});
test("rejects failed, wrong-host and wrong-action Turnstile checks", async () => {
  for (const v of [
    { success: false },
    { success: true, hostname: "evil.example", action: "contact" },
    { success: true, hostname: "kcorelabs.com", action: "other" },
  ])
    assert.equal(
      (
        await contact(
          req({ ...good, "cf-turnstile-response": "test" }),
          env,
          (async () => Response.json(v)) as typeof fetch,
        )
      ).status,
      400,
    );
});
