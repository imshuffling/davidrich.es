import type { Metadata } from "next";
import type { ContentfulImage } from "@/types/contentful";
import { SITE_URL, SITE_NAME, BRAND_DESCRIPTION } from "@/utils/site";

interface PageMetadata {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  ogImage?: { url: string; alt: string };
}

export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  ogImage,
}: PageMetadata): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      ...(ogImage && {
        images: [{ url: ogImage.url, width: 1200, height: 630, alt: ogImage.alt }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE_NAME,
    jobTitle: "Senior Front-end Engineer",
    description: BRAND_DESCRIPTION,
    url: SITE_URL,
    sameAs: ["https://github.com/imshuffling"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: BRAND_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-GB",
  };
}

interface ArticleInput {
  title: string;
  description: string;
  pageUrl: string;
  ogImage?: ContentfulImage;
  datePublished?: string;
  dateModified?: string;
}

export function articleJsonLd({
  title,
  description,
  pageUrl,
  ogImage,
  datePublished,
  dateModified,
}: ArticleInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: ogImage ? [ogImage.url] : undefined,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    url: pageUrl,
    datePublished,
    dateModified,
  };
}

export function breadcrumbJsonLd(title: string, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/#work` },
      { "@type": "ListItem", position: 3, name: title, item: pageUrl },
    ],
  };
}
