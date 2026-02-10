import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts} from '../../theme';
import type {StoryboardInjected} from '../types';
import {CardShell} from './CardShell';

export const SplitImageCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    bullets: z
      .array(
        z.object({
          text: z.string(),
          tone: z.enum(['accent', 'default', 'muted']).optional(),
        }),
      )
      .default([]),
    note: z.string().optional(),
  })
  .strict();

export type SplitImageCardProps = z.infer<typeof SplitImageCardPropsSchema>;

export const SplitImageCard: React.FC<
  SplitImageCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, subtitle, bullets, note, hq}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame, fps, config: {damping: 200}});
  const y = interpolate(reveal, [0, 1], [18, 0]);
  const opacity = interpolate(reveal, [0, 1], [0, 1]);

  const assetRef = hq?.assetRef ?? null;
  const imgSrc =
    assetRef && /^https?:\/\//i.test(assetRef) ? assetRef : assetRef ? staticFile(assetRef) : null;

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
          subtitle={subtitle}
          rightSlot={
            imgSrc ? (
              <div
                style={{
                  borderRadius: 22,
                  overflow: 'hidden',
                  backgroundColor: colors.background,
                }}
              >
                <Img
                  src={imgSrc}
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
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
                  gap: 12,
                  alignItems: 'flex-start',
                  fontFamily: fonts.body,
                  fontSize: 22,
                  color: b.tone === 'muted' ? colors.muted : colors.text,
                  lineHeight: 1.25,
                }}
              >
                <span style={{color: b.tone === 'accent' ? colors.text : colors.muted}}>
                  {b.tone === 'accent' ? '•' : '–'}
                </span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
          {note ? (
            <div
              style={{
                marginTop: 14,
                padding: '12px 14px',
                borderRadius: 18,
                backgroundColor: colors.panelSoft,
                fontFamily: fonts.body,
                fontSize: 18,
                color: colors.muted,
                lineHeight: 1.25,
              }}
            >
              {note}
            </div>
          ) : null}
        </CardShell>
      </div>
    </AbsoluteFill>
  );
};
