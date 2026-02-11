import {fonts, tokens} from '../theme';

export type TerminalBlockProps = {
  title?: string;
  commands: string[];
};

export const TerminalBlock: React.FC<TerminalBlockProps> = ({
  title = 'terminal',
  commands,
}) => {
  return (
    <div
      style={{
        borderRadius: 20,
        backgroundColor: '#0B0B0B',
        color: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '12px 14px',
          fontFamily: fonts.brand,
          fontSize: 12,
          fontWeight: 900,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.72)',
        }}
      >
        {title}
      </div>

      <div style={{padding: '14px'}}>
        {commands.map((line, idx) => (
          <div
            key={idx}
            style={{
              display: 'grid',
              gridTemplateColumns: '24px 1fr',
              gap: 8,
              alignItems: 'baseline',
              fontFamily: fonts.mono,
              fontSize: 14,
              lineHeight: 1.45,
              color: '#FFFFFF',
            }}
          >
            <span style={{color: tokens.colors.accent}}>$</span>
            <span style={{whiteSpace: 'pre-wrap'}}>{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
