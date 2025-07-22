import Image from "next/image";
import ReactMarkdown from "react-markdown";
import imageBlur from "../../utils/imageBlur";

export default function BlockTwoColumn({ image, body, imageFirst }) {
  return (
    <div
      className={
        imageFirst ? "section two-column" : "section two-column__reversed"
      }
      data-aos="fade-in"
      data-aos-delay="200"
      data-aos-once="true"
    >
      <Image
        src={image.url}
        alt={image.fileName}
        width={image.width}
        height={image.height}
        quality={50}
        lazy="lazy"
        blurDataURL={`data:image/png;base64,${imageBlur}`}
        placeholder="blur"
        sizes="(min-width: 1960px) 755px, (min-width: 800px) calc(39.3vw - 20px), 86.04vw"
      />
      <div>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}
