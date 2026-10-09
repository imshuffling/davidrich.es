import ImageWrapper from "@/components/ImageWrapper";
import CtaBlock from "@/components/CtaBlock";
import { getAbout } from "@/utils/contentful";
import { buildMetadata } from "@/utils/metadata";
import { LINKS } from "@/utils/site";
import type { Job } from "@/types/contentful";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Senior front-end engineer based in Kent, building headless commerce and content platforms since 2010 — currently leading the front-end of Master of Malt's replatform.",
  path: "/about",
});

const year = (date: string) => date.slice(0, 4);

function jobRange({ date, to }: Job) {
  const from = year(date);
  if (!to) return `${from} — Present`;
  return from === year(to) ? from : `${from} — ${year(to)}`;
}

export default async function AboutPage() {
  const { photo, jobs, skills } = await getAbout();
  const startYear = jobs.length > 0 ? year(jobs[jobs.length - 1].date) : undefined;

  return (
    <>
      {/* Hero */}
      <section className="site-container pt-8 pb-12 md:pt-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <span className="text-primary font-label tracking-widest uppercase text-xs mb-4 block font-bold">
              About
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tighter leading-tight mb-6 md:mb-8">
              Front-end engineer,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                hockey player
              </span>
              , Kent local.
            </h1>
            <div className="space-y-4 text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl">
              <p>
                I&apos;m David, a senior front-end engineer
                {startYear && <> building for the web since {startYear}</>} — from TUI,
                through agency life at NDP, Mirum and Appnovation, to leading the
                front-end of Master of Malt&apos;s headless replatform today.
              </p>
              <p>
                My sweet spot is where commerce, content and the people who run them
                meet: Next.js storefronts on BigCommerce, Contentful and Sanity models
                editors actually enjoy, and component libraries that keep design and
                engineering speaking the same language.
              </p>
              <p className="mb-0">
                Away from the screen you&apos;ll find me on a hockey pitch or a cricket
                field, and occasionally attempting to swing a golf club.
              </p>
            </div>
          </div>
          {photo && (
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] max-w-md mx-auto rounded-xl overflow-hidden ambient-shadow">
                <ImageWrapper
                  image={photo}
                  variant="portrait"
                  alt="David Riches"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Experience */}
      {jobs.length > 0 && (
        <section className="bg-surface-container-low py-7 md:py-28">
          <div className="site-container grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-header">
                <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-4">
                  Experience
                </h2>
                <p className="text-on-surface-variant max-w-xs">
                  The highlights. The full story lives on my{" "}
                  <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className="text-primary">
                    resume ↗
                  </a>
                  .
                </p>
              </div>
            </div>
            <ol className="md:col-span-8 border-l border-outline-variant">
              {jobs.map((job) => (
                <li key={`${job.company}-${job.date}`} className="relative pl-6 md:pl-10 pb-10 last:pb-0">
                  <span
                    className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <p className="font-label text-xs uppercase tracking-widest text-primary font-bold mb-2">
                    {jobRange(job)}
                  </p>
                  <h3 className="text-xl md:text-2xl font-headline font-bold mb-1">{job.title}</h3>
                  <p className="text-on-surface-variant mb-0">
                    {job.companyLink ? (
                      <a href={job.companyLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Toolkit */}
      {skills.length > 0 && (
        <section className="site-container py-7 md:py-28">
          <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-8 md:mb-12">
            Toolkit
          </h2>
          <ul className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <li
                key={skill}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-headline font-semibold"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      <CtaBlock
        title="Let's Work Together"
        body="Got a project in mind, or just want to talk front-end? My inbox is always open."
        label="Say hello"
      />
    </>
  );
}
