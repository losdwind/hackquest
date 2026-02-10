export type SectionPanelSection = {
  title: string;
  items: string[];
};

export type ChartSeriesItem = {
  label: string;
  value: number;
};

export type LessonBlockContext = {
  contentDurationFrames: number;
  blockDurationFrames: number;
  accentColor?: string;
  fps: number;
};
