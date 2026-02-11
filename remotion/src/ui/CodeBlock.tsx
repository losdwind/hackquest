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
  const codeBlock = tokens.storyboard.codeBlock;
  const lines = code.split(/\r?\n/);

  return (
    <div
      style={{
        borderRadius: codeBlock.borderRadius,
        backgroundColor: '#0B0B0B',
        color: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: `${codeBlock.headerPadY}px ${codeBlock.headerPadX}px`,
          fontFamily: fonts.brand,
          fontSize: codeBlock.headerFontSize,
          fontWeight: 800,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.72)',
        }}
      >
        {language}
      </div>
      <div style={{padding: `${codeBlock.bodyPadY}px 0`}}>
        {lines.map((line, idx) => {
          const lineNo = idx + 1;
          const highlighted = isLineHighlighted(lineNo, highlights);
          return (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: `${codeBlock.lineNumberColWidth}px 1fr`,
                gap: 0,
                padding: `${codeBlock.linePadY}px ${codeBlock.linePadX}px`,
                backgroundColor: highlighted ? tokens.colors.accentSoft : 'transparent',
              }}
            >
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: codeBlock.lineNumberFontSize,
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
                  fontSize: codeBlock.codeFontSize,
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
