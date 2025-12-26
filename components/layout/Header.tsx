"use client";

import React, { useState, useLayoutEffect } from "react";
import Link from "next/link";
import ThemeChanger from "../ThemeChanger";
import { usePathname } from "next/navigation";
import { RxOpenInNewWindow } from "react-icons/rx";

export default function Header() {
  const [toggleState, setToggleState] = useState(false);
  const pathname = usePathname();

  function toggle() {
    setToggleState(!toggleState);
  }

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
        className={toggleState ? "navbutton active" : "navbutton"}
        onClick={toggle}
        tabIndex={0}
        onKeyDown={toggle}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={toggleState ? "open" : ""}>
        <ul id="navigation">
          <li onClick={() => setToggleState(false)}>
            <Link
              {...(pathname === "/" ? { "aria-current": "page" as const } : {})}
              href="/"
            >
              About me
            </Link>
          </li>
          <li onClick={() => setToggleState(false)}>
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
              <RxOpenInNewWindow size={25} />
            </a>
          </li>
          <li onClick={() => setToggleState(false)}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
