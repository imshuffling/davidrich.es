import PortfolioCard from "../components/PortfolioCard";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Head from "next/head";

export async function getStaticProps() {
  const result = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            featuredProjectsCollection(limit: 10) {
              items {
                itemCollection {
                  items {
                    title
                    slug
                    client
                    agency
                    industry
                    otherProjects
                    media {
                      url
                    }
                    image {
                      url(transform: { width: 800, height: 800 })
                      width
                      height
                    }
                  }
                }
              }
            }
            sideProjectsCollection(limit: 10) {
              items {
                title
                description
                link
                githubUrl
              }
            }
          }
      `,
      }),
    }
  );

  if (!result.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();

  const portfolioData =
    data.featuredProjectsCollection.items[0].itemCollection.items;
  const sideProjects = data.sideProjectsCollection.items;

  return {
    props: {
      portfolioCollection: portfolioData,
      sideProjectsCollection: sideProjects,
    },
  };
}

export default function Recipes({
  portfolioCollection,
  sideProjectsCollection,
}) {
  return (
    <section>
      <Head>
        <title>About me - David Riches</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Hello I'm David, A Front-end developer and part-time hockey player"
        />
      </Head>
      <div id="strapline">
        <h1>
          Hello I&apos;m David.{" "}
          <span role="img" aria-label="Waving hand" className="wave">
            👋
          </span>
        </h1>
        <h2>
          <span className="intro">
            A Front-end developer &amp; part-time hockey player{" "}
            <span role="img" aria-label="Hockey stick">
              🏑{" "}
            </span>
            from London.
          </span>
          I like making things on the web,{" "}
          <AnchorLink offset="30" data-scroll href="#cards">
            view my portfolio
          </AnchorLink>{" "}
          or{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.github.com/imshuffling"
          >
            follow me on Github.
          </a>
        </h2>
        <h3>
          This site is built with{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.nextjs.org/"
          >
            Next.js
          </a>{" "}
          and powered by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.contentful.com/"
          >
            Contentful.
          </a>
        </h3>
      </div>
      <div id="cards">
        {portfolioCollection.map((item, index) => (
          <PortfolioCard
            key={item.slug}
            index={index}
            item={item}
            loading={"eager"}
          />
        ))}
      </div>

      {sideProjectsCollection.length > 0 && (
        <div id="side-projects">
          <h2>Side projects</h2>
          <div className="side-projects-wrapper">
            {sideProjectsCollection.map((node, i) => (
              <SideProjects key={i} node={node} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

const SideProjects = ({ node }) => {
  return (
    <div className="item" key={node.id}>
      <div>
        <h3 className="item__title">{node.title}</h3>
        {node.description && (
          <div
            className="item__content"
            dangerouslySetInnerHTML={{
              __html: node.description,
            }}
          />
        )}
      </div>

      {node.link && (
        <span>
          <a target="_blank" rel="noopener noreferrer" href={node.link}>
            View Site
          </a>
        </span>
      )}

      {node.githubUrl && !node.link && (
        <span>
          <a target="_blank" rel="noopener noreferrer" href={node.githubUrl}>
            View Repo
          </a>
        </span>
      )}
    </div>
  );
};
