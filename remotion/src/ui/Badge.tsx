import type {CSSProperties} from 'react';

import {fonts} from '../theme';
import {tokens} from '../theme/tokens';
import {typography} from '../theme/typography';

type BadgeTone = 'accent' | 'neutral' | 'inverted';

const badgeBg = (tone: BadgeTone) => {
  switch (tone) {
    case 'accent':
      return tokens.colors.accent;
    case 'inverted':
      return 'rgba(255,255,255,0.92)';
    case 'neutral':
    default:
      return tokens.colors.panelSoft;
  }
};

const badgeFg = (tone: BadgeTone) => {
  switch (tone) {
    case 'inverted':
      return tokens.colors.text;
    case 'accent':
      return tokens.colors.text;
    case 'neutral':
    default:
      return tokens.colors.text;
  }
};

export type BadgeProps = {
  text: string;
  tone?: BadgeTone;
  textTransform?: 'uppercase' | 'none';
  style?: CSSProperties;
};

export const Badge: React.FC<BadgeProps> = ({
  text,
  tone = 'inverted',
  textTransform = 'uppercase',
  style,
}) => {
  return (
    <div
      style={{
        alignSelf: 'flex-start',
        padding: '6px 10px',
        borderRadius: tokens.radii.pill,
        backgroundColor: badgeBg(tone),
        border: `${tokens.stroke.hairline}px solid ${tokens.colors.borderSoft}`,
        fontFamily: fonts.brand,
        fontSize: typography.typeScale.kicker,
        fontWeight: typography.weights.black,
        letterSpacing: '0.14em',
        textTransform,
        color: badgeFg(tone),
        ...style,
      }}
    >
      {text}
    </div>
  );
};

