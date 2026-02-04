import type {ComponentType} from 'react';

export type LessonCoverConfig = {
  enabled: boolean;
  durationFrames: number;
  titleLines: string[];
  badgeLabel: string;
  badgeMeta: string;
};

export type LessonAssets = {
  audio: string;
  captions: string;
  coverHero?: string;
};

export type SectionPanelSection = {
  title: string;
  items: string[];
};

export type LessonBlockBase = {
  id: string;
  // Relative to lesson content (after the cover). Omit to span the full lesson.
  startMs?: number;
  durationMs?: number;
};

export type HeaderBlock = LessonBlockBase & {
  type: 'header';
  props: {
    unitLabel: string;
    lessonTitle: string;
    courseLabel: string;
  };
};

export type SectionPanelBlock = LessonBlockBase & {
  type: 'sectionPanel';
  props: {
    sections: SectionPanelSection[];
    accentColor?: string;
    titleLabel?: string;
  };
};

export type CaptionsBlock = LessonBlockBase & {
  type: 'captions';
  props: {
    captionsFile: string;
  };
};

export type ProgressBarBlock = LessonBlockBase & {
  type: 'progressBar';
  props?: {
    accentColor?: string;
  };
};

export type ChartSeriesItem = {
  label: string;
  value: number;
};

export type ChartBlock = LessonBlockBase & {
  type: 'chart';
  props: {
    title: string;
    series: ChartSeriesItem[];
    maxValue?: number;
    position?: {
      left: number;
      top: number;
    };
    size?: {
      width: number;
      height: number;
    };
    accentColor?: string;
  };
};

export type FormulaBlock = LessonBlockBase & {
  type: 'formula';
  props: {
    expression: string;
    caption?: string;
    position?: {
      left: number;
      top: number;
    };
    accentColor?: string;
  };
};

export type CustomBlock = LessonBlockBase & {
  type: 'custom';
  component: ComponentType<{
    context: LessonBlockContext;
  }>;
  props?: Record<string, unknown>;
};

export type LessonBlock =
  | HeaderBlock
  | SectionPanelBlock
  | CaptionsBlock
  | ProgressBarBlock
  | ChartBlock
  | FormulaBlock
  | CustomBlock;

export type LessonBlockContext = {
  contentDurationFrames: number;
  blockDurationFrames: number;
  accentColor?: string;
  fps: number;
};

export type LessonConfig = {
  id: string;
  courseId: string;
  unitId: string;
  lessonId: string;
  title: string;
  unitLabel: string;
  courseLabel: string;
  fps: number;
  durationInFrames: number;
  accentColor: string;
  assets: LessonAssets;
  cover: LessonCoverConfig;
  blocks: LessonBlock[];
};
