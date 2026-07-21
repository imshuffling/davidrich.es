export const SITE_URL = "https://davidrich.es";
export const SITE_NAME = "David Riches";
export const BRAND_TITLE = "David Riches - Senior Front-end Engineer";
export const BRAND_DESCRIPTION =
  "Senior front-end engineer and hockey player based in Kent. Building headless commerce and content platforms on Next.js, BigCommerce and Contentful.";

export const CONTACT = {
  email: "hi@davidrich.es",
  location: "London, UK",
  availability: "Remote worldwide",
} as const;

export const LINKS = {
  github: "https://github.com/imshuffling",
  resume: "https://resume.davidrich.es/",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Work" },
  { href: "/what-i-can-do", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;
