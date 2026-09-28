import ServicesSection from "@/components/ServicesSection";
import { getServices } from "@/utils/contentful";
import { buildMetadata } from "@/utils/metadata";
import CtaBlock from "@/components/CtaBlock";

export const metadata = buildMetadata({
  title: "What I can do",
  description:
    "Headless commerce and content platforms, built properly. Front-end engineering on Next.js, BigCommerce and Contentful — with the editorial tooling and performance to back them up.",
  path: "/what-i-can-do",
});

export default function ServicesPage() {
  const dataPromise = getServices();

  return (
    <>
      {/* Hero */}
      <section className="site-container pt-8 pb-12 md:pt-20 md:pb-24">
        <div className="max-w-4xl">
          <span className="text-primary font-label tracking-widest uppercase text-xs mb-4 block font-bold">
            Services &amp; Craft
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tighter leading-tight mb-6">
            Headless commerce and content{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">platforms</span>, built properly.
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
            I help teams ship fast, scalable front-ends on Next.js, BigCommerce
            and Contentful — with the editorial tooling and performance to back
            them up.
          </p>
        </div>
      </section>
      {/* Services Grid — full bleed bg */}
      <section className="bg-surface-container-low py-7 md:py-28">
        <div className="site-container">
          <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-8 md:mb-12">
            What I Do
          </h2>
          <ServicesSection dataPromise={dataPromise} />
        </div>
      </section>
      {/* My Process */}
      <section className="site-container py-7 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-header">
              <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-4">
                How I Work
              </h2>
              <p className="text-on-surface-variant max-w-xs">
                A pragmatic approach to building platforms that last.
              </p>
            </div>
          </div>
          <div className="md:col-span-8 space-y-12 md:space-y-24">
            {[
              {
                num: "01",
                title: "Understand",
                desc: "Before any code, I dig into the business, the content model, and the team who'll live with what we build. Good architecture starts with good questions.",
              },
              {
                num: "02",
                title: "Architect",
                desc: "Working with design, product and stakeholders, I shape the technical approach — the stack, the component model, and a plan for scale, performance and editorial flexibility from day one.",
              },
              {
                num: "03",
                title: "Build",
                desc: "Clean, typed, tested code — component libraries in Storybook, CMS models editors actually enjoy, and integrations that survive shifting requirements.",
              },
              {
                num: "04",
                title: "Ship & Iterate",
                desc: "Launch is the start, not the end. I watch what production does — Core Web Vitals, error budgets, analytics — and hand over something the team can keep building on.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex flex-col md:flex-row gap-6 md:gap-8 items-start"
              >
                <div className="step-number text-4xl md:text-6xl font-headline font-black leading-none">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-headline font-bold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-base md:text-lg mb-0">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBlock
        title="Let's Work Together"
        body="Got a project in mind, or just want to talk front-end? My inbox is always open."
        label="Say hello"
      />
    </>
  );
}
