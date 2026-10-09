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

export const NAV_LINKS = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/what-i-can-do", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;
