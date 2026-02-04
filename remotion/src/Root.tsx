import {Composition, Folder} from 'remotion';
import {Cover} from './components/Cover';
import {lessonRegistry} from './courses/registry';

const WIDTH = 1920;
const HEIGHT = 1080;

export const RemotionRoot: React.FC = () => {
  const grouped = lessonRegistry.reduce<Record<string, typeof lessonRegistry>>(
    (acc, entry) => {
      const key = entry.folder ?? entry.config.courseId ?? 'lessons';
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
          {entries.flatMap((entry) => {
            const coverFrames = entry.config.cover.enabled
              ? entry.config.cover.durationFrames
              : 0;
            const totalFrames = entry.config.durationInFrames + coverFrames;

            const compositions = [];

            if (entry.config.cover.enabled) {
              compositions.push(
                <Composition
                  key={`${entry.config.id}-cover`}
                  id={`${entry.config.id}-cover`}
                  component={Cover}
                  fps={entry.config.fps}
                  width={WIDTH}
                  height={HEIGHT}
                  durationInFrames={Math.max(1, coverFrames)}
                  defaultProps={{
                    titleLines: entry.config.cover.titleLines,
                    badgeLabel: entry.config.cover.badgeLabel,
                    badgeMeta: entry.config.cover.badgeMeta,
                  }}
                />,
              );
            }

            compositions.push(
              <Composition
                key={entry.config.id}
                id={entry.config.id}
                component={entry.component}
                fps={entry.config.fps}
                width={WIDTH}
                height={HEIGHT}
                durationInFrames={totalFrames}
                defaultProps={entry.defaultProps}
              />,
            );

            return compositions;
          })}
        </Folder>
      ))}
    </>
  );
};
