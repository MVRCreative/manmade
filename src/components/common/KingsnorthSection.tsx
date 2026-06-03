'use client';

/**
 * KingsnorthSection — Paul Kingsnorth endorsement per Figma `section-kingsnorth`.
 * Portrait and book cover overlap the section above via negative top margin.
 */

import { RevealLines } from '@/components/common/RevealLines';
import { cn } from '@/lib/cn';

export type KingsnorthSectionProps = {
  portraitSrc?: string;
  bookSrc?: string;
  className?: string;
};

const DEFAULT_PORTRAIT = '/assets/images/kingsnorth-section/portrait.png';
const DEFAULT_BOOK = '/assets/images/kingsnorth-section/book-against-the-machine.png';

const QUOTE =
  '“The digital apocalypse which is enfolding us is the vital spiritual test of our age. This book will wake every Christian up to the challenge we face, and what we need to do about it.”';

export const KingsnorthSection = (props: KingsnorthSectionProps) => {
  const portraitSrc = props.portraitSrc ?? DEFAULT_PORTRAIT;
  const bookSrc = props.bookSrc ?? DEFAULT_BOOK;

  return (
    <section
      className={cn('relative z-20 bg-black text-[#b4b4b4]', props.className)}
      aria-labelledby="kingsnorth-section-heading"
    >
      <div className="mx-auto max-w-[531px] px-6 pb-24 sm:pb-32">
        <div className="relative mx-auto -mt-[8.3125rem] mb-10 h-[262px] w-full max-w-[280px] sm:mb-12">
          <img
            src={portraitSrc}
            alt="Paul Kingsnorth"
            width={196}
            height={262}
            className="absolute top-0 right-0 h-[262px] w-[196px] rounded-ds-xl object-cover"
            loading="lazy"
            decoding="async"
          />
          <img
            src={bookSrc}
            alt="Against the Machine by Paul Kingsnorth"
            width={127}
            height={192}
            className="absolute top-[75px] left-0 z-10 h-[192px] w-[127px] rounded-ds-md object-cover shadow-ds-lg"
            loading="lazy"
            decoding="async"
          />
        </div>

        <p
          id="kingsnorth-section-heading"
          className="text-center font-ds-editorial text-[clamp(1.75rem,4vw,2.25rem)] tracking-wide text-[#b4b4b4] uppercase"
        >
          Paul Kingsnorth
        </p>

        <p className="mt-3 text-center font-ds-sans text-xs font-semibold tracking-[0.12em] text-[#b4b4b4] uppercase">
          NYT bestselling author of Against the Machine
        </p>

        <RevealLines
          trigger="scroll"
          className="mt-14 text-center font-ds-editorial text-[clamp(1.125rem,2.5vw,2.25rem)] leading-snug text-balance text-[#b4b4b4] sm:mt-16"
        >
          {QUOTE}
        </RevealLines>
      </div>
    </section>
  );
};
