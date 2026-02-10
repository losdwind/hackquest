# Course 3: AI Agent On-chain Trading

AI is learning to spend money. Crypto wallets let AI agents act autonomously.

This course teaches you to build AI agents that can operate on-chain assets.

## Advanced Topics

- Core agent framework concepts: Character, Memory, Actions, Providers, MCP, Sub-agents, Skills, Plugins.
- Full on-chain trading: wallet management, DEX integration, price monitoring, risk controls.
- Paid API integration (reuse x402 from Course 2).

Prereq: Course 1 + Course 2 (recommended, not required).

## Part 1: Background (5 lessons)

1. What is an AI agent: agent vs bot, why agents can trade.
2. On-chain trading basics: wallets, signatures, gas.
3. DeFi interactions: DEX swaps, lending, core interfaces.
4. LLM basics: prompt engineering for trading intent.
5. Framework selection: ElizaOS vs LangChain vs Claude Agent SDK.

## Part 2: ElizaOS Development (12 lessons)

Module A: ElizaOS Mastery

6. ElizaOS architecture: Character, Memory, Actions, Providers.
7. Agent persona: identity, boundaries, risk profile.
8. Memory system: short-term and long-term memory.
9. Custom actions: Swap/Transfer/Approve and other on-chain ops.

Module B: On-chain Trading

10. Wallet integration: key management, multi-chain wallets, security.
11. DEX integration: execute trades via Uniswap V3 / 1inch.
12. Price data: APIs vs oracles, real-time monitoring.
13. Strategies: grid, mean reversion, take-profit/stop-loss.

Module C: Operations and Optimization

14. Risk management: position limits, per-trade caps, emergency stop.
15. Logging & monitoring: trade logs, PnL stats, alerts.
16. Gas optimization: dynamic gas, timing decisions.
17. x402 integration: paid API calls by agents.

## Part 3: Guided Project (6 lessons)

Project: stablecoin yield aggregator agent - compare rates and rebalance.

User input:
- "Put my USDC where yields are highest."

Agent flow:
1. Query USDC yields on Aave/Compound/Yearn.
2. Select the best protocol.
3. Execute the deposit transaction.
4. Periodically rebalance when yields change.

18. Project design: requirements, architecture, supported protocols.
19. Core agent: persona + intent parsing + memory.
20. Yield queries: multi-protocol API integration.
21. Trading actions: Deposit/Withdraw/Swap actions.
22. Testing: testnet validation, edge cases.
23. Deployment: server setup, monitoring, yield tracking.

## Deliverables

- Running ElizaOS AI agent.
- Stablecoin yield strategy plugin.
- On-chain trading actions module.
- Monitoring dashboard and alerts.
- Deployment docs and security notes.
- Extensible agent template.
