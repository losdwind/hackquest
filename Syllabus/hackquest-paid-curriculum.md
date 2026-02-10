# HackQuest 付费课程体系 / HackQuest Paid Curriculum

三门核心课程，每门 20-25 讲，聚焦稳定币 + PayFi + AI Trading Agent 双轨道，并结合预测市场等热点方向。
Three core courses (20-25 lessons each) focused on Stablecoins + PayFi + AI Trading Agents, with selected hot topics like prediction markets.

## 课程体系总览 / Curriculum Overview

三门课，每门约 23 讲，4 周完成。
Three courses, about 23 lessons each, completed in ~4 weeks per course.

1. 稳定币协议开发 - 协议层 BUILD - 造一个稳定币，学会 DeFi 借贷核心原理。
   Stablecoin Protocol Development - Protocol-layer BUILD - create a stablecoin and learn core DeFi lending mechanics.
2. PayFi 稳定币支付 - 应用层 USE - 用稳定币收费，Web3 版 Stripe。
   PayFi Stablecoin Payments - Application-layer USE - charge in stablecoins, Web3 Stripe.
3. AI Agent 链上交易 - 自动化 AUTOMATE - 让 AI 帮你交易，7x24 运行。
   AI Agent On-chain Trading - Automation AUTOMATE - let AI trade for you, 24/7.

每门课结构：
Course structure:
- Part 1：背景知识（5-6 讲）。
  Part 1: Background knowledge (5-6 lessons).
- Part 2：进阶技术（10-12 讲）。
  Part 2: Advanced skills (10-12 lessons).
- Part 3：Guided Project（5-6 讲）。
  Part 3: Guided Project (5-6 lessons).

学习顺序：协议原理 → 支付应用 → 自动化交易。
Learning order: Protocol fundamentals → Payment applications → Automated trading.

## 课程一：稳定币协议开发实战课 / Course 1: Stablecoin Protocol Development

你每天都在用稳定币（USDT、USDC、DAI）。这门课结束时，你会部署一个可审计的超额抵押稳定币协议。
You use stablecoins daily (USDT, USDC, DAI). By the end, you will deploy an auditable overcollateralized stablecoin protocol.

你会学到 / You will learn:
- 稳定币三维分类：为什么 UST 会死而 DAI 能活（外生 vs 内生抵押）。
  Stablecoin taxonomy: why UST failed while DAI survived (exogenous vs endogenous collateral).
- CDP 架构设计：抵押债仓、健康因子、清算博弈的底层逻辑。
  CDP design: vaults, health factors, liquidation game theory.
- 预言机安全：Chainlink 集成、陈旧价格保护、极端行情熔断。
  Oracle safety: Chainlink integration, stale price protection, extreme market circuit breaker.
- 生产级测试：Fuzz Testing 找边界漏洞，Invariant Testing 证明系统安全。
  Production testing: fuzz testing for edge cases, invariants for system safety.

你会做什么 / You will build:
- 完整的 CDP 引擎（存 ETH，借出你的稳定币）。
  A full CDP engine (deposit ETH, mint your stablecoin).
- 清算机制（健康因子破裂触发清算，清算人赚 10% 奖励）。
  Liquidation system (health factor triggers liquidation, 10% reward).
- Chainlink 预言机 + OracleLib 安全库集成。
  Chainlink + OracleLib safety integration.
- 链下监控与清算机会检测脚本（TypeScript + viem）。
  Off-chain monitoring and liquidation detection scripts (TypeScript + viem).
- 测试网部署与安全自查（Slither）。
  Testnet deployment and security self-checks (Slither).

前置要求：熟悉 Solidity，了解 ERC20 与基础 DeFi；有 JS/TS 基础更佳。
Prerequisites: Solidity, ERC20 and basic DeFi; JS/TS experience preferred.

## 课程二：PayFi 稳定币支付实战课 / Course 2: PayFi Stablecoin Payments

PayFi 是可编程的钱：按秒付、按次付、机器付。
PayFi is programmable money: pay-per-second, pay-per-call, machine-to-machine.

你会深入三个协议 / You will go deep on three protocols:
- x402：HTTP 原生支付协议，让 API 请求自带付款。
  x402: HTTP-native payments with pay-on-request.
- Superfluid：流支付，按秒计费的订阅服务。
  Superfluid: streaming payments for per-second subscriptions.
- CCTP：Circle 跨链 USDC 协议。
  CCTP: Circle’s cross-chain USDC protocol.

你会做什么 / You will build:
- x402 按次计费 API。
  x402 pay-per-call API.
- Superfluid 按秒订阅服务。
  Superfluid per-second subscription service.
- 多链收款与归集（Base/Arbitrum/Polygon）。
  Multi-chain collection and settlement (Base/Arbitrum/Polygon).
- AI Agent 可调用的支付接口。
  Agent-friendly payment interfaces.

市场时机 / Market timing:
- 美国 2025 年 7 月稳定币法案落地。
  US stablecoin bill lands in July 2025.
- 香港 2025 年 8 月稳定币发行人监管生效。
  Hong Kong issuer regulation starts in Aug 2025.
- Coinbase 2025 年 5 月发布 x402 协议。
  Coinbase released x402 in May 2025.

前置要求：了解 USDC/ERC20，有后端开发经验。
Prerequisites: USDC/ERC20 knowledge, backend development experience.

## 课程三：AI Agent 链上交易实战课 / Course 3: AI Agent On-chain Trading

AI 正在学会花钱。Crypto 钱包让 AI Agent 可以自主执行交易。
AI is learning to spend money. Crypto wallets let AI agents act autonomously on-chain.

你会学到 / You will learn:
- Agent 框架核心：角色、记忆、行动、工具与技能。
  Agent framework core: character, memory, actions, tools, skills.
- 链上交易能力：钱包管理、DEX 对接、价格监控、风控。
  On-chain trading: wallet management, DEX integration, price monitoring, risk controls.
- 付费 API 集成：复用课程二的 x402。
  Paid API integration: reuse x402 from Course 2.

前置：课程一 + 课程二（推荐，非必需）。
Prereq: Course 1 + Course 2 (recommended, not required).

## 免费引流内容 / Free Lead-Gen Content

AI + 预测市场入门（5 讲免费）。
AI + prediction markets intro (5 free lessons).

- 预测市场基础：Polymarket、赔率与概率。
  Prediction markets basics: Polymarket, odds and probability.
- LMSR 做市商与价格发现。
  LMSR market making and price discovery.
- AI 能预测什么：信息聚合与概率估计的边界。
  What AI can predict: information aggregation and probability limits.
- 监控实战：赔率变化监控与告警。
  Monitoring: odds tracking and alerts.
- 从监控到自动交易（导流课程三）。
  From monitoring to automated trading (lead into Course 3).

引流逻辑：免费内容吸引 → “想构建完整系统？” → 导流课程三。
Funnel: free content → “want the full system?” → lead into Course 3.

## 执行优先级 / Execution Priority

学习路径（推荐顺序）：Course 1 → Course 2 → Course 3。
Learning path (recommended): Course 1 → Course 2 → Course 3.

开发顺序（考虑市场热度）：
Build order (market timing):
- Q1 2026：PayFi 稳定币支付。
  Q1 2026: PayFi Stablecoin Payments.
- Q2 2026：稳定币协议开发。
  Q2 2026: Stablecoin Protocol Development.
- Q3 2026：AI Agent 链上交易。
  Q3 2026: AI Agent On-chain Trading.

每门课开发周期：6-8 周。
Development cycle per course: 6-8 weeks.

## 制作规格（摘要）/ Production Specs (Summary)

讲师学习储备：8-12 周（可与制作并行，但前期必须完成）。
Instructor prep: 8-12 weeks (can overlap, but must be completed early).

每讲时长：
Per-lesson duration:
- 背景知识讲：10-15 分钟。
  Background lessons: 10-15 minutes.
- 进阶技术讲：15-25 分钟。
  Advanced lessons: 15-25 minutes.
- 项目实战讲：20-30 分钟。
  Project lessons: 20-30 minutes.

课程一制作时间估算（摘要）：
Course 1 time estimate (summary):
- 乐观：约 160 小时（全职 4 周 / 兼职 8 周）。
  Optimistic: ~160 hours (4 weeks full-time / 8 weeks part-time).
- 保守：约 250 小时（全职 6 周 / 兼职 12 周）。
  Conservative: ~250 hours (6 weeks full-time / 12 weeks part-time).

## Track 学习路径 / Track Learning Path

- Week 1-4：Course 1 稳定币协议开发 → 产出：你的第一个 CDP 稳定币。
  Week 1-4: Course 1 Stablecoin Protocol → Output: your first CDP stablecoin.
- Week 5-8：Course 2 PayFi 稳定币支付 → 产出：x402 计费 API 服务。
  Week 5-8: Course 2 PayFi Payments → Output: x402 billing API service.
- Week 9-12：Course 3 AI Agent 链上交易 → 产出：自动收益 Agent。
  Week 9-12: Course 3 AI Agent Trading → Output: automated yield agent.

最终能力 / Final Capabilities

- 设计稳定币协议（清算、预言机、安全）。
  Design stablecoin protocols (liquidation, oracles, security).
- 构建支付系统（x402、流支付、跨链）。
  Build payment systems (x402, streaming, cross-chain).
- 开发 AI Agent 自动化 DeFi 操作。
  Build AI agents for automated DeFi operations.
