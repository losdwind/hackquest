import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';

export type LessonWithCoverRenderContext = {
  contentDurationFrames: number;
  coverFrames: number;
  fps: number;
  durationInFrames: number;
};

type LessonWithCoverProps = {
  cover: React.ReactNode;
  children: (context: LessonWithCoverRenderContext) => React.ReactNode;
  showCover?: boolean;
  coverDurationFrames?: number;
};

export const LessonWithCover: React.FC<LessonWithCoverProps> = ({
  cover,
  children,
  showCover = true,
  coverDurationFrames,
}) => {
  const {fps, durationInFrames} = useVideoConfig();
  const resolvedCoverDuration = Math.max(
    1,
    coverDurationFrames ?? Math.round(3 * fps),
  );
  const coverFrames = showCover ? resolvedCoverDuration : 0;
  const contentDurationFrames = Math.max(1, durationInFrames - coverFrames);

  return (
    <AbsoluteFill>
      {showCover ? (
        <Sequence durationInFrames={resolvedCoverDuration}>{cover}</Sequence>
      ) : null}

      <Sequence from={coverFrames}>
        {children({contentDurationFrames, coverFrames, fps, durationInFrames})}
      </Sequence>
    </AbsoluteFill>
  );
};
