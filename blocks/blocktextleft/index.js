import ReactMarkdown from "react-markdown";

export default function BlockTextLeft({ title, body }) {
  return (
    <div className="section text-area-left">
      <h3>{title}</h3>
      <div>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}
