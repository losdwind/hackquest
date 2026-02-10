import type {ComponentType} from 'react';
import type {ZodTypeAny} from 'zod';

import {BulletCard, BulletCardPropsSchema} from './components/BulletCard';
import {StepsCard, StepsCardPropsSchema} from './components/StepsCard';
import {DefinitionCard, DefinitionCardPropsSchema} from './components/DefinitionCard';
import {WarningCard, WarningCardPropsSchema} from './components/WarningCard';
import {CompareCard, CompareCardPropsSchema} from './components/CompareCard';
import {GlossaryCard, GlossaryCardPropsSchema} from './components/GlossaryCard';
import {TableCard, TableCardPropsSchema} from './components/TableCard';
import {SplitImageCard, SplitImageCardPropsSchema} from './components/SplitImageCard';
import {CodeExplainCard, CodeExplainCardPropsSchema} from './components/CodeExplainCard';
import {CalloutVideoFrame, CalloutVideoFramePropsSchema} from './components/CalloutVideoFrame';
import {CalloutScene, CalloutScenePropsSchema} from './components/CalloutScene';
import {DemoOverlay, DemoOverlayPropsSchema} from '../templates/DemoOverlay';

export type StoryboardComponentDef = {
  component: ComponentType<any>;
  propsSchema: ZodTypeAny;
  assetKind?: 'video' | 'image';
};

export const registry: Record<string, StoryboardComponentDef> = {
  // Use from script.md as: `Component: BulletCard` with a `{"props": ... }` JSON block.
  BulletCard: {component: BulletCard, propsSchema: BulletCardPropsSchema},
  StepsCard: {component: StepsCard, propsSchema: StepsCardPropsSchema},
  DefinitionCard: {component: DefinitionCard, propsSchema: DefinitionCardPropsSchema},
  WarningCard: {component: WarningCard, propsSchema: WarningCardPropsSchema},
  CompareCard: {component: CompareCard, propsSchema: CompareCardPropsSchema},
  GlossaryCard: {component: GlossaryCard, propsSchema: GlossaryCardPropsSchema},
  TableCard: {component: TableCard, propsSchema: TableCardPropsSchema},
  SplitImageCard: {
    component: SplitImageCard,
    propsSchema: SplitImageCardPropsSchema,
    assetKind: 'image',
  },
  CodeExplainCard: {component: CodeExplainCard, propsSchema: CodeExplainCardPropsSchema},
  CalloutVideoFrame: {
    component: CalloutVideoFrame,
    propsSchema: CalloutVideoFramePropsSchema,
    assetKind: 'video',
  },
  DemoOverlay: {
    component: DemoOverlay,
    propsSchema: DemoOverlayPropsSchema,
    assetKind: 'video',
  },
  CalloutScene: {
    component: CalloutScene,
    propsSchema: CalloutScenePropsSchema,
  },
};

export const componentsMap: Record<string, ComponentType<any>> = Object.fromEntries(
  Object.entries(registry).map(([name, def]) => [name, def.component]),
);

export const schemasMap: Record<string, ZodTypeAny> = Object.fromEntries(
  Object.entries(registry).map(([name, def]) => [name, def.propsSchema]),
);

