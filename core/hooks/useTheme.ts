import { useLayoutEffect, useState, useEffect } from "react";

const useTheme = (): [string, () => void] => {
  const [theme, setTheme] = useState("theme-light");

  function toggleTheme() {
    setTheme(theme === "theme-light" ? "theme-dark" : "theme-light");
  }

  useEffect(() => {
    const cachedTheme = localStorage.getItem("theme");
    if (cachedTheme) {
      setTheme(cachedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, toggleTheme];
};

export default useTheme;
