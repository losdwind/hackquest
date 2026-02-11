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
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 4,
        padding: '10px 14px',
        borderRadius: 14,
        backgroundColor: colors.panel,
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 8,
          fontFamily: fonts.body,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        <span style={{fontSize: 12, fontWeight: 700, color: colors.text}}>
          {courseLabel}
        </span>

        <span style={{fontSize: 11, fontWeight: 600, color: colors.muted}}>
          {unitLabel}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 8,
          maxWidth: 700,
          fontFamily: fonts.body,
          fontSize: 17,
          fontWeight: 700,
          color: colors.text,
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {lessonLabel ? (
          <span
            style={{
              padding: '3px 9px',
              borderRadius: 999,
              backgroundColor: colors.accent,
              fontSize: 11,
              fontWeight: 700,
              color: colors.text,
              lineHeight: 1.15,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              flexShrink: 0,
            }}
          >
            {lessonLabel}
          </span>
        ) : null}
        <span
          style={{
            minWidth: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {lessonTitle}
        </span>
      </div>
    </div>
  );
};
