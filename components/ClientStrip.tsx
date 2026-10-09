import type { About } from "@/types/contentful";

interface ClientStripProps {
  dataPromise: Promise<About>;
}

export default async function ClientStrip({ dataPromise }: ClientStripProps) {
  const { clients } = await dataPromise;
  if (clients.length === 0) return null;

  return (
    <section aria-label="Brands I've worked with" className="site-container pb-12 md:pb-20">
      <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-4">
        Brands I&apos;ve worked with
      </p>
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 md:gap-x-12">
        {clients.map((client) => (
          <li
            key={client}
            className="text-xl md:text-2xl font-headline font-extrabold tracking-tight text-on-surface-variant/60"
          >
            {client}
          </li>
        ))}
      </ul>
    </section>
  );
}
