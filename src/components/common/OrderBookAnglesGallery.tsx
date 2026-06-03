/**
 * OrderBookAnglesGallery — right column of `section-order` (8697:161).
 * Self-contained vertical scroll with snap (paginated feel); does not
 * block page scroll to the footer.
 */

import { cn } from '@/lib/cn';

/** Figma `section-order` height (8697:161). */
export const ORDER_SECTION_HEIGHT_PX = 720;

export type OrderBookAnglesGalleryProps = {
  angles?: readonly string[];
  className?: string;
};

const DEFAULT_BOOK_ANGLES = [
  '/assets/images/order-section/book-angle-01.png',
  '/assets/images/order-section/book-angle-02.png',
  '/assets/images/order-section/book-angle-03.png',
  '/assets/images/order-section/book-angle-04.png',
  '/assets/images/order-section/book-angle-05.png',
] as const;

const BOOK_ANGLE_ALTS = [
  'Manmade book, front three-quarter view',
  'Manmade book, angled floating view',
  'Manmade book, open with illustration',
  'Manmade book, open to contents',
  'Manmade book, open to chapter text',
] as const;

export const OrderBookAnglesGallery = (props: OrderBookAnglesGalleryProps) => {
  const angles = props.angles ?? DEFAULT_BOOK_ANGLES;

  return (
    <div
      className={cn(
        'flex h-[720px] min-h-0 items-stretch justify-center bg-[#f1f1f1] px-6 lg:h-full lg:px-[5.6875rem]',
        props.className,
      )}
    >
      <div
        data-lenis-prevent
        className="h-full w-full max-w-[502px] snap-y snap-mandatory overflow-y-auto overscroll-y-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Book angles"
        tabIndex={0}
      >
        {angles.map((src, index) => (
          <div
            key={src}
            className="flex h-full min-h-[720px] shrink-0 snap-center snap-always items-center justify-center"
          >
            <img
              src={src}
              alt={BOOK_ANGLE_ALTS[index] ?? 'Manmade book'}
              width={502}
              height={580}
              className="max-h-[580px] w-full object-contain"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
