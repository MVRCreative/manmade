'use client';

/**
 * CopyButton — copies a token value to the clipboard with a brief
 * confirmation state. Designed for the design-system reference page so
 * raw token strings can be lifted into code with one click.
 */

import { useState } from 'react';
import { cn } from '@/lib/cn';

export type CopyButtonProps = {
  text: string;
  copyLabel: string;
  copiedLabel: string;
  ariaLabel: string;
  className?: string;
};

export const CopyButton = (props: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(props.text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <button
      type="button"
      onClick={() => {
        void handleCopy();
      }}
      aria-label={props.ariaLabel}
      className={cn(
        'inline-flex shrink-0 items-center rounded-ds-sm px-2 py-0.5 font-ds-mono text-[11px] uppercase tracking-wide text-ds-muted-foreground transition-colors hover:bg-ds-muted hover:text-ds-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-primary/40',
        props.className,
      )}
    >
      {copied ? props.copiedLabel : props.copyLabel}
    </button>
  );
};
