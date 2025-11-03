import ReactMarkdown from "react-markdown";

export default function BlockTextArea({ title, body, centerText }) {
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
