/**
 * Centralized design tokens for the marketing/landing surface.
 *
 * Single source of truth for colors, spacing, typography, radii, shadows,
 * breakpoints, easings, and durations. Components should import token
 * values from here (or the CSS variables in `global.css` that mirror them)
 * rather than hard-coding magic numbers.
 *
 * Color tokens come in two palettes — `lightColors` and `darkColors` —
 * that share keys so the same semantic name resolves to the right value
 * in either theme. The CSS-variable contract (see `src/styles/global.css`)
 * mirrors the keys: `--ds-color-<name>` is swapped wholesale when the
 * active theme changes via `[data-theme="dark"]` on `<html>`.
 *
 * The shared cyan `primary` color is the single "Mode A" CTA — same
 * shape and hue in both themes per the designer profile.
 */

const CYAN = 'oklch(0.76 0.115 232)';
const CYAN_FOREGROUND = 'oklch(0.16 0 0)';

export const lightColors = {
  background: 'oklch(0.99 0 0)',
  foreground: 'oklch(0.16 0 0)',
  muted: 'oklch(0.96 0 0)',
  mutedForeground: 'oklch(0.48 0 0)',
  border: 'oklch(0.91 0 0)',
  card: 'oklch(1 0 0)',
  cardForeground: 'oklch(0.16 0 0)',
  primary: CYAN,
  primaryForeground: CYAN_FOREGROUND,
  secondary: 'oklch(0.94 0.005 230)',
  secondaryForeground: 'oklch(0.22 0.04 230)',
  accent: CYAN,
  accentForeground: CYAN_FOREGROUND,
  success: 'oklch(0.72 0.18 152)',
  warning: 'oklch(0.82 0.16 86)',
  destructive: 'oklch(0.62 0.22 27)',
  destructiveForeground: 'oklch(0.99 0 0)',
} as const;

export const darkColors = {
  background: 'oklch(0.13 0 0)',
  foreground: 'oklch(0.98 0 0)',
  muted: 'oklch(0.18 0 0)',
  mutedForeground: 'oklch(0.62 0 0)',
  border: 'oklch(0.22 0 0)',
  card: 'oklch(0.16 0 0)',
  cardForeground: 'oklch(0.98 0 0)',
  primary: CYAN,
  primaryForeground: CYAN_FOREGROUND,
  secondary: 'oklch(0.20 0 0)',
  secondaryForeground: 'oklch(0.92 0 0)',
  accent: CYAN,
  accentForeground: CYAN_FOREGROUND,
  success: 'oklch(0.74 0.18 152)',
  warning: 'oklch(0.84 0.16 86)',
  destructive: 'oklch(0.66 0.22 27)',
  destructiveForeground: 'oklch(0.99 0 0)',
} as const;

/**
 * Backwards-compatible alias for the active default palette.
 * Existing call sites that read `colors[name]` continue to compile;
 * new code should prefer `lightColors` / `darkColors` explicitly.
 */
export const colors = lightColors;

export type ColorToken = keyof typeof lightColors;

export const spacing = {
  '2xs': '0.25rem',
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
  '5xl': '8rem',
} as const;

export type SpacingToken = keyof typeof spacing;

export const radii = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
} as const;

export type RadiusToken = keyof typeof radii;

export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
  md: '0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04)',
  lg: '0 12px 28px -6px rgb(0 0 0 / 0.12), 0 6px 10px -6px rgb(0 0 0 / 0.08)',
  xl: '0 24px 48px -12px rgb(0 0 0 / 0.18)',
  ring: '0 0 0 3px oklch(0.76 0.115 232 / 0.35)',
} as const;

export type ShadowToken = keyof typeof shadows;

export const typography = {
  fontFamily: {
    sans: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    display:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.65,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.04em',
  },
} as const;

export type FontSizeToken = keyof typeof typography.fontSize;
export type FontWeightToken = keyof typeof typography.fontWeight;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export type BreakpointToken = keyof typeof breakpoints;

/**
 * Easings designed for landing-page motion. Match GSAP-compatible strings
 * so they can be passed directly to `gsap.to`.
 */
export const easings = {
  standard: 'power2.out',
  emphasized: 'power3.out',
  decelerate: 'expo.out',
  bounce: 'back.out(1.6)',
} as const;

export type EasingToken = keyof typeof easings;

export const durations = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
  slower: 1.2,
} as const;

export type DurationToken = keyof typeof durations;

export const tokens = {
  colors,
  lightColors,
  darkColors,
  spacing,
  radii,
  shadows,
  typography,
  breakpoints,
  easings,
  durations,
} as const;

export type DesignTokens = typeof tokens;
