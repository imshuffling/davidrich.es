export const SITE_URL = "https://davidrich.es";
export const SITE_NAME = "David Riches";
export const REPO_URL = "https://github.com/imshuffling/davidrich.es";
export const BRAND_TITLE = "David Riches - Senior Front-end Engineer";
export const BRAND_DESCRIPTION =
  "Senior front-end engineer and hockey player based in Kent. Building headless commerce and content platforms on Next.js, BigCommerce and Contentful.";

export const CONTACT = {
  email: "hi@davidrich.es",
  location: "Kent, UK",
  availability: "Remote worldwide",
  status: "Open to freelance projects",
} as const;

export const LINKS = {
  github: "https://github.com/imshuffling",
  linkedin: "https://www.linkedin.com/in/david-riches-dev/",
  resume: "https://resume.davidrich.es/",
} as const;

export interface PageEntry {
  path: string;
  nav: string;
  title: string;
  absoluteTitle?: boolean;
  description: string;
  og: { alt: string; eyebrow: string; title: string; subtitle: string };
  sitemap: { changeFrequency: "weekly" | "monthly"; priority: number };
}

// Static pages in nav order. Metadata, OG images, sitemap and nav all read from here.
export const PAGES = {
  home: {
    path: "/",
    nav: "Work",
    title: "David Riches — Senior Front-End Engineer",
    absoluteTitle: true,
    description:
      "I'm David — a senior front-end engineer and hockey player based in Kent, building headless commerce and content platforms for performance-focused brands.",
    og: {
      alt: "David Riches — Senior Front-end Engineer",
      eyebrow: "Senior Front-end Engineer",
      title: "David Riches",
      subtitle: "Headless commerce and content platforms on Next.js, BigCommerce and Contentful.",
    },
    sitemap: { changeFrequency: "weekly", priority: 1 },
  },
  about: {
    path: "/about",
    nav: "About",
    title: "About",
    description:
      "Senior front-end engineer based in Kent, building headless commerce and content platforms since 2010 — currently leading the front-end of Master of Malt's replatform.",
    og: {
      alt: "About David Riches — senior front-end engineer based in Kent",
      eyebrow: "About",
      title: "Senior front-end engineer.",
      subtitle:
        "Building headless commerce and content platforms since 2010 — from agency life to Master of Malt.",
    },
    sitemap: { changeFrequency: "monthly", priority: 0.8 },
  },
  services: {
    path: "/what-i-can-do",
    nav: "Services",
    title: "What I can do",
    description:
      "Headless commerce and content platforms, built properly. Front-end engineering on Next.js, BigCommerce and Contentful — with the editorial tooling and performance to back them up.",
    og: {
      alt: "What I can do — headless commerce and content platforms, built properly",
      eyebrow: "Services & Craft",
      title: "Headless commerce and content platforms.",
      subtitle:
        "Next.js, BigCommerce and Contentful — with the editorial tooling and performance to back them up.",
    },
    sitemap: { changeFrequency: "monthly", priority: 0.8 },
  },
  contact: {
    path: "/contact",
    nav: "Contact",
    title: "Contact",
    description:
      "Get in touch about headless commerce, Next.js or content platform work — or just to chat about the latest in front-end tech.",
    og: {
      alt: "Contact David Riches — let's build something great",
      eyebrow: "Get in touch",
      title: "Let's build something great.",
      subtitle: "Headless commerce, Next.js, content platforms — or just a chat about front-end.",
    },
    sitemap: { changeFrequency: "monthly", priority: 0.5 },
  },
} as const satisfies Record<string, PageEntry>;

export type PageKey = keyof typeof PAGES;

export const NAV_LINKS = Object.values(PAGES).map((page) => ({
  href: page.path,
  label: page.nav,
}));
