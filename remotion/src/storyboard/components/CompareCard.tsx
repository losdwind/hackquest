import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts} from '../../theme';
import type {StoryboardInjected} from '../types';
import {CardShell} from './CardShell';

export const CompareCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    left: z.object({label: z.string(), bullets: z.array(z.string()).default([])}).strict(),
    right: z.object({label: z.string(), bullets: z.array(z.string()).default([])}).strict(),
    verdict: z.string().optional(),
  })
  .strict();

export type CompareCardProps = z.infer<typeof CompareCardPropsSchema>;

const Side: React.FC<{label: string; bullets: string[]}> = ({label, bullets}) => {
  return (
    <div
      style={{
        borderRadius: 22,
        backgroundColor: colors.panelSoft,
        padding: '24px 24px',
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 28,
          fontWeight: 900,
          letterSpacing: '-0.01em',
          color: colors.text,
          marginBottom: 12,
          paddingBottom: 10,
          borderBottom: `1px solid ${colors.borderSoft}`,
        }}
      >
        {label}
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        {bullets.map((b, idx) => (
          <div
            key={`${idx}-${b}`}
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
              fontFamily: fonts.body,
              fontSize: 26,
              lineHeight: 1.3,
              color: colors.text,
            }}
          >
            <span style={{color: colors.muted}}>–</span>
            <span>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CompareCard: React.FC<
  CompareCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, left, right, verdict}) => {
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
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
            <Side label={left.label} bullets={left.bullets} />
            <Side label={right.label} bullets={right.bullets} />
          </div>
          {verdict ? (
            <div
              style={{
                marginTop: 16,
                padding: '14px 16px',
                borderRadius: 18,
                backgroundColor: colors.accentSoft,
                fontFamily: fonts.body,
                fontSize: 26,
                lineHeight: 1.3,
                color: colors.text,
              }}
            >
              {verdict}
            </div>
          ) : null}
        </CardShell>
      </div>
    </AbsoluteFill>
  );
};
