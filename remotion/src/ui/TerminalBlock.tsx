import type {CSSProperties} from 'react';

import {fonts} from '../theme';
import {tokens} from '../theme/tokens';

export type TerminalChunk = {
  type: 'command' | 'output';
  text: string;
};

export type TerminalBlockProps = {
  chunks: TerminalChunk[];
  prompt?: string;
  maxHeightPx?: number;
  style?: CSSProperties;
};

export const TerminalBlock: React.FC<TerminalBlockProps> = ({
  chunks,
  prompt = '$',
  maxHeightPx = 420,
  style,
}) => {
  return (
    <div
      style={{
        borderRadius: tokens.radii.md,
        border: `${tokens.stroke.hairline}px solid rgba(255,255,255,0.14)`,
        backgroundColor: '#050505',
        boxShadow: tokens.shadow.overlay,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          padding: '10px 12px',
          borderBottom: `${tokens.stroke.hairline}px solid rgba(255,255,255,0.10)`,
          color: 'rgba(255,255,255,0.70)',
          fontFamily: fonts.brand,
          fontSize: 12,
          fontWeight: 900,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        Terminal
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
        {chunks.map((c, idx) => {
          const isCmd = c.type === 'command';
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={idx} style={{whiteSpace: 'pre-wrap'}}>
              {isCmd ? (
                <span style={{color: 'rgba(255,255,255,0.55)'}}>{prompt} </span>
              ) : null}
              <span style={{color: isCmd ? '#FFFFFF' : 'rgba(255,255,255,0.78)'}}>
                {c.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

