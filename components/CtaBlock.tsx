import { CONTACT } from "@/utils/site";

interface CtaBlockProps {
  title: string;
  body: string;
  label: string;
  href?: string;
}

export default function CtaBlock({ title, body, label, href = `mailto:${CONTACT.email}` }: CtaBlockProps) {
  return (
    <section className="site-container py-7 md:py-28">
      <div className="relative overflow-hidden rounded-xl editorial-gradient py-10 px-6 md:py-24 md:px-8 text-center text-white">
        <div className="absolute top-0 right-0 w-64 h-64 -mr-20 -mt-20 rounded-full bg-accent blur-3xl opacity-20" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-64 h-64 -ml-20 -mb-20 rounded-full bg-white blur-3xl opacity-10" aria-hidden="true" />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-headline font-bold mb-4 md:mb-6 text-white">{title}</h2>
          <p className="text-base md:text-xl text-primary-fixed leading-relaxed mb-6 md:mb-10">{body}</p>
          <a href={href} className="btn-white">
            {label}
          </a>
        </div>
      </div>
    </section>
  );
}
