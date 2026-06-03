'use client';

/**
 * DoomedSection — "Are we doomed?" editorial scene per Figma section-doomed.
 * The eye illustration is always in the document (native img). On scroll it
 * rises into place; copy and CTA follow below in normal page flow.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/common/Button';
import { RevealHeading } from '@/components/common/RevealHeading';
import { RevealLines } from '@/components/common/RevealLines';
import { cn } from '@/lib/cn';

export type DoomedSectionProps = {
  illustrationSrc?: string;
  preorderHref?: string;
  className?: string;
};

const DEFAULT_ILLUSTRATION = '/assets/images/doomed-illustration.png';

const EDITORIAL_BODY =
  'font-ds-editorial text-center text-[clamp(1.125rem,2.5vw,2.25rem)] leading-snug text-[#dadada] text-balance';

export const DoomedSection = (props: DoomedSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const riseTrackRef = useRef<HTMLDivElement | null>(null);
  const motionRef = useRef<HTMLDivElement | null>(null);

  const illustrationSrc = props.illustrationSrc ?? DEFAULT_ILLUSTRATION;
  const preorderHref = props.preorderHref ?? '#preorder';

  useEffect(() => {
    const section = sectionRef.current;
    const riseTrack = riseTrackRef.current;
    const motion = motionRef.current;
    let cleanup: (() => void) | undefined;

    if (section && riseTrack && motion) {
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        gsap.set(motion, { y: 0, autoAlpha: 1 });
      } else {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          gsap.fromTo(
            motion,
            { yPercent: 28 },
            {
              yPercent: 0,
              ease: 'power2.out',
              immediateRender: false,
              scrollTrigger: {
                trigger: riseTrack,
                start: 'top 90%',
                end: 'top 30%',
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }, section);

        const refresh = () => {
          ScrollTrigger.refresh();
        };
        const img = motion.querySelector('img');
        img?.addEventListener('load', refresh, { once: true });
        window.addEventListener('load', refresh);

        cleanup = () => {
          window.removeEventListener('load', refresh);
          ctx.revert();
        };
      }
    }

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn('bg-black text-[#dadada]', props.className)}
      aria-labelledby="doomed-section-heading"
    >
      <div ref={riseTrackRef} className="relative px-6 pt-16 pb-8 sm:pt-20 sm:pb-12">
        <div ref={motionRef} className="mx-auto w-full max-w-[772px] will-change-transform">
          <figure className="relative w-full overflow-hidden rounded-ds-3xl">
            <img
              src={illustrationSrc}
              alt="Surreal illustration of a giant eye over a house on a vaporwave horizon"
              width={772}
              height={881}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="block h-auto w-full"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 from-[19%] to-transparent to-[34%]"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-6 text-center font-ds-editorial text-[clamp(1.75rem,4vw,2.5rem)] leading-snug text-[#dadada]">
              Are we doomed?
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-24 sm:pb-32">
        <div className="flex w-full max-w-[531px] flex-col gap-14 sm:gap-16">
          <RevealLines trigger="scroll" className={EDITORIAL_BODY}>
            {`This book was written with the modest goal of preserving your humanity.

I don't think that I can help you keep your job or preserve your privacy.

Your privacy is already gone, and your job is questionable.`}
          </RevealLines>

          <RevealLines trigger="scroll" className={EDITORIAL_BODY} delay={0.08}>
            {`Artificial Intelligence, robots, nanotech, biotech, and who knows what else is developing rapidly and the effects are pervasive.

But remaining human, that's something we can all strive for.`}
          </RevealLines>
        </div>

        <RevealHeading
          as="h2"
          id="doomed-section-heading"
          trigger="scroll"
          className="mt-20 max-w-[797px] text-center font-ds-editorial text-[clamp(2.5rem,8vw,6rem)] leading-[0.97] font-normal text-balance text-[#dadada] sm:mt-24"
        >
          Cheer up. It's worse than you think.
        </RevealHeading>

        <div className="mt-14 sm:mt-16">
          <Button
            href={preorderHref}
            variant="outline"
            size="md"
            className="h-14 min-w-[306px] rounded-ds-full border-2 border-[#f5f5f5] bg-transparent px-10 font-ds-sans text-sm font-medium tracking-normal text-[#f5f5f5] hover:bg-white/10"
          >
            Pre-Order Now
          </Button>
        </div>
      </div>
    </section>
  );
};
