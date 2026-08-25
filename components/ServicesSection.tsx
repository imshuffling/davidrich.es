import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { visualFor } from "@/utils/visuals";
import type { Service } from "@/types/contentful";

interface ServicesSectionProps {
  dataPromise: Promise<Service[]>;
}

export default async function ServicesSection({ dataPromise }: ServicesSectionProps) {
  const servicesCollection = await dataPromise;

  if (servicesCollection.length === 0) return null;

  return (
    <ul id="services">
      {servicesCollection.map((item) => {
        const { icon, bg, color } = visualFor(item.title, "service");
        return (
          <li key={item.title}>
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
