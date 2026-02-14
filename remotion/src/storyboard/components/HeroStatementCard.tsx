import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts} from '../../theme';
import type {StoryboardInjected} from '../types';
import {SceneScaffold} from './SceneScaffold';

export const HeroStatementCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    statement: z.string(),
    deliverables: z
      .array(
        z.object({
          text: z.string(),
          icon: z.string().optional(),
        }),
      )
      .min(1),
    note: z.string().optional(),
  })
  .strict();

export type HeroStatementCardProps = z.infer<typeof HeroStatementCardPropsSchema>;

export const HeroStatementCard: React.FC<
  HeroStatementCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, statement, deliverables, note}) => {
  return (
    <SceneScaffold
      background={
        'radial-gradient(circle at 50% 10%, rgba(255, 232, 102, 0.52), transparent 48%), radial-gradient(circle at 80% 90%, rgba(255, 232, 102, 0.18), transparent 40%), #ffffff'
      }
      eyebrow={eyebrow}
      contentTop={0}
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 36,
        }}
      >
        {/* Hero statement */}
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: colors.text,
            maxWidth: 1100,
            textAlign: 'center',
            alignSelf: 'center',
          }}
        >
          {statement}
        </div>

        {/* Accent divider */}
        <div
          style={{
            width: 80,
            height: 5,
            borderRadius: 999,
            backgroundColor: colors.accent,
            alignSelf: 'center',
          }}
        />

        {/* Deliverables grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              deliverables.length <= 3
                ? `repeat(${deliverables.length}, 1fr)`
                : 'repeat(2, 1fr)',
            gap: 16,
            alignSelf: 'center',
            width: '100%',
            maxWidth: 1140,
          }}
        >
          {deliverables.map((d, idx) => (
            <div
              key={`${idx}-${d.text}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '16px 20px',
                borderRadius: 18,
                backgroundColor: 'rgba(255, 255, 255, 0.82)',
                border: '1px solid rgba(255, 232, 102, 0.5)',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 232, 102, 0.56)',
                  fontFamily: fonts.brand,
                  fontWeight: 900,
                  fontSize: 24,
                  color: colors.text,
                }}
              >
                {d.icon ?? '✓'}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 38,
                  lineHeight: 1.22,
                  color: colors.text,
                }}
              >
                {d.text}
              </div>
            </div>
          ))}
        </div>

        {/* Optional note */}
        {note ? (
          <div
            style={{
              alignSelf: 'center',
              maxWidth: 900,
              textAlign: 'center',
              fontFamily: fonts.body,
              fontSize: 34,
              lineHeight: 1.3,
              color: colors.muted,
              padding: '12px 20px',
              borderRadius: 14,
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            }}
          >
            {note}
          </div>
        ) : null}
      </div>
    </SceneScaffold>
  );
};
