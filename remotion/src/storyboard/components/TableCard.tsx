import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';

import type {LessonBlockContext} from '../../lesson-config';
import {colors, fonts} from '../../theme';
import type {StoryboardInjected} from '../types';
import {CardShell} from './CardShell';

export const TableCardPropsSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string(),
    columns: z.array(z.string()).min(1),
    rows: z.array(z.array(z.string())),
  })
  .strict()
  .superRefine((val, ctx) => {
    for (let i = 0; i < val.rows.length; i += 1) {
      if (val.rows[i]?.length !== val.columns.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['rows', i],
          message: `Row ${i} must have ${val.columns.length} columns`,
        });
      }
    }
  });

export type TableCardProps = z.infer<typeof TableCardPropsSchema>;

export const TableCard: React.FC<
  TableCardProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = ({eyebrow, title, columns, rows}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame, fps, config: {damping: 200}});
  const y = interpolate(reveal, [0, 1], [18, 0]);
  const opacity = interpolate(reveal, [0, 1], [0, 1]);

  const isNumericLike = (value: string) => {
    const t = String(value ?? '').trim();
    if (!t) return false;
    return /^[\d,._%$()+\-]+$/.test(t);
  };

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
              marginTop: 12,
              borderRadius: 24,
              overflow: 'hidden',
              backgroundColor: colors.background,
              border: `2px solid ${colors.borderSoft}`,
              boxShadow: '0 24px 60px rgba(0,0,0,0.10)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
                gap: 0,
                padding: '16px 18px',
                backgroundColor: colors.accentSoft,
                fontFamily: fonts.brand,
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: colors.text,
                borderBottom: `2px solid ${colors.borderSoft}`,
              }}
            >
              {columns.map((c) => (
                <div key={c} style={{paddingRight: 14, minWidth: 0}}>
                  {c}
                </div>
              ))}
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              {rows.map((r, rowIdx) => (
                <div
                  key={rowIdx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
                    gap: 0,
                    padding: '16px 18px',
                    fontFamily: fonts.body,
                    fontSize: 20,
                    lineHeight: 1.35,
                    color: colors.text,
                    backgroundColor:
                      rowIdx % 2 === 0 ? colors.background : 'rgba(0, 0, 0, 0.03)',
                    borderBottom:
                      rowIdx === rows.length - 1 ? 'none' : `1px solid ${colors.borderSoft}`,
                    alignItems: 'start',
                  }}
                >
                  {r.map((cell, cellIdx) => {
                    const numeric = isNumericLike(cell);
                    return (
                      <div
                        key={cellIdx}
                        style={{
                          paddingRight: 14,
                          minWidth: 0,
                          textAlign: numeric ? 'right' : 'left',
                          fontFamily: numeric ? fonts.brand : fonts.body,
                          fontWeight: cellIdx === 0 ? 700 : numeric ? 800 : 500,
                          letterSpacing: numeric ? '0.02em' : undefined,
                          wordBreak: 'break-word',
                        }}
                      >
                        {cell}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardShell>
      </div>
    </AbsoluteFill>
  );
};
