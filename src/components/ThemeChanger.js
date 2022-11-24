import React from "react";
import { useTheme } from "@skagami/gatsby-plugin-dark-mode";

const Themechanger = () => {
  const [theme, toggleTheme] = useTheme();

  // Don't render anything at compile time. Deferring rendering until we
  // know which theme to use on the client avoids incorrect initial
  // state being displayed.
  if (theme === null) {
    return null;
  }

  return (
    <label className="theme-changer-wrapper">
      <input
        type="checkbox"
        aria-label="Dark or light mode"
        className="theme-changer"
        onChange={(e) => toggleTheme(e.target.checked ? "dark" : "light")}
        checked={theme === "dark"}
      />{" "}
      <div className="mode-container">
        <i className="gg-sun"></i>
        <i className="gg-moon"></i>
      </div>
    </label>
  );
};

export default Themechanger;
