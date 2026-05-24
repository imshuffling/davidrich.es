import ReactMarkdown from "react-markdown";

interface ProseProps {
  children: string;
  className?: string;
}

export default function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={`leading-relaxed text-lg ${className ?? ""}`}
      style={{ color: "var(--text-color)" }}
    >
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}
