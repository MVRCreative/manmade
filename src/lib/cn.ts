/**
 * Tiny class-name joiner used by the design system.
 *
 * Filters out `false`, `null`, `undefined`, and empty strings so that
 * conditional classes can be written inline without nullable noise.
 */

export type ClassValue = string | number | false | null | undefined;

export const cn = (...values: ClassValue[]): string => {
  const parts: string[] = [];
  for (const value of values) {
    if (value !== false && value !== null && value !== undefined && value !== '' && value !== 0) {
      parts.push(String(value));
    }
  }
  return parts.join(' ');
};
