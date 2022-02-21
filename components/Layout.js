import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    document.querySelectorAll(".card").forEach((elem) => {
      elem.onmouseenter = () => {
        elem.classList.add("hover");
      };
      elem.onmouseleave = () => {
        elem.classList.remove("hover");
      };
    });
  });

  return (
    <div className="container-wrap animated fadeIn">
      <Header />
      <div id="page-wrap">{children}</div>
      <Footer />
    </div>
  );
}
