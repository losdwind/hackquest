import type {CSSProperties} from 'react';

import {tokens} from '../theme/tokens';
import {Badge} from './Badge';
import {Title} from './Text';

export type FrameCalloutRect = {
  type: 'rect';
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
};

export type FrameCalloutBlur = {
  type: 'blur';
  x: number;
  y: number;
  w: number;
  h: number;
};

export type FrameCallout = FrameCalloutRect | FrameCalloutBlur;

export type FrameProps = {
  children: React.ReactNode;
  title?: string;
  badge?: string;
  callouts?: FrameCallout[];
  padding?: number;
  style?: CSSProperties;
};

export const Frame: React.FC<FrameProps> = ({
  children,
  title,
  badge,
  callouts = [],
  padding = 0,
  style,
}) => {
  return (
    <div style={{position: 'absolute', inset: 0, padding, ...style}}>
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 0,
          border: 'none',
          boxShadow: tokens.shadow.card,
          overflow: 'hidden',
          backgroundColor: '#0B0B0B',
          position: 'relative',
        }}
      >
        {children}

        {(title || badge) ? (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              gap: 12,
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.72), rgba(0,0,0,0.00))',
              pointerEvents: 'none',
            }}
          >
            <div style={{minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8}}>
              {badge ? (
                <Badge
                  text={badge}
                  tone="inverted"
                  style={{pointerEvents: 'none', alignSelf: 'flex-start'}}
                />
              ) : null}
              {title ? (
                <Title
                  tone="inverted"
                  maxLines={1}
                  style={{fontSize: 30, textShadow: '0 10px 28px rgba(0,0,0,0.45)'}}
                >
                  {title}
                </Title>
              ) : null}
            </div>
          </div>
        ) : null}

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
                border: `2px solid ${tokens.colors.accent}`,
              }}
            >
              {c.label ? (
                <div style={{position: 'absolute', left: 12, top: 12}}>
                  <Badge text={c.label} tone="accent" />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
