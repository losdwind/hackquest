import {colors} from '../theme';

type ProgressBarProps = {
  progress: number;
  accentColor: string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  accentColor,
}) => {
  const clamped = Math.min(1, Math.max(0, progress));

  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 80,
        bottom: 60,
        height: 10,
        borderRadius: 999,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div
        style={{
          width: `${clamped * 100}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${accentColor}, ${colors.accent})`,
        }}
      />
    </div>
  );
};
