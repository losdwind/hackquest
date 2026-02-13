# HackQuest Courses Agent 指令

## 适用范围
- 本文件适用于 `courses/` 目录下的所有脚本、素材与生成产物任务。

## 脚本与生成物约定
- 主输入文件使用 `<lessonRoot>/source/script.md`。
- 默认分段来源优先使用 `<lessonRoot>/generated/voiceover-en-segments.json`。
- 默认字幕输出为 `<lessonRoot>/generated/captions/lines.json`。
- 常见生成物包括：
  - `generated/voiceover-en-segments.json`
  - `generated/audio/segments/*.mp3`
  - `generated/audio/voiceover.mp3`
  - `generated/voiceover-en-segment-timings.json`
  - `generated/captions/lines.json`

## 字幕拆分与生成
- 字幕拆分优先按句末标点切分（`.`/`!`/`?`）。
- 长句再按语义块与自然换气点切分（`,`/`;`/`:`、连词、从句边界）。
- 每行表达一个完整小意思，相邻行长度尽量均衡，避免长短极端。
- 专业术语短语不可拆开。
- 使用 `remotion/scripts/build-line-captions.mjs` 生成 `lines.json`。
- 运行时尽量显式传 `--lesson-root`，避免默认扫描到错误 lesson。

## 脚本写作与分镜规则
- 采用单段单意：一个 Segment 只表达一个核心意思。
- 组件选型先于文案细化，必须先参考 `docs/component-selection-rules.md`。
- 先按语义选组件，再写 props，不允许“先选组件再硬凑内容”。
- `Component:` 必须使用当前组件名，不使用 `*Card` 后缀。
- `Scene Type: Slide` / `Scene Content` 仅作遗留语义参考，新增内容统一走 `Component`。
- `Component:` 后必须跟 fenced `json`，并使用信封格式：`{"props": {...}}`。

## Voiceover 与 Component 对齐
- 术语定义、概念边界：`Definition`
- 两对象差异、权衡：`Compare`
- 严格先后依赖步骤：`Steps`
- 并列要点与能力清单：`Bullet`
- 字段化与结构化信息：`Table`
- 过渡、警示、结论：`CalloutScene` 或 `Warning`
- 实操录屏讲解：`Scene Type: Video` + `DemoOverlay` / `CalloutVideoFrame`

## Props 约束
1. 不把旁白整段粘进单个字段，优先拆为标题 + 2-4 个信息点。
2. 不在 props 中新增“旁白没说过”的新结论。
3. 数值、时间、协议名等关键实体必须与旁白一致。
4. `Steps.props.steps` 每一步必须是动作或状态变化，不写泛泛名词。
5. `Compare.props.left/right` 维度必须对齐。
6. 文案密度受控，避免密集长句，保证移动端可读性。

## 质量检查
- 时长建议：单段语音通常 6-12 秒，尽量避免超过 18 秒，必要时拆段。
- 结尾要求：倒数第二段回顾提炼，最后一段为下一课过渡，不剧透细节。
- 自检三问：
  - Voiceover 是否只讲一个意思？
  - 画面是否直接支撑旁白主张？
  - 只看画面是否能复述该段主张？

## 常用命令
- 查看组件与 schema：`cd remotion && bun run lesson:components`
- 校验脚本：`cd remotion && bun run lesson:validate -- --lesson-root <lessonRoot>`

