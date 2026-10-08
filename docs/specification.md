# Kcore Labs Website — Software Requirements Specification

**Version:** 1.0  
**Domain:** kcorelabs.com — purchased  
**Project:** Public website for an independent digital studio  
**Target audience:** Businesses and founders in India and internationally

## 1. Build instruction

Build the Kcore Labs website according to this specification.

Start by inspecting the existing repository and its instructions. If the repository is empty, initialise the application using the stack below.

Proceed with reasonable implementation decisions without repeatedly requesting confirmation. Keep missing business information in a central content configuration and report it clearly.

Build and test the complete site locally, with a deployment-ready configuration. Public deployment and external account configuration require a separate user instruction.

Do not invent client names, testimonials, business results, founder credentials, contact details, or project history.

## 2. Business context

Kcore Labs is currently an independent, solo-operated digital studio taking on smaller client projects.

The website must:

- Establish a distinctive and credible brand.
- Explain available services clearly.
- Showcase genuine work when available.
- Make project enquiries straightforward.
- Support future additions of services and case studies.
- Remain inexpensive and straightforward to maintain.

**Brand name:** Kcore Labs  
**Tagline:** Ideas into digital reality.  
**Tone:** Balanced professional and creative; clear, approachable, confident.

Do not imply that the studio has a large team or multiple offices.

## 3. Technical stack

| Area | Requirement |
|---|---|
| Framework | Astro, using a current stable release |
| Language | TypeScript with strict checking |
| Styling | Custom CSS with shared design tokens |
| Main rendering | Static HTML generated at build time |
| Interactivity | Small, focused client-side scripts |
| Graphics | SVG and optimised raster imagery |
| Animation | CSS and browser animation APIs where sufficient |
| Content | Typed configuration and Astro content collections with Markdown |
| Hosting target | Cloudflare Workers Static Assets |
| Form backend | Cloudflare Worker endpoint |
| Source control | Git, ready for a private GitHub repository |
| Package manager | Follow the existing repository; otherwise npm |

Commit the dependency lockfile. Check current official documentation when choosing framework integration and deployment configuration.

The static pages must be served as static assets. Route only API requests into backend processing where practical.

No database, authentication, client portal, payment system, or CMS is required at launch.

A component library must not dictate the visual design.

## 4. Design direction

### References

Review the live references visually before designing:

- https://weevolveit.com/
- https://vs-epple.de/
- https://tipalti.com/

Use these as inspiration, without copying layouts, source code, assets, or brand elements.

Interpretation:

- **WeEvolveIT:** Technical atmosphere and a strong visual focal point.
- **Epple:** Generous spacing and large, deliberate image compositions.
- **Tipalti:** Clear service communication and tangible interface imagery.

### Required character

The site should feel like a carefully designed independent studio:

- Bold typography.
- Asymmetric but organised layouts.
- Large project presentations.
- Substantial negative space.
- A recognisable geometric K motif.
- Alternating visual rhythm between sections.
- Restrained, purposeful motion.

Avoid a generic agency template with a centred headline, glowing orb, repeated three-card sections, technology-logo strips, and fabricated statistics.

### Colours

| Token | Value |
|---|---|
| Main navy | `#08111F` |
| Dark surface | `#101D30` |
| Raised surface | `#172842` |
| Electric blue | `#2563EB` |
| Light blue | `#7DB7FF` |
| Light background | `#F2F4F7` |
| Primary light text | `#F5F8FF` |
| Secondary light text | `#B4C0D3` |
| Decorative border | `#293C58` |

Use navy as the main brand foundation, off-white for selected reading sections, and electric blue for important actions and the closing invitation.

Check contrast for every actual text/control pairing.

### Typography

Preferred fonts:

- Space Grotesk for headings.
- Inter for body text and controls.

Use properly licensed, self-hosted font files with a limited weight selection.

Suggested sizes:

- Desktop hero: 80–104 px, adjusted to available width.
- Mobile hero: 44–56 px, adjusted to avoid overflow.
- Section headings: 32–48 px desktop; 28–36 px mobile.
- Body: 16–18 px, approximately 1.6 line height.
- Reading width: approximately 60–70 characters.

Use fluid sizing and content-driven breakpoints.

### Logo

Create a provisional original SVG symbol plus wordmark.

The symbol should express a geometric K constructed from a vertical element and angled forms. It must work in monochrome and at favicon size.

Use the wordmark “Kcore Labs”. Keep the tagline separate.

Treat this as a provisional visual identity, not a trademark-cleared final logo.

### Signature graphic

Develop a larger composition from the K symbol’s pieces.

Optional hero animation:

- Begin with the pieces slightly separated.
- Assemble them once into the completed symbol.
- Keep the headline and CTA visible immediately.
- Use a complete static composition with reduced motion.

No WebGL, heavy 3D runtime, scroll hijacking, custom cursor, or continuous particle animation is required.

## 5. Sitemap

| Route | Page |
|---|---|
| `/` | Home |
| `/services/` | Services |
| `/work/` | Work |
| `/work/[slug]/` | Case study |
| `/about/` | About |
| `/contact/` | Contact |
| `/privacy/` | Privacy |
| `/thank-you/` | Enquiry confirmation |
| Unknown route | Custom 404 |

Use one consistent trailing-slash policy and canonical URL format.

**Navigation:** Services · Work · About · Start a project  
**Logo destination:** Home  
**Primary CTA destination:** Contact

## 6. Page requirements and initial copy

### 6.1 Home

Section order:

1. Hero.
2. Featured work, if verified content exists.
3. Services.
4. Working process.
5. Founder/studio introduction.
6. Closing invitation.
7. Footer.

**Hero**

Eyebrow:  
“Independent digital studio · Based in India”

H1:  
“Ideas into digital reality.”

Supporting copy:  
“Websites, digital catalogues, and useful web tools—designed and built with care.”

Primary CTA: “Start a project”  
Secondary CTA: “View selected work”

If no verified work is available, change the secondary CTA to “Explore services”.

Composition: large left-aligned type with the K graphic to the right. On mobile, prioritise headline, description, and action before decorative graphics.

**Featured work**

Heading: “A closer look at the work.”

Display one large project presentation, with an optional second offset entry. Place descriptions outside images.

If no verified projects exist, omit this section from the production homepage.

**Services**

Heading: “Digital experiences built around your business.”

Use three spacious numbered rows:

1. **Business websites**  
   “Clear, responsive websites that explain your business and help visitors take the next step.”

2. **Digital catalogues**  
   “Mobile-friendly product browsing with a straightforward path to an enquiry.”

3. **Custom web solutions**  
   “Focused tools and integrations built around a specific workflow or business need.”

Keep service visibility configurable so an unconfirmed offering can be disabled centrally.

**Process**

Heading: “Good work starts with understanding.”

- **Understand:** Discuss the business, audience, and intended outcome.
- **Define:** Agree on content, features, deliverables, and boundaries.
- **Design and build:** Develop the experience through agreed review stages.
- **Launch and hand over:** Check the details, publish, and explain ongoing responsibilities.

Use an uneven two-column layout with vertically arranged steps.

**Studio introduction**

Heading: “An independent studio. A direct working relationship.”

Copy:  
“You work directly with the person designing and building your project, keeping communication clear from the first conversation to handover.”

Link: “About Kcore Labs”

**Closing invitation**

Heading: “Have something in mind?”

Copy:  
“Share the idea, the problem, or the website you want to improve.”

Button: “Start a project”

Use a full-width electric-blue section with accessible text and button colours.

### 6.2 Services

H1: “Design and development for your next step.”

Introduction:  
“From a business website to a focused digital tool, Kcore Labs helps turn a clear need into a considered, usable solution.”

Describe each enabled service in a substantial section.

**Business websites**

Potential deliverables:

- Page structure and content planning.
- Responsive design and development.
- Enquiry forms and contact integrations.
- Basic on-page SEO setup.
- Launch checks and handover.

**Digital catalogues**

Potential deliverables:

- Categories and product details.
- Product imagery and specifications.
- Search or filtering where needed.
- WhatsApp or form-based enquiries.
- An agreed content-update method.

Clarify that payments, inventory, and fulfilment are separately scoped.

**Custom web solutions**

Potential deliverables:

- Focused internal tools.
- Workflow interfaces.
- Third-party integrations.
- Early product prototypes.

Clarify that feasibility, data, security, and maintenance requirements are assessed before proposing a solution.

Closing copy:  
“Each proposal defines the deliverables, review stages, responsibilities, and launch requirements.”

CTA: “Discuss your project”

Do not publish invented prices or guaranteed timelines.

### 6.3 Work

H1: “Selected work.”

Introduction:  
“A look at the problems, decisions, and details behind projects by Kcore Labs.”

Use verified content only.

If none is available, show an intentional empty state:

“Project stories are being prepared. In the meantime, explore the services or get in touch about what you’re planning.”

Provide Services and Contact links.

A development-only sample case study may exist to validate the template, but it must be excluded from production routes, sitemap, and internal links.

Do not publish a fictional studio concept unless the user explicitly approves that content.

### 6.4 Case study

Each published project contains:

- Title and short summary.
- Client name or approved anonymous description.
- Year, status, services, and actual contribution.
- The starting problem.
- Requirements.
- Design and development approach.
- Delivered result.
- Approved screenshots with captions.
- Relevant project CTA.

Only include measurable outcomes with supplied evidence.

Content validation should reject incomplete published entries while permitting drafts.

### 6.5 About

H1: “Thoughtful digital work. Direct collaboration.”

Copy:  
“Kcore Labs is an independent digital studio based in India, working with businesses locally and internationally.”

“Good digital work starts with understanding the people using it and the business behind it. That means asking useful questions, making deliberate choices, and keeping the project focused on what matters.”

Working principles:

- Understand before building.
- Make the details count.
- Keep communication clear.
- Plan for handover.

Support an optional founder name, biography, and authentic portrait through configuration. When absent, use the studio copy and K artwork without visible placeholders.

CTA: “Start a project”

### 6.6 Contact

H1: “Let’s talk about your project.”

Copy:  
“Tell me what you want to build or improve. A few details are enough to start the conversation.”

Fields:

| Field | Required |
|---|---|
| Name | Yes |
| Email | Yes |
| Business/organisation | No |
| Current website | No |
| Project type | Yes |
| Project description | Yes |
| Budget and currency | No |
| Preferred timing | No |

Project types: enabled services plus “Not sure yet”.

Description prompt:  
“What do you need, who is it for, and what would a successful outcome look like?”

Budget must allow “Not sure yet”.

Submit label: “Send project enquiry”

Privacy text:  
“Your details will be used to respond to this enquiry. Read the Privacy Policy.”

Next-step text:  
“I’ll review your enquiry and get in touch to clarify the requirements and discuss next steps.”

Show email and WhatsApp alternatives only when real values are configured.

### 6.7 Confirmation

Heading: “Thanks—your enquiry has been received.”

Copy:  
“I’ll review the details and reply using the email address you provided.”

Button: “Back to home”

Redirect here only after successful backend acceptance. Exclude from search indexing.

### 6.8 Privacy

Create the page structure and draft content based on the implemented services.

Explicitly identify unresolved business details during handover. Do not claim the policy is legally reviewed.

Document actual collection, purposes, processors, retention, tracking, and contact arrangements. Missing policy details are a public-launch blocker.

### 6.9 Not found

Heading: “This page couldn’t be found.”

Copy:  
“The link may have changed. You can return home or get in touch about your project.”

Actions: Home and Contact.

Return a genuine HTTP 404 response.

## 7. Shared components

Implement reusable:

- Header and accessible mobile navigation.
- Footer.
- Primary, secondary, and text-link actions.
- Section headings.
- Numbered service rows.
- Project presentations.
- Case-study media and captions.
- Process steps.
- Form fields and validation messages.
- Success and error notifications.
- Closing CTA section.

All interactive components require visible hover and keyboard-focus treatment. Relevant controls also need loading, disabled, selected, and error states.

Use consistent design tokens rather than scattered style values.

## 8. Enquiry backend

Provide a same-origin POST endpoint, such as `/api/contact`.

Requirements:

- Server-side validation with explicit field-length limits.
- Required-field and email validation.
- Safe handling of submitted text.
- Protection against email-header injection.
- Request-size limits.
- Spam protection and rate limiting.
- Cloudflare Turnstile verification when configured.
- Secrets stored in the hosting environment.
- Fixed recipient address from configuration.
- Verified sending identity; visitor email used only as Reply-To.
- Clear success and failure responses.
- No personal data in routine logs or analytics.

Use an email-provider adapter so the delivery provider can be configured without rewriting the form.

Success means the delivery provider has accepted the message. Do not show success after a failed request or claim guaranteed inbox delivery.

Preserve entered values on failure and prevent accidental repeat submissions while processing.

**Without credentials:** provide a clearly labelled local-only testing mode. Production must never silently use mock delivery. Report missing form configuration as a launch blocker.

## 9. Responsive behaviour and accessibility

Target WCAG 2.2 AA.

Required:

- Semantic page structure and logical headings.
- Skip link.
- Full keyboard operation.
- Visible focus indicators.
- Persistent form labels.
- Errors associated with the relevant fields.
- Accessible submission-status announcements.
- Sufficient text and control contrast.
- Meaningful image alternatives.
- Reduced-motion support.
- Approximately 44 px touch targets where practical.
- No hover-only essential content.
- No horizontal page overflow at 320 px width.
- Usability at 200% zoom.

Check representative layouts at 360, 768, 1024, and 1440 px.

## 10. SEO and performance

SEO requirements:

- Unique page titles and descriptions.
- One clear primary heading per page.
- Canonical URLs using `https://kcorelabs.com`.
- XML sitemap of published, indexable pages.
- Appropriate robots directives.
- Open Graph and social-preview metadata.
- Favicon and brand assets.
- Accurate structured data without unsupported claims.
- Crawlable links and important content available in HTML.
- No draft or sample projects in production output.

Performance targets:

- LCP ≤ 2.5 seconds.
- INP ≤ 200 ms.
- CLS ≤ 0.1.

These are real-user targets; report laboratory checks separately and do not claim field compliance before sufficient traffic exists.

Implementation:

- Optimise and responsively size imagery.
- Reserve image dimensions.
- Lazy-load below-the-fold media.
- Prioritise the main visible image when appropriate.
- Limit fonts and third-party scripts.
- Keep animations lightweight.
- Render usable content before scripts execute.

## 11. Analytics

Keep analytics optional and configurable.

If enabled, track:

- Main CTA clicks and their placement.
- Case-study visits.
- Form starts.
- Confirmed successful submissions.
- Submission failures.
- Email and WhatsApp clicks.

Do not transmit field values or personal information.

Do not count clicking Submit as a completed enquiry. Document the selected provider and any applicable consent configuration before enabling it publicly.

## 12. Content and configuration

Centralise:

- Brand name and tagline.
- Canonical URL.
- Founder information.
- Contact destinations.
- Social links.
- Enabled services.
- Project content.
- Analytics configuration.
- Form-provider settings.
- Privacy-policy details.

Do not scatter editable business copy throughout components.

Provide an example environment file containing variable names and descriptions, never real secrets.

## 13. Verification

Run checks appropriate to the implementation:

- Production build.
- Type checking.
- Internal-link and route checks.
- Responsive visual review.
- Keyboard navigation review.
- Automated accessibility checks on representative pages.
- Form validation and delivery-adapter tests.
- End-to-end success and failure flows with controlled test responses.
- Verification that drafts and placeholders do not leak into production.

Test the contact endpoint’s rejection of invalid inputs and its handling of delivery-provider failures.

Use desktop and mobile screenshots to inspect the actual rendered design. Correct obvious layout, wrapping, contrast, and spacing problems before handover.

Avoid tests that merely repeat static copy or implementation details.

## 14. Delivery and handover

Deliver:

1. Complete source code and lockfile.
2. Working local preview.
3. Reusable design tokens and components.
4. SVG logo assets and favicon.
5. Content configuration and case-study schema.
6. Contact endpoint and provider adapter.
7. Cloudflare deployment configuration.
8. Setup, editing, testing, and deployment instructions.
9. Environment-variable documentation.
10. A concise verification report and list of launch blockers.

Document how to connect both `kcorelabs.com` and `www.kcorelabs.com`, with the apex domain canonical and the other redirected.

Keep accounts, domain, repository, and deployment ownership with the user.

## 15. Definition of done

**Implementation complete** means:

- All required pages and components work locally.
- The design reflects the agreed references and custom Kcore identity.
- Mobile layouts are deliberately composed.
- Builds and relevant checks pass.
- The form backend is implemented and tested with controlled responses.
- Production configuration and documentation are ready.
- Missing external configuration is clearly listed.

**Ready for public launch** additionally requires:

- Verified contact and delivery configuration.
- Successful real enquiry delivery testing.
- Approved public content and project permissions.
- Completed privacy details.
- Domain and hosting configuration.
- No visible placeholders or development-only content.
- Explicit instruction to deploy publicly.

Do not describe the site as launched until deployment and the live domain have been verified.
