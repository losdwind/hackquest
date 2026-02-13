# Lesson Script (EN)

## Segment 01
Voiceover:
Stablecoins are no longer a niche crypto primitive. They are becoming programmable settlement rails for trading, payments, remittance, and treasury operations. As traditional finance connects to public blockchains, demand for engineers who truly understand stablecoin systems is rising fast.

Component: Bullet
```json
{
  "props": {
    "title": "Why Stablecoins Matter Now",
    "bullets": [
      {"text": "Programmable dollars for 24/7 settlement"},
      {"text": "Bridge between on-chain markets and off-chain finance"},
      {"text": "Core base layer for lending, DEXs, and payments"}
    ]
  }
}
```

## Segment 02
Voiceover:
Studying stablecoins deeply upgrades more than your Solidity skills. You must reason about collateral quality, liquidity, solvency, liquidation dynamics, oracle reliability, and stress scenarios. If you can design this system well, you can reason about much larger parts of modern finance.

Component: Bullet
```json
{
  "props": {
    "title": "Why This Knowledge Compounds",
    "bullets": [
      {"text": "You model solvency, not just smart contract behavior"},
      {"text": "You connect token mechanics with real financial risk"},
      {"text": "You gain a framework that transfers to TradFi x DeFi integration"}
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
Here is your roadmap. We start with foundations in Unit one. In Units two and three, we build the core engine and the token. Unit four covers the liquidation system—the brakes that keep the car safe.

Component: Table
```json
{
  "props": {
    "title": "Course Roadmap: Phase 1",
    "columns": ["Unit", "Focus", "Goal"],
    "rows": [
      ["Unit 1", "Foundations", "Taxonomy & Oracle Risks"],
      ["Unit 2", "Architecture", "Token & System Design"],
      ["Unit 3", "Core Engine", "Minting & Redeeming Logic"],
      ["Unit 4", "Liquidation", "Solvency Protection System"]
    ]
  }
}
```

## Segment 05
Voiceover:
Then we go advanced. Unit five introduces economics and the Stability Pool. Unit six is pure testing warfare: fuzzing and invariants. Finally, Unit seven covers deployment and monitoring.

Component: Table
```json
{
  "props": {
    "title": "Course Roadmap: Phase 2",
    "columns": ["Unit", "Focus", "Goal"],
    "rows": [
      ["Unit 5", "Economics", "Fees & Stability Pool"],
      ["Unit 6", "Testing Warfare", "Fuzzing & Invariants"],
      ["Unit 7", "Production", "Deployment & Scripts"]
    ]
  }
}
```

## Segment 06
Voiceover:
Before we dive into contracts, place stablecoins in the broader system. DeFi is a stack of money legos. At the base, we have stablecoins like DAI and USDC. Above them, lending protocols like Aave and exchanges like Uniswap. If the stablecoin layer breaks, everything above it crumbles.

Scene Type: Slide
Component: SplitImage
Asset Ref: assets/diagrams/segment-06-defi-stack.png
```json
{
  "props": {
    "eyebrow": "System View",
    "title": "The DeFi Stack",
    "subtitle": "Stablecoins are the base monetary layer.",
    "bullets": [
      {"text": "Application layer depends on protocol liquidity", "tone": "muted"},
      {"text": "Protocol layer depends on stable pricing and settlement", "tone": "default"},
      {"text": "Stablecoin integrity anchors the entire stack", "tone": "accent"}
    ]
  }
}
```

## Segment 07
Voiceover:
Before opening the repo, map the runtime system first. The user deposits collateral and mints DSC. Oracles publish prices. If a position falls below threshold, liquidators close risk and the Stability Pool absorbs residual bad debt. Keep this picture in mind; next we map each box to concrete files.

Scene Type: Slide
Component: DemoOverlay
Asset Ref: assets/diagrams/segment-07-system-architecture.mp4
```json
{
  "props": {
    "title": "System Architecture"
  }
}
```

## Segment 08
Voiceover:
Now map that architecture to code. Start in the source folder: `DSCEngine.sol` is the heart of the system. It coordinates deposit, mint, burn, redeem, and health-factor checks. Think of it as the protocol's risk engine and state coordinator.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/ai/vscode-src-folder-ai-styled.mp4
```json
{
  "props": {
    "title": "Core Logic: DSCEngine.sol"
  }
}
```

## Segment 09
Voiceover:
Then look at the supporting modules. `DecentralizedStableCoin.sol` is the ERC20 token controlled by the engine. `OracleManager.sol` wraps price-feed safety logic. `StabilityPool.sol` handles stress events by socializing and absorbing bad debt.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/ai/vscode-contracts-tour-ai-styled.mp4
```json
{
  "props": {
    "title": "System Components"
  }
}
```

## Segment 10
Voiceover:
Once module boundaries are clear, the next question is trust: how do we prove the system remains solvent under chaos? That is why the `test` folder is split into unit tests, plus `fuzz` and `invariant` suites. We will encode properties like: protocol collateral value must always cover total debt supply.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/ai/vscode-test-folder-ai-styled.mp4
```json
{
  "props": {
    "title": "Advanced Testing Suite"
  }
}
```

## Segment 11
Voiceover:
This course is challenging. It requires an engineering mindset. We don't just ask "does it work?", we ask "how can we break it?". If you are ready to upgrade your skills from developer to protocol engineer, let's begin.

Component: CalloutScene
```json
{
  "props": {
    "title": "Engineering Mindset",
    "body": "Don't just ask 'Does it work?'. Ask 'How can I break it?'."
  }
}
```

## Segment 12
Voiceover:
In the next lesson, we will dissect the stablecoin landscape. We will classify them by their collateral and stability mechanisms to understand exactly why we chose our specific architecture. See you there.

Component: CalloutScene
```json
{
  "props": {
    "title": "Next: Taxonomy",
    "body": "Understanding the design space: Collateral types and Stability mechanisms."
  }
}
```
