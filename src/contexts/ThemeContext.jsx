import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const storageTheme = localStorage.getItem("theme");

    if (!storageTheme) {
      localStorage.setItem("theme", "light");
      document.documentElement.style.setProperty("--backgroundColor", "white");

      setTheme("light");
    } else {
      switch (storageTheme) {
        case "light": {
          document.documentElement.style.setProperty(
            "--backgroundColor",
            "white"
          );

          break;
        }

        case "dark": {
          document.documentElement.style.setProperty(
            "--backgroundColor",
            "#1a171d"
          );

          break;
        }

        default: {
          break;
        }
      }

      setTheme(storageTheme);
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.style.setProperty(
        "--backgroundColor",
        "#1a171d"
      );
    } else if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.style.setProperty("--backgroundColor", "white");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
