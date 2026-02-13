import type {CSSProperties, ReactNode} from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

import {colors, fonts, motion, tokens} from '../../theme';

type SceneScaffoldProps = {
  background?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  titleSize?: number;
  maxWidth?: number;
  contentTop?: number;
  contentStyle?: CSSProperties;
  children: ReactNode;
};

export const SceneScaffold: React.FC<SceneScaffoldProps> = ({
  background,
  eyebrow,
  title,
  subtitle,
  titleSize,
  maxWidth,
  contentTop = 22,
  contentStyle,
  children,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame, fps, config: motion.spring.standard});
  const y = interpolate(reveal, [0, 1], [16, 0]);
  const opacity = interpolate(reveal, [0, 1], [0, 1]);
  const hasHeader = Boolean(eyebrow || title || subtitle);

  return (
    <AbsoluteFill
      style={{
        background: background ?? colors.background,
        padding: '112px 180px 88px',
      }}
    >
      <div
        style={{
          transform: `translateY(${y}px)`,
          opacity,
          width: '100%',
          maxWidth: maxWidth ?? Math.min(1240, tokens.layout.maxContentWidth),
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {hasHeader ? (
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {eyebrow ? (
              <div
                style={{
                  fontFamily: fonts.brand,
                  fontSize: 24,
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: colors.muted,
                  marginBottom: 12,
                }}
              >
                {eyebrow}
              </div>
            ) : null}

            {title ? (
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: Math.max(titleSize ?? 72, 92),
                  fontWeight: 900,
                  lineHeight: 1.04,
                  letterSpacing: '-0.015em',
                  color: colors.text,
                  marginBottom: subtitle ? 10 : 0,
                  maxWidth: 980,
                }}
              >
                {title}
              </div>
            ) : null}

            {subtitle ? (
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 48,
                  lineHeight: 1.34,
                  color: colors.muted,
                  maxWidth: 940,
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>
        ) : null}

        <div
          style={{
            flex: 1,
            minHeight: 0,
            marginTop: hasHeader ? Math.max(contentTop, 92) : 0,
            ...contentStyle,
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};
