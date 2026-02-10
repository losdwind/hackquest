export const motion = {
  spring: {
    fast: {damping: 220, stiffness: 180, mass: 0.8},
    standard: {damping: 200, stiffness: 140, mass: 1},
    slow: {damping: 200, stiffness: 90, mass: 1.2},
  },
  durations: {
    xs: 120,
    sm: 200,
    md: 320,
    lg: 480,
  },
} as const;

