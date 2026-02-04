import type {ComponentType} from 'react';
import type {LessonConfig} from './lesson-config';
import {DefiLandscapeZh} from './course-1-stablecoin-protocol/Unit 1 Background Foundations/1 DeFi landscape/DefiLandscapeZh';
import {defiLandscapeConfig} from './course-1-stablecoin-protocol/Unit 1 Background Foundations/1 DeFi landscape/lesson.config';

export type LessonRegistryEntry = {
  config: LessonConfig;
  component: ComponentType<any>;
  folder?: string;
  defaultProps?: Record<string, unknown>;
};

export const lessonRegistry: LessonRegistryEntry[] = [
  {
    config: defiLandscapeConfig,
    component: DefiLandscapeZh,
    folder: 'course-1',
    defaultProps: {
      voiceoverVolume: 0.95,
      voiceoverFadeSec: 1.2,
      showCover: defiLandscapeConfig.cover.enabled,
      coverDurationFrames: defiLandscapeConfig.cover.durationFrames,
    },
  },
];
