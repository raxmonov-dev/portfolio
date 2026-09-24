export const siteConfig = {
  name: "Ruslan Raxmonov",
  title: "Ruslan Raxmonov — AI Builder & Founder",
  description:
    "Portfolio of Ruslan Raxmonov — building AI products, startups and digital experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ruslanraxmonov.com",
  location: "Tashkent, Uzbekistan",
  label: "AI BUILDER · FOUNDER · PRODUCT DESIGNER",
  currentProject: {
    name: "Learnova",
    href: "/work/learnova",
  },
  links: {
    telegram: undefined as string | undefined,
    instagram: undefined as string | undefined,
    github: undefined as string | undefined,
    email: undefined as string | undefined,
  },
};

export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const stack = [
  "Python",
  "TypeScript",
  "Next.js",
  "React",
  "Tailwind",
  "Node.js",
  "AI APIs",
  "Telegram Mini Apps",
  "Figma",
  "Git",
  "Linux",
] as const;

export const aboutDetails = [
  { label: "Location", value: "Tashkent, Uzbekistan" },
  { label: "Focus", value: "AI · Startups · Product" },
  { label: "Currently", value: "Student & Builder" },
  {
    label: "Interests",
    value: "Artificial Intelligence, Product Development, Cybersecurity, Startups",
  },
] as const;

export const nowItems: {
  status: string;
  title: string;
  detail: string;
  href?: string;
}[] = [
  {
    status: "BUILDING",
    title: "Learnova",
    detail: "AI education platform",
    href: "/work/learnova",
  },
  {
    status: "EXPLORING",
    title: "AI Agents",
    detail: "Payments & automation",
  },
  {
    status: "LEARNING",
    title: "Cybersecurity",
    detail: "Systems, endpoints, data protection",
  },
  {
    status: "OPEN TO",
    title: "Interesting collaborations",
    detail: "Ideas, products, ambitious builds",
    href: "/contact",
  },
];

export const timeline = [
  {
    period: "2026",
    title: "Founders Hub Fellowship",
    description: "Building and validating startup ideas.",
  },
  {
    period: "2026",
    title: "AI / Product Projects",
    description: "Building experimental AI products.",
  },
  {
    period: "2025–2026",
    title: "Independent Builder",
    description: "Learning, shipping and experimenting.",
  },
] as const;

export const contactLinks = [
  { label: "Telegram", href: siteConfig.links.telegram },
  { label: "Instagram", href: siteConfig.links.instagram },
  { label: "GitHub", href: siteConfig.links.github },
  { label: "Email", href: siteConfig.links.email },
] as const;
