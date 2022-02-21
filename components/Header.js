import React, { useState } from "react";
import Link from "next/link";
import ThemeChanger from "./ThemeChanger";

export default function Header() {
  const [toggleState, setToggleState] = useState(false);

  function toggle() {
    setToggleState(!toggleState);
  }

  return (
    <header>
      <span onClick={() => setToggleState(false)}>
        <Link href="/">
          <a className="logo">David Riches</a>
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
            <Link href="/">
              <a>About me</a>
            </Link>
          </li>
          <li onClick={() => setToggleState(false)}>
            <Link href="/what-i-can-do">What I can do</Link>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://resume.davidrich.es/"
            >
              Resume
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
