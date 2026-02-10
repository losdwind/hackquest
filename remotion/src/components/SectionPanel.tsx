import {interpolate} from 'remotion';
import {colors, fonts} from '../theme';

type SectionPanelProps = {
  title: string;
  items: string[];
  reveal: number;
  accentColor: string;
};

export const SectionPanel: React.FC<SectionPanelProps> = ({
  title,
  items,
  reveal,
  accentColor,
}) => {
  const translateY = interpolate(reveal, [0, 1], [16, 0]);
  const opacity = interpolate(reveal, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        right: 80,
        top: 180,
        width: 380,
        padding: '26px 28px',
        borderRadius: 24,
        backgroundColor: colors.panel,
        border: `1px solid rgba(255, 255, 255, 0.12)`,
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.3)',
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: colors.muted,
          marginBottom: 14,
        }}
      >
        Section Focus
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 36,
          fontWeight: 700,
          color: colors.text,
          marginBottom: 18,
        }}
      >
        {title}
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 10}}>
        {items.map((item) => (
          <div
            key={item}
            style={{
              padding: '8px 12px',
              borderRadius: 999,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: `1px solid ${accentColor}`,
              color: colors.text,
              fontFamily: fonts.body,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
