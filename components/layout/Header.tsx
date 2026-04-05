"use client";

import { useState, useLayoutEffect, useCallback, useEffect } from "react";
import Link from "next/link";
import ThemeChanger from "../ThemeChanger";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

export default function Header() {
  const [toggleState, setToggleState] = useState(false);
  const pathname = usePathname();

  const toggle = useCallback(() => {
    setToggleState((prev) => !prev);
  }, []);

  useEffect(() => {
    setToggleState(false);
  }, [pathname]);

  useLayoutEffect(() => {
    if (toggleState) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [toggleState]);

  const navLinks = [
    { href: "/", label: "Work" },
    { href: "/what-i-can-do", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl" style={{ background: "color-mix(in srgb, var(--bg) 70%, transparent)", boxShadow: "0 20px 40px -10px rgba(99,14,212,0.06)" }}>
      <nav className="flex justify-between items-center px-6 md:px-8 py-5 max-w-7xl mx-auto">
        <span onClick={() => setToggleState(false)}>
          <Link
            href="/"
            className="logo-gradient"
          >
            David Riches
          </Link>
        </span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10 font-headline font-medium tracking-tight">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all duration-300 !border-none !bg-none relative ${
                  isActive
                    ? "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary"
                    : "opacity-70 hover:opacity-100 hover:translate-y-[-1px]"
                }`}
                style={{ color: isActive ? "var(--primary-colour)" : "var(--heading-color)" }}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://resume.davidrich.es/"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 hover:translate-y-[-1px] transition-all duration-300 !border-none !bg-none"
            style={{ color: "var(--heading-color)" }}
          >
            Resume
          </a>
        </div>

        <div className="flex items-center gap-4">
          <ThemeChanger />
          <div
            role="button"
            aria-label="Main menu"
            aria-expanded={toggleState}
            className="md:hidden cursor-pointer text-primary"
            onClick={toggle}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
              }
            }}
          >
            {toggleState ? <RxCross2 size={24} /> : <RxHamburgerMenu size={24} />}
          </div>
        </div>
      </nav>

      {/* Mobile nav overlay */}
      <div
        className={`fixed inset-0 top-0 z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden ${
          toggleState ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ background: "var(--bg)" }}
      >
        <ul className="flex flex-col items-center gap-8 text-3xl font-headline font-bold">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setToggleState(false)}
                className="!border-none !bg-none transition-colors"
                style={{ color: pathname === link.href ? "var(--primary-colour)" : "var(--heading-color)" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://resume.davidrich.es/"
              target="_blank"
              rel="noopener noreferrer"
              className="!border-none !bg-none"
              style={{ color: "var(--heading-color)" }}
              onClick={() => setToggleState(false)}
            >
              Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
