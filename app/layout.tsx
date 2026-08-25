import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Oswald } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Layout from "@/components/layout/Layout";
import { SITE_URL, SITE_NAME, BRAND_TITLE, BRAND_DESCRIPTION } from "@/utils/site";
import { buildMetadata, personJsonLd, websiteJsonLd } from "@/utils/metadata";

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

const baseMetadata = buildMetadata({
  title: BRAND_TITLE,
  description: BRAND_DESCRIPTION,
  path: "/",
});

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(SITE_URL),
  title: {
    default: BRAND_TITLE,
    template: "%s - David Riches",
  },
  manifest: "/manifest.json",
  authors: [{ name: "David Riches", url: SITE_URL }],
  creator: "David Riches",
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
    ...baseMetadata.openGraph,
    url: SITE_URL,
    locale: "en_GB",
    siteName: SITE_NAME,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcf9f8" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1b1b" },
  ],
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
        <link rel="preconnect" href="https://images.ctfassets.net" />
        <link rel="preconnect" href="https://videos.ctfassets.net" />
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
