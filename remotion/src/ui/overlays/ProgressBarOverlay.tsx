import {colors} from '../../theme';

type ProgressBarProps = {
  progress: number;
  accentColor: string;
};

export const ProgressBarOverlay: React.FC<ProgressBarProps> = ({
  progress,
  accentColor,
}) => {
  const clamped = Math.min(1, Math.max(0, progress));
  const brandAccent =
    accentColor.toLowerCase() === colors.accent.toLowerCase()
      ? accentColor
      : colors.accent;

  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 80,
        bottom: 60,
        height: 12,
        borderRadius: 999,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${clamped * 100}%`,
          height: '100%',
          backgroundColor: brandAccent,
        }}
      />
    </div>
  );
};
