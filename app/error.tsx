"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container pt-8 pb-14 md:pt-20 md:pb-32">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tighter leading-tight">
        Oops –{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          something went wrong
        </span>
      </h1>
      <p className="mt-6 text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
        That wasn&#39;t supposed to happen. Give it another go, or head back home.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <button onClick={() => reset()} className="btn-primary !py-3 !px-6 !text-sm">
          Try again
        </button>
        <Link href="/" className="btn-secondary !py-3 !px-6 !text-sm">
          Back to home
        </Link>
      </div>
    </section>
  );
}
