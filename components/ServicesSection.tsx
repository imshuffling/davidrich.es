"use client";

import { use } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Service } from "@/types/contentful";

const serviceIcons: Record<string, React.ReactNode> = {
  code: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  brush: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 114.03 4.03l-8.06 8.08" /><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 00-3-3.02z" />
    </svg>
  ),
  globe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  layout: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  zap: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  database: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
};

const iconOrder = ["code", "layout", "brush", "database", "zap", "globe"];

const serviceIconColors = [
  { bg: "rgba(99, 14, 212, 0.15)", color: "#630ed4" },
  { bg: "rgba(156, 44, 155, 0.15)", color: "#9c2c9b" },
  { bg: "rgba(0, 84, 121, 0.15)", color: "#005479" },
  { bg: "rgba(124, 58, 237, 0.15)", color: "#7c3aed" },
  { bg: "rgba(0, 109, 156, 0.15)", color: "#006d9c" },
  { bg: "rgba(186, 26, 26, 0.15)", color: "#ba1a1a" },
];

function getIcon(index: number) {
  const key = iconOrder[index % iconOrder.length];
  return serviceIcons[key] || serviceIcons.code;
}

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
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: serviceIconColors[i % serviceIconColors.length].bg, color: serviceIconColors[i % serviceIconColors.length].color }}>
                {getIcon(i)}
              </div>
              <h3 className="text-2xl font-headline font-bold">{item.title}</h3>
              <div className="text-on-surface-variant leading-relaxed">
                {documentToReactComponents(item.body.json)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
