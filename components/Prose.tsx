import ReactMarkdown from "react-markdown";

interface ProseProps {
  children: string;
  className?: string;
}

export default function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={`leading-relaxed text-base md:text-lg text-on-surface-variant ${className ?? ""}`}
    >
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}
