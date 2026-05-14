import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/utils/ogImage";

export const alt = "David Riches — Senior Front-end Engineer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Senior Front-end Engineer",
    title: "David Riches",
    subtitle:
      "Headless commerce and content platforms on Next.js, BigCommerce and Contentful.",
  });
}
