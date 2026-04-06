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
    <>
      {/* Hero */}
      <section className="container pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-4xl">
          <span className="text-primary font-label tracking-widest uppercase text-xs mb-4 block font-bold">
            Services &amp; Craft
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tighter leading-tight mb-6">
            Elevating digital{" "}
            <span className="text-primary">experiences</span> through code.
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-lg leading-relaxed">
            I bridge the gap between design and development, creating immersive
            interfaces that don&apos;t just look beautiful but perform flawlessly.
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
                My Process
              </h2>
              <p className="text-on-surface-variant max-w-xs">
                A disciplined approach to creativity, ensuring quality at every milestone.
              </p>
            </div>
          </div>
          <div className="md:col-span-8 space-y-16 md:space-y-24">
            {[
              {
                num: "01",
                title: "Discovery",
                desc: "We begin by deep-diving into your vision, requirements, and target audience. Understanding the 'why' is crucial for a successful 'how'.",
              },
              {
                num: "02",
                title: "Design",
                desc: "Visualizing the concept through wireframes and high-fidelity prototypes. This is where we define the visual language and user flow.",
              },
              {
                num: "03",
                title: "Development",
                desc: "Translating designs into clean, pixel-perfect code. I focus on semantic HTML, efficient styling, and interactive robustness.",
              },
              {
                num: "04",
                title: "Launch",
                desc: "Final testing, deployment, and ongoing support. Your project is delivered ready to scale and perform in the wild.",
              },
            ].map((step) => (
              <div key={step.num} className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
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
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6 !text-white">
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
