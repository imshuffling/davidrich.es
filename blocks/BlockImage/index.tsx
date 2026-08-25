import ImageWrapper from "@/components/ImageWrapper";
import { enrichImage } from "@/utils/contentfulImage";
import type { BlockImage as BlockImageProps } from "@/types/contentful";

export const fragment = `... on Image {
  image { url fileName width height }
  lazyLoad
}`;

export async function enrich(block: BlockImageProps): Promise<BlockImageProps> {
  return { ...block, image: await enrichImage(block.image, "hero") };
}

export default function BlockImage({ image, lazyLoad }: BlockImageProps) {
  return (
    <div
      className="section"
      style={{
        aspectRatio: "16/9",
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
