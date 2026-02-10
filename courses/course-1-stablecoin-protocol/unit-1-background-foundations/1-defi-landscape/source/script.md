# Lesson Script (EN)

## Segment 01
Voiceover:
Welcome to the HackQuest Stablecoin Protocol course. This is the most advanced DeFi engineering course in our curriculum. In this course, you will build a complete stablecoin system from scratch. Not a toy example, but a production-grade implementation with real-world patterns.

Component: BulletCard
```json
{
  "props": {
    "title": "HackQuest Stablecoin Protocol",
    "subtitle": "Advanced DeFi engineering. Production-grade patterns.",
    "bullets": [
      {"text": "Build a complete stablecoin system from scratch", "tone": "accent", "icon": "1"},
      {"text": "Fuzzing + invariant testing as first-class tools", "tone": "default", "icon": "2"},
      {"text": "Liquidation mechanics and risk parameters", "tone": "default", "icon": "3"},
      {"text": "Oracles and trust boundaries in real systems", "tone": "muted", "icon": "4"}
    ],
    "note": "Assume blockchain fundamentals. Keep statements precise."
  }
}
```

## Segment 02
Voiceover:
You will master advanced testing techniques including fuzzing and invariant testing. These skills separate average Solidity developers from truly advanced ones. By the end, you will understand system mechanics at a deep level: collateralization ratios, liquidation engines, risk parameters, and oracle integrations.

Component: StepsCard
```json
{
  "props": {
    "title": "Skills You Will Master",
    "subtitle": "Advanced testing discipline plus deep system mechanics.",
    "steps": [
      {"title": "Fuzzing", "detail": "Foundry fuzz tests and failure minimization"},
      {"title": "Invariant Testing", "detail": "Protocol-level properties that must always hold"},
      {"title": "Risk Parameters", "detail": "Collateral ratios, thresholds, and circuit breakers"},
      {"title": "Oracles", "detail": "Price feeds, staleness handling, and integration edges"}
    ],
    "activeStep": 2
  }
}
```

## Segment 03
Voiceover:
This course assumes you are comfortable with blockchain fundamentals and basic Solidity. If you need a refresher, check the pre-lesson reading in the HackQuest platform.

Component: CalloutScene
```json
{
  "props": {
    "title": "Prerequisites",
    "body": "Assume blockchain fundamentals and basic Solidity. If anything feels rusty, use the HackQuest pre-lesson reading before proceeding."
  }
}
```

## Segment 04
Voiceover:
Let us start with the big picture. DeFi, or Decentralized Finance, is one of the most important applications of smart contract technology. A great place to get a snapshot of the ecosystem is DeFi Llama. It tracks Total Value Locked across all major protocols.

Scene Type: Video
Asset Ref: assets/defillama-demo-fake.mp4

## Segment 05
Voiceover:
As you can see, billions of dollars are deployed in DeFi protocols. This is not experimental toy money. Real value is at stake. The top protocols by TVL tell us what the market finds valuable.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/defillama-rankings-fake.mp4
```json
{
  "props": {
    "title": "Protocol Rankings"
  }
}
```

## Segment 06
Voiceover:
Lido is the largest protocol. It offers liquid staking: you stake ETH, receive stETH, and maintain liquidity while earning staking rewards. MakerDAO is second. It is a CDP protocol that creates DAI, a decentralized stablecoin. This is exactly the type of system we will build.

Component: TableCard
```json
{
  "props": {
    "title": "Top Protocols (By TVL)",
    "columns": ["Protocol", "Category", "What It Does"],
    "rows": [
      ["Lido", "Liquid Staking", "Stake ETH and receive stETH to stay liquid"],
      ["MakerDAO", "CDP Stablecoin", "Mint DAI against collateral with liquidation rules"]
    ]
  }
}
```

## Segment 07
Voiceover:
Aave is a lending and borrowing protocol. Think of it as an on-chain credit market where supply and demand determine interest rates. Curve specializes in stablecoin swaps. It is optimized for like-priced assets, offering low slippage when trading USDC for DAI.

Component: TableCard
```json
{
  "props": {
    "title": "More Essential Protocols",
    "columns": ["Protocol", "Category", "Why It Matters"],
    "rows": [
      ["Aave", "Lending", "Interest rates emerge from supply and demand"],
      ["Curve", "Stable Swaps", "Low slippage for like-priced assets (USDC, DAI, USDT)"],
      ["Uniswap", "DEX", "General-purpose AMM for token swaps"]
    ]
  }
}
```

## Segment 08
Voiceover:
Uniswap is the general-purpose decentralized exchange. It allows swapping any ERC20 tokens using an automated market maker model. If you understand these five protocols, you can navigate the rest of DeFi with confidence. They form the foundation of the ecosystem.

Component: StepsCard
```json
{
  "props": {
    "title": "The Foundation Five",
    "subtitle": "If you understand these, the rest of DeFi is navigable.",
    "steps": [
      {"title": "Lido", "detail": "Liquid staking (ETH → stETH)"},
      {"title": "MakerDAO", "detail": "CDP stablecoin (DAI)"},
      {"title": "Aave", "detail": "Lending and borrowing markets"},
      {"title": "Curve", "detail": "Stablecoin-focused swaps"},
      {"title": "Uniswap", "detail": "General-purpose AMM DEX"}
    ],
    "activeStep": 5
  }
}
```

## Segment 09
Voiceover:
Now let us see DeFi in action. I will demonstrate Aave, which is excellent for understanding lending mechanics. Here is the Aave interface. You can see supply markets on the left and borrow markets on the right. Each shows the current APY.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/aave-demo-fake.mp4
```json
{
  "props": {
    "title": "Aave Interface"
  }
}
```

## Segment 10
Voiceover:
Notice this small IPFS icon in the Brave browser. Aave is hosted on IPFS, meaning no single server controls access. This is decentralization in practice. If I scroll down, you see various assets you can supply. Let us look at USDC, a dollar-pegged stablecoin. The supply APY fluctuates based on borrowing demand.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/aave-markets-fake.mp4
```json
{
  "props": {
    "title": "Decentralized Frontend + Markets"
  }
}
```

## Segment 11
Voiceover:
Conceptually, supplying USDC on Aave resembles a money market account in traditional finance. You deposit funds and earn interest. The key difference: this is permissionless. No KYC required. No minimum balance. No geographic restrictions. Code enforces the rules, not gatekeepers.

Component: CompareCard
```json
{
  "props": {
    "title": "Permissionless Banking",
    "left": {
      "label": "Traditional Finance",
      "bullets": ["KYC required", "Minimum balances", "Geographic restrictions", "Human gatekeepers"]
    },
    "right": {
      "label": "DeFi",
      "bullets": ["No KYC by default", "No minimum balance", "Global access", "Code-enforced rules"]
    },
    "verdict": "The permission model is part of the product."
  }
}
```

## Segment 12
Voiceover:
Where does the interest come from? Borrowers pay interest to access liquidity without selling their assets. That interest flows to suppliers. This creates an efficient market for capital. Rates adjust automatically based on supply and demand. No central bank sets the rates.

Component: StepsCard
```json
{
  "props": {
    "title": "Where Yield Comes From",
    "subtitle": "Interest is a price for liquidity, not a marketing promise.",
    "steps": [
      {"title": "Borrowers", "detail": "Pay interest to borrow liquidity without selling assets"},
      {"title": "Suppliers", "detail": "Earn the borrower-paid interest as yield"},
      {"title": "Market Rates", "detail": "Rates adjust algorithmically with supply and demand"},
      {"title": "No Central Setter", "detail": "The rate curve is code plus market pressure"}
    ],
    "activeStep": 3
  }
}
```

## Segment 13
Voiceover:
Now let us look at Uniswap, another essential protocol. It enables token swapping through liquidity pools rather than order books. Here I could swap ETH for any supported token. The price is determined algorithmically based on the ratio in the liquidity pool.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/uniswap-swap-fake.mp4
```json
{
  "props": {
    "title": "Uniswap Swap"
  }
}
```

## Segment 14
Voiceover:
For course labs, we use testnets like Sepolia. This lets you experiment without risking real funds. Not all markets are mirrored on testnets, but core functionality is. A word of caution: avoid heavy DeFi activity on Ethereum mainnet unless necessary. Gas fees can make small transactions prohibitively expensive.

Component: BulletCard
```json
{
  "props": {
    "title": "Testing vs Mainnet",
    "subtitle": "Use the right environment for the job.",
    "bullets": [
      {"text": "Labs run on testnets like Sepolia to avoid real risk", "tone": "accent", "icon": "T"},
      {"text": "Testnets are incomplete, but core mechanics are present", "tone": "default", "icon": "C"},
      {"text": "Avoid heavy mainnet activity unless necessary", "tone": "default", "icon": "M"},
      {"text": "Gas fees can make small transactions irrational", "tone": "muted", "icon": "$"}
    ],
    "note": "Treat cost and safety as constraints, not afterthoughts."
  }
}
```

## Segment 15
Voiceover:
Instead, use Layer 2 networks like Arbitrum or Optimism. They offer the same security guarantees at a fraction of the cost. Another important topic is MEV, or Maximal Extractable Value. Validators can reorder transactions within a block to extract profit. Flashbots and similar protocols are working to make MEV extraction fairer.

Component: BulletCard
```json
{
  "props": {
    "title": "Layer 2 and MEV",
    "subtitle": "Cost scaling and transaction ordering are part of the environment.",
    "bullets": [
      {"text": "Layer 2s (Arbitrum, Optimism) cut fees 10-100x in practice", "tone": "accent", "icon": "L2"},
      {"text": "MEV is profit from transaction ordering within a block", "tone": "default", "icon": "MEV"},
      {"text": "Validators and searchers can capture MEV by reordering", "tone": "default", "icon": "O"},
      {"text": "Flashbots is one approach to make extraction more transparent", "tone": "muted", "icon": "F"}
    ]
  }
}
```

## Segment 16
Voiceover:
Now, the core project of this course: we will build a decentralized stablecoin system. This is the most advanced build in the entire curriculum. Our project is inspired by MakerDAO and DAI, the most successful decentralized stablecoin. We will implement core mechanics from first principles.

Component: BulletCard
```json
{
  "props": {
    "title": "Course Project",
    "subtitle": "Build a decentralized stablecoin system inspired by MakerDAO and DAI.",
    "bullets": [
      {"text": "Collateral deposits and valuation", "tone": "accent", "icon": "1"},
      {"text": "Stablecoin minting and burning", "tone": "default", "icon": "2"},
      {"text": "Redemptions and accounting", "tone": "default", "icon": "3"},
      {"text": "Liquidation engine and risk parameters", "tone": "muted", "icon": "4"}
    ]
  }
}
```

## Segment 17
Voiceover:
This includes collateral deposits, stablecoin minting, redemption mechanisms, and liquidation engines. You will understand every component deeply. Let me give you a quick tour of the codebase. The repository is organized as a standard Foundry project.

Component: StepsCard
```json
{
  "props": {
    "title": "Project Scope",
    "subtitle": "A standard Foundry layout, with mechanics you can reason about.",
    "steps": [
      {"title": "Deposits", "detail": "Collateral enters the system with explicit accounting"},
      {"title": "Mint / Burn", "detail": "Stablecoin issuance is constrained by risk parameters"},
      {"title": "Redeem", "detail": "Users unwind positions and recover collateral"},
      {"title": "Liquidate", "detail": "Enforce solvency when positions cross thresholds"}
    ],
    "activeStep": 4
  }
}
```

## Segment 18
Voiceover:
In the src directory, you will find two main contracts. DecentralizedStableCoin.sol is a minimal ERC20 with burn and mint functionality. The heavy logic lives in DSCEngine.sol. It handles collateral management, stablecoin issuance, and liquidations.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/dsc-contract-fake.mp4
```json
{
  "props": {
    "title": "Codebase Tour"
  }
}
```

## Segment 19
Voiceover:
The test directory contains comprehensive test suites. We have unit tests, fuzz tests, and invariant tests. The invariant tests are particularly important. Scripts handle deployment across different networks. We use Chainlink price feeds to value collateral accurately.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/test-folder-fake.mp4
```json
{
  "props": {
    "title": "Testing and Deployment"
  }
}
```

## Segment 20
Voiceover:
Everything you need is in the repository. Questions should go to the course discussions. Let us now dive deeper into stablecoins specifically. Stablecoins are widely misunderstood. Many explanations conflate mechanism with purpose. Let us clarify the fundamentals.

Component: CalloutScene
```json
{
  "props": {
    "title": "Stablecoins: Fundamentals",
    "body": "Mechanisms vary, but the purpose is stability. Next we separate purpose from implementation details and make the definitions precise."
  }
}
```

## Segment 21
Voiceover:
At the highest level, a stablecoin is a crypto asset with relatively stable purchasing power. That is the essential property. You will hear that stablecoins are pegged to dollars or other assets. This describes implementation, not purpose. The purpose is stability.

Component: DefinitionCard
```json
{
  "props": {
    "term": "Stablecoin",
    "definition": "A crypto asset with relatively stable purchasing power.",
    "notes": [
      "Pegging is an implementation detail, not the purpose.",
      "The goal is low variance in purchasing power.",
      "Mechanism and purpose should not be conflated."
    ]
  }
}
```

## Segment 22
Voiceover:
Volatile assets make poor money. If your unit of account swings ten percent daily, pricing and planning become impossible. Stablecoins solve this by maintaining low variance in purchasing power. The mechanisms vary, but the goal is consistent: reliable money for the decentralized economy.

Component: CompareCard
```json
{
  "props": {
    "title": "Why Stability Matters",
    "left": {
      "label": "Volatile Asset",
      "bullets": ["High variance day to day", "Poor unit of account", "Planning becomes fragile"]
    },
    "right": {
      "label": "Stablecoin",
      "bullets": ["Low variance in purchasing power", "Better pricing and budgeting", "Reliable settlement asset for DeFi"]
    },
    "verdict": "Different mechanisms. Same purpose: reliable money."
  }
}
```

## Segment 23
Voiceover:
Now that we have mapped the DeFi landscape and understand what stablecoins are, we are ready to examine how they actually work. The design space is rich and full of tradeoffs. In the next lesson, we will explore the three main approaches and see why each one exists.

Component: CalloutScene
```json
{
  "props": {
    "title": "Next: Design Tradeoffs",
    "body": "We have the ecosystem map and a clean definition. Next lesson: the main stablecoin design approaches and why each one exists."
  }
}
```
