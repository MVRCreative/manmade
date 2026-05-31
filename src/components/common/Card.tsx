/**
 * Card — flexible surface for grouping content.
 *
 * Composable via header/body/footer slots or freeform `children`.
 * Tone (`default | muted | inverted`) controls the surface color and
 * elevation. Borders, radii, and shadows are token-driven.
 */

import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type CardTone = 'default' | 'muted' | 'inverted';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

const toneClasses: Record<CardTone, string> = {
  default: 'bg-ds-card text-ds-card-foreground border border-ds-border',
  muted: 'bg-ds-muted text-ds-foreground border border-transparent',
  inverted: 'bg-ds-foreground text-ds-background border border-transparent',
};

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8 sm:p-10',
};

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: CardTone;
  padding?: CardPadding;
  /** Adds an elevated shadow that lifts on hover. */
  interactive?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export const Card = (props: CardProps) => {
  const {
    tone = 'default',
    padding = 'md',
    interactive = false,
    header,
    footer,
    className,
    children,
    ...rest
  } = props;

  return (
    <div
      className={cn(
        'rounded-ds-2xl flex flex-col',
        toneClasses[tone],
        paddingClasses[padding],
        interactive
          ? 'transition-[transform,box-shadow] duration-300 ease-out shadow-ds-sm hover:-translate-y-0.5 hover:shadow-ds-lg'
          : 'shadow-ds-sm',
        className,
      )}
      {...rest}
    >
      {header ? <div className="mb-4">{header}</div> : null}
      <div className={cn('flex-1', !header && !footer ? '' : 'min-h-0')}>{children}</div>
      {footer ? <div className="mt-6 border-t border-ds-border/60 pt-4">{footer}</div> : null}
    </div>
  );
};
