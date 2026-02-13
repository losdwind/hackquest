import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts} from '../../theme';
import type {StoryboardInjected} from '../types';
import {SceneScaffold} from './SceneScaffold';

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

const Side: React.FC<{label: string; bullets: string[]; align: 'left' | 'right'}> = ({
  label,
  bullets,
  align,
}) => {
  const isLeft = align === 'left';

  return (
    <div
      style={{
        height: '100%',
        borderRadius: 24,
        backgroundColor: isLeft ? 'rgba(255, 255, 255, 0.78)' : 'rgba(255, 255, 255, 0.68)',
        padding: '24px 24px 22px',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '8px 14px',
          borderRadius: 8,
          backgroundColor: isLeft ? 'rgba(255, 232, 102, 0.42)' : 'rgba(0, 0, 0, 0.08)',
          fontFamily: fonts.brand,
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: colors.muted,
          marginBottom: 12,
        }}
      >
        {isLeft ? 'Option A' : 'Option B'}
      </div>

      <div
        style={{
          display: 'block',
          width: 'fit-content',
          padding: '8px 14px',
          borderRadius: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          fontFamily: fonts.display,
          fontSize: 56,
          fontWeight: 900,
          lineHeight: 1.06,
          letterSpacing: '-0.01em',
          color: colors.text,
          marginBottom: 16,
        }}
      >
        {label}
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        {bullets.map((bullet, idx) => (
          <div
            key={`${idx}-${bullet}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '44px 1fr',
              gap: 14,
              alignItems: 'start',
              padding: '14px 16px',
              borderRadius: 14,
              backgroundColor: 'rgba(255, 255, 255, 0.74)',
            }}
          >
            <span
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: fonts.brand,
                fontSize: 30,
                color: colors.muted,
                backgroundColor: isLeft ? 'rgba(255, 232, 102, 0.34)' : 'rgba(0, 0, 0, 0.08)',
              }}
            >
              {String(idx + 1)}
            </span>
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: 40,
                lineHeight: 1.22,
                color: colors.text,
              }}
            >
              {bullet}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CompareCard: React.FC<
  CompareCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, left, right, verdict}) => {
  return (
    <SceneScaffold
      background={
        'linear-gradient(116deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 54%, rgba(255, 232, 102, 0.22) 54%, rgba(255, 232, 102, 0.22) 100%)'
      }
      eyebrow={eyebrow}
      title={title}
      contentTop={26}
    >
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateRows: '1fr auto',
          gap: 20,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 82px 1fr',
            gap: 18,
            alignItems: 'stretch',
          }}
        >
          <Side label={left.label} bullets={left.bullets} align="left" />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 2,
                height: 120,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 999,
              }}
            />
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: 999,
                backgroundColor: colors.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: fonts.brand,
                fontWeight: 900,
                fontSize: 36,
                letterSpacing: '0.08em',
                color: colors.text,
              }}
            >
              VS
            </div>
            <div
              style={{
                width: 2,
                height: 120,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 999,
              }}
            />
          </div>

          <Side label={right.label} bullets={right.bullets} align="right" />
        </div>

        {verdict ? (
          <div
            style={{
              padding: '16px 18px',
              borderRadius: 18,
              backgroundColor: 'rgba(255, 255, 255, 0.78)',
              fontFamily: fonts.body,
              fontSize: 40,
              lineHeight: 1.28,
              color: colors.text,
            }}
          >
            {verdict}
          </div>
        ) : null}
      </div>
    </SceneScaffold>
  );
};
