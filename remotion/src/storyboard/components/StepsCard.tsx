import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts} from '../../theme';
import type {StoryboardInjected} from '../types';
import {CardShell} from './CardShell';

export const StepsCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    steps: z
      .array(
        z.object({
          title: z.string(),
          detail: z.string().optional(),
        }),
      )
      .min(1),
    activeStep: z.number().int().positive().optional(),
  })
  .strict();

export type StepsCardProps = z.infer<typeof StepsCardPropsSchema>;

export const StepsCard: React.FC<
  StepsCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, subtitle, steps, activeStep}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame, fps, config: {damping: 200}});
  const y = interpolate(reveal, [0, 1], [18, 0]);
  const opacity = interpolate(reveal, [0, 1], [0, 1]);

  const activeIndex = activeStep ? Math.max(1, activeStep) - 1 : -1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        padding: 96,
        justifyContent: 'center',
      }}
    >
      <div style={{transform: `translateY(${y}px)`, opacity}}>
        <CardShell eyebrow={eyebrow} title={title} subtitle={subtitle}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
            {steps.map((s, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={`${idx}-${s.title}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr',
                    gap: 20,
                    alignItems: 'start',
                    padding: '18px 18px',
                    borderRadius: 20,
                    backgroundColor: isActive ? colors.accentSoft : colors.panelSoft,
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isActive ? colors.accent : colors.panelSoft,
                      fontFamily: fonts.brand,
                      fontSize: 20,
                      fontWeight: 900,
                      color: colors.text,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: fonts.display,
                        fontSize: 34,
                        fontWeight: 800,
                        color: colors.text,
                        lineHeight: 1.15,
                        marginBottom: s.detail ? 6 : 0,
                      }}
                    >
                      {s.title}
                    </div>
                    {s.detail ? (
                      <div
                        style={{
                          fontFamily: fonts.body,
                          fontSize: 26,
                          lineHeight: 1.3,
                          color: colors.muted,
                          maxWidth: 980,
                        }}
                      >
                        {s.detail}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </CardShell>
      </div>
    </AbsoluteFill>
  );
};
