export const site = {
  name: "Kcore Labs",
  tagline: "Ideas into digital reality.",
  url: "https://kcorelabs.com",
  email: "kcorelabs@gmail.com",
  whatsapp: "",
  socials: [] as { label: string; url: string }[],
  founder: null as null | { name: string; bio: string; portrait?: string },
  analytics: { enabled: false },
  privacy: {
    approved: false,
    controller:
      "Mohammed Midlaj, operating as Kcore Labs, is responsible for information collected through this website.",
    retention:
      "Unsuccessful enquiries are retained for 14 days after the decision not to proceed, then deleted from the studio inbox. Active project correspondence is kept for the duration of the discussion; any further retention is agreed as part of the project. Email-provider backups and security logs may follow separate provider retention schedules.",
    contact: "kcorelabs@gmail.com",
    processors: [
      "Cloudflare (hosting and spam protection)",
      "Resend (enquiry email, when configured)",
      "Google Gmail (receiving inbox)",
    ],
  },
};
export const services = [
  {
    id: "websites",
    enabled: true,
    title: "Business websites",
    short:
      "Clear, responsive websites that explain your business and help visitors take the next step.",
    items: [
      "Page structure and content planning",
      "Responsive design and development",
      "Enquiry forms and contact integrations",
      "Basic on-page SEO setup",
      "Launch checks and handover",
    ],
    note: "A considered home for your business, built around the people you want to reach.",
  },
  {
    id: "catalogues",
    enabled: true,
    title: "Digital catalogues",
    short:
      "Mobile-friendly product browsing with a straightforward path to an enquiry.",
    items: [
      "Categories and product details",
      "Product imagery and specifications",
      "Search or filtering where needed",
      "WhatsApp or form-based enquiries",
      "An agreed content-update method",
    ],
    note: "Payments, inventory, and fulfilment are separately scoped.",
  },
  {
    id: "custom",
    enabled: true,
    title: "Custom web solutions",
    short:
      "Focused tools and integrations built around a specific workflow or business need.",
    items: [
      "Focused internal tools",
      "Workflow interfaces",
      "Third-party integrations",
      "Early product prototypes",
    ],
    note: "Feasibility, data, security, and maintenance requirements are assessed before proposing a solution.",
  },
];
export const enabledServices = services.filter((s) => s.enabled);
export const process = [
  ["Understand", "Discuss the business, audience, and intended outcome."],
  ["Define", "Agree on content, features, deliverables, and boundaries."],
  ["Design and build", "Develop the experience through agreed review stages."],
  [
    "Launch and hand over",
    "Check the details, publish, and explain ongoing responsibilities.",
  ],
];
export const clientProjects = [
  { id: 'libertaz', name: 'Libertaz Global', category: 'Training & consulting', url: 'https://libertazglobal.com/', description: 'Professional certification programmes and corporate training, brought together online.', credit: '' },
  { id: 'urban', name: 'Urban Watches', category: 'Watches', url: 'https://urban-watches.kcorelabs.workers.dev/', description: 'An active client project for Urban Watches.', credit: '' },
  { id: 'bellish', name: 'Bellish', category: 'Leather goods · Online store', url: 'https://www.bellish.in/', description: 'An online shop for leather bags, wallets, and jackets.', credit: 'Project led by Mohammed Midlaj, with a contribution from Ribas.' },
];
export const copy = {
  hero: {
    eyebrow: "Independent digital studio · Based in India",
    description:
      "Websites, digital catalogues, and useful web tools—designed and built with care.",
  },
  services: {
    heading: "Digital experiences built around your business.",
    title: "Design and development for your next step.",
    intro:
      "From a business website to a focused digital tool, Kcore Labs helps turn a clear need into a considered, usable solution.",
    closing:
      "Each proposal defines the deliverables, review stages, responsibilities, and launch requirements.",
  },
  studio: {
    heading: "An independent studio. A direct working relationship.",
    intro:
      "Work directly with Mohammed Midlaj and a small team, keeping communication clear from the first conversation to handover.",
  },
  about: {
    title: "Thoughtful digital work. Direct collaboration.",
    paragraphs: [
      "Kcore Labs is an independent digital studio based in India, working with businesses locally and internationally.",
      "Led by Mohammed Midlaj, the studio brings together a small team, including Ribas, to shape and build client projects. You stay close to the people doing the work.",
      "Good digital work starts with understanding the people using it and the business behind it. That means asking useful questions, making deliberate choices, and keeping the project focused on what matters.",
    ],
    principles: [
      "Understand before building.",
      "Make the details count.",
      "Keep communication clear.",
      "Plan for handover.",
    ],
  },
  work: {
    title: "Selected work.",
    intro:
      "A selection of active client projects, from training and consulting to retail.",
    empty:
      "Project stories are being prepared. In the meantime, explore the services or get in touch about what you’re planning.",
  },
  contact: {
    title: "Let’s talk about your project.",
    intro:
      "Tell me what you want to build or improve. A few details are enough to start the conversation.",
    next: "I’ll review your enquiry and get in touch to clarify the requirements and discuss next steps.",
  },
  closing: {
    title: "Have something in mind?",
    description:
      "Share the idea, the problem, or the website you want to improve.",
  },
};
