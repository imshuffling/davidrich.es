import Image from "next/image";
import type { ContentfulImage } from "@/types/contentful";

interface ImageWrapperProps {
  image: ContentfulImage;
  alt?: string;
  quality?: number;
  priority?: boolean;
  loading?: "lazy" | "eager";
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  showGradient?: boolean;
}

export default function ImageWrapper({
  image,
  alt,
  quality = 80,
  priority = false,
  loading = "lazy",
  fill = false,
  width,
  height,
  sizes,
  className,
  style,
  showGradient = false,
}: ImageWrapperProps) {
  return (
    <div style={{ position: "relative", display: "contents" }}>
      <Image
        src={image.url}
        alt={alt || image.fileName}
        width={fill ? undefined : width || image.width}
        height={fill ? undefined : height || image.height}
        fill={fill}
        quality={quality}
        blurDataURL={image.blurDataURL}
        placeholder={image.blurDataURL ? "blur" : "empty"}
        priority={priority}
        loading={priority ? undefined : loading}
        sizes={sizes}
        className={className}
        style={style}
      />
      {showGradient && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 40%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
