import { useState, useEffect } from "react";

const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    return savedTheme === "system" ? getSystemTheme() : savedTheme;
  });

  useEffect(() => {
    const currentTheme = theme === "system" ? getSystemTheme() : theme;
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        const newSystemTheme = mediaQuery.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newSystemTheme);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [theme]);

  return { theme, setTheme };
};