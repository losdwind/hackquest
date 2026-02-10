import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useDelayRender,
  useVideoConfig,
} from 'remotion';
import type {Caption} from '@remotion/captions';
import {fitText} from '@remotion/layout-utils';
import {colors, fonts} from '../../theme';

type CaptionLayerProps = {
  captionsFile: string;
  startAtFrame?: number;
};

const findActiveCaption = (captions: Caption[], timeMs: number) => {
  let low = 0;
  let high = captions.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const caption = captions[mid];

    if (timeMs < caption.startMs) {
      high = mid - 1;
    } else if (timeMs >= caption.endMs) {
      low = mid + 1;
    } else {
      return caption;
    }
  }

  return null;
};

export const CaptionsOverlay: React.FC<CaptionLayerProps> = ({
  captionsFile,
  startAtFrame = 0,
}) => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const {delayRender, continueRender, cancelRender} = useDelayRender();
  const [handle] = useState(() => delayRender());

  const fetchCaptions = useCallback(async () => {
    try {
      const response = await fetch(staticFile(captionsFile));
      const data = (await response.json()) as Caption[];
      setCaptions(data);
      continueRender(handle);
    } catch (error) {
      cancelRender(error);
    }
  }, [captionsFile, cancelRender, continueRender, handle]);

  useEffect(() => {
    fetchCaptions();
  }, [fetchCaptions]);

  if (!captions) {
    return null;
  }

  return <CaptionRenderer captions={captions} startAtFrame={startAtFrame} />;
};

type CaptionRendererProps = {
  captions: Caption[];
};

const CaptionRenderer: React.FC<CaptionRendererProps & {startAtFrame: number}> = ({
  captions,
  startAtFrame,
}) => {
  const globalFrame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const frame = Math.max(0, globalFrame - startAtFrame);
  const timeMs = (frame / fps) * 1000;

  const caption = useMemo(
    () => findActiveCaption(captions, timeMs),
    [captions, timeMs],
  );

  if (!caption) {
    return null;
  }

  const localFrame = Math.max(
    0,
    ((timeMs - caption.startMs) / 1000) * fps,
  );
  const durationFrames = Math.max(
    1,
    ((caption.endMs - caption.startMs) / 1000) * fps,
  );

  const opacityIn = interpolate(localFrame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacityOut = interpolate(
    localFrame,
    [durationFrames - 12, durationFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  const opacity = Math.min(opacityIn, opacityOut);
  const maxWidth = 1400;
  const paddingX = 40;
  const baseFontSize = 44;
  const minFontSize = 24;
  const {fontSize} = fitText({
    text: caption.text,
    withinWidth: maxWidth - paddingX * 2,
    fontFamily: fonts.body,
    fontWeight: 600,
  });
  const resolvedFontSize = Math.max(
    minFontSize,
    Math.min(fontSize, baseFontSize),
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 140,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth,
          padding: `22px ${paddingX}px`,
          borderRadius: 12,
          backgroundColor: colors.panel,
          textAlign: 'center',
          color: colors.text,
          fontFamily: fonts.body,
          fontSize: resolvedFontSize,
          fontWeight: 600,
          lineHeight: 1.25,
          whiteSpace: 'nowrap',
          opacity,
        }}
      >
        {caption.text}
      </div>
    </AbsoluteFill>
  );
};
