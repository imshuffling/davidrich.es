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
      data-aos-delay="300"
      data-aos-once="true"
    >
      <Image
        src={`${image.url}`}
        alt={image.fileName}
        width={image.width}
        height={image.height}
        quality={50}
        loading="lazy"
        blurDataURL={`data:image/png;base64,${imageBlur}`}
        placeholder="blur"
      />
      <div>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}
