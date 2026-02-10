import type {ReactNode} from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {Audio} from '@remotion/media';
import {Background} from '../components/Background';
import {CaptionLayer} from '../components/CaptionLayer';
import {ProgressBar} from '../components/ProgressBar';
import {SectionPanel} from '../components/SectionPanel';
import {colors, fonts} from '../theme';
import type {
  ChartSeriesItem,
  LessonBlock,
  LessonBlockContext,
  SectionPanelSection,
} from '../courses/lesson-config';

type LessonTemplateAudio = {
  src?: string | null;
  volume?: number;
  fadeSec?: number;
};

type LessonTemplateProps = {
  blocks: LessonBlock[];
  contentDurationFrames: number;
  audio?: LessonTemplateAudio;
  accentColor?: string;
  background?: ReactNode;
};

const msToFrames = (ms: number, fps: number) =>
  Math.max(0, Math.round((ms / 1000) * fps));

const HeaderBlockView: React.FC<{
  unitLabel: string;
  lessonTitle: string;
  courseLabel: string;
}> = ({unitLabel, lessonTitle, courseLabel}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const headerReveal = spring({frame, fps, config: {damping: 200}});
  const headerTranslate = interpolate(headerReveal, [0, 1], [16, 0]);
  const headerOpacity = interpolate(headerReveal, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        top: 70,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        transform: `translateY(${headerTranslate}px)`,
        opacity: headerOpacity,
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 22,
          fontWeight: 600,
          color: colors.muted,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
        }}
      >
        {unitLabel}
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 56,
          fontWeight: 700,
          color: colors.text,
          textShadow: '0 12px 32px rgba(0, 0, 0, 0.35)',
        }}
      >
        {lessonTitle}
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 24,
          fontWeight: 500,
          color: colors.muted,
        }}
      >
        {courseLabel}
      </div>
    </div>
  );
};

const SectionPanelBlockView: React.FC<{
  sections: SectionPanelSection[];
  accentColor: string;
  durationFrames: number;
}> = ({sections, accentColor, durationFrames}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const timeMs = (frame / fps) * 1000;
  const totalMs = (durationFrames / fps) * 1000;

  const sectionDurationMs = totalMs / sections.length;
  const sectionIndex = Math.min(
    sections.length - 1,
    Math.floor(timeMs / sectionDurationMs),
  );
  const sectionStartMs = sectionIndex * sectionDurationMs;
  const sectionFrame = ((timeMs - sectionStartMs) / 1000) * fps;
  const sectionReveal = spring({
    frame: Math.max(0, sectionFrame),
    fps,
    config: {damping: 200},
  });

  return (
    <SectionPanel
      title={sections[sectionIndex].title}
      items={sections[sectionIndex].items}
      reveal={sectionReveal}
      accentColor={accentColor}
    />
  );
};

const ProgressBarBlockView: React.FC<{
  durationFrames: number;
  accentColor: string;
}> = ({durationFrames, accentColor}) => {
  const frame = useCurrentFrame();
  const progress = durationFrames === 0 ? 0 : frame / durationFrames;

  return <ProgressBar progress={progress} accentColor={accentColor} />;
};

const ChartBlockView: React.FC<{
  title: string;
  series: ChartSeriesItem[];
  maxValue?: number;
  accentColor: string;
  position?: {left: number; top: number};
  size?: {width: number; height: number};
}> = ({
  title,
  series,
  maxValue,
  accentColor,
  position,
  size,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame, fps, config: {damping: 200}});
  const width = size?.width ?? 520;
  const height = size?.height ?? 280;
  const barAreaHeight = height - 90;
  const resolvedMax = Math.max(
    1,
    maxValue ?? Math.max(...series.map((item) => item.value)),
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: position?.left ?? 80,
        top: position?.top ?? 520,
        width,
        height,
        padding: '20px 24px',
        borderRadius: 24,
        backgroundColor: colors.panel,
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: colors.muted,
        }}
      >
        {title}
      </div>
      <div style={{display: 'flex', gap: 18, alignItems: 'flex-end'}}>
        {series.map((item) => {
          const ratio = Math.min(1, item.value / resolvedMax);
          const barHeight = Math.max(8, ratio * barAreaHeight * reveal);
          return (
            <div
              key={item.label}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: barHeight,
                  borderRadius: 12,
                  background: `linear-gradient(180deg, ${accentColor}, rgba(255, 255, 255, 0.1))`,
                  boxShadow: `0 10px 30px ${accentColor}55`,
                }}
              />
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 14,
                  fontWeight: 600,
                  color: colors.text,
                  textAlign: 'center',
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FormulaBlockView: React.FC<{
  expression: string;
  caption?: string;
  accentColor: string;
  position?: {left: number; top: number};
}> = ({expression, caption, accentColor, position}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lift = interpolate(frame, [0, 16], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: position?.left ?? 120,
        top: position?.top ?? 360,
        padding: '24px 32px',
        borderRadius: 24,
        backgroundColor: colors.panel,
        border: `1px solid ${accentColor}`,
        boxShadow: `0 18px 40px ${accentColor}55`,
        opacity,
        transform: `translateY(${lift}px)`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 36,
          fontWeight: 700,
          color: colors.text,
          letterSpacing: '0.02em',
        }}
      >
        {expression}
      </div>
      {caption ? (
        <div
          style={{
            marginTop: 10,
            fontFamily: fonts.body,
            fontSize: 16,
            color: colors.muted,
          }}
        >
          {caption}
        </div>
      ) : null}
    </div>
  );
};

export const LessonTemplate: React.FC<LessonTemplateProps> = ({
  blocks,
  contentDurationFrames,
  audio,
  accentColor,
  background,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const voiceoverFadeFrames = Math.max(1, (audio?.fadeSec ?? 1.2) * fps);
  const voiceoverVolume = audio?.volume ?? 0.95;

  const voiceoverGain = (f: number) => {
    const fadeIn = interpolate(f, [0, voiceoverFadeFrames], [0, voiceoverVolume], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const fadeOut = interpolate(
      f,
      [contentDurationFrames - voiceoverFadeFrames, contentDurationFrames],
      [voiceoverVolume, 0],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      },
    );

    return Math.min(fadeIn, fadeOut);
  };

  const renderBlock = (
    block: LessonBlock,
    context: LessonBlockContext,
  ): ReactNode => {
    switch (block.type) {
      case 'header':
        return (
          <HeaderBlockView
            unitLabel={block.props.unitLabel}
            lessonTitle={block.props.lessonTitle}
            courseLabel={block.props.courseLabel}
          />
        );
      case 'sectionPanel':
        return (
          <SectionPanelBlockView
            sections={block.props.sections}
            accentColor={context.accentColor ?? colors.accent}
            durationFrames={context.blockDurationFrames}
          />
        );
      case 'captions':
        return <CaptionLayer captionsFile={block.props.captionsFile} />;
      case 'progressBar':
        return (
          <ProgressBarBlockView
            durationFrames={context.blockDurationFrames}
            accentColor={context.accentColor ?? colors.accent}
          />
        );
      case 'chart':
        return (
          <ChartBlockView
            title={block.props.title}
            series={block.props.series}
            maxValue={block.props.maxValue}
            accentColor={
              block.props.accentColor ??
              context.accentColor ??
              colors.accent
            }
            position={block.props.position}
            size={block.props.size}
          />
        );
      case 'formula':
        return (
          <FormulaBlockView
            expression={block.props.expression}
            caption={block.props.caption}
            accentColor={
              block.props.accentColor ??
              context.accentColor ??
              colors.accent
            }
            position={block.props.position}
          />
        );
      case 'custom': {
        const CustomComponent = block.component;
        return <CustomComponent {...block.props} context={context} />;
      }
      default:
        return null;
    }
  };

  return (
    <AbsoluteFill style={{fontFamily: fonts.body, color: colors.text}}>
      {background ?? <Background />}

      {audio?.src ? (
        <Audio src={staticFile(audio.src)} volume={voiceoverGain(frame)} />
      ) : null}

      {blocks.map((block) => {
        const startFrame = block.startMs ? msToFrames(block.startMs, fps) : 0;
        const rawDuration = block.durationMs
          ? msToFrames(block.durationMs, fps)
          : contentDurationFrames - startFrame;
        const durationFrames = Math.max(1, rawDuration);
        const accentOverride = (block as {props?: {accentColor?: string}})
          .props?.accentColor;
        const resolvedAccent = accentOverride ?? accentColor;
        const context: LessonBlockContext = {
          contentDurationFrames,
          blockDurationFrames: durationFrames,
          accentColor: resolvedAccent,
          fps,
        };

        return (
          <Sequence
            key={block.id}
            from={startFrame}
            durationInFrames={durationFrames}
          >
            {renderBlock(block, context)}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
