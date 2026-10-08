import { getCollection } from "astro:content";
import { site } from "../config";
export async function GET() {
  const projects = await getCollection("work", ({ data }) => data.published);
  const routes = [
    "",
    "services/",
    "work/",
    "about/",
    "contact/",
    ...(site.privacy.approved ? ["privacy/"] : []),
    ...projects.map((p) => `work/${p.id}/`),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((r) => `<url><loc>${site.url}/${r}</loc></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
}
