import {Composition, Folder} from 'remotion';

import {lessonManifest} from './lesson-manifest';
import {LessonComposition} from './compositions/LessonComposition';

export const RemotionRoot: React.FC = () => {
  const grouped = lessonManifest.reduce<Record<string, typeof lessonManifest>>(
    (acc, entry) => {
      const key = entry.metaFile.split('/')[0] ?? 'lessons';
      if (!acc[key]) acc[key] = [];
      acc[key].push(entry);
      return acc;
    },
    {},
  );

  return (
    <>
      {Object.entries(grouped).map(([folderName, entries]) => (
        <Folder key={folderName} name={folderName}>
          {entries.map((entry) => (
            <Composition
              key={entry.id}
              id={entry.id}
              component={LessonComposition}
              width={entry.width}
              height={entry.height}
              fps={entry.fps}
              durationInFrames={entry.durationInFrames}
              defaultProps={{
                metaFile: entry.metaFile,
                voiceoverVolume: 0.95,
                voiceoverFadeSec: 1.2,
              }}
            />
          ))}
        </Folder>
      ))}
    </>
  );
};
