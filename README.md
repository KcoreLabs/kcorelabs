# Kcore Labs

Astro 7, strict TypeScript, custom CSS, static HTML, and a Cloudflare Worker enquiry endpoint. All accounts and deployment resources belong to the owner.

## Local development

Requires Node 22.12+ (Node 24 used during development) and npm.

```sh
npm ci
npm run dev
npm run check
npm test
npm run build
```

Astro's development server previews pages. For the complete API, build first and run `npx wrangler dev --ip 127.0.0.1 --port 8787 --var LOCAL_TEST_MODE:true`. Local mode explicitly displays “No email was sent” and never redirects to the real confirmation. Production ignores local mode on non-loopback hosts. For browser checks with the Worker preview running, run `npm run test:e2e` (uses installed Microsoft Edge). Screenshots and results are written to ignored `test-results/`.

## Content and identity

- Edit brand, contact, founder, enabled services, and business copy in `src/config.ts`.
- Add Markdown case studies in `src/content/work/`. Use `src/content.config.ts` for the required metadata. Drafts are excluded from routes, links and sitemap; published entries require complete content and approved media.
- Put approved project images in `public/`, optimize them before use, and supply their actual width/height and meaningful alternatives. Do not publish unverified results.
- Styles and tokens live in `src/styles/global.css`; shared elements live in `src/components/`.
- Logo and favicon are provisional original geometric artwork, not trademark-cleared. Fonts are self-hosted through Fontsource; OFL license copies are in `public/licenses/`.
- Analytics is disabled. No analytics SDK or events transmit any data. Before adding a provider, implement the requested CTA/form/case-study events without field values and update privacy/consent arrangements.

## Enquiry delivery

The Worker validates input, caps the streamed request at 20 KB, checks same-origin submissions, limits attempts, rejects the honeypot, validates Turnstile hostname/action, and sends plain text through the Resend adapter. Only API routes invoke the Worker ahead of assets. A provider acceptance ID is required for success; acceptance is not guaranteed inbox delivery. No submitted values are logged.

1. Create a Resend sending domain in the owner's account. Verify its DNS records. Gmail can receive enquiries, but cannot be used as the verified sender for this domain.
2. Create a Cloudflare Turnstile widget for `kcorelabs.com`. Put its public site key in `.env` as `PUBLIC_TURNSTILE_SITE_KEY` before the build. Keep the matching secret in the Worker environment.
3. Run `npx wrangler login`, then set `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`, and `TURNSTILE_SECRET_KEY` using `npx wrangler secret put NAME`. Set `CONTACT_TO` to `kcorelabs@gmail.com`. Use a verified domain address for `CONTACT_FROM`.
4. The example variable names and explanations are in `.env.example`. Never commit `.env` or `.dev.vars`.
5. Real sending is intentionally unavailable until these settings are complete. To replace Resend, implement a new adapter in `worker/index.ts` and retain the acceptance/failure tests.

## Cloudflare deployment

Hosting target: Workers Static Assets, not Pages. Configuration follows [Cloudflare Static Assets](https://developers.cloudflare.com/workers/static-assets/) and [routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/).

1. Review the public content and privacy draft. Confirm processor arrangements, location/transfers, security log retention, and the 14-day unsuccessful-enquiry inbox deletion process. Set `site.privacy.approved=true` only after review. The website has no database or automatic inbox deletion job.
2. Configure the secrets and public Turnstile key above; run checks, tests, and build. `npm run deploy` checks the content launch gate before publishing.
3. Deploy to the owner's Cloudflare account using `npm run deploy`. For Workers Builds connected to the private GitHub repo, use build `npm run check && npm test && npm run build`, deploy `npm run deploy`, and configure the public site key in the build environment. Keep production secrets in Worker settings.
4. Add `kcorelabs.com` as a Worker Custom Domain in Cloudflare. DNS must be managed in the correct Cloudflare zone; confirm existing DNS records before changing them.
5. Add a proxied DNS record for `www` and a Cloudflare Redirect Rule: hostname equals `www.kcorelabs.com`, dynamic target `concat("https://kcorelabs.com", http.request.uri.path)`, status 301, preserve query string. This avoids invoking the Worker for all asset requests just to redirect.
6. Verify HTTPS, apex and www routing, genuine unknown-route 404s, and a real enquiry arriving in Gmail. Check Reply-To and spam placement. Do not call the site launched before these checks pass.

## Current launch blockers

- Cloudflare login and account/domain connection.
- Verified sender, Resend API key and real delivery test.
- Production Turnstile widget, public key and secret.
- Owner review of privacy policy and operational retention process.

No case studies are published because none were supplied. This is intentional and does not block launch. Founder photo, WhatsApp, socials, and analytics are optional and absent.

Performance goals in the specification are real-user goals. Passing local build and browser checks does not establish production Core Web Vitals or legal compliance.
