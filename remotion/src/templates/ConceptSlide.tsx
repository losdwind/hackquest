import {AbsoluteFill} from 'remotion';

import type {LessonBlockContext} from '../lesson-config';
import {colors} from '../theme';

// Minimal placeholder template. Current default slide rendering is still owned by StoryboardRouter.
// This exists to stabilize imports while we migrate slide rendering to templates/ui primitives.
export type ConceptSlideProps = {
  context: LessonBlockContext;
  title?: string;
  subtitle?: string;
  bullets?: string[];
};

export const ConceptSlide: React.FC<ConceptSlideProps> = ({title, subtitle}) => {
  return (
    <AbsoluteFill style={{backgroundColor: colors.background, padding: 120}}>
      <div style={{fontSize: 56, fontWeight: 900}}>{title}</div>
      <div style={{marginTop: 18, fontSize: 24, opacity: 0.75}}>{subtitle}</div>
    </AbsoluteFill>
  );
};
