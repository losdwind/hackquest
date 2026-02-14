# Lesson Script (EN)

## Segment 01
Voiceover:
Stablecoins are no longer a niche crypto primitive. They are becoming programmable money rails for trading, payments, remittance, and treasury operations. And if the agentic economy is real, agents will need money that settles 24/7, is machine-friendly, and plugs into liquidity without permission. Stablecoins fit that role, which is why this stack is becoming core infrastructure.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "From Primitive to Infrastructure",
    "title": "Why Stablecoins Are Core Rails",
    "bullets": [
      {"text": "Programmable money rails for trading, payments, remittance, and treasury", "appearAt": 3.5},
      {"text": "Settles 24/7, machine-friendly, plugs into liquidity without permission", "appearAt": 9.5},
      {"text": "Stablecoins fit that role", "appearAt": 19},
      {"text": "This stack is becoming core infrastructure", "appearAt": 21}
    ]
  }
}
```

## Segment 02
Voiceover:
Before we build, zoom out and see where stablecoins sit in DeFi. Think of DeFi as three layers. At the top, applications like Uniswap, Aave, and GMX handle demand and user experience. In the middle, protocols supply liquidity and pricing. At the bottom, stablecoins provide settlement and collateral. Every layer above depends on the one below it. When UST lost its peg in 2022, that dependency became obvious: Anchor imploded, liquidations cascaded across lending markets, and billions in value evaporated in days. The stablecoin layer is load-bearing infrastructure, and that is exactly what we are building.

Component: ArchitectureDiagram
```json
{
  "props": {
    "title": "The DeFi Stack",
    "nodes": [
      {"id": "apps",        "label": "Applications — Uniswap, Aave, GMX",            "x": 200, "y": 0,   "tone": "muted",   "width": 520, "height": 58, "accentAt": 5},
      {"id": "protocols",   "label": "Protocols — AMMs, Lending, Perps",              "x": 200, "y": 120, "tone": "default",  "width": 520, "height": 58, "accentAt": 10},
      {"id": "stablecoins", "label": "Stablecoins — Settlement + Collateral",         "x": 200, "y": 240, "tone": "accent",  "width": 520, "height": 62, "accentAt": 13}
    ],
    "edges": [
      {"from": "apps",      "to": "protocols",   "label": "depends on"},
      {"from": "protocols", "to": "stablecoins", "label": "depends on"}
    ],
    "note": "Every layer depends on the one below. We are building the base."
  }
}
```

## Segment 03
Voiceover:
History already showed us that not all stablecoin designs are equal. Some collapse under reflexive pressure. Others survive because risk is explicitly engineered. In this course, we do not build toy projects. We build a production-grade, over-collateralized system inspired by MakerDAO and designed for volatile markets.

Component: Compare
```json
{
  "props": {
    "title": "Architecture Matters",
    "left": {
      "label": "Fragile Design",
      "bullets": ["Endogenous collateral", "Algorithm-dependent peg", "Reflexive death spiral risk"],
      "appearAt": 3
    },
    "right": {
      "label": "Robust Design",
      "bullets": ["Exogenous collateral (ETH/BTC)", "Over-collateralized debt", "Deterministic liquidation incentives"],
      "appearAt": 7
    },
    "verdict": "We build for stress conditions, not just for bull markets.",
    "verdictAppearAt": 12
  }
}
```

## Segment 04
Voiceover:
By the end of this course, you will deploy an auditable, production-grade, over-collateralized stablecoin protocol. You will build a full CDP engine, a liquidation system with incentives, Chainlink oracle integration with safety guards, and production-level fuzz and invariant tests. This is not a tutorial walkthrough. It is the protocol you ship.

Component: HeroStatement
```json
{
  "props": {
    "eyebrow": "What You Will Build",
    "statement": "A Production-Grade Stablecoin Protocol",
    "deliverables": [
      {"text": "Full CDP engine: deposit, mint, redeem, burn", "appearAt": 4},
      {"text": "Liquidation system with 10% reward incentives", "appearAt": 6.5},
      {"text": "Chainlink oracle + stale-price safety guards", "appearAt": 9},
      {"text": "Fuzz + invariant test suites (Foundry)", "appearAt": 11.5},
      {"text": "Multi-network deployment scripts", "appearAt": 14},
      {"text": "Stability pool backstop for extreme markets", "appearAt": 15}
    ],
    "note": "Requires Solidity, ERC20 basics, and foundational DeFi knowledge.",
    "noteAppearAt": 17
  }
}
```

## Segment 05
Voiceover:
Take a quick look at the codebase you will build through this course. Four core contracts: the stablecoin token, the CDP engine, the oracle manager, and the stability pool, each backed by purpose-built libraries for price math and precision. The test directory mirrors the source layout: every module has dedicated unit tests, plus two independent fuzz strategies, fail-on-revert and continue-on-revert, each with a stateful handler driving invariant checks. Deployment scripts and multi-network configs are included. This is production-grade testing, not hello-world assertions.

Scene Type: Video
Asset Ref: assets/diagrams/code-structure.mp4
Playback Rate: 1.8453

## Segment 06
Voiceover:
Studying stablecoins upgrades more than your Solidity skills. The real work is reasoning about solvency and collateral under stress: what happens when liquidity disappears, when prices gap, and when oracles lie or go stale. You also need incentives that force risk to unwind, not accumulate. If you can design and verify that, you gain a framework that transfers to a lot of finance.

Component: Bullet
```json
{
  "props": {
    "title": "Why This Knowledge Compounds",
    "bullets": [
      {"text": "Solvency modeling under stress conditions", "appearAt": 4},
      {"text": "Collateral management + liquidity dynamics", "appearAt": 8},
      {"text": "Liquidation incentive design", "appearAt": 12},
      {"text": "Oracle failure modes + risk engineering", "appearAt": 16}
    ]
  }
}
```

## Segment 07
Voiceover:
Here is your roadmap. In Phase 1, you build the mental model in Unit 1, then design the architecture in Unit 2, implement the core engine in Unit 3, and add liquidation in Unit 4, which is where solvency becomes enforceable. Phase 2 goes from correct to resilient: economics and the Stability Pool in Unit 5, testing warfare with fuzzing and invariants in Unit 6, and production deployment and monitoring in Unit 7.

Component: Roadmap
```json
{
  "props": {
    "title": "Course Roadmap",
    "phases": [
      {"label": "Unit 1", "title": "Foundations", "detail": "Taxonomy, oracles, risk models", "appearAt": 3},
      {"label": "Unit 2", "title": "Architecture", "detail": "Token + system design", "appearAt": 6},
      {"label": "Unit 3", "title": "Core Engine", "detail": "Deposit, mint, redeem, burn", "appearAt": 9},
      {"label": "Unit 4", "title": "Liquidation", "detail": "Solvency enforcement", "appearAt": 11},
      {"label": "Unit 5", "title": "Economics", "detail": "Fees + stability pool", "appearAt": 17},
      {"label": "Unit 6", "title": "Testing", "detail": "Fuzz + invariant suites", "appearAt": 20},
      {"label": "Unit 7", "title": "Production", "detail": "Deploy + monitor + audit", "appearAt": 23}
    ]
  }
}
```

## Segment 08
Voiceover:
Now a quick preview of the runtime system. A user deposits collateral and mints DSC. Oracles feed prices into the engine. If a position drops below the health factor threshold, liquidators step in, seize collateral at a bonus, and burn the debt. If the collateral is not enough, the Stability Pool absorbs the residual bad debt. Every box in this diagram maps to a contract you will write.

Component: ArchitectureDiagram
```json
{
  "props": {
    "title": "System Architecture",
    "nodes": [
      {"id": "user",        "label": "User",                   "x": 0,   "y": 0,   "tone": "muted",   "width": 160, "height": 58, "accentAt": 2},
      {"id": "collateral",  "label": "Collateral (wETH/wBTC)", "x": 320, "y": 0,   "tone": "default", "width": 260, "height": 58, "accentAt": 3},
      {"id": "dsc",         "label": "DSC Token",              "x": 640, "y": 0,   "tone": "default", "width": 180, "height": 58, "accentAt": 5},
      {"id": "engine",      "label": "DSCEngine",              "x": 320, "y": 138, "tone": "accent",  "icon": "core", "width": 220, "height": 62, "accentAt": 7.5},
      {"id": "oracle",      "label": "Chainlink Oracle",       "x": 640, "y": 138, "tone": "muted",   "icon": "feed", "width": 230, "height": 58, "accentAt": 7},
      {"id": "health",      "label": "Health Factor",          "x": 640, "y": 276, "tone": "muted",   "width": 200, "height": 58, "accentAt": 11},
      {"id": "liquidator",  "label": "Liquidator",             "x": 0,   "y": 276, "tone": "danger",  "icon": "risk", "width": 180, "height": 58, "accentAt": 13},
      {"id": "pool",        "label": "Stability Pool",         "x": 320, "y": 276, "tone": "accent",  "icon": "backstop", "width": 220, "height": 58, "accentAt": 18}
    ],
    "edges": [
      {"from": "user",       "to": "collateral",  "label": "deposit"},
      {"from": "collateral", "to": "engine",       "label": "lock"},
      {"from": "engine",     "to": "dsc",          "label": "mint"},
      {"from": "oracle",     "to": "engine",       "label": "price feed"},
      {"from": "engine",     "to": "health",       "label": "compute"},
      {"from": "health",     "to": "liquidator",   "label": "< 1.0", "dashed": true},
      {"from": "liquidator", "to": "engine",       "label": "liquidate"},
      {"from": "engine",     "to": "pool",         "label": "bad debt"}
    ],
    "note": "Every box maps to a contract or module you will build across Units 2–5."
  }
}
```

## Segment 09
Voiceover:
Let's recap what we established. Stablecoins are the settlement layer of DeFi, and fragile designs fail under stress. So we chose exogenous collateral, over-collateralization, and deterministic liquidation. You will ship a real protocol with a CDP engine, oracle safety, and fuzz-tested invariants across seven units. This course demands an engineering mindset: we do not just ask does it work, we ask how can we break it.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Recap",
    "title": "What We Established",
    "bullets": [
      {"text": "Stablecoins = DeFi settlement layer", "appearAt": 2},
      {"text": "Exogenous collateral + over-collateralization = robust", "appearAt": 5.5},
      {"text": "You ship a real protocol, not a tutorial", "appearAt": 9},
      {"text": "Engineering mindset: 'How can I break it?'", "tone": "accent", "appearAt": 14}
    ]
  }
}
```

## Segment 10
Voiceover:
In the next lesson, we dissect the stablecoin design space. We will classify protocols along two axes: collateral origin, which is exogenous versus endogenous, and stability mechanism, which is algorithmic versus governance-backed. That framework is how we justify every design choice in this course. See you there.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Up Next",
    "title": "Stablecoin Taxonomy",
    "bullets": [
      {"text": "Collateral origin: exogenous vs endogenous", "appearAt": 4},
      {"text": "Stability mechanism: algorithmic vs governance-backed", "appearAt": 8},
      {"text": "Why some survive and others collapse", "appearAt": 11}
    ],
    "note": "Lesson 2 of 6 in Unit 1",
    "noteAppearAt": 13
  }
}
```
