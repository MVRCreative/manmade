import Image from 'next/image';
import { Button, Navbar, RevealHeading, RevealLines, Stagger } from '@/components/common';

type Feature = {
  title: string;
  description: string;
  /** Muted, desaturated tile background — never neon. */
  tile: string;
  icon: React.ReactNode;
};

type Step = {
  title: string;
  body: string;
};

type Dependency = {
  name: string;
  description: string;
};

const SwatchesIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const BagIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 8h14l-1.2 11a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

const MotionIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 16c2-4 4-4 8-4s6 0 8-4" />
    <path d="M16 4l4 4-4 4" />
  </svg>
);

const NodesIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="12" cy="18" r="2.5" />
    <path d="M7.8 7.8 11 16M16.2 7.8 13 16" />
  </svg>
);

const DevicesIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="5" width="14" height="10" rx="1.5" />
    <rect x="16" y="9" width="6" height="11" rx="1.5" />
    <path d="M6 19h6" />
  </svg>
);

const BracketsIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m9 6-5 6 5 6" />
    <path d="m15 6 5 6-5 6" />
  </svg>
);

const features: readonly Feature[] = [
  {
    title: 'Design system',
    description: 'Tokens, primitives, and animations that scale across projects.',
    tile: 'oklch(0.30 0.07 250)',
    icon: <SwatchesIcon />,
  },
  {
    title: 'Shopify storefront',
    description: 'Storefront API client wired for products, variants, and carts.',
    tile: 'oklch(0.36 0.07 50)',
    icon: <BagIcon />,
  },
  {
    title: 'GSAP motion',
    description: 'Word, line, and stagger reveals built on a shared easing language.',
    tile: 'oklch(0.28 0.05 200)',
    icon: <MotionIcon />,
  },
  {
    title: 'Figma MCP',
    description: 'Pipe Figma frames into Cursor for design-informed code generation.',
    tile: 'oklch(0.30 0.07 320)',
    icon: <NodesIcon />,
  },
  {
    title: 'Responsive by default',
    description: 'Mobile-first Tailwind utilities with breakpoint discipline baked in.',
    tile: 'oklch(0.34 0.06 145)',
    icon: <DevicesIcon />,
  },
  {
    title: 'TypeScript strict',
    description: 'Full type safety across the surface, with no escape hatches in shipped code.',
    tile: 'oklch(0.26 0 0)',
    icon: <BracketsIcon />,
  },
];

const steps: readonly Step[] = [
  {
    title: 'Tune the tokens',
    body: 'Edit colors, type, spacing, and motion in src/lib/design-tokens.ts — the single source of truth.',
  },
  {
    title: 'Study the system',
    body: 'Open /design-system to see every token, primitive, and animation in their native context.',
  },
  {
    title: 'Compose pages',
    body: 'Drop in Figma frames via MCP, paste the link, and let Cursor build the page against the tokens.',
  },
];

const dependencies: readonly Dependency[] = [
  { name: 'next', description: 'React framework' },
  { name: 'gsap', description: 'Animation engine + ScrollTrigger' },
  { name: 'lenis', description: 'Smooth scroll synced to GSAP' },
  { name: '@shopify/storefront-api-client', description: 'Storefront GraphQL client' },
  { name: 'tailwindcss', description: 'Utility-first CSS' },
  { name: 'typescript', description: 'Strict-mode type safety' },
  { name: 'zod', description: 'Runtime schema validation' },
  { name: 'drizzle-orm', description: 'Type-safe SQL toolkit' },
];

export default function HomePage() {
  return (
    <div className="bg-ds-background text-ds-foreground">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 pt-28 pb-32 text-center sm:pt-36 sm:pb-40">
          <Stagger
            trigger="load"
            stagger={0.08}
            y={14}
            className="flex flex-col items-center gap-6"
          >
            <span className="inline-flex items-center gap-2 rounded-ds-full border border-ds-border bg-ds-muted/60 px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-ds-muted-foreground uppercase">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-ds-primary" />
              Canon Plus boilerplate
            </span>

            <Image
              src="/assets/images/canon-plus-logo.png"
              alt="Canon Plus"
              width={96}
              height={96}
              priority
              className="size-20 sm:size-24"
            />
          </Stagger>

          <RevealHeading
            as="h1"
            delay={0.1}
            className="mt-10 max-w-3xl text-5xl leading-[1.05] font-black tracking-tight text-balance text-ds-foreground sm:text-6xl lg:text-7xl"
          >
            Landing pages that feel crafted.
          </RevealHeading>

          <RevealLines
            as="p"
            delay={0.35}
            className="mt-6 max-w-xl text-base leading-relaxed text-balance text-ds-muted-foreground sm:text-lg"
          >
            A modular foundation for pixel-perfect book and product launches — wired with GSAP
            motion, Shopify, and a strict type system.
          </RevealLines>

          <Stagger
            trigger="load"
            delay={0.55}
            stagger={0.08}
            y={12}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-5"
          >
            <Button size="md" variant="primary" href="/design-system">
              View design system
            </Button>
            <a
              href="https://github.com/ixartz/Next-js-Boilerplate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-ds-muted-foreground underline-offset-4 transition-colors hover:text-ds-foreground hover:underline"
            >
              Read the docs →
            </a>
          </Stagger>
        </div>
      </section>

      <section className="border-t border-ds-border/60 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs font-medium tracking-[0.14em] text-ds-muted-foreground uppercase">
              What's inside
            </p>
            <RevealHeading
              as="h2"
              trigger="scroll"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Everything wired, nothing extra.
            </RevealHeading>
          </div>

          <Stagger
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
            y={24}
          >
            {features.map((feature) => (
              <article
                key={feature.title}
                style={{ backgroundColor: feature.tile }}
                className="flex aspect-[5/4] flex-col justify-between rounded-ds-2xl p-7 text-white sm:aspect-[4/5] sm:p-8"
              >
                <span className="text-white/95">{feature.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/75">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-ds-border/60 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs font-medium tracking-[0.14em] text-ds-muted-foreground uppercase">
              How it works
            </p>
            <RevealHeading
              as="h2"
              trigger="scroll"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Three steps from clone to launch.
            </RevealHeading>
          </div>

          <Stagger as="ol" className="space-y-12" stagger={0.1} y={20}>
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 sm:grid-cols-[5rem_1fr] sm:gap-x-10"
              >
                <span className="font-ds-mono text-2xl font-semibold text-ds-primary tabular-nums sm:text-3xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{step.title}</h3>
                  <p className="mt-2 max-w-xl text-base leading-relaxed text-ds-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-ds-border/60 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-medium tracking-[0.14em] text-ds-muted-foreground uppercase">
              Built on
            </p>
            <RevealHeading
              as="h2"
              trigger="scroll"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              A small, sharp dependency set.
            </RevealHeading>
          </div>

          <Stagger as="ul" className="divide-y divide-ds-border/60" stagger={0.04} y={10}>
            {dependencies.map((dep) => (
              <li
                key={dep.name}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <code className="font-ds-mono text-sm text-ds-foreground sm:text-base">
                  {dep.name}
                </code>
                <span className="text-sm text-ds-muted-foreground sm:text-right">
                  {dep.description}
                </span>
              </li>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-ds-border/60 px-6 py-32 sm:py-40">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <RevealHeading
            as="h2"
            trigger="scroll"
            className="text-4xl font-bold tracking-tight text-balance sm:text-5xl"
          >
            Open the system. Start building.
          </RevealHeading>
          <RevealLines
            as="p"
            trigger="scroll"
            className="mt-5 max-w-xl text-base leading-relaxed text-balance text-ds-muted-foreground sm:text-lg"
            delay={0.1}
          >
            Every token, primitive, and motion helper lives one click away — ready to compose into
            the first real page.
          </RevealLines>
          <div className="mt-10">
            <Button size="md" variant="primary" href="/design-system">
              View design system
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-ds-border/60 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 text-xs text-ds-muted-foreground sm:flex-row sm:items-center">
          <span>Canon Plus boilerplate.</span>
          <span>Built for rapid landing-page development.</span>
        </div>
      </footer>
    </div>
  );
}
