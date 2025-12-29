import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
};

export const dynamic = 'force-static'; // Fully static page

export default function ContactPage() {
  return <ContactClient />;
}
