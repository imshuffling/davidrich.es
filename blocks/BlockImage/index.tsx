import ImageWrapper from "@/components/ImageWrapper";
import type { BlockImage as BlockImageProps } from "@/types/contentful";

export default function BlockImage({ image, lazyLoad, aspectRatio = "16/9" }: BlockImageProps) {
  return (
    <div
      className="section"
      style={{
        aspectRatio: aspectRatio,
        position: "relative",
        width: "100%",
        maxWidth: "1600px",
        borderRadius: "0.75rem",
        overflow: "hidden",
      }}
    >
      <ImageWrapper
        image={image}
        fill
        quality={80}
        loading={lazyLoad ? "lazy" : "eager"}
        sizes="(min-width: 1960px) 1600px, calc(81.83vw + 13px)"
      />
    </div>
  );
}
