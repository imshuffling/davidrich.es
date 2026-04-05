import { Suspense } from "react";
import PortfolioSection from "@/components/PortfolioSection";
import type { Metadata } from "next";
import type { PortfolioItem, SideProject } from "@/types/contentful";

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
      next: { revalidate: 3600 },
    }
  );

  if (!result.ok) {
    console.error(result);
    throw new Error('Failed to fetch home data');
  }

  const { data } = await result.json();

  const portfolioItems = data.featuredProjectsCollection.items[0].itemCollection.items as PortfolioItem[];

  const portfolioWithBlur = portfolioItems.map((item) => ({
    ...item,
    image: {
      ...item.image,
      blurDataURL: `${item.image.url}?w=20&q=50`,
    },
  }));

  return {
    portfolioCollection: portfolioWithBlur,
    sideProjectsCollection: data.sideProjectsCollection.items as SideProject[],
  };
}

export default function HomePage() {
  const dataPromise = getHomeData();

  return (
    <>
      {/* Hero Section */}
      <section className="container pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-4xl">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-6 block font-label">
            Available for freelance
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tight leading-tight mb-8">
            Hello I&apos;m David.{" "}
            <span role="img" aria-label="Waving hand" className="wave">
              👋
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant font-light leading-relaxed max-w-2xl font-body">
            I&apos;m a{" "}
            <span className="text-on-surface font-semibold">Front-end developer</span>{" "}
            and hockey player based in the UK. I build high-performance digital
            experiences with a focus on editorial aesthetics.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#work" className="btn-primary">
              View Projects
            </a>
            <a
              href="https://resume.davidrich.es/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              About Me
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <div id="work" className="scroll-mt-28">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-3">Selected Work</h2>
              <p className="text-on-surface-variant max-w-md mb-0">
                A collection of commercial projects built for industry-leading brands.
              </p>
            </div>
          </div>
        </div>
        <Suspense fallback={<div className="container"><PortfolioSkeleton /></div>}>
          <PortfolioSection dataPromise={dataPromise} />
        </Suspense>
      </div>
    </>
  );
}

function PortfolioSkeleton() {
  return (
    <div id="cards">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-surface-container-high rounded-xl animate-pulse"
          style={{ aspectRatio: "1", minHeight: "300px" }}
        />
      ))}
    </div>
  );
}
