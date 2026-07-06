import Image from "next/image";
import type { ContentfulImage } from "@/types/contentful";

type ImageVariant = "card" | "hero" | "twoColumn";

const VARIANTS: Record<ImageVariant, { fill: boolean; sizes: string }> = {
  card: { fill: true, sizes: "(min-width: 1960px) 1407px, 71.89vw" },
  hero: { fill: true, sizes: "(min-width: 1960px) 1600px, calc(81.83vw + 13px)" },
  twoColumn: {
    fill: false,
    sizes: "(min-width: 1960px) 755px, (min-width: 800px) calc(39.3vw - 20px), 86.04vw",
  },
};

export function MediaGradient({ zIndex }: { zIndex?: number }) {
  return (
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
        zIndex,
      }}
    />
  );
}

interface ImageWrapperProps {
  image: ContentfulImage;
  variant: ImageVariant;
  alt?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  className?: string;
  style?: React.CSSProperties;
  showGradient?: boolean;
  onLoad?: () => void;
}

export default function ImageWrapper({
  image,
  variant,
  alt,
  priority = false,
  loading = "lazy",
  className,
  style,
  showGradient = false,
  onLoad,
}: ImageWrapperProps) {
  const { fill, sizes } = VARIANTS[variant];

  return (
    <div style={{ position: "relative", display: "contents" }}>
      <Image
        src={image.url}
        alt={alt || image.fileName}
        width={fill ? undefined : image.width}
        height={fill ? undefined : image.height}
        fill={fill}
        quality={80}
        blurDataURL={image.blurDataURL}
        placeholder={image.blurDataURL ? "blur" : "empty"}
        priority={priority}
        loading={priority ? undefined : loading}
        sizes={sizes}
        className={className}
        style={style}
        onLoad={onLoad}
      />
      {showGradient && <MediaGradient />}
    </div>
  );
}
