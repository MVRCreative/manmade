/**
 * OfferCard — promotional card with badge, title, description, price,
 * and a primary CTA. Designed for pricing strips, deal grids, and
 * cross-sell sections on landing pages.
 */

import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { cn } from '@/lib/cn';

export type OfferCardProps = {
  title: string;
  description: string;
  price: string;
  /** Optional struck-through original price. */
  originalPrice?: string;
  /** Optional cadence label rendered next to the price (e.g. "/mo"). */
  priceSuffix?: string;
  /** Short badge label (e.g. "Best value"). */
  badge?: string;
  /** Highlights the card and uses the inverted tone. */
  highlighted?: boolean;
  ctaLabel: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  className?: string;
};

export const OfferCard = (props: OfferCardProps) => {
  const isHighlighted = props.highlighted ?? false;
  const tone = isHighlighted ? 'inverted' : 'default';
  const ctaVariant = isHighlighted ? 'secondary' : 'primary';

  const priceColor = isHighlighted ? 'text-ds-background' : 'text-ds-foreground';
  const descriptionColor = isHighlighted ? 'text-ds-background/80' : 'text-ds-muted-foreground';
  const originalPriceColor = isHighlighted ? 'text-ds-background/60' : 'text-ds-muted-foreground';

  return (
    <Card
      tone={tone}
      padding="lg"
      interactive
      className={cn('relative', isHighlighted && 'ring-2 ring-ds-primary', props.className)}
      header={
        props.badge ? (
          <span
            className={cn(
              'inline-flex items-center rounded-ds-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
              isHighlighted
                ? 'bg-ds-background text-ds-foreground'
                : 'bg-ds-primary/10 text-ds-primary',
            )}
          >
            {props.badge}
          </span>
        ) : null
      }
      footer={
        <Button
          variant={ctaVariant}
          size="md"
          onClick={props.onCtaClick}
          {...(props.ctaHref ? { href: props.ctaHref } : {})}
          className="w-full"
        >
          {props.ctaLabel}
        </Button>
      }
    >
      <h3 className="text-2xl font-semibold tracking-tight">{props.title}</h3>
      <p className={cn('mt-2 text-sm leading-relaxed', descriptionColor)}>{props.description}</p>

      <div className="mt-6 flex items-baseline gap-2">
        <span className={cn('text-4xl font-bold tracking-tight', priceColor)}>{props.price}</span>
        {props.priceSuffix ? (
          <span className={cn('text-sm', descriptionColor)}>{props.priceSuffix}</span>
        ) : null}
        {props.originalPrice ? (
          <span className={cn('ml-auto text-sm line-through', originalPriceColor)}>
            {props.originalPrice}
          </span>
        ) : null}
      </div>
    </Card>
  );
};
