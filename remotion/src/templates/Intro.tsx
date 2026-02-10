import {AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';

import {Background} from '../ui/Background';
import {colors, fonts} from '../theme';

export type IntroTemplateProps = {
  courseLabel?: string;
  unitLabel?: string;
  lessonLabel?: string;
  lessonTitle?: string;
  heroFile?: string;
  brandLogoFile?: string;
  brandWordmarkFile?: string;
  accentColor?: string;
  titleLines?: string[];
  badgeLabel?: string;
  badgeMeta?: string;
};

export const Intro: React.FC<IntroTemplateProps> = ({
  courseLabel,
  unitLabel,
  lessonLabel,
  lessonTitle,
  heroFile,
  brandLogoFile,
  brandWordmarkFile,
  accentColor,
  titleLines = ['HackQuest', 'Branding', 'Guideline'],
  badgeLabel,
  badgeMeta,
}) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const accent = accentColor ?? colors.accent;
  const resolvedCourse = courseLabel ?? badgeLabel;
  const resolvedUnit = unitLabel ?? badgeMeta;
  const resolvedLessonTitle =
    lessonTitle ?? titleLines[1] ?? titleLines[0] ?? 'Lesson Title';
  const resolvedLessonLabel = lessonLabel ?? titleLines[2];
  const heroSrc = heroFile ? staticFile(heroFile) : null;
  const lockupSrc = brandWordmarkFile
    ? staticFile(brandWordmarkFile)
    : brandLogoFile
      ? null
      : staticFile('brand/logo-full-horizontal.svg');
  const logoSrc =
    brandWordmarkFile || !brandLogoFile ? null : staticFile(brandLogoFile);

  const logoSpring = spring({frame, fps, config: {damping: 200}});
  const labelsSpring = spring({frame, fps, delay: 0, config: {damping: 200}});
  const titleSpring = spring({frame, fps, delay: 0, config: {damping: 200}});
  const badgeSpring = spring({frame, fps, delay: 0, config: {damping: 180}});

  const logoTranslate = interpolate(logoSpring, [0, 1], [0, 0]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [1, 1]);

  const labelsOpacity = interpolate(labelsSpring, [0, 1], [1, 1]);
  const labelsTranslate = interpolate(labelsSpring, [0, 1], [0, 0]);

  const titleScale = interpolate(titleSpring, [0, 1], [1, 1]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [1, 1]);

  const badgeScale = interpolate(badgeSpring, [0, 1], [1, 1]);
  const badgeOpacity = interpolate(badgeSpring, [0, 1], [1, 1]);

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
            right: -120,
            top: 120,
            width: 920,
            opacity: 0.18,
            filter: 'saturate(0.85)',
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
          <img
            alt=""
            src={lockupSrc}
            style={{
              height: 44,
              display: 'block',
            }}
          />
        ) : logoSrc ? (
          <img
            alt=""
            src={logoSrc}
            style={{
              height: 44,
              display: 'block',
            }}
          />
        ) : null}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 92,
          bottom: 190,
          maxWidth: 920,
          opacity: labelsOpacity,
          transform: `translateY(${labelsTranslate}px)`,
        }}
      >
        {resolvedCourse ? (
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
            {resolvedCourse}
          </div>
        ) : null}
        {resolvedUnit ? (
          <div
            style={{
              marginTop: 8,
              fontFamily: fonts.body,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: '0.02em',
              color: colors.text,
            }}
          >
            {resolvedUnit}
          </div>
        ) : null}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 92,
          bottom: 92,
          maxWidth: 1320,
          transform: `scale(${titleScale})`,
          transformOrigin: 'left bottom',
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 74,
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
          }}
        >
          {resolvedLessonTitle}
        </div>
      </div>

      {resolvedLessonLabel ? (
        <div
          style={{
            position: 'absolute',
            right: 92,
            bottom: 92,
            padding: '12px 18px',
            borderRadius: 999,
            border: `2px solid ${colors.border}`,
            backgroundColor: accent,
            fontFamily: fonts.brand,
            fontSize: 14,
            fontWeight: 900,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: colors.text,
            transform: `scale(${badgeScale})`,
            transformOrigin: 'right bottom',
            opacity: badgeOpacity,
          }}
        >
          {resolvedLessonLabel}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

