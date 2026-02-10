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
  const brandAccent =
    accentColor.toLowerCase() === colors.accent.toLowerCase()
      ? accentColor
      : colors.accent;

  return (
    <div
      style={{
        position: 'absolute',
        right: 80,
        top: 180,
        width: 380,
        padding: '24px 26px',
        borderRadius: 22,
        backgroundColor: colors.panel,
        border: `2px solid ${colors.border}`,
        boxShadow: 'none',
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: fonts.brand,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: colors.text,
          marginBottom: 14,
        }}
      >
        Section Focus
      </div>
      <div
        style={{
          fontFamily: fonts.brand,
          fontSize: 34,
          fontWeight: 700,
          color: colors.text,
          marginBottom: 18,
        }}
      >
        {title}
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>
        {items.map((item) => (
          <div
            key={item}
            style={{
              padding: '8px 14px',
              borderRadius: 999,
              backgroundColor: brandAccent,
              border: `1.5px solid ${colors.border}`,
              color: colors.text,
              fontFamily: fonts.body,
              fontSize: 15,
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
