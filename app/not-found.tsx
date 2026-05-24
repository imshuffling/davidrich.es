import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container pt-12 pb-20 md:pt-20 md:pb-32">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tighter leading-tight">
        404 –{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Page not found
        </span>
      </h1>
      <p className="mt-6 text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
        You just hit a route that doesn&#39;t exist... the sadness.
      </p>
      <div className="mt-10">
        <Link href="/" className="btn-secondary !py-3 !px-6 !text-sm">
          Back to home
        </Link>
      </div>
    </section>
  );
}
