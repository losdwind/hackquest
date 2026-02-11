import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts} from '../../theme';
import type {StoryboardInjected} from '../types';
import {CardShell} from './CardShell';

export const WarningCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    message: z.string(),
    bullets: z.array(z.string()).default([]),
  })
  .strict();

export type WarningCardProps = z.infer<typeof WarningCardPropsSchema>;

export const WarningCard: React.FC<
  WarningCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, message, bullets}) => {
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
        <CardShell
          eyebrow={eyebrow}
          title={title}
          subtitle={message}
          rightSlot={
            <div
              style={{
                borderRadius: 22,
                backgroundColor: colors.accentSoft,
                padding: '22px 22px',
                fontFamily: fonts.body,
                fontSize: 24,
                lineHeight: 1.35,
                color: colors.text,
              }}
            >
              Keep this calm and actionable.
            </div>
          }
        >
          {bullets.length ? (
            <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
              {bullets.map((b, idx) => (
                <div
                  key={`${idx}-${b}`}
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
                  <span>{b}</span>
                </div>
              ))}
            </div>
          ) : null}
        </CardShell>
      </div>
    </AbsoluteFill>
  );
};
