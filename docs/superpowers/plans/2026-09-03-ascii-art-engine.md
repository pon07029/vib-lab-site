# Canvas2D ASCII Art Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the complete configurable Canvas2D ASCII-art pipeline and apply the supplied dither preset to the Overview research viewport.

**Architecture:** Keep deterministic configuration, color, coverage, and animation functions in `lib/ascii-art.ts`, alongside the drawing pipeline and render-mode primitives. Keep image loading, observers, animation frames, canvas allocation, and matrix state in `components/ascii-dither-background.tsx`.

**Tech Stack:** TypeScript, React, Canvas2D, Vitest, Testing Library

---

### Task 1: Define and verify the configuration contract

**Files:**
- Create: `tests/ascii-art.test.ts`
- Create: `lib/ascii-art.ts`

- [ ] Write tests asserting that `ASCII_RENDER_MODES` contains all 25 requested modes and that `ASCII_DITHER_PRESET` preserves every supplied nested value.
- [ ] Run `npm test -- tests/ascii-art.test.ts` and confirm failure because `lib/ascii-art.ts` does not exist.
- [ ] Define `AsciiArtConfig`, nested effect/light/mask types, `ASCII_RENDER_MODES`, `DEFAULT_ASCII_CONFIG`, and `ASCII_DITHER_PRESET`.
- [ ] Run the focused test and confirm it passes.

### Task 2: Implement deterministic processing helpers

**Files:**
- Modify: `tests/ascii-art.test.ts`
- Modify: `lib/ascii-art.ts`

- [ ] Add failing tests for `applyToneCurve`, `adjustColor`, `cellIsCovered`, and all five `animationValue` styles.
- [ ] Run the focused test and confirm the expected missing-export failures.
- [ ] Implement clamping, piecewise-linear tone curves, brightness then contrast then saturation then grayscale processing, deterministic coordinate hashing for coverage, and wave/pulse/shimmer/ripple/flicker animation math.
- [ ] Run the focused test and confirm it passes.

### Task 3: Implement every render mode and pipeline stage

**Files:**
- Modify: `tests/ascii-art.test.ts`
- Modify: `lib/ascii-art.ts`

- [ ] Add a recording Canvas2D mock and a failing test that calls `drawCellPrimitive` once for every registered mode and confirms each mode emits a drawing operation.
- [ ] Implement characters, dither, mosaic, pixel, dots, cross, diamond, voxel, lego, mixed, lines, diagonal, braille, disco, hexdump, matrix, rings, hearts, stars, hexagons, triangles, bubbles, hatch, contour, and halfblocks.
- [ ] Add `renderAsciiFrame` with cover sampling, background modes, edge emphasis, coverage/density/invert, ordered color transforms, tint blend, off/gaussian/motion/zoom/tilt/lens/progressive blur, all nine post effects, lights, and mask reveal composition.
- [ ] Run the focused test and confirm it passes.

### Task 4: Connect the engine to the Overview background

**Files:**
- Modify: `components/ascii-dither-background.tsx`
- Modify: `tests/research-pulse.test.tsx`

- [ ] Add a failing integration assertion for the full preset marker and supported-mode count.
- [ ] Replace the hardcoded drawing loop with image/work-canvas allocation and calls to `renderAsciiFrame(ASCII_DITHER_PRESET, ...)`, preserving resize, visibility, and intersection handling.
- [ ] Load the mask image only when enabled, maintain matrix heads across frames, and retain the supplied cat source.
- [ ] Run `npm test -- tests/ascii-art.test.ts tests/research-pulse.test.tsx` and confirm both files pass.

### Task 5: Validate the complete site

**Files:**
- Verify: `lib/ascii-art.ts`
- Verify: `components/ascii-dither-background.tsx`

- [ ] Run `npm test` and require zero failures.
- [ ] Run `$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'; .\node_modules\.bin\vinext.cmd build` and require exit code 0.
- [ ] Request `http://localhost:3000/overview` and require HTTP 200.
- [ ] Inspect `git diff --check` and commit only the ASCII-engine files without including unrelated working-tree changes.
