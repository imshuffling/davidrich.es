"use client";

import { useState, useLayoutEffect, useCallback, useEffect } from "react";
import Link from "next/link";
import ThemeChanger from "../ThemeChanger";
import { usePathname } from "next/navigation";

export default function Header() {
  const [toggleState, setToggleState] = useState(false);
  const pathname = usePathname();

  const toggle = useCallback(() => {
    setToggleState(prev => !prev);
  }, []);

  // Close nav when pathname changes (after route transition)
  useEffect(() => {
    setToggleState(false);
  }, [pathname]);

  useLayoutEffect(() => {
    // Synchronously update body position before browser paint to prevent visual flash
    document.body.style.position = toggleState ? "fixed" : "";

    // Clean up on component unmount
    return () => {
      document.body.style.position = "";
    };
  }, [toggleState]);

  return (
    <header>
      <span onClick={() => setToggleState(false)}>
        <Link className="logo" href="/">
          David Riches
        </Link>
      </span>
      <ThemeChanger />
      <div
        role="button"
        aria-label="Main menu"
        aria-expanded={toggleState}
        className={toggleState ? "navbutton active" : "navbutton"}
        onClick={toggle}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={toggleState ? "open" : ""}>
        <ul id="navigation">
          <li>
            <Link
              {...(pathname === "/" ? { "aria-current": "page" as const } : {})}
              href="/"
            >
              About me
            </Link>
          </li>
          <li>
            <Link
              {...(pathname === "/what-i-can-do"
                ? { "aria-current": "page" as const }
                : {})}
              href="/what-i-can-do"
            >
              What I can do
            </Link>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://resume.davidrich.es/"
            >
              Resume
              <svg
                width="25"
                height="25"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
