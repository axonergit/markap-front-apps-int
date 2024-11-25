import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const getInitialTheme = () => {
  const root = document.getElementById("root");
  return root?.getAttribute("data-theme"); 
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    const root = document.getElementById("root");
    root.setAttribute("data-theme", theme); 
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
