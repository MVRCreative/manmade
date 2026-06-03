/**
 * FooterSection — final Canon Press CTA per Figma `footer` (8697:244).
 * Centered logo and outline pill link to the Canon book shop.
 */

import { cn } from '@/lib/cn';

export type FooterSectionProps = {
  logoSrc?: string;
  shopHref?: string;
  className?: string;
};

const DEFAULT_LOGO = '/assets/images/footer/canon-press-logo.svg';

export const FooterSection = (props: FooterSectionProps) => {
  const logoSrc = props.logoSrc ?? DEFAULT_LOGO;
  const shopHref = props.shopHref ?? 'https://canonpress.com/';

  return (
    <footer
      className={cn(
        'flex min-h-[min(480px,60svh)] flex-col items-center justify-center gap-[49px] bg-black px-6 py-24 sm:min-h-[50svh] sm:py-32',
        props.className,
      )}
    >
      <img
        src={logoSrc}
        alt="Canon Press"
        width={31}
        height={72}
        className="h-[4.4878125rem] w-[1.93rem] shrink-0 object-contain"
        loading="lazy"
        decoding="async"
      />

      <a
        href={shopHref}
        className="inline-flex h-[55px] w-[306px] max-w-full items-center justify-center rounded-[55px] border-2 border-white bg-transparent px-6 text-center font-ds-sans text-sm leading-6 font-medium text-[#f5f5f5] transition-colors duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
      >
        Shop More Canon Books
      </a>
    </footer>
  );
};
