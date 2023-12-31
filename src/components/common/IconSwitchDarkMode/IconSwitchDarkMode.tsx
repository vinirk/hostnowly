import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

export interface IconSwitchDarkModeProps {
  className?: string;
}
const IconSwitchDarkMode: React.FC<IconSwitchDarkModeProps> = ({
  className = "",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      toDark();
    } else {
      toLight();
    }
  }, []);

  const toDark = () => {
    setIsDarkMode(true);
    const root = document.querySelector("html");
    if (!root) return;
    !root.classList.contains("dark") && root.classList.add("dark");
    localStorage.theme = "dark";
  };

  const toLight = () => {
    setIsDarkMode(false);
    const root = document.querySelector("html");
    if (!root) return;
    root.classList.remove("dark");
    localStorage.theme = "light";
  };

  function toggleDarkMode() {
    if (localStorage.theme === "light") {
      toDark();
    } else {
      toLight();
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className={`text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center ${className}`}
    >
      {isDarkMode ? (
        <MoonIcon className="w-7 h-7" aria-hidden="true" />
      ) : (
        <SunIcon className="w-7 h-7" aria-hidden="true" />
      )}
    </button>
  );
};

export default IconSwitchDarkMode;
