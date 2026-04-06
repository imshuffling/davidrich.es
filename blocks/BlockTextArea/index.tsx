import ReactMarkdown from "react-markdown";
import type { BlockTextArea as BlockTextAreaProps } from "@/types/contentful";

export default function BlockTextArea({ title, body, centerText }: BlockTextAreaProps) {
  return (
    <div
      className={`section ${centerText ? "text-center mx-auto max-w-3xl" : ""}`}
      style={{
        background: "var(--card-bg)",
        borderRadius: "0.75rem",
        padding: "2.5rem",
      }}
    >
      <h3
        className="font-headline font-bold text-2xl md:text-3xl mb-4"
        style={{ color: "var(--heading-color)" }}
      >
        {title}
      </h3>
      <div className="leading-relaxed text-lg" style={{ color: "var(--text-color)" }}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}
