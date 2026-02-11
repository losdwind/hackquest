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
        left: 0,
        right: 0,
        bottom: 0,
        height: 8,
        borderRadius: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        overflow: 'hidden',
        pointerEvents: 'none',
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
