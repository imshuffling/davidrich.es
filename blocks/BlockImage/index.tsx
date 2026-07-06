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
        variant="hero"
        loading={lazyLoad ? "lazy" : "eager"}
      />
    </div>
  );
}
