import PortfolioCard from "@/components/PortfolioCard";
import type { Metadata } from "next";
import type { PortfolioItem, SideProject } from "@/types/contentful";
import { getBlurDataURL } from "@/utils/getBlurDataURL";

export const metadata: Metadata = {
  title: "About me",
  description: "Hello I'm David, A Front-end developer and part-time hockey player",
};

async function getHomeData() {
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
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );

  if (!result.ok) {
    console.error(result);
    throw new Error('Failed to fetch home data');
  }

  const { data } = await result.json();

  const portfolioItems = data.featuredProjectsCollection.items[0].itemCollection.items as PortfolioItem[];

  // Generate blur data URLs for all portfolio images
  const portfolioWithBlur = await Promise.all(
    portfolioItems.map(async (item) => ({
      ...item,
      image: {
        ...item.image,
        blurDataURL: await getBlurDataURL(item.image.url),
      },
    }))
  );

  return {
    portfolioCollection: portfolioWithBlur,
    sideProjectsCollection: data.sideProjectsCollection.items as SideProject[],
  };
}

export default async function HomePage() {
  const { portfolioCollection, sideProjectsCollection } = await getHomeData();

  return (
    <section>
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
          <a href="#cards" style={{ scrollBehavior: 'smooth' }}>
            view my portfolio
          </a>{" "}
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
            loading="eager"
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

function SideProjects({ node }: { node: SideProject }) {
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
}
