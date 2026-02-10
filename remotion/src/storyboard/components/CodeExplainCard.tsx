import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts} from '../../theme';
import type {StoryboardInjected} from '../types';
import {CardShell} from './CardShell';

export const CodeExplainCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    language: z.string().optional(),
    code: z.string(),
    highlights: z
      .array(z.object({from: z.number().int().positive(), to: z.number().int().positive()}))
      .default([]),
    explain: z.array(z.string()).default([]),
  })
  .strict();

export type CodeExplainCardProps = z.infer<typeof CodeExplainCardPropsSchema>;

const isLineHighlighted = (lineNo: number, ranges: {from: number; to: number}[]) => {
  return ranges.some((r) => lineNo >= r.from && lineNo <= r.to);
};

export const CodeExplainCard: React.FC<
  CodeExplainCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, language, code, highlights, explain}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame, fps, config: {damping: 200}});
  const y = interpolate(reveal, [0, 1], [18, 0]);
  const opacity = interpolate(reveal, [0, 1], [0, 1]);

  const lines = code.split(/\r?\n/);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        padding: 96,
        justifyContent: 'center',
      }}
    >
      <div style={{transform: `translateY(${y}px)`, opacity}}>
        <CardShell eyebrow={eyebrow} title={title}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: explain.length ? '1.2fr 0.8fr' : '1fr',
              gap: 18,
              alignItems: 'start',
            }}
          >
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
                {language ?? 'snippet'}
              </div>
              <div style={{padding: '14px 0'}}>
                {lines.map((l, idx) => {
                  const lineNo = idx + 1;
                  const hl = isLineHighlighted(lineNo, highlights);
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '56px 1fr',
                        gap: 0,
                        padding: '2px 14px',
                        backgroundColor: hl ? 'rgba(255, 232, 102, 0.16)' : 'transparent',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
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
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                          fontSize: 14,
                          whiteSpace: 'pre',
                          color: '#FFFFFF',
                        }}
                      >
                        {l}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {explain.length ? (
              <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                {explain.map((e, idx) => (
                  <div
                    key={`${idx}-${e}`}
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                      fontFamily: fonts.body,
                      fontSize: 20,
                      lineHeight: 1.25,
                      color: colors.text,
                    }}
                  >
                    <span style={{color: colors.muted}}>–</span>
                    <span>{e}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </CardShell>
      </div>
    </AbsoluteFill>
  );
};
