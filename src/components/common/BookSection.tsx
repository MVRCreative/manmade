'use client';

/**
 * BookSection — Manmade book reveal per Figma `section-book`.
 * Publication logos, 3D cover mockup, and synthwave grid background.
 */

import { Stagger } from '@/components/common/Stagger';
import { cn } from '@/lib/cn';

export type BookSectionLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BookSectionProps = {
  backgroundSrc?: string;
  bookSrc?: string;
  logos?: readonly BookSectionLogo[];
  className?: string;
};

const DEFAULT_BACKGROUND = '/assets/images/book-section/background.png';
const DEFAULT_BOOK = '/assets/images/book-section/book-mockup.png';

const DEFAULT_LOGOS: readonly BookSectionLogo[] = [
  {
    src: '/assets/images/book-section/logo-touchstone.png',
    alt: 'Touchstone',
    width: 160,
    height: 41,
  },
  {
    src: '/assets/images/book-section/logo-relevant.png',
    alt: 'RELEVANT',
    width: 105,
    height: 28,
  },
  {
    src: '/assets/images/book-section/logo-first-things.svg',
    alt: 'First Things',
    width: 150,
    height: 27,
  },
];

export const BookSection = (props: BookSectionProps) => {
  const backgroundSrc = props.backgroundSrc ?? DEFAULT_BACKGROUND;
  const bookSrc = props.bookSrc ?? DEFAULT_BOOK;
  const logos = props.logos ?? DEFAULT_LOGOS;

  return (
    <section
      className={cn('relative isolate overflow-x-hidden bg-black', props.className)}
      aria-label="Manmade book"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-[30%] bottom-0 sm:top-[35%]">
        <img
          src={backgroundSrc}
          alt=""
          width={1398}
          height={667}
          className="size-full object-cover object-bottom"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center px-6 pt-12 pb-20 sm:pt-16 sm:pb-28">
        <Stagger
          className="mb-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:mb-14 sm:gap-x-14"
          stagger={0.1}
          y={20}
          trigger="scroll"
          start="top 92%"
        >
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-auto max-h-11 w-auto max-w-[160px] object-contain"
              loading="eager"
              decoding="async"
            />
          ))}
        </Stagger>

        <Stagger trigger="scroll" stagger={0.06} y={32} delay={0.12} className="w-full">
          <img
            src={bookSrc}
            alt="Manmade by C.R. Wiley — book cover"
            width={569}
            height={853}
            className="mx-auto h-auto w-full max-w-[569px]"
            loading="lazy"
            decoding="async"
          />
        </Stagger>
      </div>
    </section>
  );
};
