import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme] = useState<Theme>('light');

  const [actualTheme] = useState<'light' | 'dark'>('light');

  const setTheme = () => {
    // Theme switching is disabled to keep only light mode
    console.log('Theme switching is disabled');
  };

  useEffect(() => {
    // Force light mode on initial load
    const root = document.documentElement;
    root.classList.add('light');
    root.classList.remove('dark');

    // Cleanup any saved theme preference
    localStorage.removeItem('theme');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}