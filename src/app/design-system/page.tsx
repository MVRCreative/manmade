import type { Metadata } from 'next';
import { CopyButton } from '@/app/design-system/CopyButton';
import { Button, Card, Navbar, RevealHeading, RevealLines, Stagger } from '@/components/common';
import { cn } from '@/lib/cn';
import { darkColors, lightColors, radii, shadows, spacing, typography } from '@/lib/design-tokens';

export const metadata: Metadata = {
  title: 'Design system',
  description: 'Live reference for design tokens, primitives, and component variants.',
};

const BUTTON_VARIANTS = ['primary', 'secondary', 'outline', 'ghost'] as const;
const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;
const CARD_TONES = ['default', 'muted', 'inverted'] as const;

const buttonVariantLabels: Record<(typeof BUTTON_VARIANTS)[number], string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  outline: 'Outline',
  ghost: 'Ghost',
};

const buttonSizeLabels: Record<(typeof BUTTON_SIZES)[number], string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
};

const cardLabels: Record<
  (typeof CARD_TONES)[number] | 'interactive',
  { title: string; description: string }
> = {
  default: {
    title: 'Default card',
    description: 'Surface tone for primary content blocks.',
  },
  muted: {
    title: 'Muted card',
    description: 'Quieter surface for supporting content.',
  },
  inverted: {
    title: 'Inverted card',
    description: 'High-contrast surface for emphasis.',
  },
  interactive: {
    title: 'Interactive card',
    description: 'Default tone with hover and focus affordances.',
  },
};

const inputClasses =
  'w-full rounded-ds-md border border-ds-border bg-ds-card px-4 py-2.5 text-sm text-ds-foreground placeholder:text-ds-muted-foreground transition-colors focus:border-ds-primary focus:outline-none focus:ring-2 focus:ring-ds-primary/30';

type BadgeTone = 'info' | 'success' | 'warning' | 'destructive' | 'neutral';

const badgeToneClasses: Record<BadgeTone, string> = {
  info: 'bg-ds-primary/15 text-ds-primary',
  success: 'bg-ds-success/15 text-ds-success',
  warning: 'bg-ds-warning/20 text-ds-foreground',
  destructive: 'bg-ds-destructive/15 text-ds-destructive',
  neutral: 'bg-ds-muted text-ds-muted-foreground',
};

type BadgeProps = { tone: BadgeTone; children: React.ReactNode };

const Badge = (props: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center rounded-ds-full px-2.5 py-1 text-xs font-medium',
      badgeToneClasses[props.tone],
    )}
  >
    {props.children}
  </span>
);

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
};

const SectionHeader = (props: SectionHeaderProps) => (
  <div className="mb-12 max-w-2xl">
    <p className="mb-3 text-xs font-medium tracking-[0.14em] text-ds-muted-foreground uppercase">
      {props.eyebrow}
    </p>
    <RevealHeading
      as="h2"
      trigger="scroll"
      id={props.id}
      className="text-3xl font-bold tracking-tight sm:text-4xl"
    >
      {props.title}
    </RevealHeading>
    {props.description ? (
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ds-muted-foreground sm:text-base">
        {props.description}
      </p>
    ) : null}
  </div>
);

const colorKeys = [
  'background',
  'foreground',
  'muted',
  'mutedForeground',
  'border',
  'card',
  'cardForeground',
  'primary',
  'primaryForeground',
  'secondary',
  'secondaryForeground',
  'accent',
  'accentForeground',
  'success',
  'warning',
  'destructive',
  'destructiveForeground',
] as const satisfies readonly (keyof typeof lightColors)[];

const toCssVarName = (name: string): string =>
  `--ds-color-${name.replaceAll(/([A-Z])/gu, '-$1').toLowerCase()}`;

export default function DesignSystemPage() {
  return (
    <div className="bg-ds-background text-ds-foreground">
      <Navbar />

      <section className="px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-medium tracking-[0.14em] text-ds-muted-foreground uppercase">
            Reference
          </p>
          <RevealHeading
            as="h1"
            className="max-w-3xl text-5xl leading-[1.05] font-black tracking-tight text-balance sm:text-6xl"
          >
            Design system.
          </RevealHeading>
          <RevealLines
            as="p"
            delay={0.25}
            className="mt-6 max-w-xl text-base leading-relaxed text-balance text-ds-muted-foreground sm:text-lg"
          >
            Tokens, primitives, and component variants — the visual contract for new landing pages.
          </RevealLines>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-32 px-6 pb-32 sm:space-y-40 sm:pb-40">
        <section aria-labelledby="ds-colors">
          <SectionHeader
            id="ds-colors"
            eyebrow="01 — Color"
            title="Two palettes, one cyan accent."
            description="Each semantic token resolves to a light value or a dark value via the active theme. The cyan primary stays constant — it's the single shared CTA across both modes."
          />
          <Stagger className="divide-y divide-ds-border/60" stagger={0.04} y={12}>
            {colorKeys.map((name) => {
              const light = lightColors[name];
              const dark = darkColors[name];
              return (
                <div
                  key={name}
                  className="grid grid-cols-[1fr] gap-4 py-5 sm:grid-cols-[12rem_1fr_1fr] sm:items-center sm:gap-8"
                >
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="mt-1 font-ds-mono text-[11px] text-ds-muted-foreground">
                      {toCssVarName(name)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      style={{ backgroundColor: light }}
                      className="size-10 shrink-0 rounded-ds-md border border-ds-border"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium tracking-[0.14em] text-ds-muted-foreground uppercase">
                        Light
                      </p>
                      <div className="mt-0.5 flex items-center gap-2">
                        <code className="truncate font-ds-mono text-xs text-ds-foreground/85">
                          {light}
                        </code>
                        <CopyButton
                          text={light}
                          copyLabel="Copy"
                          copiedLabel="Copied"
                          ariaLabel={`Copy ${name} light value`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      style={{ backgroundColor: dark }}
                      className="size-10 shrink-0 rounded-ds-md border border-ds-border"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium tracking-[0.14em] text-ds-muted-foreground uppercase">
                        Dark
                      </p>
                      <div className="mt-0.5 flex items-center gap-2">
                        <code className="truncate font-ds-mono text-xs text-ds-foreground/85">
                          {dark}
                        </code>
                        <CopyButton
                          text={dark}
                          copyLabel="Copy"
                          copiedLabel="Copied"
                          ariaLabel={`Copy ${name} dark value`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Stagger>
        </section>

        <section aria-labelledby="ds-typography">
          <SectionHeader
            id="ds-typography"
            eyebrow="02 — Type"
            title="One scale. Set tight."
            description="The display family carries the entire system. Compose with the scale below — never invent intermediate sizes."
          />
          <Stagger className="space-y-2" stagger={0.05} y={14}>
            {Object.entries(typography.fontSize).map(([name, value]) => (
              <div
                key={name}
                className="flex flex-col gap-1 border-b border-ds-border/40 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <p
                  className="truncate font-semibold tracking-tight text-ds-foreground"
                  style={{ fontSize: value, lineHeight: 1.1 }}
                >
                  The quick brown fox
                </p>
                <div className="flex items-baseline gap-4 text-xs text-ds-muted-foreground">
                  <span className="font-medium tracking-[0.14em] uppercase">{name}</span>
                  <code className="font-ds-mono">{value}</code>
                </div>
              </div>
            ))}
          </Stagger>
        </section>

        <section aria-labelledby="ds-spacing">
          <SectionHeader
            id="ds-spacing"
            eyebrow="03 — Spacing"
            title="Composed from a fixed scale."
            description="Every layout uses these values. Mid-step gaps are a smell — extend the scale instead."
          />
          <ul className="space-y-3">
            {Object.entries(spacing).map(([name, value]) => (
              <li key={name} className="flex items-center gap-6 py-1.5">
                <span className="w-12 shrink-0 font-ds-mono text-xs text-ds-muted-foreground">
                  {name}
                </span>
                <div
                  aria-hidden="true"
                  className="h-3 rounded-ds-sm bg-ds-primary"
                  style={{ width: value }}
                />
                <code className="ml-auto font-ds-mono text-xs text-ds-muted-foreground">
                  {value}
                </code>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="ds-radii">
          <SectionHeader
            id="ds-radii"
            eyebrow="04 — Radii"
            title="From hard corners to full pills."
          />
          <Stagger
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-7"
            stagger={0.05}
            y={14}
          >
            {Object.entries(radii).map(([name, value]) => (
              <div key={name} className="text-center">
                <div
                  aria-hidden="true"
                  className="mx-auto size-20 border border-ds-border bg-ds-card"
                  style={{ borderRadius: value }}
                />
                <p className="mt-3 text-xs font-medium tracking-[0.14em] text-ds-muted-foreground uppercase">
                  {name}
                </p>
                <code className="font-ds-mono text-[11px] text-ds-muted-foreground/80">
                  {value}
                </code>
              </div>
            ))}
          </Stagger>
        </section>

        <section aria-labelledby="ds-shadows">
          <SectionHeader
            id="ds-shadows"
            eyebrow="05 — Elevation"
            title="Used sparingly."
            description="Mode A separates surfaces with spacing and contrast, not shadow. Reach for these only when an element genuinely needs to lift off the canvas."
          />
          <Stagger
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.07}
            y={18}
          >
            {Object.entries(shadows)
              .filter(([, value]) => value !== 'none')
              .map(([name, value]) => (
                <div key={name}>
                  <div
                    aria-hidden="true"
                    className="h-24 rounded-ds-lg border border-ds-border bg-ds-card"
                    style={{ boxShadow: value }}
                  />
                  <p className="mt-4 text-xs font-medium tracking-[0.14em] text-ds-muted-foreground uppercase">
                    {name}
                  </p>
                  <code className="mt-1 block font-ds-mono text-[11px] leading-relaxed break-words text-ds-muted-foreground/80">
                    {value}
                  </code>
                </div>
              ))}
          </Stagger>
        </section>

        <section aria-labelledby="ds-buttons">
          <SectionHeader
            id="ds-buttons"
            eyebrow="06 — Buttons"
            title="One primary action per view."
            description="The cyan primary is the single shared CTA across themes. Other variants quiet down so they never compete with it."
          />
          <div className="space-y-10">
            {BUTTON_VARIANTS.map((variant) => (
              <div key={variant}>
                <p className="mb-4 text-xs font-medium tracking-[0.14em] text-ds-muted-foreground uppercase">
                  {buttonVariantLabels[variant]}
                </p>
                <Stagger
                  className="flex flex-wrap items-center gap-3"
                  stagger={0.04}
                  y={10}
                  duration={0.4}
                >
                  {BUTTON_SIZES.map((size) => (
                    <Button key={size} variant={variant} size={size}>
                      {buttonSizeLabels[size]}
                    </Button>
                  ))}
                  <Button variant={variant} disabled>
                    Disabled
                  </Button>
                </Stagger>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="ds-cards">
          <SectionHeader id="ds-cards" eyebrow="07 — Cards" title="Composable surfaces." />
          <Stagger className="grid gap-6 sm:grid-cols-2" stagger={0.08} y={20}>
            {CARD_TONES.map((tone) => (
              <Card key={tone} tone={tone}>
                <h3 className="mb-1 text-lg font-semibold tracking-tight">
                  {cardLabels[tone].title}
                </h3>
                <p className="text-sm leading-relaxed opacity-80">{cardLabels[tone].description}</p>
              </Card>
            ))}
            <Card tone="default" interactive>
              <h3 className="mb-1 text-lg font-semibold tracking-tight">
                {cardLabels.interactive.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-80">
                {cardLabels.interactive.description}
              </p>
            </Card>
          </Stagger>
        </section>

        <section aria-labelledby="ds-forms">
          <SectionHeader id="ds-forms" eyebrow="08 — Forms" title="Quiet inputs, clear focus." />
          <Stagger className="max-w-xl space-y-6" stagger={0.06} y={14} duration={0.45}>
            <div>
              <label htmlFor="ds-text-input" className="mb-2 block text-sm font-medium">
                Full name
              </label>
              <input
                id="ds-text-input"
                type="text"
                placeholder="Jane Doe"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="ds-email-input" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                id="ds-email-input"
                type="email"
                placeholder="you@example.com"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="ds-textarea" className="mb-2 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="ds-textarea"
                rows={4}
                placeholder="Tell us what you're building"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="ds-select" className="mb-2 block text-sm font-medium">
                Plan
              </label>
              <select id="ds-select" className={inputClasses}>
                <option>Starter</option>
                <option>Pro</option>
                <option>Team</option>
              </select>
            </div>
          </Stagger>
        </section>

        <section aria-labelledby="ds-badges">
          <SectionHeader id="ds-badges" eyebrow="09 — Badges" title="Status, not decoration." />
          <Stagger className="flex flex-wrap gap-3" stagger={0.04} y={8} duration={0.4}>
            <Badge tone="info">Default</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="destructive">Error</Badge>
            <Badge tone="neutral">Neutral</Badge>
          </Stagger>
        </section>

        <section aria-labelledby="ds-info" className="border-t border-ds-border/60 pt-16">
          <h3
            id="ds-info"
            className="text-xs font-medium tracking-[0.14em] text-ds-muted-foreground uppercase"
          >
            Working with tokens
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ds-foreground/85">
            Tokens live in{' '}
            <code className="font-ds-mono text-sm text-ds-foreground">
              src/lib/design-tokens.ts
            </code>{' '}
            and as CSS variables in{' '}
            <code className="font-ds-mono text-sm text-ds-foreground">src/styles/global.css</code>.
            Keep both in sync when adding new values. Reference colors via Tailwind utilities like{' '}
            <code className="font-ds-mono text-sm text-ds-foreground">bg-ds-primary</code>; reuse
            primitives from{' '}
            <code className="font-ds-mono text-sm text-ds-foreground">src/components/common</code>{' '}
            before authoring new ones.
          </p>
        </section>
      </main>
    </div>
  );
}
