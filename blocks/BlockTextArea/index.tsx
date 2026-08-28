import Prose from "@/components/Prose";
import type { BlockTextArea as BlockTextAreaProps } from "@/types/contentful";

export const fragment = `... on TextArea { centerText title body }`;

export default function BlockTextArea({ title, body, centerText }: BlockTextAreaProps) {
  return (
    <div
      className={`section p-6 md:p-10 ${centerText ? "text-center mx-auto max-w-4xl" : ""}`}
      style={{
        background: "var(--card-bg)",
        borderRadius: "0.75rem",
      }}
    >
      <h3
        className="font-headline font-bold text-2xl md:text-3xl mb-4"
        style={{ color: "var(--heading-color)" }}
      >
        {title}
      </h3>
      <Prose>{body}</Prose>
    </div>
  );
}
