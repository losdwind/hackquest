import type {CSSProperties} from 'react';

import {tokens} from '../theme/tokens';

export type CardProps = {
  children: React.ReactNode;
  variant?: 'panel' | 'panelSoft' | 'solid';
  padding?: keyof typeof tokens.space | number;
  style?: CSSProperties;
};

const variantBg = (variant: CardProps['variant']) => {
  switch (variant) {
    case 'panelSoft':
      return tokens.colors.panelSoft;
    case 'solid':
      return tokens.colors.bg;
    case 'panel':
    default:
      return tokens.colors.panel;
  }
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'panelSoft',
  padding = 'lg',
  style,
}) => {
  const pad = typeof padding === 'number' ? padding : tokens.space[padding];
  return (
    <div
      style={{
        backgroundColor: variantBg(variant),
        border: `${tokens.stroke.regular}px solid ${tokens.colors.border}`,
        borderRadius: tokens.radii.lg,
        boxShadow: tokens.shadow.card,
        padding: pad,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

