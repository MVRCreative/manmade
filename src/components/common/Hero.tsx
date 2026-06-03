'use client';

/**
 * Hero — "Stay Human" opener. Words and head enter on load; the frame pins
 * in place while scroll only scrubs the head video. Then the page scrolls on
 * to the next section.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';
import { durations, easings } from '@/lib/design-tokens';

export type HeroProps = {
  leadWord?: string;
  trailWord?: string;
  videoSrc?: string;
  videoPoster?: string;
  /** Scroll distance while pinned; maps to full video length. */
  scrubScrollEnd?: string;
  className?: string;
};

const DEFAULT_VIDEO = '/assets/videos/website-banner.mp4';
const DEFAULT_SCRUB_END = '+=200%';

const WORD_CLASS =
  'font-ds-display text-[clamp(2.75rem,9vw,82px)] leading-none font-normal tracking-[0.2em] text-white/70 uppercase select-none';

export const Hero = (props: HeroProps) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const leadRef = useRef<HTMLSpanElement | null>(null);
  const trailRef = useRef<HTMLSpanElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const lead = props.leadWord ?? 'STAY';
  const trail = props.trailWord ?? 'HUMAN';
  const videoSrc = props.videoSrc ?? DEFAULT_VIDEO;
  const scrubScrollEnd = props.scrubScrollEnd ?? DEFAULT_SCRUB_END;

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    const leadEl = leadRef.current;
    const trailEl = trailRef.current;
    const content = contentRef.current;
    let cleanup: (() => void) | undefined;

    if (root && video && leadEl && trailEl && content) {
      video.pause();
      video.loop = false;
      video.currentTime = 0;

      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        gsap.set([leadEl, trailEl, video], { autoAlpha: 1, x: 0, scale: 1 });
      } else {
        gsap.registerPlugin(ScrollTrigger);

        gsap.set(leadEl, { autoAlpha: 0, x: -28 });
        gsap.set(trailEl, { autoAlpha: 0, x: 28 });
        gsap.set(video, { autoAlpha: 0, scale: 0.96 });

        const loadEntrance = gsap
          .timeline({ defaults: { ease: easings.decelerate, duration: durations.slow } })
          .to(video, { autoAlpha: 1, scale: 1 })
          .to(leadEl, { autoAlpha: 1, x: 0 }, '-=0.55')
          .to(trailEl, { autoAlpha: 1, x: 0 }, '<');

        const ctx = gsap.context(() => {
          const bindScrollScrub = () => {
            const { duration } = video;
            if (!Number.isFinite(duration) || duration <= 0) {
              return;
            }

            gsap.to(video, {
              currentTime: duration,
              ease: 'none',
              scrollTrigger: {
                trigger: root,
                start: 'top top',
                end: scrubScrollEnd,
                pin: true,
                scrub: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });
          };

          if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
            bindScrollScrub();
          } else {
            video.addEventListener('loadedmetadata', bindScrollScrub, { once: true });
          }
        }, root);

        cleanup = () => {
          loadEntrance.kill();
          ctx.revert();
        };
      }
    }

    return () => {
      cleanup?.();
    };
  }, [videoSrc, scrubScrollEnd]);

  return (
    <section
      ref={rootRef}
      aria-label={`${lead} ${trail}`}
      className={cn(
        'relative isolate h-[75svh] min-h-[27.5rem] w-full overflow-hidden rounded-ds-3xl bg-neutral-950',
        props.className,
      )}
    >
      <h1 className="sr-only">{`${lead} ${trail}`}</h1>

      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 size-full object-cover"
        muted
        playsInline
        preload="auto"
        poster={props.videoPoster}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div
        ref={contentRef}
        className="relative z-10 flex size-full flex-col items-center justify-center gap-8 px-6 md:flex-row md:gap-[clamp(1.5rem,4vw,52px)]"
      >
        <span ref={leadRef} className={cn(WORD_CLASS, 'md:pr-2')}>
          {lead}
        </span>
        <div className="hidden w-[clamp(200px,28vw,462px)] shrink-0 md:block" aria-hidden="true" />
        <span ref={trailRef} className={cn(WORD_CLASS, 'md:pl-2')}>
          {trail}
        </span>
      </div>
    </section>
  );
};
