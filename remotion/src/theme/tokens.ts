export const tokens = {
  colors: {
    bg: '#FFFFFF',
    text: '#0B0B0B',
    muted: '#4B4B4B',
    panel: '#FFFFFF',
    panelSoft: 'rgba(255, 255, 255, 0.92)',
    border: '#000000',
    borderSoft: 'rgba(0, 0, 0, 0.12)',
    shadow: 'rgba(0, 0, 0, 0.12)',
    accent: '#FFE866',
    accentSoft: 'rgba(255, 232, 102, 0.35)',
    grid: 'rgba(0, 0, 0, 0.05)',
  },
  space: {
    xs: 8,
    sm: 12,
    md: 18,
    lg: 26,
    xl: 36,
  },
  radii: {
    sm: 12,
    md: 18,
    lg: 32,
    pill: 999,
  },
  stroke: {
    hairline: 1,
    regular: 2,
    strong: 3,
  },
  shadow: {
    card: 'none',
    overlay: 'none',
  },
  layout: {
    safeArea: {left: 80, right: 80, top: 60, bottom: 80},
    maxContentWidth: 1440,
  },
} as const;
