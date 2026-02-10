# Fake Video Content Guide

This document describes the content for each fake video placeholder.
These are screen recording simulations with text overlays showing what would be demonstrated.

## DeFi Llama Demonstrations

### defillama-demo-fake.mp4 (Segment 10)
Duration: ~8 seconds
Content:
- DeFi Llama homepage loading
- Total Value Locked (TVL) dashboard visible
- Chart showing TVL over time
- Text overlay: "[DeFi Llama Homepage - TVL Dashboard]"
- Show main navigation: Protocols, Chains, Airdrops

### defillama-protocols-fake.mp4 (Segment 11)
Duration: ~8 seconds
Content:
- Protocols list page
- Sorting by TVL
- Click into a protocol detail page
- Text overlay: "[Protocol Rankings & Details - TVL History]"
- Show metrics: TVL, 1h/24h/7d changes

---

## Aave Demonstrations

### aave-demo-fake.mp4 (Segment 26)
Duration: ~10 seconds
Content:
- Aave app loading (app.aave.com)
- Markets dashboard visible
- Supply and Borrow sections
- Text overlay: "[Aave Markets Dashboard - Supply/Borrow Interface]"
- Show APY rates for various assets

### aave-sepolia-fake.mp4 (Segment 27)
Duration: ~10 seconds
Content:
- MetaMask network switch to Sepolia
- Test token balances visible
- Supply transaction flow
- Text overlay: "[Sepolia Testnet - Wallet Connection & Supply Flow]"
- Show faucet links for test tokens

### aave-ipfs-fake.mp4 (Segment 28)
Duration: ~6 seconds
Content:
- Brave browser address bar
- IPFS icon highlighted
- Tooltip: "IPFS-hosted content"
- Text overlay: "[IPFS Decentralization - Brave Browser Indicator]"
- Show aave.com loaded via IPFS

### aave-markets-fake.mp4 (Segment 30)
Duration: ~8 seconds
Content:
- Scrolling through supply markets
- USDC, DAI, USDT stablecoins highlighted
- APY percentages visible
- Text overlay: "[Aave Supply Markets - Stablecoin APYs]"
- Show total supplied amounts

---

## Uniswap Demonstrations

### uniswap-swap-fake.mp4 (Segment 37)
Duration: ~10 seconds
Content:
- Uniswap swap interface
- Token selector dropdown (ETH -> AAVE)
- Price impact calculation
- Slippage settings (0.5%)
- Text overlay: "[Uniswap Swap - ETH to AAVE Token]"
- Confirm swap button visible

---

## Code Repository Demonstrations

### codebase-walkthrough-fake.mp4 (Segment 06)
Duration: ~10 seconds
Content:
- VS Code file explorer open
- Navigate src/ directory
- Highlight DecentralizedStableCoin.sol and DSCEngine.sol
- Text overlay: "[Repository Structure - Main Contracts]"
- Show test/ and script/ directories

### repo-structure-fake.mp4 (Segment 64)
Duration: ~8 seconds
Content:
- VS Code file tree expanded
- src/, test/, script/ directories
- lib/ for dependencies
- foundry.toml config
- Text overlay: "[Project Structure - Foundry Layout]"

### dsc-contract-fake.mp4 (Segment 65)
Duration: ~10 seconds
Content:
- DecentralizedStableCoin.sol open in editor
- ERC20 inheritance visible
- burnFrom() function highlighted
- mint() function with onlyOwner modifier
- Text overlay: "[DecentralizedStableCoin.sol - ERC20 with Burn/Mint]"

### dscengine-overview-fake.mp4 (Segment 66)
Duration: ~12 seconds
Content:
- DSCEngine.sol contract structure
- Key function signatures:
  - depositCollateral()
  - mintDsc()
  - redeemCollateral()
  - burnDsc()
  - liquidate()
- Text overlay: "[DSCEngine.sol - Core Protocol Logic]"
- NatSpec comments visible

### code-comments-fake.mp4 (Segment 68)
Duration: ~8 seconds
Content:
- Scroll through DSCEngine.sol
- Green NatSpec documentation blocks
- Inline comments explaining collateralization ratio
- Text overlay: "[Extensive Documentation - NatSpec & Comments]"

### test-folder-fake.mp4 (Segment 69)
Duration: ~8 seconds
Content:
- test/ directory structure
- Subfolders: unit/, fuzz/, invariant/, mocks/
- Highlight invariant/ folder
- Text overlay: "[Test Suite - Unit, Fuzz, Invariant Tests]"

### scripts-folder-fake.mp4 (Segment 71)
Duration: ~6 seconds
Content:
- script/ directory contents
- Deploy.s.sol
- HelperConfig.s.sol
- Text overlay: "[Deployment Scripts - Foundry Scripts]"

---

## Fake Video Format

All fake videos should be:
- Resolution: 1920x1080 (16:9)
- Format: MP4 (H.264)
- Frame rate: 30fps
- Content: Static frame with text overlay describing what would be shown

### Text Overlay Style
```
[Description of Content]
- Bullet point 1
- Bullet point 2
```

Background: Dark theme (#1a1a2e) with subtle gradient
Text: White (#ffffff), centered, sans-serif font
Accent: Course accent color for brackets

---

## Generation Notes

These videos are placeholders for actual screen recordings.
When creating real content:
1. Record actual screen capture of websites
2. Use real code editor with syntax highlighting
3. Show actual interactions (clicks, scrolls)
4. Include subtle animations (cursor movement)
5. Add zoom on important UI elements
