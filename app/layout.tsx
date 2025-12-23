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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${karla.variable} ${oswald.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
