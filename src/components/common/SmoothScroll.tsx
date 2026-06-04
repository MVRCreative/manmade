'use client';

/**
 * SmoothScroll — wires Lenis to the document scroll and drives GSAP's
 * `ScrollTrigger` from Lenis ticks so scroll-driven animations stay in
 * sync with the smoothed scroll.
 *
 * Mount once near the root of any page that wants smooth scrolling.
 * Honors `prefers-reduced-motion` and skips Lenis on touch devices where
 * it fights native scrolling and ScrollTrigger.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect } from 'react';
import { shouldEnableSmoothScroll } from '@/lib/motion-prefs';

export type SmoothScrollProps = {
  /** Scroll feel (Lenis `lerp`). Lower = smoother, higher = snappier. */
  lerp?: number;
  /** Multiplier applied to wheel/touch deltas. */
  wheelMultiplier?: number;
  children?: React.ReactNode;
};

const setupSmoothScroll = (lerp: number, wheelMultiplier: number): (() => void) => {
  if (!shouldEnableSmoothScroll()) {
    return () => {
      // Native scroll — no teardown required.
    };
  }

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ lerp, wheelMultiplier });

  const onScroll = () => {
    ScrollTrigger.update();
  };
  lenis.on('scroll', onScroll);

  const ticker = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.off('scroll', onScroll);
    gsap.ticker.remove(ticker);
    lenis.destroy();
  };
};

export const SmoothScroll = (props: SmoothScrollProps) => {
  useEffect(() => {
    const lerp = props.lerp ?? 0.1;
    const wheelMultiplier = props.wheelMultiplier ?? 1;
    return setupSmoothScroll(lerp, wheelMultiplier);
  }, [props.lerp, props.wheelMultiplier]);

  return <>{props.children}</>;
};
