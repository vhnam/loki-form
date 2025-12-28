import { useEffect, useState } from 'react';

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

  const toggleTheme = () => {
    const newTheme = isDark ? THEME_LIGHT : THEME_DARK;
    setIsDark(!isDark);
    applyTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  if (!mounted) {
    return (
      <ActionButton type="button" variant="subtle" size="md" aria-label="Toggle theme">
        <Icon name="Sun" className="size-4" />
      </ActionButton>
    );
  }

  return (
    <ActionButton type="button" variant="subtle" size="lg" onClick={toggleTheme} aria-label="Toggle theme">
      {isDark ? (
        <Icon name="Sun" className="size-4 text-neutral-300 hover:text-white" />
      ) : (
        <Icon name="Moon" className="size-4 text-neutral-600 hover:text-neutral-900" />
      )}
    </ActionButton>
  );
};

export default ThemeToggle;
