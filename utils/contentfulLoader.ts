import { withParams, type TransformParams } from "@/utils/imageParams";

export default function contentfulLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const [, query = ""] = src.split("?", 2);
  const search = new URLSearchParams(query);
  const w = Number(search.get("w"));
  const h = Number(search.get("h"));

  const params: TransformParams = { w: width, q: quality ?? 80, fm: "avif" };
  if (w && h) params.h = Math.round((h * width) / w);
  if (search.get("fit")) params.fit = "fill";
  return withParams(src, params);
}
