/**
 * Button — primary interactive primitive for the landing surface.
 *
 * Variants: `primary | secondary | outline | ghost`.
 * Sizes: `sm | md | lg`. Medium matches the designer's canonical CTA
 * spec (44px tall, 12/15px padding, 12px radius, bold).
 *
 * Renders a real `<button>` by default and an `<a>` when `href` is set.
 * Supports optional left/right icon slots. All visual values are sourced
 * from the design tokens via Tailwind's CSS-variable utilities.
 */

import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-ds-primary text-ds-primary-foreground hover:brightness-105 focus-visible:ring-ds-primary/40',
  secondary:
    'bg-ds-secondary text-ds-secondary-foreground hover:bg-ds-muted focus-visible:ring-ds-primary/30',
  outline:
    'border border-ds-border bg-transparent text-ds-foreground hover:bg-ds-muted focus-visible:ring-ds-primary/30',
  ghost: 'bg-transparent text-ds-foreground hover:bg-ds-muted focus-visible:ring-ds-primary/30',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 pl-2.5 pr-3 text-sm gap-1.5',
  md: 'h-11 pl-3 pr-[15px] py-[15px] text-base gap-2',
  lg: 'h-14 pl-5 pr-6 py-4 text-lg gap-2.5',
};

const baseClasses =
  'inline-flex items-center justify-center rounded-ds-lg font-bold transition-[opacity,background-color,box-shadow,color,filter] duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background disabled:pointer-events-none disabled:opacity-50 select-none';

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps | 'href'> & {
    href?: undefined;
  };

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href'> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = (props: ButtonProps) => {
  const {
    variant = 'primary',
    size = 'md',
    leftIcon,
    rightIcon,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);

  const content = (
    <>
      {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}
      <span className="relative z-[1]">{children}</span>
      {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
    </>
  );

  if (typeof rest.href === 'string') {
    const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <a href={href} className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { type, ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button type={type ?? 'button'} className={classes} {...buttonProps}>
      {content}
    </button>
  );
};
