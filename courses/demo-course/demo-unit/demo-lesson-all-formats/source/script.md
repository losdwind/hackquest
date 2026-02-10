# Demo Lesson Script (EN)

## Segment 01
Voiceover:
This demo lesson is a production-style walkthrough. The topic is liquidation guardrails. The goal is to test layout, typography, and timing under dense, realistic content.

Component: BulletCard
```json
{
  "props": {
    "title": "Liquidation Guardrails",
    "subtitle": "A full-pipeline demo for the Remotion lesson system.",
    "bullets": [
      {"text": "Deterministic layout with structured inputs", "tone": "accent", "icon": "1"},
      {"text": "Charts + tables are JSON, not screenshots", "tone": "default", "icon": "2"},
      {"text": "Full-screen recordings with overlays", "tone": "default", "icon": "3"},
      {"text": "Engineering tone, advanced assumptions", "tone": "muted", "icon": "4"}
    ],
    "note": "Content is intentionally dense to surface spacing and overflow issues."
  }
}
```

## Segment 02
Voiceover:
Constraint check. Assume blockchain basics. Prefer precise statements. If risk or monitoring is unclear, the lesson is not shippable.

Component: CalloutScene
```json
{
  "props": {
    "title": "Constraint Check",
    "body": "Advanced audience. Engineering tone. No marketing CTA. Risk and monitoring are part of the system."
  }
}
```

## Segment 03
Voiceover:
Here is the workflow. Content ships structured inputs. Design ships tokens and components. Rendering is deterministic, so QA is repeatable.

Component: StepsCard
```json
{
  "props": {
    "title": "Workflow",
    "subtitle": "Inputs in. Predictable output out.",
    "steps": [
      {"title": "Script + Data", "detail": "voiceover, chart JSON, asset refs"},
      {"title": "Components", "detail": "cards, overlays, safe areas"},
      {"title": "Timing", "detail": "segment timings, captions, transitions"},
      {"title": "Render + QA", "detail": "deterministic output and checklist"}
    ],
    "activeStep": 2
  }
}
```

## Segment 04
Voiceover:
Start with ecosystem context. A chart gives scale without paragraphs, and it keeps labels and motion standardized.

Scene Type: Chart
Scene Content: TVL by sector (mock data)
```json
{
  "title": "TVL By Sector (Mock Data)",
  "series": [
    {"label": "Lending", "value": 48},
    {"label": "DEX", "value": 31},
    {"label": "Liquid Staking", "value": 27},
    {"label": "Derivatives", "value": 16},
    {"label": "Stablecoin", "value": 22}
  ],
  "maxValue": 60
}
```

## Segment 05
Voiceover:
Pin down the trust boundary. This diagram tells us what is inside the protocol, and what is external risk.

Component: SplitImageCard
Asset Ref: assets/diagram-system-boundary.png
```json
{
  "props": {
    "title": "Trust Boundary",
    "subtitle": "Boxes are trust zones. Arrows are data flows.",
    "bullets": [
      {"text": "Execution layer owns liquidation rules", "tone": "accent"},
      {"text": "Oracles and bridges are external dependencies", "tone": "default"},
      {"text": "Monitoring belongs in the boundary", "tone": "muted"}
    ],
    "note": "If a dependency is outside the boundary, treat it as adversarial by default."
  }
}
```

## Segment 06
Voiceover:
Define the metric that drives liquidation. Health factor is not a UI number. It is a decision boundary.

Component: DefinitionCard
```json
{
  "props": {
    "term": "Health Factor",
    "definition": "A unit-normalized ratio of collateral value to debt value.",
    "notes": [
      "Units and rounding rules must be explicit",
      "Oracles decide the valuation surface",
      "This number drives liquidation thresholds"
    ]
  }
}
```

## Segment 07
Voiceover:
Liquidation is parameterized. Tables work well here because they keep units visible and values plausible.

Component: TableCard
```json
{
  "props": {
    "title": "Liquidation Parameters",
    "columns": ["Parameter", "Meaning", "Unit", "Example"],
    "rows": [
      ["LIQ_THRESHOLD", "Minimum safe health factor", "1e18", "1.05e18"],
      ["LIQ_BONUS", "Liquidator incentive", "bps", "500"],
      ["ORACLE_STALE", "Max age of price data", "sec", "3600"],
      ["CAP_PER_BLOCK", "Circuit breaker cap", "tokens", "10,000"]
    ]
  }
}
```

## Segment 08
Voiceover:
Here is the decision logic. Highlight the lines that drive risk, not the scaffolding around them.

Component: CodeExplainCard
```json
{
  "props": {
    "title": "Health Factor Check",
    "language": "solidity",
    "code": "function checkAndMaybeLiquidate(address user) external {\n  uint256 collateralValue = getCollateralValue(user);\n  uint256 debtValue = getDebtValue(user);\n  require(debtValue > 0, \"NO_DEBT\");\n\n  uint256 hf = (collateralValue * 1e18) / debtValue;\n  emit HealthFactorChecked(user, hf);\n\n  if (hf < LIQ_THRESHOLD) {\n    liquidate(user);\n  }\n}",
    "highlights": [{"from": 7, "to": 10}],
    "explain": [
      "Normalize units before division.",
      "Emit events for monitoring and audits.",
      "Highlight the decision block, not every line."
    ]
  }
}
```

## Segment 09
Voiceover:
Risk is not abstract. Oracles can fail, go stale, or be manipulated. The contract needs a defined fallback, not hope.

Component: WarningCard
```json
{
  "props": {
    "title": "Oracle Assumptions",
    "message": "Price data can be stale, wrong, or adversarial.",
    "bullets": [
      "Reject stale data explicitly",
      "Cap damage with circuit breakers",
      "Alert on anomalies and missed updates"
    ]
  }
}
```

## Segment 10
Voiceover:
Not all price signals are equal. Spot is fast but manipulable. TWAP is slower but more robust. The window is the tradeoff.

Component: CompareCard
```json
{
  "props": {
    "title": "Spot Price vs TWAP Oracle",
    "left": {"label": "Spot", "bullets": ["Low latency", "Easier integration", "More manipulable"]},
    "right": {"label": "TWAP", "bullets": ["Resists manipulation", "Adds latency", "Needs window selection"]},
    "verdict": "Use TWAP for liquidation thresholds. Keep spot for UI hints and debugging."
  }
}
```

## Segment 11
Voiceover:
Screen recordings should be full-screen. Overlays must stay readable. Callouts should point to exactly one decision.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/fake-ide-walkthrough.mp4
```json
{
  "props": {
    "title": "Debugging the Decision Block"
  }
}
```

## Segment 12
Voiceover:
If the lesson is correct, you can verify it. We care about event logs, state transitions, and that monitoring can reconstruct what happened.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/fake-explorer-callout.mp4
```json
{
  "props": {
    "title": "Verifying Event Logs"
  }
}
```

## Segment 13
Voiceover:
Make monitoring explicit. Without signals, you are shipping a blind system.

Component: BulletCard
```json
{
  "props": {
    "title": "Monitoring Signals",
    "bullets": [
      {"text": "Oracle freshness and deviation", "tone": "accent", "icon": "A"},
      {"text": "Health factor distribution by market", "tone": "default", "icon": "B"},
      {"text": "Liquidation rate and bad-debt events", "tone": "default", "icon": "C"},
      {"text": "Circuit breaker activations", "tone": "muted", "icon": "D"}
    ],
    "note": "If you cannot measure it, you cannot operate it."
  }
}
```

## Segment 14
Voiceover:
Some invariants must always hold. Call them out explicitly. This is where QA can become systematic.

Component: CalloutScene
```json
{
  "props": {
    "title": "Invariants",
    "body": "No negative balances. No stale oracle usage. Every liquidation emits traceable events. Circuit breakers are reachable and testable."
  }
}
```

## Segment 15
Voiceover:
Tables also work for operational SLOs. The values are examples, but the shape of the agreement matters.

Component: TableCard
```json
{
  "props": {
    "title": "Monitoring SLOs (Examples)",
    "columns": ["Signal", "Threshold", "Window", "Action"],
    "rows": [
      ["Oracle stale", "> ORACLE_STALE", "1 min", "pause risky market"],
      ["HF collapse", "p5 hf < 1.02", "5 min", "raise alerts + cap per block"],
      ["Liquidation burst", "> 3x baseline", "10 min", "check oracle + MEV"],
      ["Bad debt", "> 0", "instant", "incident process"]
    ]
  }
}
```

## Segment 16
Voiceover:
This is a second code card. It shows a guardrail that should be boring, explicit, and tested.

Component: CodeExplainCard
```json
{
  "props": {
    "title": "Oracle Staleness Guard",
    "language": "solidity",
    "code": "function requireFresh(uint256 updatedAt) internal view {\n  uint256 age = block.timestamp - updatedAt;\n  if (age > ORACLE_STALE) {\n    revert STALE_ORACLE(age);\n  }\n}",
    "highlights": [{"from": 2, "to": 5}],
    "explain": [
      "Make staleness a hard failure.",
      "Return age in the error for debugging."
    ]
  }
}
```

## Segment 17
Voiceover:
Bridges are not free. They change finality, introduce delay, and add their own failure modes.

Component: WarningCard
```json
{
  "props": {
    "title": "Bridge Assumptions",
    "message": "Bridges introduce delay and different finality guarantees.",
    "bullets": [
      "Define confirmation depth explicitly",
      "Cap max transfer value during incidents",
      "Treat monitoring as part of security"
    ]
  }
}
```

## Segment 18
Voiceover:
When something breaks, you need a runbook. Steps keep the procedure explicit and reduce decision debt.

Component: StepsCard
```json
{
  "props": {
    "title": "Incident Runbook",
    "subtitle": "Operational steps are part of protocol security.",
    "steps": [
      {"title": "Detect", "detail": "oracle stale, hf spikes, liquidation bursts"},
      {"title": "Contain", "detail": "cap per block, pause risky markets"},
      {"title": "Recover", "detail": "restore feeds, replay checks, reconcile"},
      {"title": "Postmortem", "detail": "root cause, new monitors, new tests"}
    ],
    "activeStep": 2
  }
}
```

## Segment 19
Voiceover:
Tradeoffs are unavoidable. Use comparisons to make constraints explicit, not to win an argument.

Component: CompareCard
```json
{
  "props": {
    "title": "Mainnet vs Layer 2 (For Liquidations)",
    "left": {"label": "Mainnet", "bullets": ["Highest security", "Higher fees", "Simpler finality"]},
    "right": {"label": "Layer 2", "bullets": ["Cheaper execution", "Bridge UX", "Derived finality"]},
    "verdict": "Do labs on L2. Move critical risk paths to mainnet only when needed."
  }
}
```

## Segment 20
Voiceover:
Spacing and alignment are not aesthetics. They are legibility constraints. QA should test them like code.

Component: BulletCard
```json
{
  "props": {
    "title": "Visual QA",
    "bullets": [
      {"text": "Safe areas: no collisions with overlays", "tone": "accent", "icon": "1"},
      {"text": "Consistent left alignment across scenes", "tone": "default", "icon": "2"},
      {"text": "Readable sizes at 1080p (no tiny text)", "tone": "default", "icon": "3"},
      {"text": "No clipped content or overflow", "tone": "muted", "icon": "4"}
    ],
    "note": "Determinism makes regression testing possible."
  }
}
```

## Segment 21
Voiceover:
Content production should be incremental. Only changed segments should regenerate audio, and captions should split into short sentences.

Component: StepsCard
```json
{
  "props": {
    "title": "Production Loop",
    "subtitle": "Make iteration cheap and predictable.",
    "steps": [
      {"title": "Validate", "detail": "schema, missing assets, basic checks"},
      {"title": "Segments", "detail": "voiceover-en-segments.json"},
      {"title": "TTS", "detail": "only changed segments"},
      {"title": "Captions", "detail": "lines.json with short sentences"}
    ],
    "activeStep": 3
  }
}
```

## Segment 22
Voiceover:
Charts can also communicate operational load. This is mock data, but it shows how we keep visualizations consistent.

Scene Type: Chart
Scene Content: Incidents by category (mock data)
```json
{
  "title": "Incidents By Category (Mock Data)",
  "series": [
    {"label": "Oracle", "value": 12},
    {"label": "Bridge", "value": 7},
    {"label": "Liquidity", "value": 9},
    {"label": "Accounting", "value": 5},
    {"label": "MEV", "value": 4}
  ],
  "maxValue": 14
}
```

## Segment 23
Voiceover:
Use diagrams to close the loop. After code and parameters, show where the boundary sits and what depends on what.

Component: SplitImageCard
Asset Ref: assets/diagram-system-boundary.png
```json
{
  "props": {
    "title": "Boundary Summary",
    "subtitle": "One picture to anchor assumptions before reviews.",
    "bullets": [
      {"text": "User side: signing and UI constraints", "tone": "muted"},
      {"text": "Execution: liquidation rules and thresholds", "tone": "accent"},
      {"text": "Dependencies: oracle + bridge are external risk", "tone": "default"}
    ],
    "note": "If it is external, design for failure and observability."
  }
}
```

## Segment 24
Voiceover:
Avoid vague claims. If you cannot test it or observe it, do not ship it as a lesson requirement.

Component: CalloutScene
```json
{
  "props": {
    "title": "Anti-Patterns",
    "body": "No undefined fallbacks. No silent failures. No magic constants without units. No UI-only risk controls."
  }
}
```

## Segment 25
Voiceover:
The ship checklist is where review time is won or lost. Keep it short, concrete, and owned by engineering.

Component: BulletCard
```json
{
  "props": {
    "title": "Ship Checklist",
    "bullets": [
      {"text": "Explicit units and rounding rules", "tone": "accent", "icon": "1"},
      {"text": "Stale data rejection + fallback behavior", "tone": "default", "icon": "2"},
      {"text": "Circuit breakers with clear thresholds", "tone": "default", "icon": "3"},
      {"text": "Monitoring: events, dashboards, alerts", "tone": "muted", "icon": "4"}
    ],
    "note": "If the system is not explicit, the lesson cannot be reliable."
  }
}
```

## Segment 26
Voiceover:
One last pass: do we have air, alignment, and consistent typography? If not, it is a design bug, not a content bug.

Component: StepsCard
```json
{
  "props": {
    "title": "Final QA Pass",
    "subtitle": "Treat layout regressions like test failures.",
    "steps": [
      {"title": "Alignment", "detail": "left edges, safe areas, consistent gutters"},
      {"title": "Typography", "detail": "no tiny text, consistent hierarchy"},
      {"title": "Overflow", "detail": "wrapping, truncation, max lines"},
      {"title": "Motion", "detail": "transition duration and readability"}
    ],
    "activeStep": 1
  }
}
```

## Segment 27
Voiceover:
Recap. A good lesson is structured inputs, consistent components, and a risk model that survives scrutiny.

PostGapMs: 1000
Component: BulletCard
```json
{
  "props": {
    "title": "Recap",
    "bullets": [
      {"text": "What: chart, diagram, code, table, video, runbook", "tone": "accent"},
      {"text": "Why: deterministic renders and repeatable QA", "tone": "default"},
      {"text": "Constraint: precise, testable claims", "tone": "muted"}
    ],
    "note": "If the system is not explicit, the lesson cannot be reliable."
  }
}
```

## Segment 28
Voiceover:
Next, we will convert this demo into an optimization sprint. We will tighten typography, safe areas, and component states, and we will standardize transitions.

Component: StepsCard
```json
{
  "props": {
    "title": "What's Next",
    "subtitle": "Turn the demo into a concrete backlog for design and engineering.",
    "steps": [
      {"title": "Typography", "detail": "sizes, line heights, CN/EN mixing"},
      {"title": "Layout Rules", "detail": "safe areas, alignment, air and rhythm"},
      {"title": "Component States", "detail": "overflow, empty, variants"},
      {"title": "Motion Standards", "detail": "transition types and durations"}
    ],
    "activeStep": 1
  }
}
```
