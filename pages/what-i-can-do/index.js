import fetchContent from "../../utils/fetchContent.ts";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";

export async function getStaticProps() {
  const response = await fetchContent(`
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
        <meta
          name="description"
          content="Want to see what I can do? Check out my services"
        />
      </Head>
      <h1>What I can do</h1>
      {/* {servicesCollection && (
        <ul id="services">
          {servicesCollection.map((item, i) => (
            <li key={i}>
              <div>
                <h3>
                  <span>{item.emojiImage}</span>
                  {item.title}
                </h3>
                <div>{documentToReactComponents(item.body.json)}</div>
              </div>
            </li>
          ))}
        </ul>
      )} */}
      {servicesCollection && (
        <ul id="services">
          {servicesCollection.map((item, i) => (
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
