"use client";

import { useState, useLayoutEffect, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import ThemeChanger from "../ThemeChanger";
import { usePathname } from "next/navigation";
import { playSound } from "@/utils/sound";
import { NAV_LINKS, LINKS } from "@/utils/site";

export default function Header() {
  const [toggleState, setToggleState] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const overlayRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => {
    setToggleState((prev) => {
      playSound(prev ? "/sounds/switch-off.mp3" : "/sounds/switch-on.mp3");
      return !prev;
    });
  }, []);

  useEffect(() => {
    setToggleState(false);
  }, [pathname]);

  useEffect(() => {
    if (!toggleState) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setToggleState(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const links = overlayRef.current
        ? Array.from(overlayRef.current.querySelectorAll<HTMLElement>("a[href]"))
        : [];
      const focusable = menuButtonRef.current ? [menuButtonRef.current, ...links] : links;
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [toggleState]);

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
            <button
              type="button"
              ref={menuButtonRef}
              aria-label="Main menu"
              aria-expanded={toggleState}
              className="icon-button md:hidden cursor-pointer text-primary"
              onClick={toggle}
            >
              {toggleState ? (
                <svg width={24} height={24} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="currentColor"
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  />
                </svg>
              ) : (
                <svg width={24} height={24} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="currentColor"
                    d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile nav overlay — sibling of header so backdrop-blur doesn't trap it */}
      <nav
        ref={overlayRef}
        aria-label="Mobile navigation"
        inert={!toggleState}
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
      </nav>
    </>
  );
}
