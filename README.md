# HackQuest Remotion（内容创作者用法）

先启动预览，再新增 lesson，最后改脚本并一键重新生成。

> 重要：请编辑仓库根目录的 `courses/.../source/script.md`。  
> `remotion/.hq-public/...` 是 `bun run public:sync` 同步出来的预览目录，改了会被覆盖。

## 1) 安装与启动预览

```bash
cd remotion
bun install
bun run start
```

## 2) 在哪里新增 lesson

把你的课程放在仓库根目录的 `courses/` 下，建议结构：

- `courses/<course>/<unit>/<lesson>/source/script.md`
- `courses/<course>/<unit>/<lesson>/source/lesson.meta.json`
- `courses/<course>/<unit>/<lesson>/assets/`（可选）
- `courses/<course>/<unit>/<lesson>/cover/`（可选）

新增（或移动）lesson 后，让它出现在 Remotion Studio 里：

```bash
cd remotion
bun run public:sync
bun run lessons:manifest
```

然后重启 `bun run start`。

## 3) 改完 source 之后怎么重新生成

主要改：

- `courses/<course>/<unit>/<lesson>/source/script.md`（内容与顺序）

改顺序：

- 把 `## Segment XX` 整段上下移动
- 编号从 1 开始、连续、不重复

一键重新生成（增量 TTS，不会每次重做全部段落）：

```bash
cd remotion
bun run lesson:build -- --lesson-root ../courses/<course>/<unit>/<lesson>
```

会更新这些生成物：

- `generated/voiceover-en-segments.json`
- `generated/audio/segments/*.mp3`（只重生成变更段）
- `generated/audio/voiceover.mp3`
- `generated/voiceover-en-segment-timings.json`
- `generated/captions/lines.json`

没 TTS 凭证但已有音频时：

```bash
cd remotion
bun run lesson:build -- --lesson-root ../courses/<course>/<unit>/<lesson> --skip-tts
```

## 4) `source/script.md` 怎么写（最小规则）

每个段落以 `## Segment XX` 开头。`Voiceover:` 后的文本会被抽取成 TTS 段落。

可选字段（大小写不敏感，但建议按示例写）：

- `Scene Type: Slide | Video | Chart | Animation ...`
- `Scene Content: ...`（可选，供组件读取）
- `Asset Ref: assets/...`（可选，图片或视频）
- `Component: <StoryboardComponentName>`（可选）
- `PostGapMs: 800`（可选）

如果用了 `Component:`，必须紧跟一个 fenced `json` block，且必须是**信封格式**：

```md
## Segment 01
Voiceover:
One segment, one idea.

Scene Type: Video
Asset Ref: assets/demo.mp4
Component: DemoOverlay

```json
{
  "props": {
    "title": "Title"
  }
}
```
```

组件会用 Zod 校验 props；写错会在校验阶段直接报错，避免渲染时静默黑屏。

## 5) 我怎么知道有哪些组件、有哪些 props？

两种方式：

1. 直接输出清单（给讲师用）：

```bash
cd remotion
bun run lesson:components
```

也可以用 JSON 方便贴到文档里：

```bash
cd remotion
bun scripts/list-storyboard-components.mjs --format=json
```

2. 源码入口（给开发/设计对齐用）：

- 组件注册表：`remotion/src/storyboard/registry.ts`
- 每个组件的 props schema：`remotion/src/storyboard/components/*` 与 `remotion/src/templates/*`
- 约定说明：`remotion/src/storyboard/PROPS_SCHEMA.md`

## 6) 常用命令

```bash
cd remotion

# 只校验脚本与 props（最快）
bun run lesson:validate -- --lesson-root ../courses/<course>/<unit>/<lesson>

# 从脚本增量构建生成物（segments/TTS/captions/timings）
bun run lesson:build -- --lesson-root ../courses/<course>/<unit>/<lesson>
```

## 7) Storyboard Components

Generated from `remotion/src/storyboard/registry.ts`. Run:

```bash
cd remotion
bun scripts/list-storyboard-components.mjs --format=md
```

### Index

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

### BulletCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `subtitle` | `string` | yes |
| `bullets` | `object[]` | yes |
| `note` | `string` | yes |

### StepsCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `subtitle` | `string` | yes |
| `steps` | `object[]` | no |
| `activeStep` | `number` | yes |

### DefinitionCard
| Prop | Type | Optional |
|---|---|---|
| `term` | `string` | no |
| `definition` | `string` | no |
| `notes` | `string[]` | yes |

### WarningCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `message` | `string` | no |
| `bullets` | `string[]` | yes |

### CompareCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `left` | `object` | no |
| `right` | `object` | no |
| `verdict` | `string` | yes |

### GlossaryCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `items` | `object[]` | no |

### TableCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `columns` | `string[]` | no |
| `rows` | `string[][]` | no |

### SplitImageCard
Asset Kind: `image`

| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `subtitle` | `string` | yes |
| `bullets` | `object[]` | yes |
| `note` | `string` | yes |

### CodeExplainCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `language` | `string` | yes |
| `code` | `string` | no |
| `highlights` | `object[]` | yes |
| `explain` | `string[]` | yes |

### CalloutVideoFrame
Asset Kind: `video`

| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | yes |
| `subtitle` | `string` | yes |

### DemoOverlay
Asset Kind: `video`

| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | yes |

### CalloutScene
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `body` | `string` | no |
