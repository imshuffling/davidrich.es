"use client";

import { useState, useLayoutEffect, useCallback, useEffect } from "react";
import Link from "next/link";
import ThemeChanger from "../ThemeChanger";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import useSound from "use-sound";
import { NAV_LINKS, LINKS } from "@/utils/site";

export default function Header() {
  const [toggleState, setToggleState] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [playOn] = useSound("/sounds/switch-on.mp3", { volume: 0.5 });
  const [playOff] = useSound("/sounds/switch-off.mp3", { volume: 0.5 });

  const toggle = useCallback(() => {
    setToggleState((prev) => {
      if (prev) {
        playOff();
      } else {
        playOn();
      }
      return !prev;
    });
  }, [playOn, playOff]);

  useEffect(() => {
    setToggleState(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <>
      <header className="fixed top-0 w-full z-[70] backdrop-blur-xl" style={{ background: toggleState ? "var(--bg)" : "color-mix(in srgb, var(--bg) 70%, transparent)", boxShadow: toggleState ? "none" : "0 20px 40px -10px rgba(99,14,212,0.06)" }}>
        <nav className={`container flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] transition-all duration-300 ${scrolled ? "py-2.5" : "py-5"}`}>
          <span onClick={() => setToggleState(false)} className="md:justify-self-start">
            <Link href="/" className="logo-gradient">
              David Riches
            </Link>
          </span>

          {/* Desktop nav */}
          <div className={`hidden md:flex items-center justify-center font-headline font-medium tracking-tight transition-all duration-300 ${scrolled ? "gap-7 text-sm" : "gap-10 text-base"}`}>
            {NAV_LINKS.map((link) => {
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
              href={LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 hover:translate-y-[-1px] transition-all duration-300 !border-none !bg-none"
              style={{ color: "var(--heading-color)" }}
            >
              Resume
            </a>
          </div>

          <div className="flex items-center gap-4 md:justify-self-end">
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
      </header>

      {/* Mobile nav overlay — sibling of header so backdrop-blur doesn't trap it */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col items-center justify-center transition-all duration-300 md:hidden ${
          toggleState ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ background: "var(--bg)" }}
      >
        <ul className="flex flex-col items-center gap-8 text-3xl font-headline font-bold">
          {NAV_LINKS.map((link) => (
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
              href={LINKS.resume}
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
    </>
  );
}
