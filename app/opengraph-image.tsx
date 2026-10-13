import { OG_CONTENT_TYPE, OG_SIZE, pageOgImage } from "@/utils/ogImage";
import { PAGES } from "@/utils/site";

export const alt = PAGES.home.og.alt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return pageOgImage("home");
}
