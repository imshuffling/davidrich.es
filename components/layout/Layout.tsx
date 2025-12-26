"use client";

import React, { useLayoutEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./Header";
import Footer from "./Footer";
import type { LayoutProps } from "@/types/components";

export default function Layout({ children }: LayoutProps) {
  useLayoutEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 1000,
    });

    // Use event delegation for card hover effects - more efficient than attaching to each card
    const handleMouseEvent = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest('.card');
      if (card) {
        if (e.type === 'mouseenter') {
          card.classList.add('hover');
        } else {
          card.classList.remove('hover');
        }
      }
    };

    // Use capture phase for better performance with event delegation
    document.addEventListener('mouseenter', handleMouseEvent, true);
    document.addEventListener('mouseleave', handleMouseEvent, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEvent, true);
      document.removeEventListener('mouseleave', handleMouseEvent, true);
    };
  }, []);

  return (
    <div className="container-wrap">
      <Header />
      <div id="page-wrap">{children}</div>
      <Footer />
    </div>
  );
}
