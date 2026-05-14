import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/utils/ogImage";

export const alt =
  "What I can do — headless commerce and content platforms, built properly";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Services & Craft",
    title: "Headless commerce and content platforms.",
    subtitle:
      "Next.js, BigCommerce and Contentful — with the editorial tooling and performance to back them up.",
  });
}
