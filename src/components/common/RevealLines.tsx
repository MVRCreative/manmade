'use client';

/**
 * RevealLines — body copy whose visually rendered lines fade up in
 * sequence. Wraps the shared `revealLines` GSAP helper.
 *
 * Lines are computed from the live layout, so wrapping behavior matches
 * whatever width the container ends up at on first paint. Re-runs if the
 * text content changes; resize is intentionally not handled to avoid
 * jitter mid-read — for hero copy this matches the desired feel.
 *
 * Defaults to `trigger: 'load'` for hero subtitles; pass `'scroll'` for
 * paragraphs that should arrive on enter.
 */

import { createElement, useEffect, useRef } from 'react';
import type { AnimationTrigger, RevealLinesOptions } from '@/lib/animations';
import { revealLines } from '@/lib/animations';

type RevealLinesTag = 'p' | 'div' | 'span';

export type RevealLinesProps = {
  as?: RevealLinesTag;
  children: string;
  className?: string;
  trigger?: AnimationTrigger;
  delay?: number;
  duration?: number;
  stagger?: number;
  /** Forwarded to ScrollTrigger when `trigger: 'scroll'`. */
  start?: string;
};

export const RevealLines = (props: RevealLinesProps) => {
  const Tag = props.as ?? 'p';
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const options: RevealLinesOptions = {
      trigger: props.trigger ?? 'load',
      delay: props.delay,
      duration: props.duration,
      stagger: props.stagger,
      start: props.start,
    };
    return revealLines(ref.current, options);
  }, [props.children, props.trigger, props.delay, props.duration, props.stagger, props.start]);

  return createElement(Tag, { ref, className: props.className }, props.children);
};
