import ImageWrapper from "@/components/ImageWrapper";
import type { BlockImage as BlockImageProps } from "@/types/contentful";

export default function BlockImage({ image, lazyLoad, aspectRatio = "16/9" }: BlockImageProps) {
  const ratioMap = {
    "16/9": { ratio: 16 / 9, h: 900 },
    "4/3": { ratio: 4 / 3, h: 1200 },
    "1/1": { ratio: 1, h: 1600 },
  } as const;

  const { h } = ratioMap[aspectRatio];
  const optimizedUrl = `${image.url}?w=1600&h=${h}&fit=fill`;

  return (
    <div
      className="section image"
      style={{
        aspectRatio: aspectRatio,
        position: "relative",
        width: "100%",
        maxWidth: "1600px",
      }}
    >
      <ImageWrapper
        image={{ ...image, url: optimizedUrl }}
        fill
        quality={80}
        loading={lazyLoad ? "lazy" : "eager"}
        sizes="(min-width: 1960px) 1600px, calc(81.83vw + 13px)"
      />
    </div>
  );
}
