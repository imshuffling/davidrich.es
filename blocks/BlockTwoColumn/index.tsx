import Image from "next/image";
import ReactMarkdown from "react-markdown";
import type { BlockTwoColumn as BlockTwoColumnProps } from "@/types/contentful";

export default function BlockTwoColumn({ image, body, imageFirst }: BlockTwoColumnProps) {
  return (
    <div
      className={
        imageFirst ? "section two-column" : "section two-column__reversed"
      }
    >
      <Image
        src={image.url}
        alt={image.fileName}
        width={image.width}
        height={image.height}
        quality={50}
        blurDataURL={image.blurDataURL}
        placeholder={image.blurDataURL ? "blur" : "empty"}
        sizes="(min-width: 1960px) 755px, (min-width: 800px) calc(39.3vw - 20px), 86.04vw"
      />
      <div>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}
