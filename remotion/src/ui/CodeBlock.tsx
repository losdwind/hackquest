import {fonts, tokens} from '../theme';

export type CodeHighlightRange = {
  from: number;
  to: number;
};

export type CodeBlockProps = {
  code: string;
  language?: string;
  highlights?: CodeHighlightRange[];
};

const isLineHighlighted = (lineNo: number, ranges: CodeHighlightRange[]) => {
  return ranges.some((r) => lineNo >= r.from && lineNo <= r.to);
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'snippet',
  highlights = [],
}) => {
  const lines = code.split(/\r?\n/);

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
          fontWeight: 800,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.72)',
        }}
      >
        {language}
      </div>
      <div style={{padding: '14px 0'}}>
        {lines.map((line, idx) => {
          const lineNo = idx + 1;
          const highlighted = isLineHighlighted(lineNo, highlights);
          return (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '56px 1fr',
                gap: 0,
                padding: '2px 14px',
                backgroundColor: highlighted ? tokens.colors.accentSoft : 'transparent',
              }}
            >
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.44)',
                  textAlign: 'right',
                  paddingRight: 12,
                  userSelect: 'none',
                }}
              >
                {lineNo}
              </div>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 14,
                  whiteSpace: 'pre',
                  color: '#FFFFFF',
                }}
              >
                {line}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
