import {interpolate, useCurrentFrame} from 'remotion';
import {colors, fonts} from '../../../../theme';
import type {LessonBlockContext} from '../../../lesson-config';

type CustomCalloutProps = {
  context: LessonBlockContext;
  title: string;
  body: string;
};

export const CustomCallout: React.FC<CustomCalloutProps> = ({
  context,
  title,
  body,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lift = interpolate(frame, [0, 16], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const accentColor = context.accentColor ?? colors.accent;

  return (
    <div
      style={{
        position: 'absolute',
        right: 120,
        bottom: 180,
        width: 420,
        padding: '22px 26px',
        borderRadius: 20,
        backgroundColor: 'rgba(16, 42, 58, 0.9)',
        border: `1px solid ${accentColor}`,
        boxShadow: `0 16px 40px ${accentColor}55`,
        opacity,
        transform: `translateY(${lift}px)`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: colors.text,
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 16,
          lineHeight: 1.5,
          color: colors.muted,
        }}
      >
        {body}
      </div>
    </div>
  );
};
