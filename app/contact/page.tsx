import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";

const PAGE_TITLE = "Contact";
const PAGE_DESCRIPTION =
  "Get in touch about headless commerce, Next.js or content platform work — or just to chat about the latest in front-end tech.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
