import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Oswald } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Layout from "@/components/layout/Layout";
import { SITE_URL, SITE_NAME, BRAND_TITLE, BRAND_DESCRIPTION } from "@/utils/site";
import { personJsonLd, websiteJsonLd } from "@/utils/metadata";

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
  const personLd = personJsonLd();
  const websiteLd = websiteJsonLd();

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
