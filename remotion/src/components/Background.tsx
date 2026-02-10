import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors} from '../theme';

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const drift = interpolate(frame, [0, durationInFrames], [0, 1]);
  const glowX = interpolate(frame, [0, durationInFrames], [-120, 160]);
  const glowY = interpolate(frame, [0, durationInFrames], [140, -80]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        backgroundImage: `
          radial-gradient(circle at 15% 20%, rgba(0, 194, 168, 0.18), transparent 40%),
          radial-gradient(circle at 85% 15%, rgba(255, 183, 3, 0.12), transparent 42%),
          linear-gradient(135deg, rgba(10, 30, 40, 0.8), rgba(6, 20, 28, 0.9))
        `,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${colors.grid} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.grid} 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 720,
          height: 720,
          left: 180,
          top: 120,
          transform: `translate(${glowX * 0.6}px, ${glowY * 0.4}px)`,
          background:
            'radial-gradient(circle at 30% 30%, rgba(0, 194, 168, 0.28), transparent 60%)',
          filter: 'blur(10px)',
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 640,
          height: 640,
          right: 140,
          bottom: 120,
          transform: `translate(${glowX * -0.4}px, ${glowY * -0.3}px)`,
          background:
            'radial-gradient(circle at 70% 70%, rgba(255, 183, 3, 0.2), transparent 60%)',
          filter: 'blur(12px)',
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.5))',
          opacity: 0.35 + drift * 0.1,
        }}
      />
    </AbsoluteFill>
  );
};
