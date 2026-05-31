'use client';

/**
 * ThemeToggle — single-button switch between the light and dark themes.
 *
 * Reads the active theme from the `data-theme` attribute the pre-paint
 * init script wrote to `<html>`, persists the user's explicit choice to
 * localStorage, and updates the attribute so token CSS variables swap
 * everywhere they're referenced.
 *
 * On supporting browsers the swap is staged through the View Transitions
 * API and revealed with a circular clip-path emanating from the click —
 * the "ink-drop" effect. Browsers without the API, and users with
 * `prefers-reduced-motion: reduce`, get the instant swap as before.
 *
 * Icon-only by default with an accessible name; pair with a label when
 * placed outside a navbar.
 */

import type { MouseEvent as ReactMouseEvent } from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import type { Theme } from '@/lib/theme';
import { THEME_ATTRIBUTE, THEME_STORAGE_KEY } from '@/lib/theme';

export type ThemeToggleProps = {
  className?: string;
};

type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition: () => void;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => ViewTransition;
};

const readActiveTheme = (): Theme => {
  if (typeof document === 'undefined') {
    return 'light';
  }
  const attr = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  return attr === 'dark' ? 'dark' : 'light';
};

const applyTheme = (theme: Theme): void => {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  document.documentElement.style.colorScheme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage is best-effort; ignore quota / private-mode failures.
  }
};

const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

type RevealOptions = {
  transition: ViewTransition;
  originX: number;
  originY: number;
  endRadius: number;
};

const runInkDropReveal = async (options: RevealOptions): Promise<void> => {
  try {
    await options.transition.ready;
  } catch {
    // Transition was skipped (e.g. tab backgrounded). The DOM already
    // reflects the new theme — nothing to animate.
    return;
  }
  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${options.originX}px ${options.originY}px)`,
        `circle(${options.endRadius}px at ${options.originX}px ${options.originY}px)`,
      ],
    },
    {
      duration: 520,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      pseudoElement: '::view-transition-new(root)',
    },
  );
};

const SunIcon = (props: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={props.className}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = (props: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={props.className}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const ThemeToggle = (props: ThemeToggleProps) => {
  // Render a neutral placeholder until we've read the active theme on the
  // client. Avoids a hydration mismatch and a flash of the wrong icon.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(readActiveTheme());
  }, []);

  const toggle = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const doc = document as DocumentWithViewTransition;

    // Bail out of the choreography when the browser can't support it or
    // the user has asked the OS for less motion. The attribute swap and
    // React state update still happen; only the reveal is skipped.
    if (!doc.startViewTransition || prefersReducedMotion()) {
      applyTheme(next);
      setTheme(next);
      return;
    }

    // Anchor the reveal on the button itself so the ink-drop reads as a
    // direct consequence of the click rather than a viewport-wide flash.
    const rect = event.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY),
    );

    // The icon swap is driven by `[data-theme]` in CSS (see global.css),
    // so the attribute change inside the callback is enough for both
    // snapshots to reflect their respective icons.
    const transition = doc.startViewTransition(() => {
      applyTheme(next);
    });

    setTheme(next);

    void runInkDropReveal({ transition, originX, originY, endRadius });
  };

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-ds-full text-ds-muted-foreground transition-colors hover:bg-ds-muted hover:text-ds-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background',
        props.className,
      )}
    >
      <span className="ds-theme-toggle-icons" aria-hidden="true">
        <MoonIcon className="ds-theme-toggle-moon" />
        <SunIcon className="ds-theme-toggle-sun" />
      </span>
    </button>
  );
};
