import { useEffect, useState } from "react";
import "@/assets/css/toggletheme.css";
import type { ToggleThemeProps } from "@/types/theme";

const ToggleTheme = ({ position, right, top }: ToggleThemeProps) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  // On initial render, apply the dark theme based on localStorage or system preference
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  // Toggles between dark and light themes and stores the preference in localStorage
  const handleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  return (
    <button
      type="button"
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      id="toggle"
      role="switch"
      aria-checked={isDark}
      className={`app ${
        isDark ? "" : "dark"
      } ${position} ${right} ${top} focus:outline-none focus:ring-0 focus:ring-red-500 rounded z-50 cursor-pointer`}
      onClick={handleDarkMode}
    >
      {/* Icon with overlapping sun and moon paths to visually indicate the current theme */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="35"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Moon */}
        <path
          pathLength="1"
          className="moon-icon"
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        ></path>
        {/* Sun */}
        <circle
          pathLength="1"
          className="sun-icon"
          cx="12"
          cy="12"
          r="5"
        ></circle>
        <line
          pathLength="1"
          className="sun-icon"
          x1="12"
          y1="1"
          x2="12"
          y2="3"
        ></line>
        <line
          pathLength="1"
          className="sun-icon"
          x1="12"
          y1="21"
          x2="12"
          y2="23"
        ></line>
        <line
          pathLength="1"
          className="sun-icon"
          x1="4.22"
          y1="4.22"
          x2="5.64"
          y2="5.64"
        ></line>
        <line
          pathLength="1"
          className="sun-icon"
          x1="18.36"
          y1="18.36"
          x2="19.78"
          y2="19.78"
        ></line>
        <line
          pathLength="1"
          className="sun-icon"
          x1="1"
          y1="12"
          x2="3"
          y2="12"
        ></line>
        <line
          pathLength="1"
          className="sun-icon"
          x1="21"
          y1="12"
          x2="23"
          y2="12"
        ></line>
        <line
          pathLength="1"
          className="sun-icon"
          x1="4.22"
          y1="19.78"
          x2="5.64"
          y2="18.36"
        ></line>
        <line
          pathLength="1"
          className="sun-icon"
          x1="18.36"
          y1="5.64"
          x2="19.78"
          y2="4.22"
        ></line>
      </svg>
    </button>
  );
};

export default ToggleTheme;
