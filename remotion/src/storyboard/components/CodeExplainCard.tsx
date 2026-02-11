import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts} from '../../theme';
import {CodeBlock} from '../../ui/CodeBlock';
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

export const CodeExplainCard: React.FC<
  CodeExplainCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, language, code, highlights, explain}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame, fps, config: {damping: 200}});
  const y = interpolate(reveal, [0, 1], [18, 0]);
  const opacity = interpolate(reveal, [0, 1], [0, 1]);

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
            <CodeBlock code={code} language={language ?? 'snippet'} highlights={highlights} />

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
