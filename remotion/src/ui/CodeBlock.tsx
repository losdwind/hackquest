import type {CSSProperties} from 'react';

import {fonts} from '../theme';
import {tokens} from '../theme/tokens';
import {typography} from '../theme/typography';

export type CodeHighlightRange = {from: number; to: number};

export type CodeBlockProps = {
  code: string;
  language?: string;
  highlights?: CodeHighlightRange[];
  maxHeightPx?: number;
  style?: CSSProperties;
};

const isHighlighted = (line: number, ranges: CodeHighlightRange[]) =>
  ranges.some((r) => line >= r.from && line <= r.to);

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  highlights = [],
  maxHeightPx = 520,
  style,
}) => {
  const lines = String(code ?? '').split('\n');

  return (
    <div
      style={{
        borderRadius: tokens.radii.md,
        border: `${tokens.stroke.hairline}px solid rgba(255,255,255,0.14)`,
        backgroundColor: '#0B0B0B',
        boxShadow: tokens.shadow.overlay,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 12px',
          borderBottom: `${tokens.stroke.hairline}px solid rgba(255,255,255,0.10)`,
          color: 'rgba(255,255,255,0.75)',
          fontFamily: fonts.brand,
          fontWeight: typography.weights.black,
          fontSize: typography.typeScale.kicker,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        <span>Code</span>
        {language ? <span>{language}</span> : <span />}
      </div>
      <div
        style={{
          maxHeight: maxHeightPx,
          overflow: 'hidden',
          padding: 12,
          fontFamily: fonts.mono,
          fontSize: 14,
          lineHeight: 1.55,
          color: 'rgba(255,255,255,0.86)',
        }}
      >
        {lines.map((line, idx) => {
          const lineNo = idx + 1;
          const hit = isHighlighted(lineNo, highlights);
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={idx} style={{display: 'flex', gap: 12}}>
              <div
                style={{
                  width: 28,
                  textAlign: 'right',
                  color: 'rgba(255,255,255,0.35)',
                  userSelect: 'none',
                }}
              >
                {lineNo}
              </div>
              <pre
                style={{
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  flex: 1,
                  padding: hit ? '0 6px' : 0,
                  borderRadius: 8,
                  backgroundColor: hit ? 'rgba(255, 232, 102, 0.18)' : 'transparent',
                  outline: hit ? '1px solid rgba(255, 232, 102, 0.35)' : 'none',
                }}
              >
                {line.length ? line : ' '}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};

