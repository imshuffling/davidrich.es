export type ImageIntent = "hero" | "card" | "og" | "poster" | "twoColumn";

export type TransformParams = {
  w?: number;
  h?: number;
  q?: number;
  fit?: "fill";
  fm?: string;
};

const TRANSFORM_KEYS = ["w", "h", "q", "fit", "fm"] as const;

export const INTENTS: Record<ImageIntent, { params: TransformParams; blur: boolean }> = {
  hero: { params: { w: 1600, h: 900, fit: "fill" }, blur: true },
  poster: { params: { w: 1600, h: 900, fit: "fill" }, blur: true },
  card: { params: { w: 800 }, blur: true },
  twoColumn: { params: { w: 800 }, blur: true },
  og: { params: { w: 1200, h: 630, fit: "fill", q: 80, fm: "jpg" }, blur: false },
};

export function withParams(url: string, params: TransformParams): string {
  const [base, query = ""] = url.split("?", 2);
  const search = new URLSearchParams(query);
  for (const key of TRANSFORM_KEYS) search.delete(key);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value));
  }
  const next = search.toString();
  return next ? `${base}?${next}` : base;
}
