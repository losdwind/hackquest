import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts} from '../../theme';
import {CardShell} from './CardShell';

export const CalloutScenePropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    body: z.string(),
  })
  .strict();

export type CalloutSceneProps = z.infer<typeof CalloutScenePropsSchema>;

export const CalloutScene: React.FC<{
  eyebrow?: string;
  title: string;
  body: string;
  context: LessonBlockContext;
}> = ({eyebrow, title, body, context}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const reveal = spring({frame, fps, config: {damping: 200}});
  const y = interpolate(reveal, [0, 1], [24, 0]);
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
              fontFamily: fonts.body,
              fontSize: 32,
              lineHeight: 1.38,
              color: colors.text,
              maxWidth: 980,
            }}
          >
            {body}
          </div>
        </CardShell>
      </div>
    </AbsoluteFill>
  );
};
