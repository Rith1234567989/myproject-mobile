import { useColorScheme } from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  isAutoTheme: boolean;
  setTheme: (theme: ThemeMode) => void;
  setAutoTheme: (enabled: boolean) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [theme, setThemeState] = useState<ThemeMode>(
    colorScheme === "dark" ? "dark" : "light"
  );
  const [isAutoTheme, setIsAutoTheme] = useState(false);

  useEffect(() => {
    if (isAutoTheme) {
      const systemScheme = Appearance.getColorScheme();
      const newTheme = systemScheme === "dark" ? "dark" : "light";
      setThemeState(newTheme);
      setColorScheme(newTheme);

      const listener = Appearance.addChangeListener(({ colorScheme: nextScheme }) => {
        const updated = nextScheme === "dark" ? "dark" : "light";
        setThemeState(updated);
        setColorScheme(updated);
      });
      return () => listener.remove();
    }
  }, [isAutoTheme, setColorScheme]);

  const setTheme = (newTheme: ThemeMode) => {
    setIsAutoTheme(false);
    setThemeState(newTheme);
    setColorScheme(newTheme);
  };

  const setAutoTheme = (enabled: boolean) => {
    setIsAutoTheme(enabled);
    if (enabled) {
      const systemScheme = Appearance.getColorScheme();
      const newTheme = systemScheme === "dark" ? "dark" : "light";
      setThemeState(newTheme);
      setColorScheme(newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        isAutoTheme,
        setTheme,
        setAutoTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
