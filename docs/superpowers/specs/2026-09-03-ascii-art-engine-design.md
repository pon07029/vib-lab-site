# Canvas2D ASCII art engine design

## Goal

Replace the approximate dither background with a configurable Canvas2D engine that implements the complete render pipeline supplied by the user, while applying the supplied JSON preset to the third Overview viewport and retaining the supplied cat image.

## Architecture

`lib/ascii-art.ts` owns configuration types, the preset, color transforms, animation math, cell selection, all 25 cell render modes, background composition, post effects, lights, blur, and mask composition. Its deterministic helpers remain independent of React so the configuration contract and calculations can be tested directly.

`components/ascii-dither-background.tsx` owns browser resources: source and mask images, sampling and work canvases, resize and intersection observers, animation frames, matrix state, and final canvas presentation. It calls the renderer for every frame and performs no visual-policy calculations itself.

## Pipeline

1. Render the source image with cover cropping and the configured background mode, blur, and opacity.
2. Downsample the source to one pixel per grid cell. Canvas filtering provides the cell-area average; optional Sobel-style neighbor comparison supplies edge emphasis.
3. Apply brightness, contrast, saturation, grayscale, tone curve, and invert before drawing cells. Coverage uses a stable position hash; density shifts the draw threshold.
4. Draw one primitive for the selected mode. Matrix maintains per-column rain heads and is animated independently.
5. Composite tint and configured blend mode, then the selected blur implementation.
6. Apply each enabled post effect in the declared order.
7. Add normalized lights.
8. Composite the reveal mask back to the plain photo, honoring inversion.

## Current preset

The third Overview viewport uses the user-provided values unchanged: dither mode, no background, six-pixel cells, full coverage, brightness -11, contrast 72, zero saturation, full grayscale, the supplied tone curve, 15% chromatic effect, pulse animation at 75% speed and 100% intensity, enabled lights with no points, and a disabled mask.

## Performance and fallback

Rendering is capped at 30 frames per second and device pixel ratio 1.25. Sampling is rebuilt only after an image or size change. Animation pauses off-screen and while the document is hidden. If the source image fails, the transparent/solid background and procedural modes still render; if a mask fails, the mask stage is skipped.

## Verification

Unit tests cover the complete mode registry, exact preset values, color-adjustment order, coverage determinism, and all animation styles. The existing Overview integration test confirms the configured canvas remains mounted. The project build verifies browser and TypeScript integration.
