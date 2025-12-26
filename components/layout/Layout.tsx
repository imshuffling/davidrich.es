"use client";

import React, { useLayoutEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import type { LayoutProps } from "@/types/components";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Layout({ children }: LayoutProps) {
  // Replace AOS with lightweight CSS animations + Intersection Observer
  useScrollAnimation();

  useLayoutEffect(() => {

    // Use event delegation for card hover effects - more efficient than attaching to each card
    // Note: Using mouseover/mouseout instead of mouseenter/mouseleave because they bubble
    const handleMouseOver = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest('.card');
      if (card && !card.classList.contains('hover')) {
        card.classList.add('hover');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest('.card');
      if (card && !card.contains(e.relatedTarget as Node)) {
        card.classList.remove('hover');
      }
    };

    // Use capture phase for better performance with event delegation
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
    };
  }, []);

  return (
    <div className="container-wrap">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <div id="page-wrap">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
