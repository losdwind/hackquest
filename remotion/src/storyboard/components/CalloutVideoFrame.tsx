import {
  AbsoluteFill,
  Video,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts, tokens} from '../../theme';
import type {StoryboardInjected} from '../types';

const CalloutRectSchema = z
  .object({
    type: z.literal('rect'),
    x: z.number(),
    y: z.number(),
    w: z.number(),
    h: z.number(),
    label: z.string().optional(),
  })
  .strict();

const CalloutBlurSchema = z
  .object({
    type: z.literal('blur'),
    x: z.number(),
    y: z.number(),
    w: z.number(),
    h: z.number(),
  })
  .strict();

export const CalloutVideoFramePropsSchema = z
  .object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    badge: z.string().optional(),
    callouts: z.array(z.union([CalloutRectSchema, CalloutBlurSchema])).default([]),
  })
  .strict();

export type CalloutVideoFrameProps = z.infer<typeof CalloutVideoFramePropsSchema>;

export const CalloutVideoFrame: React.FC<
  CalloutVideoFrameProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({title, subtitle, badge, callouts, hq}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame, fps, config: {damping: 200}});
  const y = interpolate(reveal, [0, 1], [18, 0]);
  const opacity = interpolate(reveal, [0, 1], [0, 1]);

  const assetRef = hq?.assetRef ?? null;
  const src =
    assetRef && /^https?:\/\//i.test(assetRef) ? assetRef : assetRef ? staticFile(assetRef) : null;

  return (
    <AbsoluteFill style={{backgroundColor: colors.background}}>
      <div style={{position: 'absolute', inset: 0, padding: 72}}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 32,
            border: 'none',
            boxShadow: tokens.shadow.card,
            overflow: 'hidden',
            backgroundColor: '#0B0B0B',
            transform: `translateY(${y}px)`,
            opacity,
            position: 'relative',
          }}
        >
          {src ? (
            <Video
              src={src}
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
          ) : (
            <AbsoluteFill
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: fonts.body,
                color: 'rgba(255,255,255,0.6)',
                fontSize: 28,
              }}
            >
              Missing video asset
            </AbsoluteFill>
          )}

          {callouts.map((c, idx) => {
            if (c.type === 'blur') {
              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  style={{
                    position: 'absolute',
                    left: c.x,
                    top: c.y,
                    width: c.w,
                    height: c.h,
                    borderRadius: 18,
                    backgroundColor: 'rgba(0,0,0,0.45)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                />
              );
            }

            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                style={{
                  position: 'absolute',
                  left: c.x,
                  top: c.y,
                  width: c.w,
                  height: c.h,
                  borderRadius: 18,
                  border: `2px solid ${colors.accent}`,
                }}
              >
                {c.label ? (
                  <div
                    style={{
                      position: 'absolute',
                      left: 12,
                      top: 12,
                      padding: '6px 10px',
                      borderRadius: 999,
                      backgroundColor: colors.accent,
                      border: `1px solid ${colors.border}`,
                      fontFamily: fonts.brand,
                      fontSize: 14,
                      fontWeight: 900,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: colors.text,
                    }}
                  >
                    {c.label}
                  </div>
                ) : null}
              </div>
            );
          })}

          {(title || subtitle || badge) ? (
            <div
              style={{
                position: 'absolute',
                left: 30,
                bottom: 30,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                maxWidth: 860,
              }}
            >
              {badge ? (
                <div
                  style={{
                    alignSelf: 'flex-start',
                    padding: '6px 10px',
                    borderRadius: 999,
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    fontFamily: fonts.brand,
                    fontSize: 14,
                    fontWeight: 900,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: colors.text,
                  }}
                >
                  {badge}
                </div>
              ) : null}
              {title ? (
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 44,
                    fontWeight: 900,
                    lineHeight: 1.05,
                    color: '#FFFFFF',
                    textShadow: '0 10px 28px rgba(0,0,0,0.45)',
                  }}
                >
                  {title}
                </div>
              ) : null}
              {subtitle ? (
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 24,
                    color: 'rgba(255,255,255,0.78)',
                    lineHeight: 1.3,
                    textShadow: '0 10px 28px rgba(0,0,0,0.45)',
                  }}
                >
                  {subtitle}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};
