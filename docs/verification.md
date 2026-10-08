# Verification — 8 October 2026

- Astro production build: passed; eight static pages, no published case-study routes.
- Astro and Worker TypeScript checks: passed, zero errors, warnings or hints.
- Six backend test groups: passed. Validation, injection rejection, streamed size limit, same-origin enforcement, rate limiting, Turnstile failure/hostname/action, delivery rejection, fixed recipient/Reply-To, localhost-only mock mode.
- Browser checks: routes and overflow at 320, 360, 768, 1024 and 1440 px. Axe WCAG A/AA checks at 360 and 1440 px on all seven regular pages passed.
- Local Worker: genuine HTTP 404, crawlable internal links, unpublished template exclusion and confirmation-page sitemap exclusion passed.
- Form browser flows: local acceptance explicitly says no email sent; controlled successful response redirects; controlled failed response retains values and shows an error.
- Mobile navigation opens and closes with Escape and returns focus to the toggle.
- Desktop and mobile rendered screenshots reviewed; full-page artifacts generated in `test-results/` (ignored in Git).
- npm audit: zero vulnerabilities after overriding Sharp to the patched release.

These are laboratory checks, not a full manual accessibility audit or measured real-user Core Web Vitals. Production Turnstile, email acceptance/inbox delivery, DNS, HTTPS and redirects await account configuration. The privacy policy remains a review draft. Analytics remains disabled.
