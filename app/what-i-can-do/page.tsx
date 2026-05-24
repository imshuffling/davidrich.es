import { Suspense } from "react";
import ServicesSection from "@/components/ServicesSection";
import { getServices } from "@/utils/contentful";
import type { Metadata } from "next";

const PAGE_TITLE = "What I can do";
const PAGE_DESCRIPTION =
  "Headless commerce and content platforms, built properly. Front-end engineering on Next.js, BigCommerce and Contentful — with the editorial tooling and performance to back them up.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/what-i-can-do" },
  openGraph: {
    type: "website",
    url: "/what-i-can-do",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

async function getServicesData() {
  const servicesCollection = await getServices();
  return { servicesCollection };
}

export default function ServicesPage() {
  const dataPromise = getServicesData();

  return (
    <>
      {/* Hero */}
      <section className="container pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-4xl">
          <span className="text-primary font-label tracking-widest uppercase text-xs mb-4 block font-bold">
            Services &amp; Craft
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tighter leading-tight mb-6">
            Headless commerce and content{" "}
            <span className="text-primary">platforms</span>, built properly.
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
            I help teams ship fast, scalable front-ends on Next.js, BigCommerce
            and Contentful — with the editorial tooling and performance to back
            them up.
          </p>
        </div>
      </section>
      {/* Services Grid — full bleed bg */}
      <section className="bg-surface-container-low py-20 md:py-28">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-12">
            What I Do
          </h2>
          <Suspense fallback={<ServicesSkeleton />}>
            <ServicesSection dataPromise={dataPromise} />
          </Suspense>
        </div>
      </section>
      {/* My Process */}
      <section className="container py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-4">
                How I Work
              </h2>
              <p className="text-on-surface-variant max-w-xs">
                A pragmatic approach to shipping platforms that last.
              </p>
            </div>
          </div>
          <div className="md:col-span-8 space-y-16 md:space-y-24">
            {[
              {
                num: "01",
                title: "Understand",
                desc: "Before writing code, I want to understand the business, the content model, and the team who'll live with what we build. Good architecture starts with good questions.",
              },
              {
                num: "02",
                title: "Architect",
                desc: "I work with designers, product and stakeholders to shape the right technical approach — choosing the stack, defining the component model, and planning for scale, performance and editorial flexibility from day one.",
              },
              {
                num: "03",
                title: "Build",
                desc: "Clean, typed, tested code. Component libraries in Storybook, CMS models that editors actually enjoy using, and integrations that don't break when the requirements shift.",
              },
              {
                num: "04",
                title: "Ship & Iterate",
                desc: "Launch is the start, not the end. I care about what happens in production — Core Web Vitals, error budgets, analytics — and about handing over something the team can keep building on.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex flex-col md:flex-row gap-6 md:gap-8 items-start"
              >
                <div className="text-5xl md:text-6xl font-headline font-black text-primary/10 leading-none">
                  {step.num}
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-headline font-bold mb-3">
                    {step.title}
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed text-base md:text-lg mb-0">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      );
      {/* CTA */}
      <section className="container py-20 md:py-28">
        <div className="relative rounded-2xl overflow-hidden p-12 md:p-24 editorial-gradient text-white text-center">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 40%)",
              }}
            />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6 text-white!">
              Let&apos;s Work Together
            </h2>
            <p className="text-lg md:text-xl text-primary-fixed leading-relaxed mb-10">
              Have a project in mind or just want to chat about the latest in
              front-end tech? My inbox is always open.
            </p>
            <a href="mailto:hi@davidrich.es" className="btn-white">
              Start a Project
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function ServicesSkeleton() {
  return (
    <ul id="services">
      {[...Array(3)].map((_, i) => (
        <li key={i} className="animate-pulse">
          <div className="w-14 h-14 rounded-xl bg-surface-container-high mb-6" />
          <div className="h-6 w-48 bg-surface-container-high rounded mb-4" />
          <div className="h-20 bg-surface-container-high rounded" />
        </li>
      ))}
    </ul>
  );
}
