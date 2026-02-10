import {AbsoluteFill, staticFile} from 'remotion';
import {fonts} from '../theme';

type CoverProps = {
  titleLines?: string[];
  badgeLabel?: string;
  badgeMeta?: string;
};

const imgVector = staticFile('cover/imgVector.svg');
const imgVector1 = staticFile('cover/imgVector1.svg');
const imgVector2 = staticFile('cover/imgVector2.svg');
const imgVector3 = staticFile('cover/imgVector3.svg');
const imgGroup = staticFile('cover/imgGroup.svg');
const imgVector4 = staticFile('cover/imgVector4.svg');
const imgVector5 = staticFile('cover/imgVector5.svg');
const imgGroup1 = staticFile('cover/imgGroup1.svg');
const imgVector6 = staticFile('cover/imgVector6.svg');
const imgVector7 = staticFile('cover/imgVector7.svg');
const imgGroup2 = staticFile('cover/imgGroup2.svg');
const imgLayer1 = staticFile('cover/imgLayer1.svg');
const imgGroup427319005 = staticFile('cover/imgGroup427319005.svg');

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'block',
};

export const Cover: React.FC<CoverProps> = ({
  titleLines = ['HackQuest', 'Branding', 'Guideline'],
  badgeLabel = 'Branding Guideline',
  badgeMeta = '@2023',
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFFFFF',
        color: '#000000',
        fontFamily: fonts.brand,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '20.18%',
          right: '3.33%',
          bottom: '8.46%',
          left: '62.19%',
          backgroundColor: '#EDEDED',
          border: '1.063px dashed #000000',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '18.3%',
          right: '4.39%',
          bottom: '10.34%',
          left: '61.13%',
          backgroundColor: '#FFFFFF',
          border: '1.063px solid #000000',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 92,
          top: 73,
          width: 414,
          height: 52,
          backgroundColor: '#FFE866',
          border: '1.2px solid #000000',
          borderRadius: 104.589,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          fontSize: 22,
          fontWeight: 500,
          lineHeight: 1,
        }}
      >
        <span>{badgeLabel}</span>
        <span style={{textAlign: 'right'}}>{badgeMeta}</span>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 92,
          top: 236,
          fontSize: 140,
          fontWeight: 700,
          lineHeight: '155px',
          textTransform: 'capitalize',
          whiteSpace: 'nowrap',
        }}
      >
        {titleLines.map((line, index) => (
          <div key={`${line}-${index}`}>{line}</div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 964,
          top: 120,
          width: 871.677,
          height: 824.904,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '42.11%',
            right: '30.57%',
            bottom: '57.82%',
            left: '68.92%',
          }}
        >
          <img alt="" src={imgVector} style={imageStyle} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '10.13%',
            right: '2.93%',
            bottom: '24.3%',
            left: '34.99%',
          }}
        >
          <img alt="" src={imgVector1} style={imageStyle} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '1.68%',
            right: '3.48%',
            bottom: '31.36%',
            left: '33.12%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-0.12%',
              right: '-0.12%',
              bottom: '-0.12%',
              left: '-0.12%',
            }}
          >
            <img alt="" src={imgVector2} style={imageStyle} />
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '12.7%',
            right: '3.52%',
            bottom: '52%',
            left: '60.01%',
            mixBlendMode: 'multiply',
          }}
        >
          <img alt="" src={imgVector3} style={imageStyle} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '50.11%',
            right: '17.25%',
            bottom: '0.89%',
            left: '19%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-0.16%',
              right: '-0.11%',
              bottom: '-0.16%',
              left: '-0.11%',
            }}
          >
            <img alt="" src={imgGroup} style={imageStyle} />
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '29.11%',
            right: '22.15%',
            bottom: '6.52%',
            left: '0.37%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-0.12%',
              right: '0%',
              bottom: '-0.12%',
              left: '0%',
            }}
          >
            <img alt="" src={imgVector4} style={imageStyle} />
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '50.64%',
            right: '59.25%',
            bottom: '32%',
            left: '19%',
            mixBlendMode: 'multiply',
          }}
        >
          <img alt="" src={imgVector5} style={imageStyle} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '18.17%',
            right: '57.7%',
            bottom: '41.26%',
            left: '4.26%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-0.19%',
              right: '-0.19%',
              bottom: '-0.19%',
              left: '-0.19%',
            }}
          >
            <img alt="" src={imgGroup1} style={imageStyle} />
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '52.23%',
            right: '24.32%',
            bottom: '45.15%',
            left: '73.21%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-2.95%',
              right: '-2.95%',
              bottom: '-2.95%',
              left: '-2.95%',
            }}
          >
            <img alt="" src={imgVector6} style={imageStyle} />
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '93.06%',
            right: '84.89%',
            bottom: '6.1%',
            left: '14.3%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-9.14%',
              right: '-9.13%',
              bottom: '-9.14%',
              left: '-9.13%',
            }}
          >
            <img alt="" src={imgVector7} style={imageStyle} />
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '4.9%',
            right: '2.93%',
            bottom: '59.3%',
            left: '53.66%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-0.22%',
              right: '-0.17%',
              bottom: '-0.22%',
              left: '-0.17%',
            }}
          >
            <img alt="" src={imgGroup2} style={imageStyle} />
          </div>
        </div>
      </div>

      <img
        alt=""
        src={imgLayer1}
        style={{
          position: 'absolute',
          left: 92,
          top: 917,
          width: 254,
          height: 73,
          display: 'block',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 1810,
          top: 68,
          width: 59.9,
          height: 59.9,
          overflow: 'hidden',
        }}
      >
        <img alt="" src={imgGroup427319005} style={imageStyle} />
      </div>
    </AbsoluteFill>
  );
};
