import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem("theme"); // Recuperar de localStorage
  if (storedTheme) return storedTheme; 
  const root = document.getElementById("root");
  return root?.getAttribute("data-theme"); 
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    const root = document.getElementById("root");
    root.setAttribute("data-theme", theme); 
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
