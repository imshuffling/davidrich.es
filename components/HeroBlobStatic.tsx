// Theme gradient shown through the prerendered sphere mask (app/hero-sphere.svg),
// so the dots download only where this is displayed (below xl)
export default function HeroBlobStatic({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        background: "linear-gradient(135deg, var(--md-blob-a) 10%, var(--md-blob-b) 90%)",
        mask: "url(/hero-sphere.svg) center / contain no-repeat",
      }}
    />
  );
}
