'use client';

/**
 * RevealHeading — a heading whose words rise into view behind a clipping
 * mask. Wraps the shared `revealHeading` GSAP helper so pages don't need
 * to manage refs or effects for the common case.
 *
 * Defaults to `trigger: 'load'` for above-the-fold heroes; pass
 * `trigger: 'scroll'` for headings further down the page.
 *
 * Usage:
 *   <RevealHeading as="h1" className="text-5xl">…</RevealHeading>
 */

import { useEffect, useRef } from 'react';
import type { AnimationTrigger, RevealHeadingOptions } from '@/lib/animations';
import { revealHeading } from '@/lib/animations';

type RevealHeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type RevealHeadingProps = {
  as?: RevealHeadingTag;
  /** Plain text — kept as a string so the splitter can wrap each word. */
  children: string;
  className?: string;
  trigger?: AnimationTrigger;
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  /** Forwarded to ScrollTrigger when `trigger: 'scroll'`. */
  start?: string;
  id?: string;
};

export const RevealHeading = (props: RevealHeadingProps) => {
  const Tag = props.as ?? 'h2';
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const options: RevealHeadingOptions = {
      trigger: props.trigger ?? 'load',
      delay: props.delay,
      duration: props.duration,
      stagger: props.stagger,
      ease: props.ease,
      start: props.start,
    };
    return revealHeading(ref.current, options);
  }, [
    props.children,
    props.trigger,
    props.delay,
    props.duration,
    props.stagger,
    props.ease,
    props.start,
  ]);

  return (
    <Tag ref={ref} id={props.id} className={props.className}>
      {props.children}
    </Tag>
  );
};
