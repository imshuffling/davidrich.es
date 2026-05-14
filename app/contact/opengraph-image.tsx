import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/utils/ogImage";

export const alt = "Contact David Riches — let's build something great";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Get in touch",
    title: "Let's build something great.",
    subtitle:
      "Headless commerce, Next.js, content platforms — or just a chat about front-end.",
  });
}
