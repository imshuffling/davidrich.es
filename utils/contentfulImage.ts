import { INTENTS, withParams, type ImageIntent } from "@/utils/imageParams";
import type { ContentfulSource } from "@/utils/contentful/source";
import type { ContentfulImage } from "@/types/contentful";

export type { ImageIntent } from "@/utils/imageParams";

const BLUR_PARAMS = { w: 20, q: 50, fm: "webp" };

const TRANSPARENT_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

async function generateBlur(source: ContentfulSource, url: string): Promise<string> {
  const bytes = await source.fetchAsset(withParams(url, BLUR_PARAMS));
  if (!bytes) return TRANSPARENT_PIXEL;
  return `data:image/webp;base64,${Buffer.from(bytes).toString("base64")}`;
}

export async function enrichImage(
  source: ContentfulSource,
  image: ContentfulImage,
  intent: ImageIntent,
): Promise<ContentfulImage> {
  const { params, blur } = INTENTS[intent];
  const blurDataURL = blur ? await generateBlur(source, image.url) : undefined;
  return {
    ...image,
    url: withParams(image.url, params),
    ...(blurDataURL && { blurDataURL }),
  };
}

export async function enrichItems<T extends { image: ContentfulImage }>(
  source: ContentfulSource,
  items: T[],
  intent: ImageIntent,
): Promise<T[]> {
  return Promise.all(
    items.map(async (item) => ({ ...item, image: await enrichImage(source, item.image, intent) })),
  );
}
