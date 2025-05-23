import Image from "next/image";
import imageBlur from "../../utils/imageBlur";

export default function BlockImage({ image, lazyLoad }) {
  return (
    <div className="section image">
      <Image
        src={image.url}
        alt={image.fileName}
        height={image.height}
        width={image.width}
        quality={80}
        blurDataURL={`data:image/png;base64,${imageBlur}`}
        placeholder="blur"
        loading={lazyLoad ? "lazy" : "eager"}
        sizes="(min-width: 1960px) 1600px, calc(81.83vw + 13px)"
      />
    </div>
  );
}
