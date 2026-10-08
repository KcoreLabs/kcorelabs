import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext();
const page = await context.newPage();
await mkdir("test-results", { recursive: true });
const report = [];
const routes = [
  "/",
  "/services/",
  "/work/",
  "/about/",
  "/contact/",
  "/privacy/",
  "/thank-you/",
];
for (const width of [320, 360, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  for (const route of routes) {
    const response = await page.goto(`http://127.0.0.1:8787${route}`);
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Overflow at ${width} ${route}`,
    );
    if (width === 360 || width === 1440) {
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      assert.deepEqual(
        result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        [],
        `Accessibility ${route} ${width}`,
      );
    }
    if (route === "/" || route === "/contact/")
      await page.screenshot({
        path: `test-results/${route === "/" ? "home" : "contact"}-${width}.png`,
        fullPage: true,
      });
  }
  report.push(
    `Routes, overflow and representative accessibility checks passed at ${width}px`,
  );
}
const missing = await page.goto("http://127.0.0.1:8787/does-not-exist/");
assert.equal(missing.status(), 404);
await page.goto("http://127.0.0.1:8787/");
const links = await page
  .locator('a[href^="/"]')
  .evaluateAll((els) => [
    ...new Set(els.map((e) => e.getAttribute("href").split("#")[0])),
  ]);
for (const link of links) {
  const r = await page.request.get(`http://127.0.0.1:8787${link}`);
  assert.equal(r.status(), 200, link);
}
await page.setViewportSize({ width: 360, height: 800 });
await page.reload();
await page.getByRole("button", { name: "Menu" }).click();
assert.equal(await page.locator("#navigation").isVisible(), true);
await page.keyboard.press("Escape");
assert.equal(await page.locator("#navigation").isVisible(), false);
assert.equal(
  await page
    .getByRole("button", { name: "Menu" })
    .getAttribute("aria-expanded"),
  "false",
);
await page.goto("http://127.0.0.1:8787/contact/");
await page.getByLabel("Name", { exact: true }).fill("Test Visitor");
await page.getByLabel("Email", { exact: true }).fill("test@example.com");
await page.getByLabel("Project type").selectOption("websites");
await page
  .getByLabel("Project description")
  .fill("A local test of the website enquiry form.");
await page.getByRole("button", { name: "Send project enquiry" }).click();
await page.getByText("Local test accepted. No email was sent.").waitFor();
await page.route("**/api/contact", (route) =>
  route.fulfill({
    status: 503,
    contentType: "application/json",
    body: JSON.stringify({ message: "Delivery failed. Please try again." }),
  }),
);
await page.getByRole("button", { name: "Send project enquiry" }).click();
await page.getByText("Delivery failed. Please try again.").waitFor();
assert.equal(
  await page.getByLabel("Name", { exact: true }).inputValue(),
  "Test Visitor",
);
await page.unroute("**/api/contact");
await page.route("**/api/contact", (route) =>
  route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ message: "Accepted" }),
  }),
);
await page.getByRole("button", { name: "Send project enquiry" }).click();
await page.waitForURL("**/thank-you/");
const sitemap = await (
  await page.request.get("http://127.0.0.1:8787/sitemap.xml")
).text();
assert.ok(!/template|thank-you|privacy/.test(sitemap));
report.push(
  "404 status, links, mobile menu/Escape, local form, controlled delivery success/failure, value preservation, and sitemap exclusions passed.",
);
await writeFile("test-results/report.json", JSON.stringify(report, null, 2));
console.log(report.join("\n"));
await browser.close();
