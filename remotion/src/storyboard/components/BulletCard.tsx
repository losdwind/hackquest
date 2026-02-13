import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts} from '../../theme';
import type {StoryboardInjected} from '../types';
import {SceneScaffold} from './SceneScaffold';

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

const toneToBubble = (tone?: BulletCardProps['bullets'][number]['tone']) => {
  if (tone === 'accent') return 'rgba(255, 232, 102, 0.72)';
  if (tone === 'muted') return 'rgba(0, 0, 0, 0.08)';
  return 'rgba(255, 255, 255, 0.78)';
};

const toneToText = (tone?: BulletCardProps['bullets'][number]['tone']) => {
  if (tone === 'muted') return colors.muted;
  return colors.text;
};

export const BulletCard: React.FC<
  BulletCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, subtitle, badge, bullets, note}) => {
  return (
    <SceneScaffold
      background={
        'radial-gradient(circle at 9% 20%, rgba(255, 232, 102, 0.34), transparent 34%), radial-gradient(circle at 86% 84%, rgba(0, 0, 0, 0.06), transparent 40%), #ffffff'
      }
      eyebrow={eyebrow ?? badge}
      title={title}
      subtitle={subtitle}
      contentTop={26}
    >
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: note ? '1fr 0.38fr' : '1fr',
          gap: 28,
          alignItems: 'start',
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          {bullets.map((b, idx) => (
            <div
              key={`${idx}-${b.text}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '44px 1fr',
                gap: 14,
                alignItems: 'flex-start',
                padding: '14px 18px',
                borderRadius: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.76)',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: toneToBubble(b.tone),
                  fontFamily: fonts.brand,
                  fontWeight: 900,
                  fontSize: 24,
                  color: colors.text,
                }}
              >
                {b.icon ?? String(idx + 1)}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 44,
                  lineHeight: 1.22,
                  color: toneToText(b.tone),
                }}
              >
                {b.text}
              </div>
            </div>
          ))}
        </div>

        {note ? (
          <div
            style={{
              alignSelf: 'start',
              borderRadius: 24,
              padding: '18px 18px',
              background:
                'linear-gradient(180deg, rgba(255, 232, 102, 0.45), rgba(255, 255, 255, 0.74) 38%)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div
              style={{
                fontFamily: fonts.brand,
                fontSize: 20,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: colors.muted,
              }}
            >
              Note
            </div>
            <div
              style={{
                fontFamily: fonts.body,
                color: colors.text,
                fontSize: 38,
                lineHeight: 1.3,
              }}
            >
              {note}
            </div>
          </div>
        ) : null}
      </div>
    </SceneScaffold>
  );
};
