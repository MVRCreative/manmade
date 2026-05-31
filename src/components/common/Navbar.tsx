/**
 * Navbar — top-of-page navigation shared across the boilerplate's
 * primary surfaces (homepage and design system reference).
 *
 * Logo + wordmark on the left link back to `/`. Route links and the
 * theme toggle sit on the right. Sticky with a subtle blur so content
 * scrolls under it without losing context. Token-driven so it tracks
 * the active light/dark theme automatically.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { cn } from '@/lib/cn';

export type NavLink = {
  href: string;
  label: string;
};

export type NavbarProps = {
  links?: readonly NavLink[];
  className?: string;
};

const defaultLinks: readonly NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/design-system', label: 'Design system' },
];

const isActive = (pathname: string | null, href: string): boolean => {
  if (!pathname) {
    return false;
  }
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
};

export const Navbar = (props: NavbarProps) => {
  const links = props.links ?? defaultLinks;
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'sticky top-0 z-20 border-b border-ds-border/60 bg-ds-background/80 backdrop-blur',
        props.className,
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4"
      >
        <Link
          href="/"
          aria-label="Canon Plus home"
          className="flex items-center gap-3 rounded-ds-md outline-none focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background"
        >
          <Image
            src="/assets/images/canon-plus-logo.png"
            alt="Canon Plus logo"
            width={40}
            height={40}
            priority
            className="size-10"
          />
          <span className="text-sm font-semibold tracking-tight text-ds-foreground">
            Canon Plus
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'inline-flex h-9 items-center rounded-ds-full px-4 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background',
                      active
                        ? 'bg-ds-foreground text-ds-background'
                        : 'text-ds-muted-foreground hover:bg-ds-muted hover:text-ds-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span aria-hidden="true" className="mx-1 h-5 w-px bg-ds-border" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
