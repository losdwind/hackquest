# HackQuest Agent 规范（对齐版）

本仓库的 AI Agent 规范以 `AGENTS.md` 为唯一准则来源。

- 如 `CLAUDE.md` 与 `AGENTS.md` 有任何冲突，以 `AGENTS.md` 为准。
- 运行时与包管理：永远使用 `bun`，不使用 npm/yarn/pnpm/node。

常用入口：

- 字幕 `lines.json`：使用 `remotion/scripts/build-line-captions.mjs` 生成，并遵循 `AGENTS.md` 的“短句优先”切分规则。
- 课程脚本与产物约定：以 `AGENTS.md` 描述为准（`source/script.md`、`generated/voiceover-en-segments.json`、`generated/captions/lines.json` 等）。

