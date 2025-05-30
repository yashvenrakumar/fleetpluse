// context/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { lightTheme, darkTheme } from '../utils/theme';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
  theme: lightTheme,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
