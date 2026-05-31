/**
 * GSAP animation utilities for the landing surface.
 *
 * Each helper is browser-only and lazily registers `ScrollTrigger` exactly
 * once. Helpers return a teardown `() => void` so callers can clean up in
 * `useEffect`.
 *
 * `prefers-reduced-motion` is respected: when the user opts out, we skip
 * scroll-driven and looped animations and snap targets to their final
 * state (`opacity: 1`, `y: 0`).
 *
 * Most reveal helpers accept `trigger: 'load' | 'scroll'`. Use `'load'`
 * for above-the-fold hero content (so it animates immediately on mount)
 * and `'scroll'` for content that should arrive as the user scrolls it
 * into view.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { durations, easings } from '@/lib/design-tokens';

type ScrollTriggerInstance = InstanceType<typeof ScrollTrigger>;
export type AnimationTeardown = () => void;
export type AnimationTrigger = 'load' | 'scroll';

const noop: AnimationTeardown = () => {
  // Intentional no-op teardown used when the helper short-circuits.
};

let pluginsRegistered = false;

const registerPlugins = (): void => {
  if (pluginsRegistered || typeof window === 'undefined') {
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  pluginsRegistered = true;
};

const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const killScrollTriggerFor = (tween: gsap.core.Tween): void => {
  const trigger = tween.scrollTrigger as ScrollTriggerInstance | undefined;
  trigger?.kill();
};

export type FadeInOnScrollOptions = {
  /** Vertical distance (px) the element animates from. */
  y?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Initial delay in seconds. */
  delay?: number;
  /** GSAP-compatible easing string. */
  ease?: string;
  /** Scroll position that triggers the animation (ScrollTrigger `start`). */
  start?: string;
  /** Whether the animation re-runs every time the element enters the viewport. */
  toggleActions?: string;
};

/**
 * Fades a single element in as it scrolls into view.
 *
 * @param target Element to animate. `null` is a no-op.
 * @param options Fade-in animation overrides.
 * @returns A teardown function that kills the tween + ScrollTrigger.
 */
export const fadeInOnScroll = (
  target: Element | null,
  options: FadeInOnScrollOptions = {},
): AnimationTeardown => {
  if (!target) {
    return noop;
  }

  if (prefersReducedMotion()) {
    gsap.set(target, { autoAlpha: 1, y: 0 });
    return noop;
  }

  registerPlugins();

  const {
    y = 24,
    duration = durations.base,
    delay = 0,
    ease = easings.emphasized,
    start = 'top 85%',
    toggleActions = 'play none none reverse',
  } = options;

  const tween = gsap.fromTo(
    target,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      delay,
      ease,
      scrollTrigger: { trigger: target, start, toggleActions },
    },
  );

  return () => {
    killScrollTriggerFor(tween);
    tween.kill();
  };
};

export type StaggerGridOptions = {
  y?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  /** Time (s) between each child's animation. */
  stagger?: number;
  /** `'load'` plays immediately on mount; `'scroll'` waits for the viewport. */
  trigger?: AnimationTrigger;
  start?: string;
  toggleActions?: string;
};

/**
 * Reveals a grid/list of children with a stagger.
 *
 * Defaults to scroll-triggered. Pass `trigger: 'load'` for above-the-fold
 * groups (hero CTAs, hero badges, anything that should arrive immediately).
 *
 * @param container Container whose children should animate.
 * @param childSelector CSS selector applied within `container`.
 * @param options Stagger animation overrides.
 * @returns A teardown function that kills the tween + ScrollTrigger.
 */
export const staggerGrid = (
  container: Element | null,
  childSelector: string,
  options: StaggerGridOptions = {},
): AnimationTeardown => {
  if (!container) {
    return noop;
  }

  const children = [...container.querySelectorAll<HTMLElement>(childSelector)];
  if (children.length === 0) {
    return noop;
  }

  if (prefersReducedMotion()) {
    gsap.set(children, { autoAlpha: 1, y: 0 });
    return noop;
  }

  registerPlugins();

  const {
    y = 32,
    duration = durations.base,
    delay = 0,
    ease = easings.emphasized,
    stagger = 0.08,
    trigger = 'scroll',
    start = 'top 80%',
    toggleActions = 'play none none reverse',
  } = options;

  const tween = gsap.fromTo(
    children,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger:
        trigger === 'scroll' ? { trigger: container, start, toggleActions } : undefined,
    },
  );

  return () => {
    killScrollTriggerFor(tween);
    tween.kill();
  };
};

export type ParallaxOptions = {
  /** Vertical translation (px) over the full scroll range. */
  distance?: number;
  /** ScrollTrigger `start` position. */
  start?: string;
  /** ScrollTrigger `end` position. */
  end?: string;
  /** Smoothing factor for scrub; `true` for snap, a number for delay. */
  scrub?: number | boolean;
};

/**
 * Adds a vertical parallax to `target` driven by the document scroll.
 *
 * @param target Element to translate.
 * @param options Parallax overrides.
 * @returns A teardown function that kills the tween + ScrollTrigger.
 */
export const parallax = (
  target: Element | null,
  options: ParallaxOptions = {},
): AnimationTeardown => {
  if (!target) {
    return noop;
  }

  if (prefersReducedMotion()) {
    return noop;
  }

  registerPlugins();

  const { distance = -80, start = 'top bottom', end = 'bottom top', scrub = 0.6 } = options;

  const tween = gsap.fromTo(
    target,
    { y: 0 },
    {
      y: distance,
      ease: 'none',
      scrollTrigger: { trigger: target, start, end, scrub },
    },
  );

  return () => {
    killScrollTriggerFor(tween);
    tween.kill();
  };
};

export type RevealHeadingOptions = {
  duration?: number;
  delay?: number;
  ease?: string;
  /** Stagger between word reveals. */
  stagger?: number;
  /** `'load'` plays immediately on mount; `'scroll'` waits for the viewport. */
  trigger?: AnimationTrigger;
  /** ScrollTrigger `start`. Only applies when `trigger: 'scroll'`. */
  start?: string;
};

const WORD_SPLIT_REGEX = /\s+/u;

const splitIntoWords = (target: HTMLElement): { restore: () => void; inners: HTMLElement[] } => {
  const originalText = target.textContent ?? '';
  const words = originalText.trim().split(WORD_SPLIT_REGEX);

  target.setAttribute('aria-label', originalText);
  target.innerHTML = words
    .map(
      (word) =>
        `<span class="ds-reveal-word" aria-hidden="true"><span class="ds-reveal-word__inner">${word}</span></span>`,
    )
    .join(' ');

  const restore = () => {
    target.textContent = originalText;
    target.removeAttribute('aria-label');
  };

  const inners = [...target.querySelectorAll<HTMLElement>('.ds-reveal-word__inner')];
  return { restore, inners };
};

/**
 * Splits a heading into word `<span>`s and reveals them with a vertical
 * mask. Mutates `target` once.
 *
 * Defaults to playing on load (above-the-fold heroes). Pass
 * `trigger: 'scroll'` for headings further down the page.
 *
 * @param target Heading element to split and animate.
 * @param options Reveal animation overrides.
 * @returns A teardown function that kills the tween and resets the heading.
 */
export const revealHeading = (
  target: Element | null,
  options: RevealHeadingOptions = {},
): AnimationTeardown => {
  if (!(target instanceof HTMLElement)) {
    return noop;
  }

  const { restore, inners } = splitIntoWords(target);
  if (inners.length === 0) {
    return restore;
  }

  if (prefersReducedMotion()) {
    gsap.set(inners, { yPercent: 0 });
    return restore;
  }

  registerPlugins();

  const {
    duration = durations.slow,
    delay = 0,
    ease = easings.decelerate,
    stagger = 0.06,
    trigger = 'load',
    start = 'top 90%',
  } = options;

  const tween = gsap.fromTo(
    inners,
    { yPercent: 110 },
    {
      yPercent: 0,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger:
        trigger === 'scroll'
          ? { trigger: target, start, toggleActions: 'play none none none' }
          : undefined,
    },
  );

  return () => {
    killScrollTriggerFor(tween);
    tween.kill();
    restore();
  };
};

export type RevealLinesOptions = {
  duration?: number;
  delay?: number;
  ease?: string;
  /** Stagger between line reveals (s). */
  stagger?: number;
  /** Vertical travel of each line (px). */
  y?: number;
  /** `'load'` plays immediately on mount; `'scroll'` waits for the viewport. */
  trigger?: AnimationTrigger;
  /** ScrollTrigger `start`. Only applies when `trigger: 'scroll'`. */
  start?: string;
};

const LINE_EPSILON_PX = 2;

const groupWordsIntoLines = (probes: readonly HTMLElement[]): string[][] => {
  const lines: string[][] = [];
  let currentLine: string[] = [];
  let currentTop = Number.NaN;

  for (const probe of probes) {
    const top = probe.offsetTop;
    const word = probe.textContent ?? '';
    const startsNewLine = Number.isNaN(currentTop) || Math.abs(top - currentTop) > LINE_EPSILON_PX;

    if (startsNewLine) {
      if (currentLine.length > 0) {
        lines.push(currentLine);
      }
      currentLine = [word];
      currentTop = top;
    } else {
      currentLine.push(word);
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines;
};

const splitIntoLines = (
  target: HTMLElement,
): { restore: () => void; inners: HTMLElement[] } | null => {
  const originalHTML = target.innerHTML;
  const originalText = target.textContent ?? '';
  const words = originalText.trim().split(WORD_SPLIT_REGEX).filter(Boolean);
  if (words.length === 0) {
    return null;
  }

  target.setAttribute('aria-label', originalText);

  // First pass: render words as inline-block spans so we can measure where
  // the browser broke each line.
  target.innerHTML = words
    .map((word) => `<span class="ds-line-probe" aria-hidden="true">${word}</span>`)
    .join(' ');

  const restore = () => {
    target.innerHTML = originalHTML;
    target.removeAttribute('aria-label');
  };

  const probes = [...target.querySelectorAll<HTMLElement>('.ds-line-probe')];
  if (probes.length === 0) {
    restore();
    return null;
  }

  const lines = groupWordsIntoLines(probes);

  // Second pass: replace probes with masked line containers.
  target.innerHTML = lines
    .map(
      (line) =>
        `<span class="ds-reveal-line" aria-hidden="true"><span class="ds-reveal-line__inner">${line.join(' ')}</span></span>`,
    )
    .join('');

  const inners = [...target.querySelectorAll<HTMLElement>('.ds-reveal-line__inner')];
  if (inners.length === 0) {
    restore();
    return null;
  }

  return { restore, inners };
};

/**
 * Splits body copy into the lines that the browser actually rendered, then
 * fades each line up. Lines are computed after layout by grouping word
 * spans by their `offsetTop`, so wrapping behavior matches the live width.
 *
 * Use for hero subtitles and editorial body text. Defaults to playing on
 * load; pass `trigger: 'scroll'` for paragraphs that should arrive on
 * scroll.
 *
 * @param target Block-level text element to split and animate.
 * @param options Reveal animation overrides.
 * @returns A teardown function that kills the tween and restores the text.
 */
export const revealLines = (
  target: Element | null,
  options: RevealLinesOptions = {},
): AnimationTeardown => {
  if (!(target instanceof HTMLElement)) {
    return noop;
  }

  const split = splitIntoLines(target);
  if (!split) {
    return noop;
  }

  if (prefersReducedMotion()) {
    gsap.set(split.inners, { yPercent: 0, autoAlpha: 1 });
    return split.restore;
  }

  registerPlugins();

  const {
    duration = durations.slow,
    delay = 0,
    ease = easings.decelerate,
    stagger = 0.09,
    y = 110,
    trigger = 'load',
    start = 'top 85%',
  } = options;

  const tween = gsap.fromTo(
    split.inners,
    { yPercent: y, autoAlpha: 0 },
    {
      yPercent: 0,
      autoAlpha: 1,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger:
        trigger === 'scroll'
          ? { trigger: target, start, toggleActions: 'play none none none' }
          : undefined,
    },
  );

  return () => {
    killScrollTriggerFor(tween);
    tween.kill();
    split.restore();
  };
};

export type MarqueeOptions = {
  /** Loop duration in seconds. Lower = faster. */
  duration?: number;
  /** Loop direction. */
  direction?: 'left' | 'right';
};

/**
 * Animates a horizontal marquee strip. Expects two visually identical
 * tracks side-by-side under `container` so the loop stays seamless.
 *
 * @param container Element holding the duplicated tracks.
 * @param options Marquee overrides.
 * @returns A teardown function that kills the tween.
 */
export const marquee = (
  container: Element | null,
  options: MarqueeOptions = {},
): AnimationTeardown => {
  if (!(container instanceof HTMLElement)) {
    return noop;
  }

  if (prefersReducedMotion()) {
    return noop;
  }

  const { duration = 24, direction = 'left' } = options;
  const fromPercent = direction === 'left' ? 0 : -50;
  const toPercent = direction === 'left' ? -50 : 0;

  const tween = gsap.fromTo(
    container,
    { xPercent: fromPercent },
    { xPercent: toPercent, duration, ease: 'none', repeat: -1 },
  );

  return () => {
    tween.kill();
  };
};
