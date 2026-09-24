export type ProjectStatus = "building" | "exploring" | "concept";

export type ProjectFeature = {
  title: string;
  description: string;
};

export type Project = {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  introduction: string;
  overview: string;
  problem: string;
  solution: string;
  features: ProjectFeature[];
  outcome: string;
  technologies: string[];
  image: string;
  website?: string;
  github?: string;
  featured: boolean;
  status: ProjectStatus;
};

export const projects: Project[] = [
  {
    id: "learnova",
    slug: "learnova",
    number: "01",
    title: "Learnova",
    category: "AI Education Platform",
    year: "2026",
    featured: true,
    status: "building",
    image: "/projects/learnova.svg",
    description:
      "An AI education platform focused on language learning and skills.",
    introduction:
      "Learnova is an AI education platform focused on language learning and skills — built to make practice feel personal, structured and actually usable.",
    overview:
      "The product is being shaped around a simple idea: learning should feel like a focused tool, not a noisy classroom. Learnova explores how AI can support language and skill development without turning the experience into another dashboard.",
    problem:
      "Most language and skills products either gamify until the point is lost, or imitate school until nobody comes back. The gap is a calmer product — intelligent enough to adapt, simple enough to use every day.",
    solution:
      "A platform that treats learning as a product problem: clear goals, useful practice, and AI that helps without getting in the way. Features below are product concepts being designed and tested, not a claim that every surface is live.",
    features: [
      {
        title: "Language practice",
        description:
          "A focused loop for language learning — short, useful sessions instead of endless lesson trees.",
      },
      {
        title: "Skill-oriented paths",
        description:
          "Structured routes for skills people actually want to build, kept narrow on purpose.",
      },
      {
        title: "AI-assisted feedback",
        description:
          "Feedback that explains what to do next, written as a product concept around the core loop.",
      },
      {
        title: "A quiet interface",
        description:
          "A clean, educational, minimal visual system — no gamified noise, no clutter.",
      },
    ],
    outcome:
      "Learnova is currently being built. The work is in the product itself: getting the learning loop honest, useful and worth returning to.",
    technologies: ["Next.js", "TypeScript", "AI APIs", "Product Design"],
  },
  {
    id: "dary-ai",
    slug: "dary-ai",
    number: "02",
    title: "Dary AI",
    category: "AI Productivity / Planning",
    year: "2026",
    featured: true,
    status: "exploring",
    image: "/projects/dary-ai.svg",
    description:
      "An AI productivity platform organized around goals, coaching and direction.",
    introduction:
      "Dary AI is an AI productivity and planning product — a quieter place to decide what matters and actually move toward it.",
    overview:
      "The concept is a structured home for work that is longer than a to-do list: goals, a roadmap, an AI coach, and a simple read on progress. It is designed as a product system, not a pile of features.",
    problem:
      "Productivity software often becomes a place to store tasks, not a place to make progress. People end up managing tools instead of direction.",
    solution:
      "A planning surface with a small set of rooms — Home, Goals & Roadmap, AI Coach, Analytics, Profile, Premium — so the product has a clear spine instead of infinite widgets.",
    features: [
      {
        title: "Home",
        description:
          "A single place to see what deserves attention today, without a wall of metrics.",
      },
      {
        title: "Goals & Roadmap",
        description:
          "Longer-horizon goals broken into a readable path, not a buried project board.",
      },
      {
        title: "AI Coach",
        description:
          "A thinking partner for planning and reflection — conceptually a coach, not a chatbot dumped in a sidebar.",
      },
      {
        title: "Analytics",
        description:
          "A restrained view of progress. Useful signal only — no vanity charts.",
      },
      {
        title: "Profile & Premium",
        description:
          "A personal space and a premium layer as part of the product model, not a growth hack.",
      },
    ],
    outcome:
      "Dary AI is an exploration of what a more intentional productivity product can look like. No user counts, no revenue claims — the work is the system.",
    technologies: ["React", "TypeScript", "AI APIs", "Product Design"],
  },
  {
    id: "magneet",
    slug: "magneet",
    number: "03",
    title: "Magneet",
    category: "Data Loss Prevention",
    year: "2026",
    featured: true,
    status: "exploring",
    image: "/projects/magneet.svg",
    description:
      "A data loss prevention product focused on endpoint and data protection.",
    introduction:
      "Magneet is a data loss prevention product — cybersecurity work aimed at keeping sensitive information from leaving the devices and systems that hold it.",
    overview:
      "The product sits at the intersection of endpoint protection and data protection. It is being approached as a product you can operate, not a policy PDF with a login screen.",
    problem:
      "Data leaves endpoints in ordinary ways: files, messages, uploads. Most people only notice after something is already gone. The interface for this kind of protection is usually either invisible or unusable.",
    solution:
      "A DLP-oriented product exploring how to watch for, prevent and make sense of data leaving a device — with a clear operator experience and a serious security posture.",
    features: [
      {
        title: "Endpoint awareness",
        description:
          "A view of what is happening on the device, designed for protection rather than surveillance theatre.",
      },
      {
        title: "Data protection",
        description:
          "Controls oriented around sensitive data in motion and at rest — treated as product concepts while the system is being built.",
      },
      {
        title: "Policy, made readable",
        description:
          "Rules that a human can understand, because a DLP product nobody can operate is just noise.",
      },
      {
        title: "Security-first interface",
        description:
          "A restrained, technical visual language. No cartoon shields. No fake enterprise dashboards.",
      },
    ],
    outcome:
      "Early product work in data protection. No invented customers, deployments or enterprise logos — the focus is building the product correctly.",
    technologies: ["Cybersecurity", "Endpoint Protection", "Python", "Linux"],
  },
  {
    id: "agentpay",
    slug: "agentpay",
    number: "04",
    title: "AgentPay",
    category: "AI Agent Payments",
    year: "2026",
    featured: true,
    status: "concept",
    image: "/projects/agentpay.svg",
    description:
      "A product exploration of how AI agents could initiate and complete payments.",
    introduction:
      "AgentPay is an exploration of AI agent payments — how software that acts on someone's behalf might request, approve and complete a transaction.",
    overview:
      "This is a technology-oriented product concept, not a live payments network. The work is in the system design: intent, authorization, and a trail a human can still understand.",
    problem:
      "Agents can plan and act, but paying still assumes a person at the checkout. The moment money moves, most agent demos become a screenshot of a human finishing the job.",
    solution:
      "A product concept for agent-native payment flows — structured enough to reason about, visible enough to trust, and designed as software rather than a consumer banking skin.",
    features: [
      {
        title: "Agent-initiated flows",
        description:
          "A model for an agent requesting a payment as part of a task, not as a hidden side effect.",
      },
      {
        title: "Authorization",
        description:
          "Approval that still belongs to a person or a policy — agents should not invent permission.",
      },
      {
        title: "Transaction visibility",
        description:
          "A readable record of what was intended, what was approved, and what moved.",
      },
      {
        title: "API-first thinking",
        description:
          "Designed as a system other software can call, not a card-shaped landing page.",
      },
    ],
    outcome:
      "A concept and technical exploration. No payment volume, no partners, no invented network — just the product question, taken seriously.",
    technologies: ["TypeScript", "Node.js", "AI Agents", "Systems Design"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return projects[0];
  return projects[(index + 1) % projects.length];
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}
