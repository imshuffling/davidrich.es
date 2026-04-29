import { getPlaiceholder } from "plaiceholder";
import type { ContentfulImage, ContentfulBlock } from "@/types/contentful";

export type ImageIntent = "hero" | "card" | "og" | "poster";
export type AspectRatio = "16/9" | "4/3" | "1/1";

type TransformParams = {
  w?: number;
  h?: number;
  q?: number;
  fit?: "fill";
};

const TRANSFORM_KEYS = ["w", "h", "q", "fit"] as const;

const ASPECT_HEIGHT: Record<AspectRatio, number> = {
  "16/9": 900,
  "4/3": 1200,
  "1/1": 1600,
};

const BLUR_PARAMS: TransformParams = { w: 20, q: 50 };

const TRANSPARENT_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

function paramsForIntent(intent: ImageIntent, aspectRatio: AspectRatio): TransformParams {
  switch (intent) {
    case "hero":
    case "poster":
      return { w: 1600, h: ASPECT_HEIGHT[aspectRatio], fit: "fill", q: 80 };
    case "card":
      return { w: 800, q: 80 };
    case "og":
      return { w: 1200, h: 630, fit: "fill", q: 80 };
  }
}

function withParams(url: string, params: TransformParams): string {
  const [base, query = ""] = url.split("?", 2);
  const search = new URLSearchParams(query);
  for (const key of TRANSFORM_KEYS) search.delete(key);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value));
  }
  const next = search.toString();
  return next ? `${base}?${next}` : base;
}

async function generateBlur(url: string): Promise<string> {
  try {
    const blurUrl = withParams(url, BLUR_PARAMS);
    const response = await fetch(blurUrl);
    if (!response.ok) return TRANSPARENT_PIXEL;
    const buffer = Buffer.from(await response.arrayBuffer());
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    return base64;
  } catch (error) {
    console.error("blur generation failed:", error);
    return TRANSPARENT_PIXEL;
  }
}

interface EnrichOptions {
  aspectRatio?: AspectRatio;
}

export async function enrichImage(
  image: ContentfulImage,
  intent: ImageIntent,
  options: EnrichOptions = {},
): Promise<ContentfulImage> {
  const aspectRatio = options.aspectRatio ?? "16/9";
  const blurDataURL = await generateBlur(image.url);
  return {
    ...image,
    url: withParams(image.url, paramsForIntent(intent, aspectRatio)),
    blurDataURL,
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

type BlockEnricher = (block: ContentfulBlock) => Promise<ContentfulBlock>;

const BLOCK_ENRICHERS: Record<string, BlockEnricher> = {
  Image: async (block) => {
    if (block.__typename !== "Image") return block;
    return {
      ...block,
      image: await enrichImage(block.image, "hero", { aspectRatio: block.aspectRatio }),
    };
  },
  Video: async (block) => {
    if (block.__typename !== "Video") return block;
    return { ...block, image: await enrichImage(block.image, "poster") };
  },
  TwoColumn: async (block) => {
    if (block.__typename !== "TwoColumn") return block;
    return { ...block, image: await enrichImage(block.image, "hero") };
  },
};

export async function enrichBlocks(blocks: ContentfulBlock[]): Promise<ContentfulBlock[]> {
  return Promise.all(
    blocks.map((block) => {
      const enricher = BLOCK_ENRICHERS[block.__typename];
      return enricher ? enricher(block) : Promise.resolve(block);
    }),
  );
}
