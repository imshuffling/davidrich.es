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

interface EnrichOptions {
  aspectRatio?: AspectRatio;
}

export function enrichImage(
  image: ContentfulImage,
  intent: ImageIntent,
  options: EnrichOptions = {},
): ContentfulImage {
  const aspectRatio = options.aspectRatio ?? "16/9";
  return {
    ...image,
    url: withParams(image.url, paramsForIntent(intent, aspectRatio)),
    blurDataURL: withParams(image.url, BLUR_PARAMS),
  };
}

export function enrichItems<T extends { image: ContentfulImage }>(
  items: T[],
  intent: ImageIntent,
): T[] {
  return items.map((item) => ({ ...item, image: enrichImage(item.image, intent) }));
}

type BlockEnricher = (block: ContentfulBlock) => ContentfulBlock;

const BLOCK_ENRICHERS: Record<string, BlockEnricher> = {
  Image: (block) => {
    if (block.__typename !== "Image") return block;
    return { ...block, image: enrichImage(block.image, "hero", { aspectRatio: block.aspectRatio }) };
  },
  Video: (block) => {
    if (block.__typename !== "Video") return block;
    return { ...block, image: enrichImage(block.image, "poster") };
  },
  TwoColumn: (block) => {
    if (block.__typename !== "TwoColumn") return block;
    return { ...block, image: enrichImage(block.image, "hero") };
  },
};

export function enrichBlocks(blocks: ContentfulBlock[]): ContentfulBlock[] {
  return blocks.map((block) => {
    const enricher = BLOCK_ENRICHERS[block.__typename];
    return enricher ? enricher(block) : block;
  });
}
