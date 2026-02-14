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
  const completionLabel = titleLines[0] ?? 'Lesson Complete';
  const bodyTitleLines = titleLines.length > 1 ? titleLines.slice(1) : ['Thanks for Watching'];
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
          {bodyTitleLines.map((t) => (
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

      {/* ── 3D Completion Stamp ── */}
      {(() => {
        const nounSrc = staticFile('brand/noun-42.png');

        // Phase 1: Stamp slams down — from tilted + zoomed → flat
        const slamSpring = spring({frame, fps, delay: 10, config: {damping: 14, stiffness: 180, mass: 0.6}});
        const slamScale = interpolate(slamSpring, [0, 1], [2.8, 1]);
        const slamRotateX = interpolate(slamSpring, [0, 1], [55, 0]);
        const slamRotateZ = interpolate(slamSpring, [0, 1], [-12, 0]);
        const slamOpacity = interpolate(slamSpring, [0, 0.15, 1], [0, 1, 1]);

        // Phase 2: Subtle 3D idle after landing
        const settled = Math.max(0, frame - 28) / fps;
        const idleRotY = Math.sin(settled * 1.2) * 6;
        const idleRotX = Math.cos(settled * 0.9) * 3;

        // Phase 3: Shine sweep
        const shineProgress = interpolate(
          frame - 32,
          [0, 20],
          [-120, 500],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
        );

        // Phase 4: Rings
        const ringSpring = spring({frame, fps, delay: 14, config: {damping: 12, stiffness: 120, mass: 0.8}});
        const ringScale = interpolate(ringSpring, [0, 1], [0.4, 1]);
        const ringOpacity = interpolate(ringSpring, [0, 0.6, 1], [0, 0.7, 1]);

        // Phase 5: Burst
        const burstProgress = spring({frame, fps, delay: 14, config: {damping: 30, stiffness: 100, mass: 0.5}});

        // Phase 6: NFT image pop-in (delayed until stamp lands)
        const nftSpring = spring({frame, fps, delay: 18, config: {damping: 16, stiffness: 200, mass: 0.5}});
        const nftScale = interpolate(nftSpring, [0, 1], [0.5, 1]);
        const nftOpacity = interpolate(nftSpring, [0, 1], [0, 1]);

        // Phase 7: Label slide-up
        const labelSpring = spring({frame, fps, delay: 24, config: {damping: 20, stiffness: 140, mass: 0.7}});
        const labelY = interpolate(labelSpring, [0, 1], [20, 0]);
        const labelOpacity = interpolate(labelSpring, [0, 1], [0, 1]);

        const STAMP_SIZE = 440;
        const RING_GAP = 18;
        const NFT_SIZE = STAMP_SIZE - 100;

        return (
          <div
            style={{
              position: 'absolute',
              right: 80,
              top: 80,
              width: STAMP_SIZE + 100,
              height: STAMP_SIZE + 150,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0,
              perspective: 900,
            }}
          >
            {/* Burst particles */}
            {Array.from({length: 12}).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const dist = interpolate(burstProgress, [0, 1], [0, 260 + (i % 3) * 40]);
              const pOpacity = interpolate(burstProgress, [0, 0.2, 1], [0, 0.8, 0]);
              const px = Math.cos(angle) * dist;
              const py = Math.sin(angle) * dist;
              const size = 8 + (i % 3) * 5;
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: STAMP_SIZE / 2 + 50,
                    width: size,
                    height: size,
                    borderRadius: i % 2 === 0 ? 999 : 2,
                    backgroundColor: i % 3 === 0 ? accent : i % 3 === 1 ? colors.text : 'rgba(255,210,0,0.7)',
                    transform: `translate(${px - size / 2}px, ${py - size / 2}px) rotate(${i * 30 + frame * 2}deg)`,
                    opacity: pOpacity,
                  }}
                />
              );
            })}

            {/* Outer ring */}
            <div
              style={{
                position: 'absolute',
                top: 50 - RING_GAP,
                width: STAMP_SIZE + RING_GAP * 2,
                height: STAMP_SIZE + RING_GAP * 2,
                borderRadius: 999,
                border: `3px solid ${accent}`,
                opacity: ringOpacity,
                transform: `scale(${ringScale})`,
              }}
            />

            {/* Dashed ring */}
            <svg
              width={STAMP_SIZE + RING_GAP * 2 + 20}
              height={STAMP_SIZE + RING_GAP * 2 + 20}
              style={{
                position: 'absolute',
                top: 50 - RING_GAP - 10,
                opacity: ringOpacity * 0.5,
                transform: `scale(${ringScale}) rotate(${settled * 8}deg)`,
              }}
            >
              <circle
                cx="50%"
                cy="50%"
                r={(STAMP_SIZE + RING_GAP * 2 + 10) / 2}
                fill="none"
                stroke={accent}
                strokeWidth="1.5"
                strokeDasharray="8 12"
              />
            </svg>

            {/* Main stamp body */}
            <div
              style={{
                width: STAMP_SIZE,
                height: STAMP_SIZE,
                borderRadius: 999,
                marginTop: 50,
                opacity: slamOpacity,
                transformStyle: 'preserve-3d',
                transform: `scale(${slamScale}) rotateX(${slamRotateX + idleRotX}deg) rotateY(${idleRotY}deg) rotateZ(${slamRotateZ}deg)`,
                position: 'relative',
                flexShrink: 0,
              }}
            >
              {/* Shadow */}
              <div
                style={{
                  position: 'absolute',
                  inset: 10,
                  borderRadius: 999,
                  background: 'rgba(0,0,0,0.12)',
                  filter: `blur(${18 + idleRotX}px)`,
                  transform: 'translateZ(-20px) translateY(8px)',
                }}
              />

              {/* Gold face */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 999,
                  background: `conic-gradient(
                    from ${180 + idleRotY * 3}deg,
                    ${accent} 0deg,
                    rgba(255, 240, 140, 1) 60deg,
                    ${accent} 120deg,
                    rgba(255, 220, 60, 1) 200deg,
                    ${accent} 280deg,
                    rgba(255, 240, 140, 1) 360deg
                  )`,
                  border: `4px solid ${colors.text}`,
                  boxShadow: `
                    inset 0 2px 6px rgba(255,255,255,0.5),
                    inset 0 -4px 12px rgba(0,0,0,0.15),
                    0 4px 20px rgba(0,0,0,0.18)
                  `,
                  transform: 'translateZ(12px)',
                  overflow: 'hidden',
                }}
              >
                {/* Inner rings */}
                <div style={{position: 'absolute', inset: 12, borderRadius: 999, border: '3px solid rgba(0,0,0,0.18)'}} />
                <div style={{position: 'absolute', inset: 20, borderRadius: 999, border: '1.5px solid rgba(0,0,0,0.10)'}} />

                {/* Tick marks */}
                {Array.from({length: 36}).map((_, i) => {
                  const a = (i / 36) * 360;
                  const len = i % 3 === 0 ? 12 : 6;
                  return (
                    <div
                      key={`tick-${i}`}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: 1.5,
                        height: len,
                        backgroundColor: 'rgba(0,0,0,0.14)',
                        transformOrigin: `50% ${-STAMP_SIZE / 2 + 8}px`,
                        transform: `translateX(-50%) rotate(${a}deg)`,
                      }}
                    />
                  );
                })}

                {/* Center content: NFT artwork */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0,
                  }}
                >
                  {/* Top arc: HACKQUEST */}
                  <svg
                    width={STAMP_SIZE - 60}
                    height={(STAMP_SIZE - 60) / 2}
                    viewBox={`0 0 ${STAMP_SIZE - 60} ${(STAMP_SIZE - 60) / 2}`}
                    style={{position: 'absolute', top: 32}}
                  >
                    <defs>
                      <path
                        id="topArc"
                        d={`M 20,${(STAMP_SIZE - 60) / 2} A ${(STAMP_SIZE - 80) / 2},${(STAMP_SIZE - 80) / 2} 0 0,1 ${STAMP_SIZE - 80},${(STAMP_SIZE - 60) / 2}`}
                      />
                    </defs>
                    <text
                      fill={colors.text}
                      fontFamily={fonts.brand}
                      fontSize="18"
                      fontWeight="800"
                      letterSpacing="0.24em"
                      textAnchor="middle"
                    >
                      <textPath href="#topArc" startOffset="50%">
                        ★ HACKQUEST ★
                      </textPath>
                    </text>
                  </svg>

                  {/* Noun NFT image — circular clip */}
                  <div
                    style={{
                      width: NFT_SIZE,
                      height: NFT_SIZE,
                      borderRadius: 999,
                      overflow: 'hidden',
                      border: '4px solid rgba(0,0,0,0.16)',
                      boxShadow: 'inset 0 3px 10px rgba(0,0,0,0.12)',
                      transform: `scale(${nftScale})`,
                      opacity: nftOpacity,
                    }}
                  >
                    <img
                      alt=""
                      src={nounSrc}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        imageRendering: 'pixelated',
                        display: 'block',
                      }}
                    />
                  </div>

                  {/* Bottom arc */}
                  <svg
                    width={STAMP_SIZE - 60}
                    height={(STAMP_SIZE - 60) / 2}
                    viewBox={`0 0 ${STAMP_SIZE - 60} ${(STAMP_SIZE - 60) / 2}`}
                    style={{position: 'absolute', bottom: 30}}
                  >
                    <defs>
                      <path
                        id="bottomArc"
                        d={`M 20,6 A ${(STAMP_SIZE - 80) / 2},${(STAMP_SIZE - 80) / 2} 0 0,0 ${STAMP_SIZE - 80},6`}
                      />
                    </defs>
                    <text
                      fill={colors.text}
                      fontFamily={fonts.brand}
                      fontSize="14"
                      fontWeight="700"
                      letterSpacing="0.18em"
                      textAnchor="middle"
                    >
                      <textPath href="#bottomArc" startOffset="50%">
                        PROTOCOL ENGINEERING
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* Shine sweep */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 999,
                    background: `linear-gradient(
                      105deg,
                      transparent ${shineProgress - 80}%,
                      rgba(255, 255, 255, 0.45) ${shineProgress - 20}%,
                      rgba(255, 255, 255, 0.08) ${shineProgress}%,
                      transparent ${shineProgress + 30}%
                    )`,
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* 3D edge */}
              <div
                style={{
                  position: 'absolute',
                  inset: 2,
                  borderRadius: 999,
                  background: 'linear-gradient(180deg, rgba(200,160,20,0.6), rgba(160,120,0,0.8))',
                  transform: 'translateZ(-4px)',
                  border: '2px solid rgba(0,0,0,0.1)',
                }}
              />
            </div>

            {/* Label below stamp */}
            <div
              style={{
                marginTop: 18,
                textAlign: 'center',
                transform: `translateY(${labelY}px)`,
                opacity: labelOpacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.brand,
                  fontSize: 36,
                  fontWeight: 900,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: colors.text,
                  lineHeight: 1.1,
                }}
              >
                {completionLabel}
              </div>
              <div
                style={{
                  fontFamily: fonts.brand,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: colors.muted,
                }}
              >
                Nouns DAO · CC0
              </div>
            </div>
          </div>
        );
      })()}

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
