import DOMPurify from "isomorphic-dompurify";

const SANITIZE_CONFIG = {
  ALLOWED_TAGS: ["em", "strong", "b", "i", "u", "br", "a", "span"],
  ALLOWED_ATTR: ["href", "target", "rel", "class"],
};

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

interface RichTextProps {
  as?: Tag;
  html: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function RichText({
  as: Component = "span",
  html,
  className,
  style,
}: RichTextProps) {
  const sanitized = DOMPurify.sanitize(html, SANITIZE_CONFIG);
  return (
    <Component
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
