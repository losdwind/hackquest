import {AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';

import {Background} from '../ui/Background';
import {colors, fonts} from '../theme';

export type OutroTemplateProps = {
  courseLabel?: string;
  unitLabel?: string;
  lessonLabel?: string;
  lessonTitle?: string;
  heroFile?: string;
  brandLogoFile?: string;
  brandWordmarkFile?: string;
  titleLines?: string[];
  badgeLabel?: string;
  badgeMeta?: string;
  accentColor?: string;
  artFile?: string;
  nextLessonLabel?: string;
  nextLessonTitle?: string;
};

const getArt = (file?: string) => (file ? staticFile(file) : null);

export const Outro: React.FC<OutroTemplateProps> = ({
  courseLabel,
  unitLabel,
  lessonLabel,
  lessonTitle,
  heroFile,
  brandLogoFile,
  brandWordmarkFile,
  titleLines = ['Lesson Complete', 'Thanks for Watching'],
  badgeLabel,
  badgeMeta,
  accentColor,
  artFile,
  nextLessonLabel,
  nextLessonTitle,
}) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const accent = accentColor ?? colors.accent;
  const coverArt = getArt(artFile);
  const heroSrc = heroFile ? staticFile(heroFile) : null;
  const lockupSrc = brandWordmarkFile
    ? staticFile(brandWordmarkFile)
    : brandLogoFile
      ? null
      : staticFile('brand/logo-full-horizontal.svg');
  const logoSrc =
    brandWordmarkFile || !brandLogoFile ? null : staticFile(brandLogoFile);

  const logoSpring = spring({frame, fps, config: {damping: 200}});
  const badgeSpring = spring({frame, fps, delay: 8, config: {damping: 200}});
  const titleSpring = spring({frame, fps, delay: 16, config: {damping: 200}});
  const cardSpring = spring({frame, fps, delay: 32, config: {damping: 180}});

  const logoTranslate = interpolate(logoSpring, [0, 1], [-40, 0]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1]);
  const badgeTranslate = interpolate(badgeSpring, [0, 1], [20, 0]);

  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleTranslate = interpolate(titleSpring, [0, 1], [30, 0]);

  const cardTranslate = interpolate(cardSpring, [0, 1], [60, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: fonts.display,
      }}
    >
      <Background />

      {heroSrc ? (
        <img
          alt=""
          src={heroSrc}
          style={{
            position: 'absolute',
            right: -140,
            bottom: -160,
            width: 820,
            opacity: 0.12,
            filter: 'saturate(0.85)',
            pointerEvents: 'none',
          }}
        />
      ) : coverArt ? (
        <img
          alt=""
          src={coverArt}
          style={{
            position: 'absolute',
            right: -120,
            bottom: -140,
            width: 760,
            opacity: 0.12,
            pointerEvents: 'none',
          }}
        />
      ) : null}

      <div
        style={{
          position: 'absolute',
          left: 92,
          top: 70,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          transform: `translateY(${logoTranslate}px)`,
          opacity: logoOpacity,
        }}
      >
        {lockupSrc ? (
          <img alt="" src={lockupSrc} style={{height: 44, display: 'block'}} />
        ) : logoSrc ? (
          <img alt="" src={logoSrc} style={{height: 44, display: 'block'}} />
        ) : null}
      </div>

      {(badgeLabel || badgeMeta) ? (
        <div
          style={{
            position: 'absolute',
            left: 92,
            top: 170,
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            transform: `translateY(${badgeTranslate}px)`,
            opacity: badgeOpacity,
          }}
        >
          {badgeLabel ? (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 999,
                backgroundColor: accent,
                border: `2px solid ${colors.border}`,
                fontFamily: fonts.brand,
                fontWeight: 900,
                letterSpacing: '0.14em',
                fontSize: 12,
                textTransform: 'uppercase',
              }}
            >
              {badgeLabel}
            </div>
          ) : null}
          {badgeMeta ? (
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.02em',
                color: colors.muted,
              }}
            >
              {badgeMeta}
            </div>
          ) : null}
        </div>
      ) : null}

      <div
        style={{
          position: 'absolute',
          left: 92,
          top: 270,
          transform: `translateY(${titleTranslate}px)`,
          opacity: titleOpacity,
          maxWidth: 980,
        }}
      >
        {courseLabel ? (
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 16,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: colors.muted,
            }}
          >
            {courseLabel}
          </div>
        ) : null}
        {unitLabel ? (
          <div style={{marginTop: 8, fontFamily: fonts.body, fontSize: 18, fontWeight: 700}}>
            {unitLabel}
          </div>
        ) : null}
        {(lessonTitle || lessonLabel) ? (
          <div style={{marginTop: 8, fontFamily: fonts.body, fontSize: 14, color: colors.muted}}>
            {lessonLabel ? `${lessonLabel} · ` : ''}
            {lessonTitle ?? ''}
          </div>
        ) : null}

        <div style={{marginTop: 26, display: 'flex', flexDirection: 'column', gap: 10}}>
          {titleLines.map((t) => (
            <div
              key={t}
              style={{
                fontSize: 70,
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      {(nextLessonLabel || nextLessonTitle) ? (
        <div
          style={{
            position: 'absolute',
            left: 92,
            bottom: 92,
            padding: '24px 26px',
            borderRadius: 24,
            backgroundColor: colors.panelSoft,
            border: `2px solid ${colors.border}`,
            boxShadow: 'none',
            transform: `translateY(${cardTranslate}px)`,
            opacity: cardOpacity,
            maxWidth: 860,
          }}
        >
          <div
            style={{
              fontFamily: fonts.brand,
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: colors.muted,
              marginBottom: 10,
            }}
          >
            What&apos;s Next
          </div>
          {nextLessonLabel ? (
            <div style={{fontFamily: fonts.body, fontSize: 16, fontWeight: 700, color: colors.muted}}>
              {nextLessonLabel}
            </div>
          ) : null}
          {nextLessonTitle ? (
            <div style={{marginTop: 6, fontFamily: fonts.display, fontSize: 34, fontWeight: 900}}>
              {nextLessonTitle}
            </div>
          ) : null}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
