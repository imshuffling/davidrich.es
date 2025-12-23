import ReactMarkdown from "react-markdown";
import type { BlockTextLeft as BlockTextLeftProps } from "@/types/contentful";

export default function BlockTextLeft({ title, body }: BlockTextLeftProps) {
  return (
    <div className="section text-area-left">
      <h3>{title}</h3>
      <div>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}
