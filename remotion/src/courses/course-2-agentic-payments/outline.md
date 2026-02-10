# Course 2: PayFi Stablecoin Payments

In 2025, stablecoin regulation landed and PayFi moved from concept to reality.

## What is PayFi? Programmable money

- Not monthly payments, but pay-per-second.
- Not pay-after-service, but pay-as-you-go.
- Not humans paying, but machines paying.

This course teaches PayFi infrastructure: services that machines can discover, pay for, and use.

## Beyond simple crypto payments

You will dive into three protocols:
- x402: HTTP-native payments for API requests.
- Superfluid: streaming payments for per-second subscriptions.
- CCTP: Circle’s cross-chain USDC protocol.

## Advanced Topics

- Understand protocol design, not just SDK usage.
- Handle idempotency, replay protection, refunds, compliance boundaries.
- Build agent-friendly payment interfaces.
- Multi-chain collection with unified entry and settlement.

## What You Will Build

- x402 pay-per-call API service.
- Superfluid per-second subscription service.
- Multi-chain collection on Base/Arbitrum/Polygon.
- AI agents that pay and call your API.

## Market Timing

- US stablecoin bill landed in July 2025.
- Hong Kong issuer regulation started in Aug 2025.
- Coinbase released x402 in May 2025.

## Prerequisites

USDC/ERC20 knowledge and backend experience (Node.js/Python).

## Part 1: Background (5 lessons)

1. Stablecoin basics: USDC/USDT/DAI differences, reserve models and risks.
2. Payment flow: authorization → settlement → reconciliation, on-chain vs traditional.
3. Compliance intro: US/HK regulation and KYC/AML interfaces.
4. On-chain payment landscape: x402/Superfluid/CCTP/Request Network.
5. Project architecture: pay-per-use API billing system.

## Part 2: Advanced Protocols (12 lessons)

Module A: x402 (5 lessons)

6. x402 fundamentals: HTTP 402, payment challenge and credentials.
7. Server implementation: pricing, payment verification, access control.
8. Client integration: wallet signing, credential generation, retries.
9. Idempotency & security: replay protection, quotas, refunds.
10. x402 practice: build a pay-per-call API.

Module B: Streaming Payments (3 lessons)

11. Superfluid basics: per-second transfers, real-time balances, stream lifecycle.
12. Subscription implementation with Superfluid.
13. Streaming vs one-time payments: scenarios and examples.

Module C: Cross-chain & Observability (4 lessons)

14. Circle CCTP: burn/mint USDC across chains without bridges.
15. Multi-chain collection architecture.
16. Settlement monitoring: tx tracking, reconciliation, alerts.
17. Risk and disputes: refunds, freeze policies, compliance checklist.

## Part 3: Guided Project (6 lessons)

Project: agent-callable paid API service (x402, USDC pay-per-call).

18. Project design: requirements, architecture, tech choices.
19. Backend: x402 billing middleware and business logic.
20. On-chain collection: USDC contract, balance checks, withdrawals.
21. Agent client: price discovery and autonomous payment.
22. Monitoring: revenue stats, usage analytics, alert dashboard.
23. Launch: testnet validation → mainnet deploy → documentation.

## Deliverables

- Running x402 billing backend.
- Example agent client for paid calls.
- On-chain USDC collection and reconciliation scripts.
- Monitoring dashboard and alert setup.
- Deployment docs and compliance boundaries.
- Extensible code templates.
