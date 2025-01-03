"use-client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ThemeChanger from "./ThemeChanger";
import { useRouter } from "next/router";
import { RxOpenInNewWindow } from "react-icons/rx";

export default function Header() {
  const [toggleState, setToggleState] = useState(false);

  const router = useRouter();

  function toggle() {
    setToggleState(!toggleState);
  }

  useEffect(() => {
    const body = document.body;

    if (toggleState) {
      // Add inline styles to fix the body's position
      body.style.position = "fixed";
    } else {
      // Remove the styles when menu is closed
      body.style.position = "";
    }

    // Clean up on component unmount
    return () => {
      body.style.position = "";
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
              {...(router.pathname === "/" ? { "aria-current": "page" } : {})}
              href="/"
            >
              About me
            </Link>
          </li>
          <li onClick={() => setToggleState(false)}>
            <Link
              {...(router.pathname === "/what-i-can-do"
                ? { "aria-current": "page" }
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
