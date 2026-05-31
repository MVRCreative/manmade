'use client';

/**
 * LogoCarousel — infinite horizontal marquee of logos for social-proof
 * sections. Each logo is rendered twice (in two stacked tracks) so the
 * GSAP loop stays seamless. Honors `prefers-reduced-motion` via the
 * shared `marquee` helper.
 */

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { marquee } from '@/lib/animations';
import { cn } from '@/lib/cn';

export type LogoCarouselItem = {
  id: string;
  alt: string;
  src: string;
  width: number;
  height: number;
};

export type LogoCarouselProps = {
  logos: readonly LogoCarouselItem[];
  /** Loop duration in seconds. Lower = faster. */
  speed?: number;
  /** Direction of motion. */
  direction?: 'left' | 'right';
  /** Optional accessible heading for the section. */
  ariaLabel?: string;
  className?: string;
};

export const LogoCarousel = (props: LogoCarouselProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const teardown = marquee(trackRef.current, {
      duration: props.speed ?? 28,
      direction: props.direction ?? 'left',
    });
    return teardown;
  }, [props.speed, props.direction]);

  if (props.logos.length === 0) {
    return null;
  }

  const renderLogos = (keyPrefix: string) =>
    props.logos.map((logo) => (
      <li key={`${keyPrefix}-${logo.id}`} className="shrink-0 px-8">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className="h-8 w-auto opacity-70 transition-opacity duration-200 hover:opacity-100"
        />
      </li>
    ));

  return (
    <section
      aria-label={props.ariaLabel ?? 'Trusted by'}
      className={cn(
        'relative w-full overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        props.className,
      )}
    >
      <div ref={trackRef} className="ds-marquee-track py-2">
        <ul className="flex items-center">{renderLogos('a')}</ul>
        <ul className="flex items-center" aria-hidden="true">
          {renderLogos('b')}
        </ul>
      </div>
    </section>
  );
};
