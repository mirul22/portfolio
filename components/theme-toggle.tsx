'use client';

import { useTheme } from 'next-themes';

import { Moon, Sun } from './icons';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Both icons render on the server; CSS picks the visible one so there is no hydration flash or layout shift.
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg motion-reduce:transition-none"
    >
      <Sun className="hidden size-5 dark:block" />
      <Moon className="size-5 dark:hidden" />
      <span className="sr-only">Toggle colour theme</span>
    </button>
  );
}
