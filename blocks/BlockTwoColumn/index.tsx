import ImageWrapper from "@/components/ImageWrapper";
import Prose from "@/components/Prose";
import type { BlockTwoColumn as BlockTwoColumnProps } from "@/types/contentful";

export default function BlockTwoColumn({
  image,
  body,
  imageFirst,
}: BlockTwoColumnProps) {
  return (
    <div className="section grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
      <div className={`rounded-xl overflow-hidden ${imageFirst ? "order-1" : "order-1 md:order-2"}`}>
        <ImageWrapper image={image} variant="twoColumn" />
      </div>
      <Prose className={imageFirst ? "order-2" : "order-2 md:order-1"}>
        {body}
      </Prose>
    </div>
  );
}
