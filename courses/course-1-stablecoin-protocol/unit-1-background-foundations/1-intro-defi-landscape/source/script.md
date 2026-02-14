# Lesson Script (EN)

## Segment 01
Voiceover:
Stablecoins are no longer a niche crypto primitive. They are becoming programmable money rails for trading, payments, remittance, and treasury operations. And if the agentic economy is real, agents will need money that settles 24/7, is machine-friendly, and plugs into liquidity without permission. Stablecoins fit that role, which is why this stack is becoming core infrastructure.

Component: Bullet
```json
{
  "props": {
    "title": "Stablecoins Power the Agentic Economy",
    "bullets": [
      {"text": "24/7 settlement for trading, payments, and remittance", "tone": "accent"},
      {"text": "Machine-friendly money for the agentic economy"},
      {"text": "Permissionless access to liquidity and treasury"}
    ]
  }
}
```

## Segment 02
Voiceover:
Before we build, zoom out and see where stablecoins sit in DeFi. DeFi is a stack. Applications sit on top of protocols, and protocols depend on stable settlement and collateral underneath. If the stablecoin layer loses integrity, protocols wobble, and apps turn into liquidation dashboards. We are building that base layer.

Component: SplitImage
Asset Ref: assets/diagrams/segment-06-defi-stack.png
```json
{
  "props": {
    "eyebrow": "System View",
    "title": "The DeFi Stack",
    "subtitle": "Stablecoins are the base monetary layer.",
    "bullets": [
      {"text": "Apps: demand + UX", "tone": "muted"},
      {"text": "Protocols: liquidity + pricing", "tone": "muted"},
      {"text": "Stablecoins: settlement + collateral", "tone": "accent"}
    ]
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
      "bullets": ["Endogenous collateral", "Algorithm-dependent peg", "Reflexive death spiral risk"]
    },
    "right": {
      "label": "Robust Design",
      "bullets": ["Exogenous collateral (ETH/BTC)", "Over-collateralized debt", "Deterministic liquidation incentives"]
    },
    "verdict": "We build for stress conditions, not just for bull markets."
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
      {"text": "Full CDP engine: deposit, mint, redeem, burn"},
      {"text": "Liquidation system with 10% reward incentives"},
      {"text": "Chainlink oracle + stale-price safety guards"},
      {"text": "Fuzz + invariant test suites (Foundry)"},
      {"text": "Multi-network deployment scripts"},
      {"text": "Stability pool backstop for extreme markets"}
    ],
    "note": "Requires Solidity, ERC20 basics, and foundational DeFi knowledge."
  }
}
```

## Segment 05
Voiceover:
Studying stablecoins upgrades more than your Solidity skills. The real work is reasoning about solvency and collateral under stress: what happens when liquidity disappears, when prices gap, and when oracles lie or go stale. You also need incentives that force risk to unwind, not accumulate. If you can design and verify that, you gain a framework that transfers to a lot of finance.

Component: Bullet
```json
{
  "props": {
    "title": "Why This Knowledge Compounds",
    "bullets": [
      {"text": "Solvency modeling under stress conditions"},
      {"text": "Collateral management + liquidity dynamics"},
      {"text": "Liquidation incentive design"},
      {"text": "Oracle failure modes + risk engineering"}
    ]
  }
}
```

## Segment 06
Voiceover:
Here is your roadmap. In Phase 1, you build the mental model in Unit 1, then design the architecture in Unit 2, implement the core engine in Unit 3, and add liquidation in Unit 4, which is where solvency becomes enforceable. Phase 2 goes from correct to resilient: economics and the Stability Pool in Unit 5, testing warfare with fuzzing and invariants in Unit 6, and production deployment and monitoring in Unit 7.

Component: Roadmap
```json
{
  "props": {
    "eyebrow": "Your Journey",
    "title": "Course Roadmap",
    "subtitle": "From mental model to production deployment.",
    "phases": [
      {"label": "Unit 1", "title": "Foundations", "detail": "Taxonomy, oracles, risk models"},
      {"label": "Unit 2", "title": "Architecture", "detail": "Token + system design"},
      {"label": "Unit 3", "title": "Core Engine", "detail": "Deposit, mint, redeem, burn"},
      {"label": "Unit 4", "title": "Liquidation", "detail": "Solvency enforcement"},
      {"label": "Unit 5", "title": "Economics", "detail": "Fees + stability pool"},
      {"label": "Unit 6", "title": "Testing", "detail": "Fuzz + invariant suites"},
      {"label": "Unit 7", "title": "Production", "detail": "Deploy + monitor + audit"}
    ],
    "activePhase": 1
  }
}
```

## Segment 07
Voiceover:
Now a quick preview of the runtime system. A user deposits collateral and mints DSC. Oracles feed prices into the engine. If a position drops below the health factor threshold, liquidators step in, seize collateral at a bonus, and burn the debt. If the collateral is not enough, the Stability Pool absorbs the residual bad debt. Every box in this diagram maps to a contract you will write.

Component: ArchitectureDiagram
```json
{
  "props": {
    "eyebrow": "Runtime View",
    "title": "System Architecture",
    "subtitle": "How collateral, debt, oracles, and liquidation interact.",
    "nodes": [
      {"id": "user",        "label": "User",                   "x": 0,   "y": 0,   "tone": "muted",   "width": 160, "height": 58},
      {"id": "collateral",  "label": "Collateral (wETH/wBTC)", "x": 320, "y": 0,   "tone": "default", "width": 260, "height": 58},
      {"id": "dsc",         "label": "DSC Token",              "x": 640, "y": 0,   "tone": "default", "width": 180, "height": 58},
      {"id": "engine",      "label": "DSCEngine",              "x": 320, "y": 138, "tone": "accent",  "icon": "core", "width": 220, "height": 62},
      {"id": "oracle",      "label": "Chainlink Oracle",       "x": 640, "y": 138, "tone": "muted",   "icon": "feed", "width": 230, "height": 58},
      {"id": "liquidator",  "label": "Liquidator",             "x": 0,   "y": 276, "tone": "danger",  "icon": "risk", "width": 180, "height": 58},
      {"id": "pool",        "label": "Stability Pool",         "x": 320, "y": 276, "tone": "accent",  "icon": "backstop", "width": 220, "height": 58},
      {"id": "health",      "label": "Health Factor",          "x": 640, "y": 276, "tone": "muted",   "width": 200, "height": 58}
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

## Segment 08
Voiceover:
Let's recap what we established. Stablecoins are the settlement layer of DeFi, and fragile designs fail under stress. So we chose exogenous collateral, over-collateralization, and deterministic liquidation. You will ship a real protocol with a CDP engine, oracle safety, and fuzz-tested invariants across seven units. This course demands an engineering mindset: we do not just ask does it work, we ask how can we break it.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Recap",
    "title": "What We Established",
    "bullets": [
      {"text": "Stablecoins = DeFi settlement layer", "tone": "accent"},
      {"text": "Exogenous collateral + over-collateralization = robust"},
      {"text": "You ship a real protocol, not a tutorial"},
      {"text": "Engineering mindset: 'How can I break it?'", "tone": "accent"}
    ]
  }
}
```

## Segment 09
Voiceover:
In the next lesson, we dissect the stablecoin design space. We will classify protocols along two axes: collateral origin, which is exogenous versus endogenous, and stability mechanism, which is algorithmic versus governance-backed. That framework is how we justify every design choice in this course. See you there.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Up Next",
    "title": "Stablecoin Taxonomy",
    "bullets": [
      {"text": "Collateral origin: exogenous vs endogenous"},
      {"text": "Stability mechanism: algorithmic vs governance-backed"},
      {"text": "Why some survive and others collapse"}
    ],
    "note": "Lesson 2 of 6 in Unit 1"
  }
}
```
