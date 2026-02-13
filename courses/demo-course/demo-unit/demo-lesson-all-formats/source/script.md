# Demo Lesson Script (EN)

## Segment 01
Voiceover:
This demo is a component usage guide. Each segment maps one component to its ideal use case, with props that are ready for production.

Component: CalloutScene
```json
{
  "props": {
    "eyebrow": "Style Guide",
    "title": "CalloutScene",
    "body": "Use this for one critical statement when you need direct, low-noise emphasis."
  }
}
```

## Segment 02
Voiceover:
Use Bullet for unordered points. It is best for checklists, constraints, and recap when reading order is simple.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Bullet",
    "subtitle": "Best for concise, scannable lists.",
    "bullets": [
      {"text": "One idea per bullet", "tone": "accent", "icon": "1"},
      {"text": "Parallel phrasing across lines", "tone": "default", "icon": "2"},
      {"text": "Muted tone only for context", "tone": "muted", "icon": "3"}
    ],
    "note": "Choose this when sequence is not the main story."
  }
}
```

## Segment 03
Voiceover:
Use Steps when sequence matters. Active step makes the viewer understand exactly where they are in a process.

Component: Steps
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Steps",
    "subtitle": "Designed for procedural walkthroughs.",
    "steps": [
      {"title": "Declare", "detail": "state the target and constraints"},
      {"title": "Assemble", "detail": "set props with valid schema"},
      {"title": "Render", "detail": "verify layout and timing"},
      {"title": "Review", "detail": "approve readability and QA"}
    ],
    "activeStep": 2
  }
}
```

## Segment 04
Voiceover:
Use Definition for terms that drive decisions. Put exact meaning first, then short implementation notes.

Component: Definition
```json
{
  "props": {
    "eyebrow": "Component",
    "term": "Definition",
    "definition": "A term-first component for precise concept framing.",
    "notes": [
      "Keep the definition auditable",
      "List only implementation-relevant notes",
      "Use before code or comparison scenes"
    ]
  }
}
```

## Segment 05
Voiceover:
Use Warning for operational risk. The wording should stay calm and each bullet should be directly actionable.

Component: Warning
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Warning",
    "message": "Use for risks that require explicit mitigation.",
    "bullets": [
      "Name the failure mode clearly",
      "Attach one mitigation per line",
      "Avoid vague warnings without owners"
    ]
  }
}
```

## Segment 06
Voiceover:
Use Compare for structured tradeoffs. Both sides should use the same dimensions, then end with one clear verdict.

Component: Compare
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Compare",
    "left": {
      "label": "When To Use",
      "bullets": [
        "Two valid options exist",
        "Criteria can be matched one-to-one",
        "Decision must be explicit"
      ]
    },
    "right": {
      "label": "When To Avoid",
      "bullets": [
        "Options are not comparable",
        "Requirements are still unclear",
        "No final decision is needed"
      ]
    },
    "verdict": "Use Compare only when a concrete recommendation is part of the outcome."
  }
}
```

## Segment 07
Voiceover:
Use Glossary for bilingual or multi-term alignment. It prevents naming drift between script, UI, and narration.

Component: Glossary
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Glossary",
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
Use Table when fields, units, and examples must stay aligned. Tables are ideal for parameter references and prop contracts.

Component: Table
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Table",
    "columns": ["Prop", "Purpose", "Type", "Example"],
    "rows": [
      ["title", "primary heading", "string", "\"Table\""],
      ["columns", "header labels", "string[]", "[\"Prop\",\"Type\"]"],
      ["rows", "table body", "string[][]", "[[\"a\",\"b\"]]"],
      ["eyebrow", "context label", "string", "\"Component\""]
    ]
  }
}
```

## Segment 09
Voiceover:
Use SplitImage when text and evidence must appear together. The image should support interpretation, not decoration.

Component: SplitImage
Asset Ref: assets/diagram-system-boundary.png
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "SplitImage",
    "subtitle": "Combines explanatory bullets with a supporting visual.",
    "bullets": [
      {"text": "Left side explains what to read", "tone": "default"},
      {"text": "Right side shows the visual proof", "tone": "accent"},
      {"text": "Note area captures review constraints", "tone": "muted"}
    ],
    "note": "Use this for architecture diagrams and annotated references."
  }
}
```

## Segment 10
Voiceover:
Use CodeExplain for implementation details. Keep code compact, highlight decision lines, and explain intent beside the snippet.

Component: CodeExplain
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "CodeExplain",
    "language": "typescript",
    "code": "function pickComponent(kind: 'list' | 'flow' | 'risk') {\n  if (kind === 'list') return 'Bullet';\n  if (kind === 'flow') return 'Steps';\n  return 'Warning';\n}",
    "highlights": [{"from": 2, "to": 4}],
    "explain": [
      "Branch by information shape, not preference.",
      "Keep fallback deterministic.",
      "Highlight only logic-bearing lines."
    ]
  }
}
```

## Segment 11
Voiceover:
Use DemoOverlay for immersive screen recordings with light annotation. One title, one badge, one focus callout is usually enough.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/fake-ide-walkthrough.mp4
```json
{
  "props": {
    "title": "DemoOverlay",
    "badge": "Component",
    "callouts": [
      {"type": "rect", "x": 1080, "y": 220, "w": 620, "h": 340, "label": "Focus"}
    ]
  }
}
```

## Segment 12
Voiceover:
Use CalloutVideoFrame when you need stronger framing around video content. It is better than raw overlays for dense UI walkthroughs.

Scene Type: Video
Component: CalloutVideoFrame
Asset Ref: assets/fake-explorer-callout.mp4
```json
{
  "props": {
    "badge": "Component",
    "title": "CalloutVideoFrame",
    "subtitle": "Framed video with optional blur and rectangle callouts.",
    "callouts": [
      {"type": "rect", "x": 180, "y": 120, "w": 560, "h": 300, "label": "Panel"},
      {"type": "blur", "x": 860, "y": 150, "w": 900, "h": 220}
    ]
  }
}
```

## Segment 13
Voiceover:
Recap. Choose component by narrative structure first, then tune visual style through props and tokens.

PostGapMs: 1000
Component: Bullet
```json
{
  "props": {
    "title": "Recap",
    "subtitle": "Choose by information shape.",
    "bullets": [
      {"text": "Unordered points: Bullet", "tone": "accent", "icon": "1"},
      {"text": "Ordered flow: Steps", "icon": "2"},
      {"text": "Risk and mitigations: Warning", "icon": "3"},
      {"text": "Evidence plus text: SplitImage", "tone": "muted", "icon": "4"}
    ]
  }
}
```

## Segment 14
Voiceover:
Next, we can turn this into a reusable authoring handbook with per-component presets and prop templates for faster lesson production.

Component: Bullet
```json
{
  "props": {
    "title": "What's Next",
    "subtitle": "Create reusable presets per component.",
    "bullets": [
      {"text": "Standard prop templates", "tone": "accent", "icon": "1"},
      {"text": "Copy guidelines by component type", "icon": "2"},
      {"text": "Visual QA checklist per scene", "icon": "3"}
    ]
  }
}
```
