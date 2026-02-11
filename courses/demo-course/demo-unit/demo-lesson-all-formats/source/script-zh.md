# Demo Lesson Script (ZH)

## Segment 01
Voiceover:
这个演示课是一份组件使用指南。每个片段对应一个组件，说明它最合适的使用场景，并给出可直接用于生产的 props。

Component: CalloutScene
```json
{
  "props": {
    "eyebrow": "风格指南",
    "title": "CalloutScene",
    "body": "当你需要低噪声、直接强调一个关键结论时，就用这个组件。"
  }
}
```

## Segment 02
Voiceover:
无序要点请用 BulletCard。它适合清单、约束和回顾，尤其在阅读顺序不复杂的时候。

Component: BulletCard
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "BulletCard",
    "subtitle": "适合简短、可快速扫描的列表。",
    "bullets": [
      {"text": "每个 bullet 只表达一个意思", "tone": "accent", "icon": "1"},
      {"text": "相邻行尽量保持平行句式", "tone": "default", "icon": "2"},
      {"text": "弱化语气只用于补充上下文", "tone": "muted", "icon": "3"}
    ],
    "note": "当“顺序”不是核心叙事时，优先选它。"
  }
}
```

## Segment 03
Voiceover:
当流程顺序很关键时，用 StepsCard。当前步骤高亮能让观众清楚知道自己在流程的哪一站。

Component: StepsCard
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "StepsCard",
    "subtitle": "专门用于过程型讲解。",
    "steps": [
      {"title": "定义", "detail": "明确目标与约束"},
      {"title": "组装", "detail": "按 schema 配置 props"},
      {"title": "渲染", "detail": "检查布局与时序"},
      {"title": "复核", "detail": "确认可读性与质量"}
    ],
    "activeStep": 2
  }
}
```

## Segment 04
Voiceover:
关键术语建议用 DefinitionCard。先给出精确定义，再补上简短的实现说明。

Component: DefinitionCard
```json
{
  "props": {
    "eyebrow": "组件",
    "term": "DefinitionCard",
    "definition": "先定义术语，再展开实现细节的概念卡片。",
    "notes": [
      "定义必须可审计、可复述",
      "只保留和实现有关的说明",
      "建议在代码段或对比段之前使用"
    ]
  }
}
```

## Segment 05
Voiceover:
涉及运行风险时用 WarningCard。措辞保持冷静，每条 bullet 都要可执行。

Component: WarningCard
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "WarningCard",
    "message": "用于必须明确缓解动作的风险点。",
    "bullets": [
      "先把失败模式说清楚",
      "一条措施对应一条风险",
      "避免没有责任人的泛泛警告"
    ]
  }
}
```

## Segment 06
Voiceover:
做结构化权衡时用 CompareCard。左右两侧必须使用同一组维度，最后给出明确结论。

Component: CompareCard
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "CompareCard",
    "left": {
      "label": "适用场景",
      "bullets": [
        "存在两个都可行的选项",
        "比较维度可以一一对齐",
        "需要明确做出取舍"
      ]
    },
    "right": {
      "label": "不适用场景",
      "bullets": [
        "选项之间不可直接比较",
        "需求仍在快速变化",
        "当前不需要结论性决策"
      ]
    },
    "verdict": "只有当输出必须包含明确建议时，再使用 CompareCard。"
  }
}
```

## Segment 07
Voiceover:
双语或多术语对齐建议使用 GlossaryCard。它能避免脚本、UI 和旁白之间的命名漂移。

Component: GlossaryCard
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "GlossaryCard",
    "items": [
      {"cn": "分镜", "en": "Storyboard"},
      {"cn": "旁白", "en": "Voiceover"},
      {"cn": "字幕行", "en": "Caption Line"},
      {"cn": "组件", "en": "Component"}
    ]
  }
}
```

## Segment 08
Voiceover:
当字段、单位和示例必须严格对齐时，用 TableCard。它非常适合参数说明和 props 契约。

Component: TableCard
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "TableCard",
    "columns": ["属性", "用途", "类型", "示例"],
    "rows": [
      ["title", "主标题", "string", "\"TableCard\""],
      ["columns", "表头字段", "string[]", "[\"属性\",\"类型\"]"],
      ["rows", "表格主体", "string[][]", "[[\"a\",\"b\"]]"],
      ["eyebrow", "上下文标签", "string", "\"组件\""]
    ]
  }
}
```

## Segment 09
Voiceover:
当文字解读和证据图像需要同时出现时，用 SplitImageCard。图像应服务于解释，而不是装饰。

Component: SplitImageCard
Asset Ref: assets/diagram-system-boundary.png
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "SplitImageCard",
    "subtitle": "左侧说明，右侧证据图。",
    "bullets": [
      {"text": "左侧先告诉观众看什么", "tone": "default"},
      {"text": "右侧给出可验证的图像证据", "tone": "accent"},
      {"text": "注释区记录评审约束", "tone": "muted"}
    ],
    "note": "适用于架构图讲解和带标注的参考图。"
  }
}
```

## Segment 10
Voiceover:
实现细节讲解请用 CodeExplainCard。代码保持紧凑，只高亮决策关键行，并在旁边解释意图。

Component: CodeExplainCard
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "CodeExplainCard",
    "language": "typescript",
    "code": "function pickComponent(kind: 'list' | 'flow' | 'risk') {\n  if (kind === 'list') return 'BulletCard';\n  if (kind === 'flow') return 'StepsCard';\n  return 'WarningCard';\n}",
    "highlights": [{"from": 2, "to": 4}],
    "explain": [
      "按信息形态分支，而不是按个人偏好。",
      "兜底分支要保持确定性。",
      "只高亮真正承载决策的代码行。"
    ]
  }
}
```

## Segment 11
Voiceover:
沉浸式录屏并带轻量标注时，用 DemoOverlay。通常一个标题、一个角标、一个重点框就足够。

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/fake-ide-walkthrough.mp4
```json
{
  "props": {
    "title": "DemoOverlay",
    "badge": "组件",
    "callouts": [
      {"type": "rect", "x": 1080, "y": 220, "w": 620, "h": 340, "label": "重点区域"}
    ]
  }
}
```

## Segment 12
Voiceover:
当你需要更强的视频包裹感时，用 CalloutVideoFrame。面对密集 UI 演示，它通常比裸 Overlay 更稳。

Scene Type: Video
Component: CalloutVideoFrame
Asset Ref: assets/fake-explorer-callout.mp4
```json
{
  "props": {
    "badge": "组件",
    "title": "CalloutVideoFrame",
    "subtitle": "带边框的视频容器，支持矩形标注与模糊遮罩。",
    "callouts": [
      {"type": "rect", "x": 180, "y": 120, "w": 560, "h": 300, "label": "面板"},
      {"type": "blur", "x": 860, "y": 150, "w": 900, "h": 220}
    ]
  }
}
```

## Segment 13
Voiceover:
回顾一下。先按叙事结构选组件，再通过 props 和设计 token 微调视觉风格。

PostGapMs: 1000
Scene Type: Slide
Scene Content: 回顾
```markdown
### 回顾

先看信息形态，再选组件。

- 无序要点：BulletCard
- 流程步骤：StepsCard
- 风险缓解：WarningCard
- 图文证据：SplitImageCard
```

## Segment 14
Voiceover:
下一步，我们可以把这套内容沉淀成可复用的编写手册，包含组件预设和 props 模板，进一步加速课程生产。

Scene Type: Slide
Scene Content: 下一步
```markdown
### 下一步

为每个组件建立可复用预设。

- 标准 props 模板
- 按组件分类的文案规范
- 分场景视觉质检清单
```
