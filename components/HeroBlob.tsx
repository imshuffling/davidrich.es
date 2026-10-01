"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

const HeroBlobScene = dynamic(() => import("@/components/HeroBlobScene"), {
  ssr: false,
});

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

export default function HeroBlob() {
  const isDesktop = useMediaQuery("(min-width: 80em)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (!isDesktop) return null;

  return (
    <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-[44%] aspect-square w-[min(29vw,450px)] translate-x-[8%]">
      <HeroBlobScene animate={!reducedMotion} />
    </div>
  );
}
