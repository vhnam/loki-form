import { useCallback, useEffect, useState } from 'react';

import { ActionButton, Icon } from '@repo/ui-core/primitives';

const THEME_STORAGE_KEY = 'theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

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

    // Get initial theme from localStorage or system preference
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? THEME_DARK : THEME_LIGHT);

    setIsDark(initialTheme === THEME_DARK);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const newTheme = prev ? THEME_LIGHT : THEME_DARK;
      applyTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
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
