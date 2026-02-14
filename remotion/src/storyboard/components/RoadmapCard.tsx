import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts} from '../../theme';
import type {StoryboardInjected} from '../types';
import {SceneScaffold} from './SceneScaffold';

export const RoadmapCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    phases: z
      .array(
        z.object({
          label: z.string(),
          title: z.string(),
          detail: z.string().optional(),
        }),
      )
      .min(1),
    activePhase: z.number().int().positive().optional(),
  })
  .strict();

export type RoadmapCardProps = z.infer<typeof RoadmapCardPropsSchema>;

export const RoadmapCard: React.FC<
  RoadmapCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, subtitle, phases, activePhase}) => {
  const activeIdx = activePhase ? activePhase - 1 : -1;

  return (
    <SceneScaffold
      background={
        'linear-gradient(160deg, rgba(255,255,255,1) 0%, rgba(255, 232, 102, 0.16) 100%)'
      }
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      contentTop={24}
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          gap: 0,
        }}
      >
        {phases.map((phase, idx) => {
          const isActive = idx === activeIdx;
          const isPast = activeIdx >= 0 && idx < activeIdx;
          const isFuture = activeIdx >= 0 && idx > activeIdx;
          const isLast = idx === phases.length - 1;

          return (
            <div
              key={`${idx}-${phase.label}`}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              {/* Progress line */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 60,
                }}
              >
                {/* Left connector */}
                {idx > 0 ? (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: '50%',
                      top: '50%',
                      height: 4,
                      backgroundColor:
                        isPast || isActive
                          ? colors.accent
                          : 'rgba(0, 0, 0, 0.12)',
                      transform: 'translateY(-50%)',
                    }}
                  />
                ) : null}

                {/* Right connector */}
                {!isLast ? (
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      right: 0,
                      top: '50%',
                      height: 4,
                      backgroundColor:
                        isPast
                          ? colors.accent
                          : 'rgba(0, 0, 0, 0.12)',
                      transform: 'translateY(-50%)',
                    }}
                  />
                ) : null}

                {/* Dot */}
                <div
                  style={{
                    width: isActive ? 52 : 40,
                    height: isActive ? 52 : 40,
                    borderRadius: 999,
                    backgroundColor: isActive
                      ? colors.accent
                      : isPast
                        ? colors.accent
                        : 'rgba(0, 0, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: fonts.brand,
                    fontSize: isActive ? 26 : 22,
                    fontWeight: 900,
                    color: isPast || isActive ? colors.text : colors.muted,
                    zIndex: 1,
                    border: isActive ? `4px solid rgba(255, 255, 255, 0.9)` : 'none',
                    boxShadow: isActive
                      ? '0 0 0 3px rgba(255, 232, 102, 0.6)'
                      : 'none',
                  }}
                >
                  {isPast ? '✓' : String(idx + 1)}
                </div>
              </div>

              {/* Card */}
              <div
                style={{
                  flex: 1,
                  width: '100%',
                  padding: '0 6px',
                  marginTop: 10,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    borderRadius: 18,
                    padding: '16px 14px',
                    backgroundColor: isActive
                      ? 'rgba(255, 232, 102, 0.36)'
                      : 'rgba(255, 255, 255, 0.82)',
                    border: isActive
                      ? '2px solid rgba(255, 232, 102, 0.7)'
                      : '1px solid rgba(0, 0, 0, 0.06)',
                    opacity: isFuture ? 0.6 : 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      fontFamily: fonts.brand,
                      fontSize: 20,
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: colors.muted,
                    }}
                  >
                    {phase.label}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontSize: 36,
                      fontWeight: 900,
                      lineHeight: 1.1,
                      color: colors.text,
                    }}
                  >
                    {phase.title}
                  </div>
                  {phase.detail ? (
                    <div
                      style={{
                        fontFamily: fonts.body,
                        fontSize: 30,
                        lineHeight: 1.24,
                        color: colors.muted,
                        marginTop: 2,
                      }}
                    >
                      {phase.detail}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SceneScaffold>
  );
};
