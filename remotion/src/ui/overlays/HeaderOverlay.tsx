import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

import {colors, fonts} from '../../theme';

export const HeaderOverlay: React.FC<{
  unitLabel: string;
  lessonTitle: string;
  courseLabel: string;
  lessonLabel?: string;
  startAtFrame?: number;
}> = ({unitLabel, lessonTitle, courseLabel, lessonLabel, startAtFrame = 0}) => {
  const globalFrame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const frame = Math.max(0, globalFrame - startAtFrame);
  const reveal = spring({frame, fps, config: {damping: 200}});
  const translateY = interpolate(reveal, [0, 1], [16, 0]);
  const opacity = interpolate(reveal, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        right: 80,
        top: 36,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 6,
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {lessonLabel ? (
        <span
          style={{
            padding: '4px 10px',
            borderRadius: 999,
            backgroundColor: colors.accent,
            border: `1px solid ${colors.border}`,
            fontFamily: fonts.body,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: colors.text,
          }}
        >
          {lessonLabel}
        </span>
      ) : null}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 2,
          fontFamily: fonts.body,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
        }}
      >
        <span style={{fontSize: 12, fontWeight: 600, color: colors.text}}>
          {courseLabel}
        </span>
        <span style={{fontSize: 11, fontWeight: 600, color: colors.muted}}>
          {unitLabel}
        </span>
      </div>

      <div
        style={{
          marginTop: 6,
          fontFamily: fonts.body,
          fontSize: 12,
          fontWeight: 600,
          color: colors.muted,
        }}
      >
        {lessonTitle}
      </div>
    </div>
  );
};
