import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts} from '../../theme';
import type {StoryboardInjected} from '../types';
import {CardShell} from './CardShell';

export const BulletToneSchema = z.enum(['accent', 'default', 'muted']);

export const BulletCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    badge: z.string().optional(),
    bullets: z
      .array(
        z.object({
          text: z.string(),
          tone: BulletToneSchema.optional(),
          icon: z.string().optional(),
        }),
      )
      .default([]),
    note: z.string().optional(),
  })
  .strict();

export type BulletCardProps = z.infer<typeof BulletCardPropsSchema>;

const toneToColor = (tone?: BulletCardProps['bullets'][number]['tone']) => {
  if (tone === 'accent') return colors.accent;
  if (tone === 'muted') return colors.panelSoft;
  return colors.background;
};

export const BulletCard: React.FC<
  BulletCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, subtitle, badge, bullets, note}) => {
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
          eyebrow={eyebrow ?? badge}
          title={title}
          subtitle={subtitle}
          rightSlot={
            note ? (
              <div
                style={{
                  borderRadius: 22,
                  backgroundColor: colors.panelSoft,
                  padding: '18px 18px',
                  fontFamily: fonts.body,
                  color: colors.muted,
                  fontSize: 18,
                  lineHeight: 1.3,
                }}
              >
                {note}
              </div>
            ) : null
          }
        >
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            {bullets.map((b, idx) => (
              <div
                key={`${idx}-${b.text}`}
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: toneToColor(b.tone),
                    fontFamily: fonts.brand,
                    fontWeight: 800,
                    color: colors.text,
                    flex: '0 0 auto',
                  }}
                >
                  {b.icon ?? String(idx + 1)}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 24,
                    lineHeight: 1.25,
                    color: b.tone === 'muted' ? colors.muted : colors.text,
                  }}
                >
                  {b.text}
                </div>
              </div>
            ))}
          </div>
        </CardShell>
      </div>
    </AbsoluteFill>
  );
};
