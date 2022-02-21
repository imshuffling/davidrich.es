import { useTheme } from "next-themes";

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-changer-wrapper">
      <div className="mode-container">
        <i onClick={() => setTheme("light")} className="gg-sun"></i>
        <i onClick={() => setTheme("dark")} className="gg-moon"></i>
      </div>
    </div>
  );
};
