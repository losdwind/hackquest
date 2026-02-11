import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts} from '../../theme';
import type {StoryboardInjected} from '../types';
import {CardShell} from './CardShell';

export const DefinitionCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    term: z.string(),
    definition: z.string(),
    notes: z.array(z.string()).default([]),
  })
  .strict();

export type DefinitionCardProps = z.infer<typeof DefinitionCardPropsSchema>;

export const DefinitionCard: React.FC<
  DefinitionCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, term, definition, notes}) => {
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
        <CardShell eyebrow={eyebrow} title={term} subtitle={definition}>
          {notes.length ? (
            <div style={{marginTop: 14, display: 'flex', flexDirection: 'column', gap: 16}}>
              {notes.map((n, idx) => (
                <div
                  key={`${idx}-${n}`}
                  style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                    fontFamily: fonts.body,
                    fontSize: 28,
                    color: colors.text,
                    lineHeight: 1.3,
                  }}
                >
                  <span style={{color: colors.muted}}>–</span>
                  <span>{n}</span>
                </div>
              ))}
            </div>
          ) : null}
        </CardShell>
      </div>
    </AbsoluteFill>
  );
};
