import { INTENTS, withParams, type ImageIntent } from "@/utils/imageParams";
import type { ContentfulImage } from "@/types/contentful";

export type { ImageIntent } from "@/utils/imageParams";

const BLUR_PARAMS = { w: 20, q: 50, fm: "webp" };

const TRANSPARENT_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

function absoluteUrl(url: string): string {
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

const BLUR_TIMEOUT_MS = 2500;

async function generateBlur(url: string): Promise<string> {
  const blurUrl = absoluteUrl(withParams(url, BLUR_PARAMS));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), BLUR_TIMEOUT_MS);

  try {
    const response = await fetch(blurUrl, { signal: controller.signal });
    if (!response.ok) {
      console.error(`blur fetch ${response.status} for ${blurUrl}`);
      return TRANSPARENT_PIXEL;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    return `data:image/webp;base64,${buffer.toString("base64")}`;
  } catch (error) {
    if ((error as Error)?.name !== "AbortError") {
      console.error(`blur generation failed for ${blurUrl}:`, error);
    }
    return TRANSPARENT_PIXEL;
  } finally {
    clearTimeout(timer);
  }
}

export async function enrichImage(
  image: ContentfulImage,
  intent: ImageIntent,
): Promise<ContentfulImage> {
  const { params, blur } = INTENTS[intent];
  const blurDataURL = blur ? await generateBlur(image.url) : undefined;
  return {
    ...image,
    url: withParams(image.url, params),
    ...(blurDataURL && { blurDataURL }),
  };
}

export async function enrichItems<T extends { image: ContentfulImage }>(
  items: T[],
  intent: ImageIntent,
): Promise<T[]> {
  return Promise.all(
    items.map(async (item) => ({ ...item, image: await enrichImage(item.image, intent) })),
  );
}
