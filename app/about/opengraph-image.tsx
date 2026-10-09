import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/utils/ogImage";

export const alt = "About David Riches — senior front-end engineer based in Kent";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "About",
    title: "Senior front-end engineer.",
    subtitle:
      "Building headless commerce and content platforms since 2010 — from agency life to Master of Malt.",
  });
}
