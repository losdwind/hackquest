# 制作规格 / Production Specs

## 讲师学习储备（前置）/ Instructor Preparation (Prerequisites)

### 课程一（稳定币协议）：3-4 周 / Course 1 (Stablecoin Protocol): 3-4 weeks
- 跟完 Patrick Collins Foundry 稳定币课程（重点：Invariant Testing 方法论）。
  Complete Patrick Collins' Foundry stablecoin course (focus: invariant testing).
- 通读 MakerDAO/Liquity 源码（重点：清算机制差异）。
  Read MakerDAO/Liquity source code (focus: liquidation differences).
- 自己完整实现一遍 + 写满 Fuzz/Invariant 测试。
  Implement end-to-end and write full fuzz/invariant tests.
- 写监控脚本 + 清算机会检测脚本（TypeScript + viem）。
  Build monitoring scripts + liquidation opportunity detection (TypeScript + viem).

### 课程二（PayFi 支付）：2-3 周 / Course 2 (PayFi Payments): 2-3 weeks
- 研究 x402/Superfluid/CCTP 文档和代码。
  Study x402/Superfluid/CCTP docs and code.
- 搭建完整 demo 验证可行性。
  Build a full demo to validate feasibility.

### 课程三（AI Agent 交易）：3-4 周 / Course 3 (AI Agent Trading): 3-4 weeks
- 熟悉 ElizaOS 框架。
  Get familiar with ElizaOS.
- 实现完整的交易 Agent 并实际运行。
  Implement a full trading agent and run it.
- 踩坑 + 总结最佳实践。
  Capture pitfalls and summarize best practices.

总学习储备：8-12 周（可与制作并行，但前期必须完成）。
Total preparation: 8-12 weeks (can overlap with production, but must be done early).

## 每讲时长 / Per-lesson Duration

- 背景知识讲：10-15 分钟（概念讲解为主）。
  Background lessons: 10-15 minutes (concept-heavy).
- 进阶技术讲：15-25 分钟（边讲边写代码）。
  Advanced lessons: 15-25 minutes (code-along).
- 项目实战讲：20-30 分钟（完整功能实现）。
  Project lessons: 20-30 minutes (full feature implementation).

每门课总时长：约 6-8 小时视频。
Total per course: about 6-8 hours of video.

## 课程一制作时间估算 / Course 1 Production Time Estimate

### 按讲类型拆分 / Breakdown by lesson type

Part 1 背景知识（6 讲，概念为主）/ Part 1 Background (6 lessons, concept-heavy)
- 单讲：脚本 1-2h + 配图 1-2h + 录制 0.5h + 剪辑 1.5-2h = 5-8 小时。
  Per lesson: script 1-2h + visuals 1-2h + recording 0.5h + editing 1.5-2h = 5-8 hours.
- 小计：30-48 小时。
  Subtotal: 30-48 hours.

Part 2 协议实现（12 讲，边讲边写代码）/ Part 2 Implementation (12 lessons, code-along)
- 单讲：脚本 1-2h + 代码准备 2-4h + 录制 1h + 剪辑 2-3h = 8-12 小时。
  Per lesson: script 1-2h + code prep 2-4h + recording 1h + editing 2-3h = 8-12 hours.
- 小计：96-144 小时。
  Subtotal: 96-144 hours.

Part 3 部署监控（5 讲，TypeScript 脚本）/ Part 3 Deployment & Monitoring (5 lessons, TypeScript scripts)
- 单讲：脚本 1h + 代码准备 2-3h + 录制 0.5-1h + 剪辑 2h = 6-10 小时。
  Per lesson: script 1h + code prep 2-3h + recording 0.5-1h + editing 2h = 6-10 hours.
- 小计：30-50 小时。
  Subtotal: 30-50 hours.

### 总时间估算 / Total Estimate

- 乐观（熟练+顺利）：约 160 小时；全职 4 周；兼职（20h/周）8 周。
  Optimistic (smooth and experienced): ~160 hours; full-time 4 weeks; part-time (20h/week) 8 weeks.
- 保守（含踩坑+返工）：约 250 小时；全职 6 周；兼职（20h/周）12 周。
  Conservative (with setbacks): ~250 hours; full-time 6 weeks; part-time (20h/week) 12 weeks.

## 加速方案 / Acceleration Plan

1. 代码先全部写完再录制，避免边录边 debug。
   Finish coding before recording to avoid live debugging.
2. 批量录制同类型内容，状态更稳定。
   Batch record similar content for consistency.
3. 剪辑外包（可省 30-40 小时）。
   Outsource editing (save 30-40 hours).
4. 先录“能用”版本，后期迭代优化。
   Record a usable version first, iterate later.

## 每门课开发周期 / Course Development Cycle

6-8 周。
6-8 weeks.
