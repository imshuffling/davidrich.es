import fetchContent from "@/utils/fetchContent";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
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
          emojiImage
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

export default async function ServicesPage() {
  const { servicesCollection } = await getServicesData();

  return (
    <section>
      <h1>What I can do</h1>
      {servicesCollection && (
        <ul id="services">
          {servicesCollection.map((item: Service, i: number) => (
            <li key={i}>
              <div className="emoji">{item.emojiImage}</div>
              <div>
                <h3>{item.title}</h3>
                <div>{documentToReactComponents(item.body.json)}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
