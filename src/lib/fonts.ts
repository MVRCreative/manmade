import localFont from 'next/font/local';

/**
 * ITC Serif Gothic Std Regular — Figma display face for the hero and Mode A headings.
 */
export const fontDsDisplay = localFont({
  src: '../assets/fonts/itc-serif-gothic-std-regular.otf',
  variable: '--font-ds-display-face',
  weight: '400',
  style: 'normal',
  display: 'swap',
});
