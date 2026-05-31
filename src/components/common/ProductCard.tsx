/**
 * ProductCard — image-led card for product display.
 *
 * Uses `next/image` for optimized images. Renders the image inside a
 * fixed-aspect frame so grids stay aligned regardless of source ratio.
 * Optional badge, rating, and CTA slots keep the surface composable.
 */

import Image from 'next/image';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { cn } from '@/lib/cn';

export type ProductCardProps = {
  name: string;
  description?: string;
  /** Public path or remote URL accepted by `next/image`. */
  imageSrc: string;
  imageAlt: string;
  price?: string;
  /** Optional struck-through original price for sale display. */
  originalPrice?: string;
  /** Short badge label (e.g. "New", "Sale"). */
  badge?: string;
  /** Numeric rating from 0–5; rendered as text next to a star icon. */
  rating?: number;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  className?: string;
};

const formatRating = (value: number): string => {
  const clamped = Math.min(5, Math.max(0, value));
  return clamped.toFixed(1);
};

export const ProductCard = (props: ProductCardProps) => (
  <Card
    tone="default"
    padding="none"
    interactive
    className={cn('overflow-hidden', props.className)}
  >
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-ds-muted">
      <Image
        src={props.imageSrc}
        alt={props.imageAlt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
      {props.badge ? (
        <span className="absolute top-3 left-3 inline-flex items-center rounded-ds-full bg-ds-foreground px-2.5 py-1 text-xs font-semibold text-ds-background">
          {props.badge}
        </span>
      ) : null}
    </div>

    <div className="flex flex-col gap-3 p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg leading-snug font-semibold tracking-tight">{props.name}</h3>
        {typeof props.rating === 'number' ? (
          <span
            className="inline-flex items-center gap-1 text-sm text-ds-muted-foreground"
            aria-label={`Rating ${formatRating(props.rating)} out of 5`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="text-ds-warning"
            >
              <path d="M12 17.27l5.18 3.24-1.64-6.81L20 8.99l-7.02-.6L12 2 9.02 8.39 2 8.99l4.46 4.71-1.64 6.81z" />
            </svg>
            {formatRating(props.rating)}
          </span>
        ) : null}
      </div>

      {props.description ? (
        <p className="line-clamp-2 text-sm text-ds-muted-foreground">{props.description}</p>
      ) : null}

      {props.price ? (
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold tracking-tight">{props.price}</span>
          {props.originalPrice ? (
            <span className="text-sm text-ds-muted-foreground line-through">
              {props.originalPrice}
            </span>
          ) : null}
        </div>
      ) : null}

      {props.ctaLabel ? (
        <Button
          size="sm"
          variant="outline"
          onClick={props.onCtaClick}
          {...(props.ctaHref ? { href: props.ctaHref } : {})}
          className="mt-1 w-full"
        >
          {props.ctaLabel}
        </Button>
      ) : null}
    </div>
  </Card>
);
