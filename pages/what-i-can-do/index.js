import fetchContent from "../../utils/fetchContent.ts";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import Favicon from "../../components/Favicon";

export async function getStaticProps() {
  const response = await fetchContent(`
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
  return {
    props: {
      servicesCollection: response.servicesCollection.items,
    },
  };
}

export default function services({ servicesCollection }) {
  return (
    <section>
      <Head>
        <title>What I can do - David Riches</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <Favicon />
      </Head>
      <h1>What I can do</h1>
      {servicesCollection && (
        <ul id="services">
          {servicesCollection.map((item, i) => (
            <li key={i}>
              <h3>{item.title}</h3>
              <div>{documentToReactComponents(item.body.json)}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
