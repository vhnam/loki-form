import { useCallback, useEffect, useState } from 'react';

import { ActionButton, Icon } from '@repo/ui-core/primitives';

const THEME_COOKIE_NAME = 'theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

// Helper function to get cookie value
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

// Helper function to set cookie
function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

const applyTheme = (theme: string) => {
  const root = document.documentElement;
  if (theme === THEME_DARK) {
    root.classList.add(THEME_DARK);
    root.classList.remove(THEME_LIGHT);
  } else {
    root.classList.add(THEME_LIGHT);
    root.classList.remove(THEME_DARK);
  }
};

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Get initial theme from cookie or current HTML class
    const cookieTheme = getCookie(THEME_COOKIE_NAME);
    const currentTheme = document.documentElement.classList.contains(THEME_DARK) ? THEME_DARK : THEME_LIGHT;
    const initialTheme = cookieTheme || currentTheme;

    setIsDark(initialTheme === THEME_DARK);
    if (cookieTheme) {
      applyTheme(initialTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const newTheme = prev ? THEME_LIGHT : THEME_DARK;
      applyTheme(newTheme);
      setCookie(THEME_COOKIE_NAME, newTheme);
      return !prev;
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd+J (Mac) or Ctrl+J (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === 'j') {
        event.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mounted, toggleTheme]);

  if (!mounted) {
    return (
      <ActionButton type="button" variant="subtle" size="md" aria-label="Toggle theme">
        <Icon name="Sun" className="size-4" />
      </ActionButton>
    );
  }

  return (
    <ActionButton type="button" variant="default" size="lg" onClick={toggleTheme} aria-label="Toggle theme">
      {isDark ? <Icon name="Sun" className="size-4" /> : <Icon name="Moon" className="size-4" />}
    </ActionButton>
  );
};

export default ThemeToggle;
