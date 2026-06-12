/**
 * Design tokens — single source of truth for the arcade design system.
 * Keep in sync with the CSS custom properties in index.css (:root).
 */

export const colors = {
  // brand
  cyan: '#00e5ff',
  cyanLight: '#67f3ff',
  cyanDark: '#00a4c7',
  yellow: '#ffcc00',
  yellowLight: '#ffe066',
  yellowDark: '#d49a00',
  pink: '#ff4fd8',
  pinkLight: '#ff8ee8',
  pinkDark: '#bf2c9f',
  green: '#39ff88',
  greenLight: '#7dffb2',
  greenDark: '#15b85a',
  red: '#ef4444',

  // surfaces
  bg: '#080b16',
  surface: '#101629',
  surface2: '#151d35',
  card: '#151d35',
  border: '#26395f',
  shadow: '#020617',

  // text
  text: '#f8fafc',
  muted: '#9fb3c8',
  body: '#cbd5e1',
} as const;

export const fonts = {
  pixel: "'Press Start 2P', 'Courier New', monospace",
  mono: "'Space Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
} as const;

/** Hard offset shadow used across panels, buttons, and chips. */
export const pixelShadow = (px = 4) => `${px}px ${px}px 0 ${colors.shadow}`;

/** Standard square border used by panels and interactive elements. */
export const pixelBorder = `2px solid ${colors.border}`;
