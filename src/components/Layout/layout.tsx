"use client"
import { useAtom } from 'jotai';
import { persistentThemeAtom } from '../../atoms/atoms';
import { ReactNode, useEffect, useState } from 'react';

const Layout = ({ children}:{children:ReactNode}) => {
  const [theme, setTheme] = useAtom(persistentThemeAtom);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('budget-buddy-theme');
      if (storedTheme && storedTheme !== theme) {
        setTheme(storedTheme);
      }
      setIsInitialized(true);
    }
  }, [setTheme]);

  // During SSR and initial client render, use the default theme
  // This ensures server and client render the same thing initially
  const currentTheme = isInitialized ? theme : 'dark';

  return (
    <div data-theme={currentTheme} className="min-h-screen">
      {children}
    </div>
  );
};

export default Layout;