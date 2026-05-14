import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Oswald } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Layout from "@/components/layout/Layout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

const SITE_URL = "https://davidrich.es";
const SITE_NAME = "David Riches";
const BRAND_TITLE = "David Riches - Senior Front-end Engineer";
const BRAND_DESCRIPTION =
  "Senior front-end engineer and hockey player based in Kent. Building headless commerce and content platforms on Next.js, BigCommerce and Contentful.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: BRAND_TITLE,
    template: "%s - David Riches",
  },
  description: BRAND_DESCRIPTION,
  manifest: "/manifest.json",
  authors: [{ name: "David Riches", url: SITE_URL }],
  creator: "David Riches",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: BRAND_TITLE,
    description: BRAND_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_TITLE,
    description: BRAND_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "David Riches",
    jobTitle: "Senior Front-end Engineer",
    description: BRAND_DESCRIPTION,
    url: SITE_URL,
    sameAs: ["https://github.com/imshuffling"],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: BRAND_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-GB",
  };

  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} ${oswald.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
