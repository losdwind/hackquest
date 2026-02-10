# Storyboard Component Props Schema Convention

This repo uses `source/script.md` as the single source of truth for lesson visuals.

## Quick discovery (for instructors)

List all available `Component:` names and their props (derived from Zod schemas):

```bash
cd remotion
bun run lesson:components
```

Machine-readable output:

```bash
cd remotion
bun scripts/list-storyboard-components.mjs --format=json
```

## How a segment maps to a component

- In `source/script.md`, set:
  - `Component: <Name>`
  - A fenced `json` block with **exactly**:
    - `{"props": { ... }}`

`StoryboardRouter` will read the JSON, extract `json.props`, validate it with Zod, and render the component.

## Important: do not edit `.hq-public`

`remotion/.hq-public/...` is a synced preview directory. Always edit the source-of-truth under:

- `courses/<course>/<unit>/<lesson>/source/script.md`

## What gets injected automatically

Every storyboard component receives:

- `context`: `{ contentDurationFrames, blockDurationFrames, accentColor?, fps }`
- `hq`:
  - `assetRef`: resolved asset reference for this segment (or `null`)
  - `sceneType`: normalized scene type string (lowercased)
  - `sceneContent`: raw scene content (if provided)
  - `markdown`: raw markdown block (if provided)
  - `metaFile`: the lesson meta path used for resolution

Use `hq.assetRef` in components like `SplitImageCard` / `CalloutVideoFrame` so the script can keep `Asset Ref:` in one place.

## Failure mode

If a component is unknown, missing `{"props": ...}`, or the props do not match its Zod schema:

- `bun run lesson:validate -- --lesson-root <lesson>` fails (build-time)
- Remotion rendering throws (runtime)

Errors include:

- component name
- segment id
- schema validation message

This is intentional: it prevents silent blank frames.
