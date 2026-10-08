import { site } from "../src/config";
const missing = [];
if (!site.privacy.approved)
  missing.push(
    "Privacy policy requires owner review and approval in src/config.ts.",
  );
if (!process.env.PUBLIC_TURNSTILE_SITE_KEY)
  missing.push("PUBLIC_TURNSTILE_SITE_KEY must be supplied at build time.");
if (missing.length) {
  console.error(missing.join("\n"));
  process.exit(1);
}
console.log(
  "Content/build launch checks passed. Confirm production secrets and real delivery separately.",
);
