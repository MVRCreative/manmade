'use client';

/**
 * Stagger — wraps a group whose direct children should animate in with a
 * staggered fade-up. Designed for grids, button rows, badge clusters, and
 * card decks where the eye should follow a sequence rather than process a
 * blast.
 *
 * Defaults to `trigger: 'scroll'` for grids further down the page. Pass
 * `trigger: 'load'` for above-the-fold groups (hero CTAs, hero badges).
 *
 * Targets immediate children by default; pass `select` to target a
 * different subset (e.g. `[data-stagger-item]`).
 */

import type { ElementType, HTMLAttributes } from 'react';
import { createElement, useEffect, useRef } from 'react';
import type { AnimationTrigger, StaggerGridOptions } from '@/lib/animations';
import { staggerGrid } from '@/lib/animations';

export type StaggerProps = HTMLAttributes<HTMLElement> & {
  /** Tag rendered for the wrapper. Defaults to `div`. */
  as?: ElementType;
  /** CSS selector for children to animate. Defaults to direct children. */
  select?: string;
  trigger?: AnimationTrigger;
  delay?: number;
  duration?: number;
  /** Time (s) between each child's animation. */
  stagger?: number;
  /** Vertical travel of each child (px). */
  y?: number;
  ease?: string;
  /** Forwarded to ScrollTrigger when `trigger: 'scroll'`. */
  start?: string;
};

const DEFAULT_SELECT = ':scope > *';

export const Stagger = (props: StaggerProps) => {
  const {
    as,
    select,
    trigger,
    delay,
    duration,
    stagger,
    y,
    ease,
    start,
    children,
    className,
    ...rest
  } = props;

  const Tag = as ?? 'div';
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const options: StaggerGridOptions = {
      trigger: trigger ?? 'scroll',
      delay,
      duration,
      stagger,
      y,
      ease,
      start,
    };
    return staggerGrid(ref.current, select ?? DEFAULT_SELECT, options);
  }, [select, trigger, delay, duration, stagger, y, ease, start]);

  return createElement(Tag, { ref, className, ...rest }, children);
};
