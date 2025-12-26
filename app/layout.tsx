import type { Metadata } from "next";
import { Karla, Oswald } from "next/font/google";
import "./globals.scss";
import { Providers } from "./providers";
import Layout from "@/components/layout/Layout";

const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
});

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: {
    default: "David Riches - Front-end Developer",
    template: "%s - David Riches",
  },
  description: "Front-end developer and part-time hockey player from London",
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://davidrich.es",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://davidrich.es",
    siteName: "David Riches",
    title: "David Riches - Front-end Developer",
    description: "Front-end developer and part-time hockey player from London",
  },
  twitter: {
    card: "summary_large_image",
    title: "David Riches - Front-end Developer",
    description: "Front-end developer and part-time hockey player from London",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "David Riches",
    jobTitle: "Front-end Developer",
    description: "Front-end developer and part-time hockey player from London",
    url: "https://davidrich.es",
    sameAs: [
      "https://github.com/imshuffling",
    ],
  };

  return (
    <html lang="en" className={`${karla.variable} ${oswald.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
