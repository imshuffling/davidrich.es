import { Suspense } from "react";
import ServicesSection from "@/components/ServicesSection";
import fetchContent from "@/utils/fetchContent";
import type { Metadata } from "next";
import type { Service } from "@/types/contentful";

export const metadata: Metadata = {
  title: "What I can do",
  description: "Want to see what I can do? Check out my services",
};

async function getServicesData() {
  const response = await fetchContent<{ servicesCollection: { items: Service[] } }>(`
    {
      servicesCollection {
        items {
          title
          body {
            json
          }
        }
      }
    }
  `);

  if (!response) {
    throw new Error('Failed to fetch services');
  }

  return {
    servicesCollection: response.servicesCollection.items,
  };
}

export default function ServicesPage() {
  const dataPromise = getServicesData();

  return (
    <section>
      <h1>What I can do</h1>
      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesSection dataPromise={dataPromise} />
      </Suspense>
    </section>
  );
}

function ServicesSkeleton() {
  return (
    <ul id="services" style={{ opacity: 0.5 }}>
      {[...Array(4)].map((_, i) => (
        <li key={i}>
          <div
            className="emoji"
            style={{
              width: "60px",
              height: "60px",
              background: "var(--text-color)",
              opacity: 0.1,
              borderRadius: "50%",
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                width: "40%",
                height: "24px",
                background: "var(--text-color)",
                opacity: 0.1,
                borderRadius: "4px",
                marginBottom: "12px",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "60px",
                background: "var(--text-color)",
                opacity: 0.1,
                borderRadius: "4px",
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
