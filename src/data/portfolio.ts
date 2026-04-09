export type Project = {
  slug: string;
  title: string;
  category: "FULL_STACK" | "ODOO_ERP" | "E_COMMERCE" | "FREELANCE";
  role: string;
  period: string;
  stack: string[];
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  cover: string;
  comingSoon?: boolean;
};

export const profile = {
  name: "MOHAMMED BOUABID",
  alias: "BOUABID_M.",
  title: "FULL STACK & ERP DEVELOPER",
  location: "Casablanca, Maroc",
  email: "mo.bouabid.dev@gmail.com",
  phone: "+212 7 00 50 78 63",
  github: "mohammedbouabid",
  linkedin: "mohammedbouabid",
  summary:
    "Full Stack Developer with 2+ years of experience in MERN stack, Odoo 17 ERP development and e-commerce integrations. Built 4+ custom Odoo modules and full-stack web apps, reducing manual processes by up to 60%.",
  manifesto:
    "Code is not just logic; it is a conversation between intent and machine — every line a stroke of intent."
};

export const experiences = [
  {
    company: "YMH Innovation",
    role: "Full Stack & Odoo 17 Developer (Internship)",
    period: "Nov 2025 — Present",
    location: "Casablanca",
    bullets: [
      "Developed 4 custom Odoo 17 modules: payment registration from SO/PO (-40% processing time), role-based access manager, Damancom CNSS DS file generator, and WooCommerce ↔ Odoo real-time sync.",
      "Using Claude Code agents to facilitate coding, testing and accelerate development tasks."
    ],
    stack: ["Python", "Odoo 17", "PostgreSQL", "XML", "OWL", "WooCommerce API"]
  },
  {
    company: "Ark-x Group",
    role: "Full Stack MERN Developer (Internship)",
    period: "Jul 2025 — Nov 2025",
    location: "Casablanca",
    bullets: [
      "Developed complete web applications in both team and individually.",
      "Implemented REST APIs and built dynamic, responsive interfaces."
    ],
    stack: ["Node.js", "Express", "MongoDB", "ReactJS", "Tailwind", "GitHub"]
  },
  {
    company: "Freelance",
    role: "Developer & Digital Marketer",
    period: "Mar 2022 — Feb 2025",
    location: "Casablanca",
    bullets: [
      "Built e-commerce sites and managed Meta ad campaigns (+60% sales)."
    ],
    stack: ["WordPress", "WooCommerce", "Shopify", "JavaScript", "Meta Ads"]
  }
];

export const education = [
  {
    period: "2023 — 2024",
    title: "Licence Professionnelle Développement JAVA/J2EE",
    school: "Supemir"
  },
  {
    period: "2019 — 2021",
    title: "Technicien Spécialisé en Développement Informatique",
    school: "Ofppt"
  },
  {
    period: "2018 — 2019",
    title: "Baccalauréat Sciences de la Vie et de la Terre",
    school: "Lycée Ibno Hani"
  }
];

export const skills = {
  languages: ["Python", "JavaScript (ES6+)", "PHP", "HTML5", "CSS3", "XML"],
  frameworks: ["Odoo 17", "OWL", "ReactJS", "Node.js", "Express", "TailwindCSS"],
  databases: ["PostgreSQL", "MongoDB", "MySQL"],
  tools: ["Git", "GitHub", "Postman", "Figma", "VS Code"],
  ecommerce: ["WooCommerce API", "Shopify API", "WordPress"],
  personal: ["Teamwork", "Strong commitment", "Organization", "Planning & coordination"]
};

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "French", level: "Professional" },
  { name: "English", level: "Professional" }
];

export const interests = [
  "Bodybuilding & Crossfit",
  "Boxing",
  "Human Anatomy & Physiology"
];

export const certifications = [
  "Full Stack MERN Developer — JobInTech",
  "Python, Node.js, Express.js, React — Codecademy",
  "JavaScript, React, Node, MongoDB, Docker, Postman — Ark-x Talent Solutions"
];

export const projects: Project[] = [
  {
    slug: "guidy-saas",
    title: "GUIDY_SAAS",
    category: "FULL_STACK",
    role: "Full Stack Developer",
    period: "2025",
    stack: ["React", "Vite", "Redux Toolkit", "Shadcn UI", "Node.js", "Express", "MongoDB"],
    summary:
      "SaaS platform with authentication, user management, rating system, and a full admin back-office.",
    problem:
      "The team needed a multi-role SaaS with secure auth, profile management and an internal tool for moderators to govern users and ratings.",
    approach:
      "Built sign-up / log-in flows on top of JWT, implemented a Redux Toolkit slice architecture for auth state, and shipped the admin back-office in React + Shadcn UI with reusable data-table primitives.",
    outcome:
      "Delivered a production-grade SaaS shell that the product team extends to this day, with the back-office cutting moderation time significantly.",
    cover: "https://picsum.photos/seed/guidy/1200/800"
  },
  {
    slug: "odoo-payment-registration",
    title: "PAYMENT_REGISTRATION",
    category: "ODOO_ERP",
    role: "Odoo 17 Developer",
    period: "2025",
    stack: ["Python", "Odoo 17", "PostgreSQL", "XML", "OWL"],
    summary:
      "Custom Odoo 17 module to register payments directly from Sales Orders and Purchase Orders.",
    problem:
      "Accountants were juggling between SO/PO and the payment screen, costing time and creating reconciliation errors.",
    approach:
      "Extended sale.order and purchase.order models with a payment-registration wizard, OWL components for the UI, and journal-aware validation.",
    outcome:
      "Reduced payment processing time by ~40% and removed an entire manual step from the finance workflow.",
    cover: "https://picsum.photos/seed/payment/1200/800"
  },
  {
    slug: "odoo-rbac-manager",
    title: "RBAC_MANAGER",
    category: "ODOO_ERP",
    role: "Odoo 17 Developer",
    period: "2025",
    stack: ["Python", "Odoo 17", "XML", "PostgreSQL"],
    summary:
      "Role-based access manager bringing fine-grained permissions to Odoo records.",
    problem:
      "Out-of-the-box Odoo groups were too coarse for the client's compliance rules.",
    approach:
      "Built a meta-layer over res.groups with declarative rules per model and a UI for non-technical admins to assign capabilities.",
    outcome:
      "Compliance reviews now self-serve; security audits dropped from days to hours.",
    cover: "https://picsum.photos/seed/rbac/1200/800"
  },
  {
    slug: "odoo-cnss-ds",
    title: "DAMANCOM_CNSS_DS",
    category: "ODOO_ERP",
    role: "Odoo 17 Developer",
    period: "2025",
    stack: ["Python", "Odoo 17", "XML"],
    summary:
      "Generator that produces Damancom CNSS DS declaration files straight from Odoo HR data.",
    problem:
      "HR was manually transcribing payroll data into Damancom's strict file format every month.",
    approach:
      "Mapped hr.payslip data to the official CNSS schema, added validation, and exposed a one-click export wizard.",
    outcome:
      "Eliminated manual transcription and brought monthly declaration prep down to minutes.",
    cover: "https://picsum.photos/seed/cnss/1200/800"
  },
  {
    slug: "odoo-woocommerce-sync",
    title: "WOO_ODOO_SYNC",
    category: "E_COMMERCE",
    role: "Odoo 17 Developer",
    period: "2025",
    stack: ["Python", "Odoo 17", "WooCommerce API", "REST", "PostgreSQL"],
    summary:
      "Real-time bidirectional sync between WooCommerce and Odoo: products, stock and orders.",
    problem:
      "Stock drift between the storefront and ERP was causing oversells and back-office reconciliation pain.",
    approach:
      "Built a webhook-driven connector with idempotent upserts, a queue for retries, and a delta-sync fallback.",
    outcome:
      "Storefront and ERP now stay aligned in real time; oversells dropped to zero.",
    cover: "https://picsum.photos/seed/woosync/1200/800"
  },
  {
    slug: "gym-management",
    title: "GYM_MANAGEMENT",
    category: "FREELANCE",
    role: "Full Stack Developer",
    period: "2024",
    stack: ["PHP", "HTML", "CSS", "JavaScript", "MySQL"],
    summary:
      "Gym management system covering memberships, equipment and staff in one back-office.",
    problem:
      "The gym was tracking memberships and equipment in spreadsheets, losing data and time.",
    approach:
      "Designed a relational schema, shipped a PHP back-office with role-based access and built dashboards for memberships, equipment and staff.",
    outcome: "Cut manual administration tasks by ~50%.",
    cover: "https://picsum.photos/seed/gym/1200/800"
  },
  {
    slug: "coming-soon-1",
    title: "COMING_SOON",
    category: "FULL_STACK",
    role: "—",
    period: "2026",
    stack: [],
    summary: "New chapter loading.",
    problem: "",
    approach: "",
    outcome: "",
    cover: "https://picsum.photos/seed/soon1/1200/800",
    comingSoon: true
  },
  {
    slug: "coming-soon-2",
    title: "COMING_SOON",
    category: "ODOO_ERP",
    role: "—",
    period: "2026",
    stack: [],
    summary: "New chapter loading.",
    problem: "",
    approach: "",
    outcome: "",
    cover: "https://picsum.photos/seed/soon2/1200/800",
    comingSoon: true
  }
];
