import type {CSSProperties} from 'react';

import {fonts} from '../theme';
import {tokens} from '../theme/tokens';
import {typography} from '../theme/typography';

type Tone = 'default' | 'muted' | 'accent' | 'inverted';
type Align = 'left' | 'center' | 'right';

const toneColor = (tone: Tone | undefined) => {
  switch (tone) {
    case 'muted':
      return tokens.colors.muted;
    case 'accent':
      return tokens.colors.accent;
    case 'inverted':
      return '#FFFFFF';
    case 'default':
    default:
      return tokens.colors.text;
  }
};

const clampStyle = (maxLines?: number): CSSProperties => {
  if (!maxLines || maxLines <= 0) return {};
  return {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: maxLines,
    overflow: 'hidden',
  };
};

type BaseTextProps = {
  children: React.ReactNode;
  tone?: Tone;
  align?: Align;
  maxLines?: number;
  style?: CSSProperties;
};

export const Kicker: React.FC<BaseTextProps> = ({
  children,
  tone = 'default',
  align = 'left',
  maxLines,
  style,
}) => {
  return (
    <div
      style={{
        fontFamily: fonts.brand,
        fontWeight: typography.weights.black,
        fontSize: typography.typeScale.kicker,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: toneColor(tone),
        textAlign: align,
        ...clampStyle(maxLines),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Title: React.FC<BaseTextProps> = ({
  children,
  tone = 'default',
  align = 'left',
  maxLines,
  style,
}) => {
  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontWeight: typography.weights.black,
        fontSize: typography.typeScale.title,
        lineHeight: typography.lineHeights.tight,
        color: toneColor(tone),
        textAlign: align,
        ...clampStyle(maxLines),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Subtitle: React.FC<BaseTextProps> = ({
  children,
  tone = 'muted',
  align = 'left',
  maxLines,
  style,
}) => {
  return (
    <div
      style={{
        fontFamily: fonts.body,
        fontWeight: typography.weights.medium,
        fontSize: typography.typeScale.subtitle,
        lineHeight: typography.lineHeights.normal,
        color: toneColor(tone),
        textAlign: align,
        ...clampStyle(maxLines),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Body: React.FC<BaseTextProps> = ({
  children,
  tone = 'default',
  align = 'left',
  maxLines,
  style,
}) => {
  return (
    <div
      style={{
        fontFamily: fonts.body,
        fontWeight: typography.weights.regular,
        fontSize: typography.typeScale.body,
        lineHeight: typography.lineHeights.relaxed,
        color: toneColor(tone),
        textAlign: align,
        ...clampStyle(maxLines),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Mono: React.FC<BaseTextProps> = ({
  children,
  tone = 'default',
  align = 'left',
  maxLines,
  style,
}) => {
  return (
    <div
      style={{
        fontFamily: fonts.mono,
        fontWeight: typography.weights.medium,
        fontSize: typography.typeScale.body,
        lineHeight: typography.lineHeights.normal,
        color: toneColor(tone),
        textAlign: align,
        ...clampStyle(maxLines),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

