# Storyboard Components

Generated from `remotion/src/storyboard/registry.ts`. Run:

```bash
cd remotion
bun scripts/list-storyboard-components.mjs --format=md
```

## Index

| Component | Asset Kind |
|---|---|
| [`BulletCard`](#bulletcard) |  |
| [`StepsCard`](#stepscard) |  |
| [`DefinitionCard`](#definitioncard) |  |
| [`WarningCard`](#warningcard) |  |
| [`CompareCard`](#comparecard) |  |
| [`GlossaryCard`](#glossarycard) |  |
| [`TableCard`](#tablecard) |  |
| [`SplitImageCard`](#splitimagecard) | `image` |
| [`CodeExplainCard`](#codeexplaincard) |  |
| [`CalloutVideoFrame`](#calloutvideoframe) | `video` |
| [`DemoOverlay`](#demooverlay) | `video` |
| [`CalloutScene`](#calloutscene) |  |

## BulletCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `subtitle` | `string` | yes |
| `bullets` | `object[]` | yes |
| `note` | `string` | yes |

## StepsCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `subtitle` | `string` | yes |
| `steps` | `object[]` | no |
| `activeStep` | `number` | yes |

## DefinitionCard
| Prop | Type | Optional |
|---|---|---|
| `term` | `string` | no |
| `definition` | `string` | no |
| `notes` | `string[]` | yes |

## WarningCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `message` | `string` | no |
| `bullets` | `string[]` | yes |

## CompareCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `left` | `object` | no |
| `right` | `object` | no |
| `verdict` | `string` | yes |

## GlossaryCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `items` | `object[]` | no |

## TableCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `columns` | `string[]` | no |
| `rows` | `string[][]` | no |

## SplitImageCard
Asset Kind: `image`

| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `subtitle` | `string` | yes |
| `bullets` | `object[]` | yes |
| `note` | `string` | yes |

## CodeExplainCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `language` | `string` | yes |
| `code` | `string` | no |
| `highlights` | `object[]` | yes |
| `explain` | `string[]` | yes |

## CalloutVideoFrame
Asset Kind: `video`

| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | yes |
| `subtitle` | `string` | yes |

## DemoOverlay
Asset Kind: `video`

| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | yes |

## CalloutScene
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `body` | `string` | no |

