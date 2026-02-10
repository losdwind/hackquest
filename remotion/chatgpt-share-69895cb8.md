# 区块链教学视频设计支持

Source: https://chatgpt.com/share/69895cb8-9328-8005-907a-a2d47cbc306a

Exported: 2026-02-09

## User

如果我用remotion.dev 的工具去结构化自动化的生产区块链的教学视频，
那么内容团队除了产出视频脚本和图表以及录屏以外，应该让设计团队做什么支持呢

## ChatGPT

如果你用 remotion.dev
做结构化、自动化的区块链教学视频生产，那么设计团队的价值会从“逐条剪辑和逐条动效”转移到“系统化视觉与组件资产”。内容团队交付脚本、图表、录屏之外，设计团队建议承担这些支持项。

1.  视觉系统与品牌规范（给 remotion 一个“确定的审美边界”）
    设计团队输出一套可以被代码稳定复用的 Design
    System，而不是每节课重新设计。
    包括：字体体系（中英文字体、字号梯度、行高）、色板（主色、强调色、风险提示色）、栅格与安全区、圆角与阴影等级、图标风格、Logo/水印规则、字幕样式规范、图表配色与标注规范、深浅色版本（如需要）。
    关键点是把这些固化为 design tokens，便于你在 Remotion 里直接读 token
    生成组件样式，而不是靠人肉对齐。

2.  Remotion 组件库的“视觉规格稿”
    你最终会有一套可编排的组件，设计团队要给每个组件定清楚结构与状态，而不是只给静态海报。
    典型组件清单：
    片头/片尾、章节卡、要点卡（bullet/step）、定义卡（Definition）、公式/伪代码卡、风险提示卡（Warning）、术语对照卡（CN/EN）、时间线/流程图卡、对比表格卡、引用/来源卡、练习题与答案揭示卡、转场（wipe/zoom/blur
    的克制版本）、录屏框架（带标题、边框、角标、进度条）、人物/讲师头像框（如需要）。
    每个组件的规格至少包含：布局、间距、文本行数上限、溢出规则、动效节奏（进场/停留/退场）、可配置参数（颜色、icon、标签、等级）。

3.  图表与信息可视化模板（让内容图表“可复用、可自动化”）
    内容团队会给数据或草图，但设计团队要把“如何画得一致”模板化。
    输出：
    常用图表模板（折线、柱状、堆叠、面积、饼/环、桑基、网络图、热力图、OHLC/K线简化版、资金流向示意、清算瀑布图等）在你的课程语境下的规范。
    包括：坐标轴、网格线、标注、单位、数值格式、重点高亮、风险阈值线、注释气泡、动画展示顺序（先框架后数据后高亮）。
    最好把图表做成“可输入 JSON/CSV 的渲染规范”，由
    Remotion/前端图表库自动生成，而不是设计师每次出图。

4.  录屏视觉包装与可读性增强规范
    你的视频大量是
    IDE、区块浏览器、交易界面、合约测试等录屏。设计团队应该制定“录屏如何变得像课程”。
    包括：
    录屏边框模板、标题条、当前章节/小节标识、快捷键提示样式、鼠标高亮/点击涟漪、关键区域放大镜、代码高亮与行号强调、敏感信息遮罩规范、画中画布局（讲师/关键点卡与录屏同屏时的比例与安全区）、录屏分辨率与缩放策略（避免字体糊、避免
    UI 太小）。
    目标是降低后期逐帧打标成本，把标注规则固化进组件。

5.  动效语言与节奏标准（避免“每节课动效都不一样”）
    Remotion 很容易做复杂动效，但课程更需要一致、克制、信息优先。
    设计团队定义：
    动效曲线与时长范围（例如标题进场 12–18 帧、要点逐条 8–12
    帧）、转场类型白名单（2–3
    种够用）、强调动画规则（高亮、下划线、框选、闪烁禁用或极少用）、镜头节奏（长屏录制段落用轻提示，不频繁转场）。
    这会直接决定你能否批量生产而不“像拼贴”。

6.  字幕与双语排版体系（区块链术语密集场景很关键）
    如果你要中英混排或术语对照，设计团队要做：
    字幕层级（主字幕、术语字幕、旁白注释）、断句规则（配合你前面说的
    segment
    句子粒度）、术语高亮与注释样式、长句换行策略、代码/地址/哈希的等宽字体策略、屏幕底部安全区与录屏
    UI 冲突规避。
    做得好会显著减少“内容理解成本”，也减少返工。

7.  资产生产与管理（让自动化流水线有稳定输入）
    设计团队还要负责可规模化的素材资产库，不是零散 PNG。
    包括：
    图标库（合约、钱包、交易所、预言机、清算、桥等）、背景纹理/网格、通用插图（链上流程、模块化架构、风险传导）、占位与
    skeleton（加载、待补充、草稿提醒）、模板封面与缩略图系统（课程、单元、课时）。
    并制定命名规范、版本管理、导出规格（SVG 优先、PNG
    用于复杂图）、以及在代码中引用的路径/manifest。

8.  QA 标准与可读性审查（设计侧的“验收”）
    设计团队还应承担一套视觉 QA checklist，在你自动渲染后做抽检：
    对齐、留白、字幕遮挡、颜色对比度、字号可读、图表标注是否清晰、录屏是否糊、信息层级是否正确、组件状态是否越界。
    配合自动化，你可以把部分检查变成脚本规则，但最终仍需要设计抽检来兜底。

一个实用的分工落地方式是：设计团队每周只需要维护“tokens + 组件规格 +
模板资产库 +
QA”，内容团队只投喂脚本结构化字段、图表数据/重点、录屏片段。这样
Remotion
的价值才会最大化，否则会变成“用代码做剪辑”，并不会比传统流程更快。

## User

那tokens具体是什么样子的，是类似shacn的styles吗

## ChatGPT

tokens 本质是“设计决策的参数化表达”。它不是 shadcn
的组件样式本身，但可以驱动 shadcn 或你自己的组件样式。

shadcn 的 styles 更像“组件层的实现与组合”（Button/Card 的 className
方案）。tokens
是更底层、更稳定的“变量层”：颜色、字号、间距、圆角、阴影、动效时长等。你可以把
tokens 映射到 Tailwind theme、CSS variables，或者 Remotion/React 组件的
props。

一个典型 token 会长这样（JSON），你在 Remotion 里直接 import 使用：

```json
{
  "color": {
    "bg": { "default": "#0B0F19", "muted": "#111827" },
    "fg": { "default": "#E5E7EB", "muted": "#9CA3AF" },
    "primary": { "default": "#4F46E5", "hover": "#4338CA" },
    "danger": { "default": "#EF4444" },
    "border": { "default": "rgba(255,255,255,0.10)" }
  },
  "font": {
    "family": { "sans": "Inter", "mono": "JetBrains Mono" },
    "size": { "xs": 20, "sm": 24, "md": 30, "lg": 40, "xl": 56 },
    "weight": { "regular": 400, "medium": 500, "bold": 700 },
    "lineHeight": { "tight": 1.15, "normal": 1.35, "relaxed": 1.5 }
  },
  "space": { "2": 8, "3": 12, "4": 16, "6": 24, "8": 32, "12": 48 },
  "radius": { "sm": 12, "md": 18, "lg": 24 },
  "shadow": {
    "card": "0 12px 40px rgba(0,0,0,0.35)",
    "float": "0 20px 60px rgba(0,0,0,0.45)"
  },
  "motion": {
    "duration": { "fast": 10, "normal": 16, "slow": 24 },
    "easing": { "standard": "easeOut", "emphasis": "easeInOut" }
  },
  "layout": {
    "safeArea": { "x": 80, "y": 70 },
    "maxTextWidth": 1500
  }
}
```

在 Remotion（React）里用 tokens 的方式通常是：

1.  组件不写死颜色字号，全部从 token 读取。

2.  组件只暴露少量参数（variant、level、tone），内部用 token 映射。

3.  对于视频，motion tokens 往往用“帧数”表达，而不是毫秒。

示例（概念性）：

```ts
const t = tokens;

const Title = ({ tone = "primary", size = "xl" }) => (
  <div
    style={{
      fontFamily: t.font.family.sans,
      fontSize: t.font.size[size],
      fontWeight: t.font.weight.bold,
      lineHeight: t.font.lineHeight.tight,
      color: t.color[tone].default
    }}
  />
);
```

它和 shadcn 的关系可以这样理解：

1.  tokens 定义“颜色叫 primary 是什么、圆角 md 是多少、card
    阴影是什么”。

2.  shadcn 或 Tailwind 负责“Button/Card 这种组件怎么拼”，并通过 CSS
    variables 或 theme 引用 tokens。

3.  Remotion 这边可以共享同一份
    tokens，从而实现“网页组件”和“视频组件”视觉一致。

如果你要做教学视频流水线，建议 tokens 至少覆盖 6
类：color、typography、spacing、radius、shadow、motion，再加上 video
特有的 safeArea、grid、caption
baseline。这样设计团队一次定义，后续内容团队产出结构化脚本就能稳定渲染。

## User

那你给我一个适配remotion.dev的tokens
模板，以及如何在代码库中引入到组件中

## ChatGPT

下面给你一套“直接适配 Remotion”的 tokens
模板（TypeScript），以及在代码库里引入到组件中的做法。重点是：视频场景需要
frame-based motion、safe area、caption 规范和图表/风险提示的语义色。

建议目录结构：

1.  src/design/tokens.ts

2.  src/design/theme.ts

3.  src/components/typography/Title.tsx

4.  src/components/cards/CalloutCard.tsx

5.  src/components/motion/transitions.ts

一，tokens 模板（src/design/tokens.ts）

```ts
// src/design/tokens.ts
export type Tone = "neutral" | "primary" | "success" | "warning" | "danger";

export const tokens = {
  meta: {
    name: "HackCourseVideoTheme",
    version: "0.1.0",
  },

  // 以 1920x1080 为基准。后续可做 scale 工具适配 4K/竖屏。
  video: {
    width: 1920,
    height: 1080,
    fps: 30,

    // 安全区：避免字幕/播放器遮挡，内容默认不贴边
    safeArea: {
      x: 96,
      y: 80,
      bottomExtraForCaptions: 140,
    },

    grid: {
      columns: 12,
      gutter: 24,
      marginX: 96,
    },
  },

  color: {
    bg: {
      canvas: "#0B1020",
      panel: "#101A33",
      panel2: "#0F172A",
    },
    fg: {
      primary: "#E6EAF2",
      secondary: "rgba(230,234,242,0.78)",
      muted: "rgba(230,234,242,0.58)",
      inverse: "#0B1020",
    },
    border: {
      subtle: "rgba(255,255,255,0.10)",
      strong: "rgba(255,255,255,0.18)",
    },

    // 语义色：课程里经常用到风险提示/警告/成功
    tone: {
      neutral: { solid: "#64748B", soft: "rgba(100,116,139,0.18)" },
      primary: { solid: "#4F46E5", soft: "rgba(79,70,229,0.20)" },
      success: { solid: "#10B981", soft: "rgba(16,185,129,0.18)" },
      warning: { solid: "#F59E0B", soft: "rgba(245,158,11,0.18)" },
      danger: { solid: "#EF4444", soft: "rgba(239,68,68,0.18)" },
    },

    chart: {
      axis: "rgba(230,234,242,0.32)",
      grid: "rgba(230,234,242,0.12)",
      label: "rgba(230,234,242,0.72)",
      emphasis: "#E6EAF2",
    },
  },

  typography: {
    family: {
      sans: "Inter, ui-sans-serif, system-ui",
      mono: "JetBrains Mono, ui-monospace, SFMono-Regular",
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    size: {
      // 这里用 px，Remotion 直接 style fontSize 即可
      xs: 20,
      sm: 24,
      md: 30,
      lg: 40,
      xl: 56,
      "2xl": 72,
    },
    lineHeight: {
      tight: 1.12,
      normal: 1.32,
      relaxed: 1.5,
    },

    // 字幕专用
    caption: {
      size: 34,
      lineHeight: 1.22,
      maxLines: 2,
      paddingX: 24,
      paddingY: 14,
      radius: 16,
      bg: "rgba(0,0,0,0.55)",
      stroke: "rgba(0,0,0,0.65)",
      strokeWidth: 6,
    },
  },

  space: {
    // 按 4px 体系，但只暴露常用档
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
  },

  radius: {
    sm: 12,
    md: 18,
    lg: 26,
    xl: 34,
  },

  shadow: {
    card: "0 18px 60px rgba(0,0,0,0.45)",
    float: "0 24px 90px rgba(0,0,0,0.55)",
  },

  stroke: {
    // 线宽用于边框、分割线、图表线等
    1: 1,
    2: 2,
    3: 3,
    4: 4,
  },

  // Remotion 推荐用“帧数”来表达节奏
  motion: {
    durationFrames: {
      fast: 10,
      normal: 16,
      slow: 24,
    },
    // 统一曲线，避免每个组件乱来
    easing: {
      standard: [0.16, 1, 0.3, 1] as const,
      emphasize: [0.2, 0.9, 0.2, 1] as const,
    },
  },
} as const;

export type Tokens = typeof tokens;
```

二，theme 工具函数（src/design/theme.ts）

用途：把 tone 语义色、safe area、常用 style 片段封装成函数，组件更干净。

```ts
// src/design/theme.ts
import { tokens, type Tone } from "./tokens";

export const theme = {
  tokens,

  tone: (tone: Tone) => tokens.color.tone[tone],

  safe: () => {
    const { x, y, bottomExtraForCaptions } = tokens.video.safeArea;
    return {
      paddingLeft: x,
      paddingRight: x,
      paddingTop: y,
      paddingBottom: y + bottomExtraForCaptions,
    };
  },

  panel: () => ({
    backgroundColor: tokens.color.bg.panel,
    border: `${tokens.stroke[1]}px solid ${tokens.color.border.subtle}`,
    borderRadius: tokens.radius.lg,
    boxShadow: tokens.shadow.card,
  }),

  text: {
    h1: () => ({
      fontFamily: tokens.typography.family.sans,
      fontSize: tokens.typography.size["2xl"],
      fontWeight: tokens.typography.weight.bold,
      lineHeight: tokens.typography.lineHeight.tight,
      color: tokens.color.fg.primary,
      letterSpacing: -0.5,
    }),
    body: () => ({
      fontFamily: tokens.typography.family.sans,
      fontSize: tokens.typography.size.md,
      fontWeight: tokens.typography.weight.regular,
      lineHeight: tokens.typography.lineHeight.normal,
      color: tokens.color.fg.secondary,
    }),
    code: () => ({
      fontFamily: tokens.typography.family.mono,
      fontSize: tokens.typography.size.sm,
      fontWeight: tokens.typography.weight.medium,
      lineHeight: tokens.typography.lineHeight.relaxed,
      color: tokens.color.fg.primary,
    }),
  },
};
```

三，在组件里引入 tokens（示例 1：Title）

```tsx
// src/components/typography/Title.tsx
import React from "react";
import { theme } from "../../design/theme";
import type { Tone } from "../../design/tokens";

export function Title(props: {
  children: React.ReactNode;
  tone?: Tone;
  size?: "xl" | "2xl";
}) {
  const { children, tone = "primary", size = "2xl" } = props;
  const t = theme.tokens;

  return (
    <div
      style={{
        fontFamily: t.typography.family.sans,
        fontSize: t.typography.size[size],
        fontWeight: t.typography.weight.bold,
        lineHeight: t.typography.lineHeight.tight,
        color: theme.tone(tone).solid,
        letterSpacing: -0.5,
      }}
    >
      {children}
    </div>
  );
}
```

四，在组件里引入 tokens（示例 2：CalloutCard，用于风险提示/定义卡）

```tsx
// src/components/cards/CalloutCard.tsx
import React from "react";
import { theme } from "../../design/theme";
import type { Tone } from "../../design/tokens";

export function CalloutCard(props: {
  title: string;
  body: string;
  tone?: Tone;
}) {
  const { title, body, tone = "neutral" } = props;
  const t = theme.tokens;
  const c = theme.tone(tone);

  return (
    <div
      style={{
        ...theme.panel(),
        padding: t.space[10],
        border: `${t.stroke[2]}px solid ${c.soft}`,
        backgroundColor: "rgba(255,255,255,0.02)",
      }}
    >
      <div
        style={{
          fontFamily: t.typography.family.sans,
          fontSize: t.typography.size.lg,
          fontWeight: t.typography.weight.semibold,
          lineHeight: t.typography.lineHeight.tight,
          color: t.color.fg.primary,
          marginBottom: t.space[4],
        }}
      >
        {title}
      </div>

      <div style={theme.text.body()}>{body}</div>
    </div>
  );
}
```

五，在 Remotion 动效里使用 motion tokens（示例：淡入上移）

```ts
// src/components/motion/transitions.ts
import { interpolate, Easing } from "remotion";
import { theme } from "../../design/theme";

export const enterUpFade = (frame: number) => {
  const t = theme.tokens;
  const d = t.motion.durationFrames.normal;

  const opacity = interpolate(frame, [0, d], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...t.motion.easing.standard),
  });

  const translateY = interpolate(frame, [0, d], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...t.motion.easing.standard),
  });

  return { opacity, transform: `translateY(${translateY}px)` };
};
```

在组件里用：

```tsx
import React from "react";
import { useCurrentFrame } from "remotion";
import { enterUpFade } from "../motion/transitions";

export function AnimatedBlock({ children }: { children: React.ReactNode }) {
  const frame = useCurrentFrame();
  return <div style={enterUpFade(frame)}>{children}</div>;
}
```

六，建议的工程约束（保证长期可维护）

1.  tokens 只放“决策变量”，不放组件样式。组件样式放 theme 或组件内部。

2.  motion 统一用帧数，避免 ms 和 frame 混用导致节奏漂移。

3.  tone 语义化，内容脚本只输出 tone，不直接输出颜色值。

4.  如果要多分辨率输出，新增 scale 工具：基于 tokens.video.width
    做比例缩放，把字体/间距按比例放大即可。

如果你希望再进一步把它做成“可自动版本化”的资产，我可以补一份：从 Figma
Tokens 或 Token Studio 导出 JSON，然后在构建时生成
tokens.ts（保持设计与代码单一事实来源）。

## User

那作为内容团队的leader,我应该维护代码库还是交给工程团队去维护

## ChatGPT

交给工程团队维护，内容团队 leader
负责“接口契约”和“产线质量”。原因很直接：Remotion
代码库本质是一个可执行渲染系统，长期维护会涉及依赖升级、渲染性能、CI、字体与媒体管线、缓存、bug
排查，这些更符合工程团队的职责边界。内容团队 leader
如果亲自维护代码库，短期可能快，长期会变成单点故障并挤占内容产能。

更可操作的分工是把系统拆成三层，分别明确 owner。

第一层：渲染与基础设施层（工程 owner）

1.  Remotion 项目脚手架、依赖升级、构建与渲染命令、并行渲染与队列。

2.  资产加载与缓存（字体、图标、图片、录屏素材），路径与 manifest 规范。

3.  CI/CD（自动渲染样例、lint、typecheck、回归测试）、版本发布与回滚。

4.  性能与稳定性（渲染耗时、内存、失败重试、错误日志）。

5.  输出规格（1080p/4K/竖屏）、编码参数、音频混流、字幕烧录或外挂。

第二层：设计系统与组件库层（工程主导，设计协作，内容 leader 有话语权）

1.  tokens、theme、组件库（Title/Callout/Chart/ScreenFrame
    等）的实现与版本管理。

2.  组件参数的“可配置边界”：哪些字段可由脚本控制，哪些不允许乱改。

3.  组件的可读性与边界处理（超长文本、双语、公式、代码块、图表标注）。

4.  视觉 QA checklist
    的工具化（例如自动检测字幕遮挡、溢出、对比度阈值）。

第三层：内容 DSL 与交付规范层（内容 leader owner）
这是你必须抓在手里的部分，因为它直接决定产线效率与内容质量。

1.  脚本结构标准（段落类型、字段、长度约束、术语字典、引用规范）。

2.  录屏与图表输入标准（文件命名、分辨率、时长、关键帧标记、遮罩要求）。

3.  组件使用规范（什么时候用定义卡、什么时候用风险卡、图表强调顺序）。

4.  课程级模板（片头片尾、章节结构、复盘题、作业提示）与验收标准。

落地建议：用“契约”来避免扯皮
你不维护代码，但你要维护一个明确的接口文档，工程按这个做，内容按这个交付。

1.  Schema：script.json 的字段定义（可以用 JSON Schema 或 TypeScript
    types）。

2.  Asset manifest：素材目录与命名规则。

3.  Versioning：tokens/组件版本号与兼容策略（例如 v0.3 仍支持 v0.2
    的脚本字段）。

4.  SLA：渲染失败、样式问题、组件新增的响应周期。

什么时候内容 leader 需要亲自碰代码

1.  原型期或试产期：你可以写少量 glue code 或 demo
    composition，帮助快速闭环。

2.  工程资源不足：你可以维护“内容层工具”而不是“渲染层”，比如脚本校验器、脚本生成器、术语库、检查清单自动化。

3.  你有强工程能力且愿意承担 on-call：否则不建议。

一个简单判定标准
如果某件事会影响“渲染能不能跑、跑得快不快、依赖升级会不会炸”，交给工程。
如果某件事会影响“内容怎么写、怎么被渲染、如何验收”，由你负责定义与守住。

如果你告诉我你们团队规模与工程资源情况（例如是否有专职前端/渲染工程师，是否需要
CI 自动批量渲染），我可以给你一份更具体的 RACI 表和 2
周内可落地的最小职责划分。

## User

那内容团队应该交付的内容 DSL
与交付规范层应该是什么样的，能给我一个完整的模板吗

## ChatGPT

下面给你一个“内容团队交付的 DSL 与交付规范层”的完整模板，按你用 Remotion
自动化渲染的目标来设计。你可以直接作为仓库里的 docs 与 schema
起步用。结构包含：目录规范、脚本
DSL（JSON）、段落块类型清单、图表与录屏规范、术语与引用、校验规则、验收标准、变更与版本。

一、交付物清单（内容团队每节课必须交付）

1.  lesson.meta.json（课时元信息）

2.  script.json（内容 DSL 主文件）

3.  assets/（素材目录，含录屏、图片、图表数据、讲义引用）

4.  glossary.csv（可选，术语表；也可全局一份）

5.  sources.bib 或 sources.json（可选，引用来源）

二、目录与命名规范（强制）

```bash
/course/<course_id>/
  /units/<unit_id>/
    /lessons/<lesson_id>/
      lesson.meta.json
      script.json
      /assets/
        /screens/
          sc_001_intro_wallet.mp4
          sc_002_deploy_contract.mp4
        /images/
          img_001_architecture.png
        /charts/
          chart_001_liquidation_curve.json
          chart_002_protocol_tvl.csv
        /code/
          code_001_invariant_test.sol
          code_002_fuzz_config.txt
      glossary.csv            (可选：若不使用全局术语表)
      sources.json            (可选：若不使用全局引用库)
```

命名规则：

1.  统一小写+下划线或小写+数字序号，不要混用。

2.  录屏必须带序号 sc\_###，图表 chart\_###，图片 img\_###，代码
    code\_###。

3.  所有资产必须在 script.json 的 manifest
    段落里被显式引用，禁止“目录里有但脚本没引用”。

三、lesson.meta.json 模板（元信息）

```json
{
  "schema_version": "1.0.0",
  "course_id": "stablecoin_protocol",
  "unit_id": "unit_03_risk",
  "lesson_id": "lesson_03_02_liquidation",
  "title": "Liquidation Mechanics and Risk Parameters",
  "lang": "en",
  "level": "intermediate",
  "duration_target_sec": 900,
  "owner": {
    "content_lead": "name",
    "writer": "name",
    "reviewer": "name"
  },
  "render_profile": {
    "resolution": "1080p",
    "aspect": "16:9",
    "fps": 30,
    "theme": "HackCourseVideoTheme",
    "voice": {
      "provider": "tbd",
      "style": "neutral_explanatory"
    },
    "subtitles": {
      "mode": "burn_in",
      "bilingual": false
    }
  },
  "quality_gate": {
    "must_have_quiz": true,
    "must_have_summary": true,
    "must_cite_external_claims": true
  }
}
```

四、script.json 模板（内容 DSL 主体）
这个是核心。目标是让内容团队只填结构化字段，工程/Remotion 按块渲染。

```json
{
  "schema_version": "1.0.0",
  "lesson": {
    "title": "Liquidation Mechanics and Risk Parameters",
    "hook": "Why do healthy protocols still fail during liquidations?",
    "learning_objectives": [
      "Explain how collateralization and liquidation thresholds work",
      "Describe auction vs fixed-penalty liquidations",
      "Identify key risk parameters and their trade-offs"
    ],
    "prerequisites": [
      "Basic stablecoin collateral model",
      "Solidity testing fundamentals"
    ]
  },

  "manifest": {
    "screens": [
      { "id": "sc_001", "path": "assets/screens/sc_001_intro_wallet.mp4", "notes": "Mask addresses" },
      { "id": "sc_002", "path": "assets/screens/sc_002_deploy_contract.mp4", "notes": "" }
    ],
    "images": [
      { "id": "img_001", "path": "assets/images/img_001_architecture.png", "alt": "Protocol architecture diagram" }
    ],
    "charts": [
      { "id": "chart_001", "type": "line", "data_path": "assets/charts/chart_001_liquidation_curve.json", "unit": "%", "notes": "Use log scale = false" }
    ],
    "code": [
      { "id": "code_001", "lang": "solidity", "path": "assets/code/code_001_invariant_test.sol", "highlight": [12, 28] }
    ],
    "sources": [
      { "id": "src_001", "title": "Paper/Doc Title", "url": "https://example.com", "accessed": "2026-02-09" }
    ],
    "glossary": [
      { "term": "Liquidation", "definition": "Process to sell collateral when a position falls below threshold." }
    ]
  },

  "timeline": [
    {
      "block_id": "b001",
      "type": "title",
      "duration_hint_sec": 8,
      "fields": {
        "title": "Liquidation Mechanics",
        "subtitle": "Thresholds, penalties, auctions",
        "tone": "primary"
      }
    },
    {
      "block_id": "b002",
      "type": "narration",
      "duration_hint_sec": 18,
      "fields": {
        "segments": [
          { "id": "s01", "text": "Liquidation is the protocol's emergency brake." },
          { "id": "s02", "text": "When collateral value drops, positions can become under-collateralized." }
        ],
        "on_screen": {
          "bullets": [
            "Trigger condition: collateral ratio below threshold",
            "Goal: restore solvency"
          ]
        }
      }
    },
    {
      "block_id": "b003",
      "type": "definition_card",
      "duration_hint_sec": 14,
      "fields": {
        "term": "Liquidation Threshold",
        "definition": "The minimum collateral ratio required to avoid liquidation.",
        "example": "If threshold is 150%, a $100 debt needs $150 collateral.",
        "tone": "neutral"
      }
    },
    {
      "block_id": "b004",
      "type": "chart",
      "duration_hint_sec": 20,
      "fields": {
        "chart_ref": "chart_001",
        "title": "Collateral Ratio vs Liquidation Risk",
        "callouts": [
          { "at": 0.35, "label": "Threshold", "tone": "warning" },
          { "at": 0.75, "label": "Healthy zone", "tone": "success" }
        ],
        "narration_segments": [
          { "id": "s03", "text": "As the ratio approaches the threshold, liquidation probability rises sharply." }
        ]
      }
    },
    {
      "block_id": "b005",
      "type": "screen_recording",
      "duration_hint_sec": 45,
      "fields": {
        "screen_ref": "sc_002",
        "title": "Deploy and Configure Liquidation Parameters",
        "overlay_steps": [
          { "t_sec": 3, "text": "Open the config contract", "tone": "neutral" },
          { "t_sec": 15, "text": "Set liquidation threshold", "tone": "warning" },
          { "t_sec": 28, "text": "Set penalty and keeper incentive", "tone": "primary" }
        ],
        "mask_regions": [
          { "x": 1420, "y": 120, "w": 420, "h": 60, "reason": "Address bar" }
        ]
      }
    },
    {
      "block_id": "b006",
      "type": "code_card",
      "duration_hint_sec": 22,
      "fields": {
        "title": "Invariant Testing for Solvency",
        "code_ref": "code_001",
        "focus_lines": [12, 28],
        "narration_segments": [
          { "id": "s04", "text": "Invariant tests enforce that total collateral value stays above total debt." }
        ],
        "tone": "primary"
      }
    },
    {
      "block_id": "b007",
      "type": "quiz",
      "duration_hint_sec": 35,
      "fields": {
        "question": "Which parameter most directly reduces the chance of bad debt during volatility?",
        "choices": [
          { "id": "A", "text": "Lower liquidation threshold" },
          { "id": "B", "text": "Higher liquidation threshold" },
          { "id": "C", "text": "Lower keeper incentive" },
          { "id": "D", "text": "Higher borrowing fee" }
        ],
        "answer": "B",
        "explanation": "Higher thresholds provide more buffer before liquidation is needed.",
        "tone": "neutral"
      }
    },
    {
      "block_id": "b008",
      "type": "summary",
      "duration_hint_sec": 18,
      "fields": {
        "key_points": [
          "Liquidation protects solvency but can amplify volatility",
          "Threshold, penalty, and incentives must be balanced",
          "Testing helps validate safety assumptions"
        ],
        "next_lesson": "Auction design and MEV considerations"
      }
    },
    {
      "block_id": "b009",
      "type": "sources",
      "duration_hint_sec": 10,
      "fields": {
        "source_refs": ["src_001"]
      }
    }
  ]
}
```

五、Block 类型清单与字段规范（内容团队必须遵守）
你可以把下面这段放到 docs/dsl.md，用于团队培训与验收。

1.  title
    必填 fields：title, subtitle 可选，tone 可选
    约束：title \<= 42 字符（英文），subtitle \<= 60

2.  narration
    必填：segments（按句子切分），on_screen 可选
    约束：单 segment 建议 5–18 秒语速范围；每块总时长建议 \<= 25
    秒，超过就拆块
    on_screen.bullets：每条 \<= 46 字符，最多 4 条

3.  definition_card
    必填：term, definition
    可选：example, tone
    约束：definition \<= 140 字符；example \<= 120

4.  chart
    必填：chart_ref, title
    可选：callouts, narration_segments
    约束：callouts.at 取 0–1 或明确 x 值，必须可被工程解释

5.  screen_recording
    必填：screen_ref, title
    可选：overlay_steps, mask_regions
    约束：overlay_steps.t_sec 必须单调递增；mask_regions 坐标基于
    1920x1080

6.  code_card
    必填：title, code_ref
    可选：focus_lines, narration_segments
    约束：focus_lines 必须在文件行号范围内；代码块最多显示 24
    行，超出需要拆分或指定 window

7.  quiz
    必填：question, choices, answer, explanation
    约束：choices 2–6 个；explanation \<= 180 字符

8.  summary
    必填：key_points
    约束：key_points 3–5 条，每条 \<= 80 字符

9.  sources
    必填：source_refs
    约束：每个外部事实性主张必须能追溯到 sources（至少 1 条）

六、图表数据规范（assets/charts/\*）
你要明确“内容交付的是数据不是图片”，否则无法自动化一致渲染。

Line chart JSON 示例：

```json
{
  "x_label": "Collateral Ratio",
  "y_label": "Liquidation Probability",
  "series": [
    {
      "name": "Baseline",
      "points": [
        { "x": 1.0, "y": 0.9 },
        { "x": 1.2, "y": 0.5 },
        { "x": 1.5, "y": 0.1 },
        { "x": 2.0, "y": 0.02 }
      ]
    }
  ],
  "annotations": [
    { "x": 1.5, "label": "Threshold" }
  ]
}
```

约束：

1.  数值必须带单位说明（unit 在 manifest.chart 定义）

2.  不允许内容团队在图表数据里塞样式（颜色线宽），样式由 tokens 控制

3.  annotations 必须能映射为 callouts

七、录屏规范（assets/screens/\*）

1.  分辨率：建议原始录屏 1920x1080 或更高，避免后期放大糊。

2.  时长：每段录屏尽量 \<= 90 秒；超过拆段并在 script 里分多个 block
    引用。

3.  UI 清洁：关闭通知，使用统一主题；敏感信息遮罩必须在 script.json 的
    mask_regions 声明。

4.  操作节奏：关键步骤必须在 overlay_steps 给出
    t_sec，避免后期人工对齐。

八、术语与双语（glossary.csv）
CSV 字段：
term,definition,lang,alias,notes
示例：
Liquidation,Process to sell collateral...,en,,"Keep consistent across
lessons"

如果你要中英对照，建议全局 glossary，并在 script 的 narration
段落允许标记术语：
segments.text 里用 \[\[Liquidation\]\]
这样的标记，渲染时自动高亮并可弹出定义卡或脚注。

九、校验规则（内容 leader 应该推动工程实现 lint，但规则由你定义）
必做的自动校验：

1.  schema_version 必填且符合 semver

2.  manifest 引用完整性：timeline 里的 \*\_ref 必须存在于 manifest

3.  字符串长度/条数限制（标题、bullet、quiz choices）

4.  overlay_steps.t_sec 单调递增，且不超过录屏时长

5.  sources：被标记为“外部事实”的段落必须带 source_refs（你可以在
    narration block 增加 fields.source_refs 可选）

十、验收标准（内容团队的 Definition of Done）
每节课 DoD：

1.  script.json 可通过 lint（零错误）

2.  自动渲染 preview 成功（无溢出、无字幕遮挡、无空白引用）

3.  录屏遮罩正确，敏感信息不可见

4.  至少 1 个 quiz 与 1 个 summary（如 meta 要求）

5.  外部事实主张可追溯 sources（抽检）

十一、变更与版本（避免工程与内容互相卡死）

1.  schema_version 只在破坏兼容时升级主版本。

2.  新增字段必须可选，默认行为明确。

3.  tokens/theme 升级不应要求内容脚本改动，除非新增 block
    类型或改字段语义。

如果你希望我把这套模板进一步“变成可直接放进仓库的文件集合”，我可以按上述结构输出：dsl.md、script.schema.json（JSON
Schema）、示例 lesson
包（含假数据图表与录屏占位），这样工程团队可以直接接入做校验与渲染。

## User

你把script.json的字段解释给我听一下，我不懂里面的字段对应视频的哪里，而且你怎么处理视频和文字堆叠的情况

## ChatGPT

script.json
的核心思想是：它不是“视频编辑时间线”，而是“可渲染的内容时间线”。timeline
里的每个 block 对应视频里一段可识别的画面结构（一个场景），Remotion 用
block.type 选择组件，用 block.fields 填充组件，用 duration_hint_sec
决定这段大概占用多少时间，再结合音频或 segment 的语速做微调。

先按层解释字段分别对应视频哪里。

第一层：schema_version、lesson

1.  schema_version：脚本格式版本号。工程用它决定用哪个解析器和渲染规则。

2.  lesson.title：视频显示用的课时标题，常用于片头、封面、播放器标题栏。

3.  lesson.hook：片头的“钩子句”，通常出现在 title 之后 1–2
    句，引导观众注意力。

4.  lesson.learning_objectives：通常做成一张“本节你将学到”卡片，或在开头以
    bullet 形式出现。

5.  lesson.prerequisites：可选，通常在开头或结尾给“建议先学什么”。

第二层：manifest（素材清单，对应视频里的外部资源）
manifest
不是直接上屏的内容，它告诉渲染系统“有哪些素材可用，以及如何引用”。

1.  screens：录屏视频素材。timeline 里的 screen_recording block 通过
    screen_ref 引用这里的 id。notes 给内容团队/审片用，mask_regions
    处理敏感信息。

2.  images：静态图片（架构图、截图、插图）。timeline 的 image_card
    或某些卡片可引用。

3.  charts：图表数据源。你不交 PNG，而交 JSON/CSV 数据，Remotion 按
    tokens 统一样式渲染。timeline 的 chart block 用 chart_ref 指向这里。

4.  code：代码文件资源。timeline 的 code_card
    引用，highlight/focus_lines 决定视频里高亮哪几行。

5.  sources：引用来源。timeline 的 sources block 或某些 narration block
    的 source_refs 用来展示/追溯。

6.  glossary：术语表。渲染时可用于自动高亮术语，或者按需弹出
    definition_card。

第三层：timeline（真正对应视频画面与节奏的部分）
timeline 是数组，顺序就是视频顺序。每个元素是一个 block。

通用字段：

1.  block_id：唯一标识，方便审片反馈定位“第几个块有问题”。

2.  type：决定“画面结构”，也就是用哪个 Remotion 组件渲染。比如 title 用
    TitleScene，chart 用 ChartScene。

3.  duration_hint_sec：这段建议时长，渲染可按语音长度或节奏调整，但一般会作为默认帧数。

4.  fields：这个 block
    的具体内容与参数，决定画面上写什么、放什么素材、怎么强调。

常见 type 对应视频画面：

1.  title
    fields.title/subtitle：屏幕中央大标题、副标题。
    fields.tone：决定标题色调（primary/warning 等），对应 tokens
    里的语义色。

2.  narration
    fields.segments：旁白句子列表。通常一条 segment 对应一段音频或 TTS
    的一句，并驱动字幕。
    fields.on_screen：这段旁白配套的屏幕内容（常见是
    bullets）。视频画面一般是左侧或上方要点，底部字幕。
    重点：segments 负责“说什么”，on_screen 负责“观众同时看到什么”。

3.  definition_card
    term/definition/example：一张定义卡。画面通常是居中卡片，term
    大字，definition 小字，example 辅助。
    tone：卡片边框/标识的语义色。

4.  chart
    chart_ref：引用 manifest.charts 的数据，画面是图表。
    title：图表标题。
    callouts：图上的标注点或区间高亮（例如阈值线）。
    narration_segments：讲解图表的旁白句子，驱动字幕和高亮顺序。

5.  screen_recording
    screen_ref：引用录屏素材。
    title：录屏上方标题条。
    overlay_steps：在录屏上叠加步骤提示（按时间点出现），帮助观众跟上。
    mask_regions：需要遮罩的区域（地址、账号、token
    等）。这是“避免后期手动打码”的关键。

6.  code_card
    code_ref：引用代码文件。
    focus_lines：镜头聚焦或高亮的行区间。
    narration_segments：解释代码的旁白。
    title：这段代码想表达的概念标题。

7.  quiz
    question/choices/answer/explanation：做成题目卡，通常先展示题干与选项，停顿，然后揭示答案和解释。

8.  summary
    key_points：复盘要点卡。
    next_lesson：引导下一节。

9.  sources
    source_refs：显示引用来源清单，一般放在结尾或作为角标/脚注。

你问的关键点：文字和视频内容堆叠怎么处理
这不是靠“人眼调”，而是靠两套机制一起解决：布局规则（layout policy）+
自动降级策略（fallback）。内容团队要理解的是：你交付的字段会触发这些策略，而不是无限制往屏幕塞字。

1.  固定布局区域，避免互相覆盖
    建议把 1920x1080 划成几个“永不冲突”的区域，工程在组件里强制执行：

<!-- -->

1.  顶部标题区：固定高度，用于 title bar、章节名

2.  主内容区：图表/录屏/卡片

3.  侧边信息区：bullets、callout、步骤提示

4.  底部字幕区：字幕专用安全区（safeArea.bottomExtraForCaptions）
    这样字幕永远不会压到图表的关键区域，录屏叠加也不会撞字幕。

<!-- -->

2.  内容长度约束是第一道防线
    你看到我在规范里写的那些“标题最大字符数、bullets
    最大条数、definition
    最大长度”不是形式主义，是为了让渲染可预测。超出就一定会溢出。

3.  自动排版与文本适配（组件内部完成）
    工程层一般会实现：

<!-- -->

1.  自动换行：按 maxWidth 换行，并限制最大行数

2.  自动缩放：在允许范围内（例如 100% 到 85%）缩小字号以容纳

3.  省略号截断：超过行数直接 …，并要求内容团队拆块

4.  行距调整：在 tight/normal 两档间切换

5.  列布局切换：bullets 从单列变双列（仅在条数较多但允许时）
    这些策略要明确优先级，避免每次输出都不一样。

<!-- -->

4.  与录屏叠加的冲突处理
    录屏场景最容易“信息爆炸”。常用的降级顺序是：

<!-- -->

1.  overlay_steps 只保留 1 条“当前步骤”，其余排队轮播

2.  steps 固定在录屏的左上或右上，不跟随鼠标到处跑

3.  如果录屏本身 UI 很密，steps 自动切到“边缘栏”而不是压在画面上

4.  如果仍拥挤，自动放大录屏关键区域（crop/scale），并把 steps
    放到空白区域

<!-- -->

5.  内容侧的拆分策略（你可以要求团队这样写）
    当信息超载时，不要硬塞在一个 block。
    做法是：

<!-- -->

1.  narration 拆两块：先讲概念与 bullets，再切 chart/录屏单独讲

2.  chart 块里只留 1–2 个 callout，更多标注拆成第二个 chart block

3.  code_card 一次只讲一个 window（例如 12–28 行），多段代码用多个
    code_card

4.  screen_recording 超过 45–60 秒且步骤多，拆成多个 screen_recording
    block，每段 2–3 步

<!-- -->

6.  最关键的工程实现点：溢出检测与失败即报警
    为了不靠人工猜，工程应该做“render-time overflow check”，例如：

<!-- -->

1.  对每个文本容器做测量：如果 scrollHeight \> clientHeight，直接标记为
    error

2.  CI 渲染样例时，把溢出 block_id 输出到日志
    内容团队拿到 block_id 直接回到 script.json 改，不需要来回扯皮。

如果你希望我把“字段到画面区域的映射”做成更直观的说明，我可以按每个 block
type 画一份区域示意的文字版规范（例如：title 区高度、bullets
区宽度、字幕区高度、录屏 steps 默认位置），同时给出每种 type
的“可接受内容上限”和“超限如何拆块”的具体规则。这样你培训内容团队会更快。
