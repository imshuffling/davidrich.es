"use client";

import { useTheme } from "next-themes";
import { playSound } from "@/utils/sound";

export default function ThemeChanger() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    playSound(next === "dark" ? "/sounds/switch-on.mp3" : "/sounds/switch-off.mp3");
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="icon-button theme-changer-wrapper"
    >
      <span className="mode-container">
        <i className="gg-sun" aria-hidden="true"></i>
        <i className="gg-moon" aria-hidden="true"></i>
      </span>
    </button>
  );
}
