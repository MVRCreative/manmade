/**
 * Theme primitives shared by the server (pre-paint init) and the client
 * (`ThemeToggle`).
 *
 * The toggle persists the user's explicit choice (`'light'` or `'dark'`)
 * in localStorage. The pre-paint script below reads that value before
 * React hydrates and sets `data-theme` on `<html>`, so users never see a
 * flash of the wrong theme on first load. When no preference is stored
 * we fall back to `prefers-color-scheme`.
 */

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'ds-theme';
export const THEME_ATTRIBUTE = 'data-theme';

/**
 * Inline script body that runs synchronously in `<head>` to resolve the
 * active theme before the first paint. Inject into the layout via
 * `<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />`.
 *
 * Kept dependency-free and wrapped in `try/catch` so storage-blocked
 * browsers (private mode, restrictive CSP) still get a sensible default.
 */
export const THEME_INIT_SCRIPT = `(function(){
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('${THEME_ATTRIBUTE}', theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();`;
