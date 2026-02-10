import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

import type {SectionPanelSection} from '../../lesson-config';
import {SectionPanel} from '../SectionPanel';

export const SectionPanelOverlay: React.FC<{
  sections: SectionPanelSection[];
  accentColor: string;
  durationFrames: number;
  startAtFrame?: number;
}> = ({sections, accentColor, durationFrames, startAtFrame = 0}) => {
  const globalFrame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const frame = Math.max(0, globalFrame - startAtFrame);
  const timeMs = (frame / fps) * 1000;
  const totalMs = (durationFrames / fps) * 1000;

  const sectionDurationMs = totalMs / Math.max(1, sections.length);
  const sectionIndex = Math.min(
    Math.max(0, sections.length - 1),
    Math.floor(timeMs / sectionDurationMs),
  );
  const sectionStartMs = sectionIndex * sectionDurationMs;
  const sectionFrame = ((timeMs - sectionStartMs) / 1000) * fps;
  const reveal = spring({
    frame: Math.max(0, sectionFrame),
    fps,
    config: {damping: 200},
  });

  const current = sections[sectionIndex] ?? sections[0];
  if (!current) return null;

  return (
    <SectionPanel
      title={current.title}
      items={current.items}
      reveal={reveal}
      accentColor={accentColor}
    />
  );
};
