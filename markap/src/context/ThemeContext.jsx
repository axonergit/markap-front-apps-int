import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) return storedTheme;
  return document.documentElement.getAttribute('data-theme');
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "retro" ? "coffee" : "retro")); 
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
