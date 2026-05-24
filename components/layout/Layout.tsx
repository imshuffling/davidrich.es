"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import type { LayoutProps } from "@/types/components";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  useScrollAnimation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="container-wrap">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="pt-24 md:pt-28">
        <div id="page-wrap">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
