// Single-colour masks in /public/logos (trimmed from the Contentful originals);
// painted with currentColor so they follow the theme
const LOGOS = [
  { name: "Shell", file: "shell.png", width: 147, height: 136, displayHeight: 40 },
  { name: "Facebook", file: "facebook.png", width: 800, height: 156, displayHeight: 22 },
  { name: "Danone", file: "danone.png", width: 266, height: 127, displayHeight: 40 },
  { name: "Bayer", file: "bayer.png", width: 228, height: 88, displayHeight: 30 },
  { name: "Grolsch", file: "grolsch.png", width: 400, height: 115, displayHeight: 32 },
  { name: "TUI", file: "tui.png", width: 228, height: 95, displayHeight: 34 },
];

export default function ClientStrip() {
  return (
    <section aria-label="Brands I've worked with" className="site-container pb-12 md:pb-20">
      <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-6">
        Brands I&apos;ve worked with
      </p>
      <ul className="flex flex-wrap items-center gap-x-10 gap-y-6 md:gap-x-16 text-on-surface-variant/70">
        {LOGOS.map(({ name, file, width, height, displayHeight }) => (
          <li key={name} className="flex">
            <span
              role="img"
              aria-label={name}
              className="block bg-current transition-colors hover:text-on-surface"
              style={{
                height: displayHeight,
                width: Math.round((displayHeight * width) / height),
                mask: `url(/logos/${file}) center / contain no-repeat`,
                WebkitMask: `url(/logos/${file}) center / contain no-repeat`,
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
