import Prose from "@/components/Prose";
import type { BlockTextLeft as BlockTextLeftProps } from "@/types/contentful";

export default function BlockTextLeft({ title, body }: BlockTextLeftProps) {
  return (
    <div className="section max-w-3xl">
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
