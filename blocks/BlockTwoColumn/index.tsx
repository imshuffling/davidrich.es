import ImageWrapper from "@/components/ImageWrapper";
import ReactMarkdown from "react-markdown";
import type { BlockTwoColumn as BlockTwoColumnProps } from "@/types/contentful";

export default function BlockTwoColumn({
  image,
  body,
  imageFirst,
}: BlockTwoColumnProps) {
  return (
    <div className="section grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
      <div className={`rounded-xl overflow-hidden ${imageFirst ? "order-1" : "order-1 md:order-2"}`}>
        <ImageWrapper
          image={image}
          quality={80}
          sizes="(min-width: 1960px) 755px, (min-width: 800px) calc(39.3vw - 20px), 86.04vw"
        />
      </div>
      <div
        className={`leading-relaxed text-lg ${imageFirst ? "order-2" : "order-2 md:order-1"}`}
        style={{ color: "var(--text-color)" }}
      >
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}
