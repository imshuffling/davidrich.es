"use client";

import { use } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Service } from "@/types/contentful";

interface ServicesSectionProps {
  dataPromise: Promise<{
    servicesCollection: Service[];
  }>;
}

export default function ServicesSection({ dataPromise }: ServicesSectionProps) {
  const { servicesCollection } = use(dataPromise);

  return (
    <>
      {servicesCollection && (
        <ul id="services">
          {servicesCollection.map((item: Service, i: number) => (
            <li key={i}>
              <div>
                <h3>{item.title}</h3>
                <div>{documentToReactComponents(item.body.json)}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
