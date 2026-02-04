import {Cover} from '../../../../components/Cover';
import {LessonTemplate} from '../../../../compositions/LessonTemplate';
import {LessonWithCover} from '../../../../compositions/LessonWithCover';
import {defiLandscapeConfig} from './lesson.config';

export type DefiLandscapeZhProps = {
  voiceoverVolume?: number;
  voiceoverFadeSec?: number;
  showCover?: boolean;
  coverDurationFrames?: number;
};

export const DefiLandscapeZh: React.FC<DefiLandscapeZhProps> = ({
  voiceoverVolume = 0.95,
  voiceoverFadeSec = 1.2,
  showCover = defiLandscapeConfig.cover.enabled,
  coverDurationFrames = defiLandscapeConfig.cover.durationFrames,
}) => {
  return (
    <LessonWithCover
      showCover={showCover}
      coverDurationFrames={coverDurationFrames}
      cover={
        <Cover
          titleLines={defiLandscapeConfig.cover.titleLines}
          badgeLabel={defiLandscapeConfig.cover.badgeLabel}
          badgeMeta={defiLandscapeConfig.cover.badgeMeta}
        />
      }
    >
      {({contentDurationFrames}) => (
        <LessonTemplate
          blocks={defiLandscapeConfig.blocks}
          contentDurationFrames={contentDurationFrames}
          audio={{
            src: defiLandscapeConfig.assets.audio,
            volume: voiceoverVolume,
            fadeSec: voiceoverFadeSec,
          }}
          accentColor={defiLandscapeConfig.accentColor}
        />
      )}
    </LessonWithCover>
  );
};
