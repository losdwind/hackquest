import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../theme';
import type {ChartSeriesItem} from '../lesson-config';

type ChartCardProps = {
  title: string;
  series: ChartSeriesItem[];
  maxValue?: number;
  accentColor: string;
  // Legacy: previously rendered as a floating, absolutely positioned card.
  // Now treated as a full-scene visual (like an image). Position is ignored.
  position?: {left: number; top: number};
  size?: {width: number; height: number};
};

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  series,
  maxValue,
  accentColor,
  position,
  size,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame, fps, config: {damping: 200}});
  const width = size?.width ?? 1360;
  const height = size?.height ?? 620;
  const barAreaHeight = height - 90;
  const resolvedMax = Math.max(
    1,
    maxValue ?? Math.max(...series.map((item) => item.value)),
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        padding: 96,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1440,
          padding: '36px 48px',
          borderRadius: 28,
          backgroundColor: colors.panelSoft,
          border: 'none',
          boxShadow: 'none',
          transform: `translateY(${(1 - reveal) * 18}px)`,
          opacity: reveal,
        }}
      >
        <div
          style={{
            fontFamily: fonts.brand,
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: colors.muted,
            marginBottom: 12,
          }}
        >
          Chart
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 44,
            fontWeight: 900,
            letterSpacing: '-0.01em',
            color: colors.text,
            marginBottom: 22,
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>

        <div
          style={{
            width,
            maxWidth: '100%',
            height,
            display: 'flex',
            gap: 22,
            alignItems: 'flex-end',
          }}
        >
          {series.map((item) => {
            const ratio = Math.min(1, item.value / resolvedMax);
            const barHeight = Math.max(10, ratio * barAreaHeight * reveal);
            return (
              <div
                key={item.label}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  gap: 10,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: barHeight,
                    borderRadius: 16,
                    background: `linear-gradient(180deg, ${accentColor}, rgba(255, 255, 255, 0.1))`,
                    boxShadow: 'none',
                  }}
                />
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 18,
                    fontWeight: 700,
                    color: colors.text,
                    lineHeight: 1.15,
                    textAlign: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
