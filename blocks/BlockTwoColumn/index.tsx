import ImageWrapper from "@/components/ImageWrapper";
import ReactMarkdown from "react-markdown";
import type { BlockTwoColumn as BlockTwoColumnProps } from "@/types/contentful";

export default function BlockTwoColumn({
  image,
  body,
  imageFirst,
}: BlockTwoColumnProps) {
  return (
    <div
      className={
        imageFirst ? "section two-column" : "section two-column__reversed"
      }
    >
      <ImageWrapper
        image={image}
        quality={80}
        sizes="(min-width: 1960px) 755px, (min-width: 800px) calc(39.3vw - 20px), 86.04vw"
      />
      <div>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}
