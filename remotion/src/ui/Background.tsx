import {AbsoluteFill} from 'remotion';
import {colors} from '../theme';

export const Background: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: colors.background}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 18% 20%, ${colors.accentSoft}, transparent 52%),
            radial-gradient(circle at 82% 10%, rgba(0, 0, 0, 0.04), transparent 48%)
          `,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${colors.grid} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.grid} 1px, transparent 1px)
          `,
          backgroundSize: '96px 96px',
          opacity: 0.45,
        }}
      />
    </AbsoluteFill>
  );
};
