# Lesson Script (EN)

## Segment 01
Voiceover:
May 2022. The Terra ecosystem collapses. Forty billion dollars of value evaporates in days. Savings are wiped out. Ideally, stablecoins should be boring. But when they fail, they fail catastrophically.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/ai/ust-crash-chart-ai-styled.mp4
```json
{
  "props": {
    "title": "The UST Crash"
  }
}
```

## Segment 02
Voiceover:
Meanwhile, MakerDAO and DAI survived the same market crash perfectly. Why? Because the architecture matters. In this course, we do not build toy projects. We build a production-grade, over-collateralized stablecoin system designed to survive market chaos.

Component: Compare
```json
{
  "props": {
    "title": "Architecture Matters",
    "left": {
      "label": "Fragile Design",
      "bullets": ["Endogenous collateral", "Algorithm-dependent peg", "Death spiral risk"]
    },
    "right": {
      "label": "Robust Design",
      "bullets": ["Exogenous collateral (ETH/BTC)", "Over-collateralized", "Incentivized liquidation"]
    },
    "verdict": "We build for survival, not just for sunny days."
  }
}
```

## Segment 03
Voiceover:
Welcome to the HackQuest Stablecoin Protocol course. This is the flagship engineering module in our curriculum. We assume you know Solidity basics. Here, we focus on engineering rigor: fuzzing, invariant testing, and risk parameters.

Component: Bullet
```json
{
  "props": {
    "title": "Engineering Standards",
    "bullets": [
      {"text": "Fuzzing: Finding edge cases before hackers do"},
      {"text": "Invariant Testing: Proving system properties always hold"},
      {"text": "Risk Management: Designing for solvency"},
      {"text": "Production Tooling: Slither, Foundry, and auditing mindset", "tone": "muted"}
    ]
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
Let us look at the ecosystem. DeFi is a stack of money legos. At the base, we have stablecoins like DAI and USDC. Above them, lending protocols like Aave and exchanges like Uniswap. If the stablecoin layer breaks, everything above it crumbles.

Scene Type: Slide
Component: Bullet
```json
{
  "props": {
    "title": "The DeFi Stack",
    "subtitle": "Stablecoins are the foundation.",
    "bullets": [
      {"text": "Application Layer: Yield aggregators, dashboards", "tone": "muted"},
      {"text": "Protocol Layer: Aave, Uniswap, Curve", "tone": "default"},
      {"text": "Base Layer: Stablecoins (DAI, USDC)", "tone": "accent", "icon": "★"},
      {"text": "Network Layer: Ethereum, L2s", "tone": "muted"}
    ]
  }
}
```

## Segment 07
Voiceover:
We will build a system inspired by MakerDAO. It is not just one contract; it is a system of interacting components. The user deposits collateral to mint our stablecoin. Liquidators watch the system to remove bad debt. Oracles provide truth about asset prices.

Scene Type: Slide
Component: DemoOverlay
Asset Ref: assets/ai/system-architecture-diagram-ai-styled.mp4
```json
{
  "props": {
    "title": "System Architecture"
  }
}
```

## Segment 08
Voiceover:
Let us examine the codebase you will work on. In the source folder, `DSCEngine.sol` is the heart of the system. It handles all logic: depositing collateral, minting DSC, and checking health factors.

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
`DecentralizedStableCoin.sol` is the token itself — an ERC20 owned by the engine. We also have `OracleManager.sol` for price feed resilience and `StabilityPool.sol` to absorb bad debt during market crashes.

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
But code is nothing without verification. In the `test` folder, you see standard unit tests, but also `fuzz` and `invariant` suites. We will teach you how to write properties like "The protocol must never hold less collateral than the total debt supply."

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
