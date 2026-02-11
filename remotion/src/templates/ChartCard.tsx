import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts, motion, tokens} from '../theme';
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
  const reveal = spring({frame, fps, config: motion.spring.standard});
  const chart = tokens.storyboard.chart;
  const width = size?.width ?? chart.defaultWidth;
  const height = size?.height ?? chart.defaultHeight;
  const barAreaHeight = height - 90;
  const resolvedMax = Math.max(
    1,
    maxValue ?? Math.max(...series.map((item) => item.value)),
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        padding: tokens.storyboard.canvasPadding,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: chart.panelMaxWidth,
          padding: `${chart.panelPadY}px ${chart.panelPadX}px`,
          borderRadius: chart.panelRadius,
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
            fontSize: chart.eyebrowSize,
            fontWeight: 900,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: colors.muted,
            marginBottom: chart.eyebrowMarginBottom,
          }}
        >
          Chart
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: chart.titleSize,
            fontWeight: 900,
            letterSpacing: '-0.01em',
            color: colors.text,
            marginBottom: chart.titleMarginBottom,
            lineHeight: chart.titleLineHeight,
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
            gap: chart.columnGap,
            alignItems: 'flex-end',
          }}
        >
          {series.map((item) => {
            const ratio = Math.min(1, item.value / resolvedMax);
            const barHeight = Math.max(chart.minBarHeight, ratio * barAreaHeight * reveal);
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
                    borderRadius: chart.barRadius,
                    background: `linear-gradient(180deg, ${accentColor}, rgba(255, 255, 255, 0.1))`,
                    boxShadow: 'none',
                  }}
                />
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: chart.labelSize,
                    fontWeight: 700,
                    color: colors.text,
                    lineHeight: chart.labelLineHeight,
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
