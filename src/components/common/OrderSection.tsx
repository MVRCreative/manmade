'use client';

/**
 * OrderSection — purchase block per Figma `section-order` (8697:161).
 * 720px row, two columns: white product panel (left), snap-scrolling
 * book angles in the right column only.
 */

import { useId, useState } from 'react';
import { OrderBookAnglesGallery } from '@/components/common/OrderBookAnglesGallery';
import { cn } from '@/lib/cn';

export type OrderSectionProps = {
  bookAngles?: readonly string[];
  preorderHref?: string;
  price?: string;
  shipDate?: string;
  className?: string;
};

const DESCRIPTION_LEAD = 'Your Perilous Tour of the Future Starts Here';

const DESCRIPTION_PARAGRAPHS = [
  <>
    In <em>Manmade</em> you will see wonders you won&apos;t believe! No eye has seen, no ear has
    heard! This future of marvels will be crafted by men who believe they are as gods!
  </>,
  <>
    Crime, resolved! Poverty vanished! You will see the State swell into total and complete
    efficacy. At long last, humans will transcend their fleshy limits. Death will be a memory. Heart
    disease, autism, cleft palates, cancer, and red hair will be deficiencies of a tragic past. By
    merging humanity with technology a golden age begins!
  </>,
  <>
    We will finally achieve that sensational paradise called Singularity! A triumph of means over
    ends! And miracle of miracles, Artificial Intelligence will only accelerate these dreams.
  </>,
  <>
    But by the end you will have to decide who you will be in this radical future. Will you take the
    step over your humanity? Or will you accept your limits with gratitude and return to the analog
    world?
  </>,
  <>
    Without further ado, your tour begins now. Do not be alarmed, a guide will be provided to you.
  </>,
] as const;

const ChevronDownIcon = () => (
  <svg
    width="13"
    height="7"
    viewBox="0 0 13 7"
    fill="none"
    aria-hidden="true"
    className="shrink-0 text-[#292929]"
  >
    <path
      d="M1 1L6.5 6L12 1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const OrderDescription = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const triggerId = useId();

  return (
    <div className="w-full border-b-2 border-[#dbdbdb]">
      <button
        id={triggerId}
        type="button"
        className="flex w-full items-center justify-between py-2.5 font-ds-sans text-xs font-bold tracking-[0.18em] text-[#292929] uppercase"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => {
          setIsOpen((open) => !open);
        }}
      >
        Description
        <ChevronDownIcon />
      </button>

      <section
        id={panelId}
        aria-labelledby={triggerId}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 pt-1 pb-6 font-ds-sans text-sm leading-relaxed text-[#292929]">
            <p>{DESCRIPTION_LEAD}</p>
            {DESCRIPTION_PARAGRAPHS.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export const OrderSection = (props: OrderSectionProps) => {
  const preorderHref = props.preorderHref ?? '#preorder';
  const price = props.price ?? '$32.00';
  const shipDate = props.shipDate ?? 'July 21';

  return (
    <section
      className={cn(
        'grid h-auto grid-cols-1 lg:h-[720px] lg:grid-cols-2 lg:overflow-hidden',
        props.className,
      )}
      aria-labelledby="order-section-title"
    >
      <div className="flex min-h-[720px] min-w-0 items-center justify-center bg-white p-2.5 lg:h-full lg:min-h-0 lg:overflow-y-auto">
        <div className="flex w-full max-w-[408px] flex-col gap-3 bg-[#fdfdfd] px-2.5 py-7">
          <p className="font-ds-sans text-sm font-medium text-[#292929]">Canon Press</p>

          <h2
            id="order-section-title"
            className="font-ds-editorial text-[clamp(1.5rem,3vw,2rem)] leading-snug text-[#292929]"
          >
            Manmade: St. Anthony&apos;s Guide to the A.i. Apocalypse
          </h2>

          <div className="flex items-baseline justify-between gap-4 font-ds-sans text-sm font-medium text-[#292929]">
            <span>{price}</span>
            <span className="text-right">C.R. Wiley</span>
          </div>

          <div className="mt-1 flex w-full flex-col items-center gap-8">
            <a
              href={preorderHref}
              className="inline-flex h-[55px] w-full max-w-[320px] items-center justify-center rounded-[55px] bg-[#eb7031] px-6 text-center font-ds-sans text-sm font-medium text-white transition-[filter] duration-200 hover:brightness-105 focus-visible:ring-2 focus-visible:ring-[#eb7031]/50 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <span className="font-bold">Preorder now</span>
              <span>{` — Ships ${shipDate}`}</span>
            </a>

            <OrderDescription />
          </div>
        </div>
      </div>

      <OrderBookAnglesGallery angles={props.bookAngles} />
    </section>
  );
};
