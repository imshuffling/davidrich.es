import ReactMarkdown from "react-markdown";
import type { BlockTextArea as BlockTextAreaProps } from "@/types/contentful";

export default function BlockTextArea({ title, body, centerText }: BlockTextAreaProps) {
  return (
    <div
      className={centerText ? "section text-area__center" : "section text-area"}
    >
      <h3>{title}</h3>
      <div>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}
