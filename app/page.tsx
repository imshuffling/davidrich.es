import { Suspense } from "react";
import PortfolioSection from "@/components/PortfolioSection";
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

export default function HomePage() {
  const dataPromise = getHomeData();

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
      <Suspense fallback={<PortfolioSkeleton />}>
        <PortfolioSection dataPromise={dataPromise} />
      </Suspense>
    </section>
  );
}

function PortfolioSkeleton() {
  return (
    <div id="cards" style={{ opacity: 0.5 }}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            aspectRatio: "1",
            background: "var(--text-color)",
            opacity: 0.1,
            borderRadius: "4px",
          }}
        />
      ))}
    </div>
  );
}
