"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./Header";
import Footer from "./Footer";
import type { LayoutProps } from "@/types/components";

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    document.querySelectorAll(".card").forEach((elem) => {
      const element = elem as HTMLElement;
      element.onmouseenter = () => {
        element.classList.add("hover");
      };
      element.onmouseleave = () => {
        element.classList.remove("hover");
      };
    });
  }, []);

  return (
    <div className="container-wrap">
      <Header />
      <div id="page-wrap">{children}</div>
      <Footer />
    </div>
  );
}
