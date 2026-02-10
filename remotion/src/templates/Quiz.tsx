import {AbsoluteFill} from 'remotion';

import type {LessonBlockContext} from '../lesson-config';
import {colors, fonts} from '../theme';

export type QuizChoice = {label: string; text: string};

export type QuizProps = {
  context: LessonBlockContext;
  question: string;
  choices: QuizChoice[];
};

export const Quiz: React.FC<QuizProps> = ({question, choices}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        padding: 120,
        fontFamily: fonts.body,
      }}
    >
      <div style={{fontSize: 42, fontWeight: 900, marginBottom: 28}}>
        {question}
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        {choices.map((c) => (
          <div
            key={c.label}
            style={{
              border: `2px solid ${colors.border}`,
              borderRadius: 18,
              padding: 18,
              fontSize: 22,
            }}
          >
            <span style={{fontWeight: 900, marginRight: 12}}>{c.label}.</span>
            <span>{c.text}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

