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
  return (
    <Component
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
