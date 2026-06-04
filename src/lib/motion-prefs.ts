/**
 * Shared motion environment checks for scroll-driven GSAP work.
 */

/**
 * Whether the user has requested reduced motion.
 *
 * @returns `true` when `prefers-reduced-motion: reduce` matches.
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Touch-first devices where Lenis and scroll-pinned heroes are unreliable.
 *
 * @returns `true` on coarse-pointer, hover-none devices.
 */
export const isTouchLikeDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
};

/**
 * Lenis smooth scroll — desktop pointer only.
 *
 * @returns `true` when Lenis should run.
 */
export const shouldEnableSmoothScroll = (): boolean =>
  !prefersReducedMotion() && !isTouchLikeDevice();

/**
 * Hero scroll-scrub pin — desktop pointer only.
 *
 * @returns `true` when the hero should pin and scrub the banner video.
 */
export const shouldUseHeroScrollScrub = (): boolean =>
  !prefersReducedMotion() && !isTouchLikeDevice();
