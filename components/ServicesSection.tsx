import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { visualFor } from "@/utils/visuals";
import type { Service } from "@/types/contentful";

// Core offerings lead the bento grid at double width
const PRIMARY_KEYWORDS = ["commerce", "front-end"];

const isPrimary = (title: string) =>
  PRIMARY_KEYWORDS.some((keyword) => title.toLowerCase().includes(keyword));

interface ServicesSectionProps {
  dataPromise: Promise<Service[]>;
}

export default async function ServicesSection({ dataPromise }: ServicesSectionProps) {
  const servicesCollection = await dataPromise;

  if (servicesCollection.length === 0) return null;

  const ordered = [
    ...servicesCollection.filter((item) => isPrimary(item.title)),
    ...servicesCollection.filter((item) => !isPrimary(item.title)),
  ];

  return (
    <ul id="services">
      {ordered.map((item) => {
        const { icon, bg, color } = visualFor(item.title, "service");
        return (
          <li key={item.title} className={isPrimary(item.title) ? "is-primary" : undefined}>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: bg, color }}
            >
              {icon}
            </div>
            <h3 className="text-2xl font-headline font-bold">{item.title}</h3>
            <div className="text-on-surface-variant leading-relaxed">
              {documentToReactComponents(item.body.json)}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
