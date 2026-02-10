import type {LessonConfig, SectionPanelSection} from '../../../lesson-config';
import {CustomCallout} from './CustomCallout';

const title = 'DeFi Landscape';
const unitLabel = 'Unit 1 · Background Foundations';
const courseLabel = 'Stablecoin Protocol Course';
const accentColor = '#FFB703';
const assets = {
  audio:
    'courses/course-1-stablecoin-protocol/unit-1/lesson-1-defi-landscape/audio/voiceover.mp3',
  captions:
    'courses/course-1-stablecoin-protocol/unit-1/lesson-1-defi-landscape/captions/phrases.json',
} as const;

const sections: SectionPanelSection[] = [
  {
    title: 'Course Preview',
    items: ['Stablecoin Course', 'Foundry', 'Advanced Testing'],
  },
  {
    title: 'DeFi Overview',
    items: ['Decentralized Finance', 'Ecosystem', 'Core Protocols'],
  },
  {
    title: 'Top Protocols',
    items: ['Lido', 'MakerDAO', 'Aave'],
  },
  {
    title: 'DEX & Stablecoins',
    items: ['Curve', 'Uniswap', 'Stablecoin Swaps'],
  },
  {
    title: 'Learning Paths',
    items: ['Bankless', 'MetaMask Learn', 'Wallet Safety'],
  },
  {
    title: 'Lending Walkthrough',
    items: ['Aave App', 'Supply Assets', 'Interest Rates'],
  },
  {
    title: 'Layer 2 & MEV',
    items: ['Arbitrum', 'Optimism', 'Flashbots'],
  },
  {
    title: 'What Stablecoins Are',
    items: ['DAI', 'CDP', 'Store of Value'],
  },
];

export const defiLandscapeConfig: LessonConfig = {
  id: 'defi-landscape-zh',
  courseId: 'course-1-stablecoin-protocol',
  unitId: 'unit-1',
  lessonId: 'lesson-1-defi-landscape',
  title,
  unitLabel,
  courseLabel,
  fps: 30,
  durationInFrames: 18137,
  accentColor,
  assets,
  cover: {
    enabled: true,
    durationFrames: 90,
    titleLines: ['HackQuest', title, 'Lesson 1'],
    badgeLabel: courseLabel,
    badgeMeta: unitLabel,
  },
  blocks: [
    {
      id: 'header',
      type: 'header',
      props: {
        unitLabel,
        lessonTitle: title,
        courseLabel,
      },
    },
    {
      id: 'sections',
      type: 'sectionPanel',
      props: {
        sections,
        accentColor,
      },
    },
    {
      id: 'chart-liquidity',
      type: 'chart',
      startMs: 9000,
      durationMs: 12000,
      props: {
        title: 'Liquidity Growth',
        series: [
          {label: 'Q1', value: 40},
          {label: 'Q2', value: 68},
          {label: 'Q3', value: 92},
          {label: 'Q4', value: 120},
        ],
        maxValue: 120,
        position: {left: 90, top: 520},
      },
    },
    {
      id: 'formula-stability',
      type: 'formula',
      startMs: 22000,
      durationMs: 9000,
      props: {
        expression: 'Collateral >= Debt',
        caption: 'Over-collateralization keeps the system safe.',
        position: {left: 140, top: 360},
      },
    },
    {
      id: 'custom-callout',
      type: 'custom',
      startMs: 36000,
      durationMs: 9000,
      component: CustomCallout,
      props: {
        title: 'Key Insight',
        body: 'Stablecoin designs trade off capital efficiency and risk exposure.',
      },
    },
    {
      id: 'captions',
      type: 'captions',
      props: {
        captionsFile: assets.captions,
      },
    },
    {
      id: 'progress',
      type: 'progressBar',
      props: {
        accentColor,
      },
    },
  ],
};
