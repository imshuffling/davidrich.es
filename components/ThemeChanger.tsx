"use client";

import { useTheme } from "next-themes";
import useSound from "use-sound";

export default function ThemeChanger() {
  const { setTheme } = useTheme();
  const [playOn] = useSound("/sounds/switch-on.mp3", { volume: 0.5 });
  const [playOff] = useSound("/sounds/switch-off.mp3", { volume: 0.5 });

  const handleClick = (theme: "light" | "dark") => {
    if (theme === "dark") {
      playOn();
    } else {
      playOff();
    }
    setTheme(theme);
  };

  return (
    <div className="theme-changer-wrapper">
      <div className="mode-container">
        <i onClick={() => handleClick("light")} className="gg-sun"></i>
        <i onClick={() => handleClick("dark")} className="gg-moon"></i>
      </div>
    </div>
  );
}
