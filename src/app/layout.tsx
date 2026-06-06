import type { Metadata, Viewport } from 'next';
import { SmoothScroll } from '@/components/common';
import { fontDsDisplay } from '@/lib/fonts';
import { THEME_INIT_SCRIPT } from '@/lib/theme';
import '@/styles/global.css';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontDsDisplay.variable} suppressHydrationWarning>
      <head>
        {/* Resolve theme before first paint so users never see the wrong
            background flash on hard refresh. See `src/lib/theme.ts`. */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted, static init script
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body className="bg-ds-background text-ds-foreground antialiased">
        <SmoothScroll>{props.children}</SmoothScroll>
      </body>
    </html>
  );
}
