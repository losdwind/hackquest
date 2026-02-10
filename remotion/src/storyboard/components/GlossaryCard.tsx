import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts} from '../../theme';
import type {StoryboardInjected} from '../types';
import {CardShell} from './CardShell';

export const GlossaryCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    items: z
      .array(
        z.object({
          cn: z.string(),
          en: z.string(),
        }),
      )
      .min(1),
  })
  .strict();

export type GlossaryCardProps = z.infer<typeof GlossaryCardPropsSchema>;

export const GlossaryCard: React.FC<
  GlossaryCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, items}) => {
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
              marginTop: 8,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 14,
            }}
          >
            {items.map((it, idx) => (
              <div
                key={`${idx}-${it.cn}-${it.en}`}
                style={{
                  padding: '14px 14px',
                  borderRadius: 20,
                  backgroundColor: colors.panelSoft,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 28,
                    fontWeight: 900,
                    color: colors.text,
                    lineHeight: 1.05,
                  }}
                >
                  {it.cn}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 18,
                    color: colors.muted,
                    letterSpacing: '0.02em',
                  }}
                >
                  {it.en}
                </div>
              </div>
            ))}
          </div>
        </CardShell>
      </div>
    </AbsoluteFill>
  );
};
