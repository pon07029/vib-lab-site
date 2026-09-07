import { describe, expect, it } from "vitest";

import {
  ASCII_DITHER_PRESET,
  ASCII_RENDER_MODES,
  adjustColor,
  animationValue,
  applyToneCurve,
  cellIsCovered,
  drawCellPrimitive,
  getEnabledPipelineStages,
} from "../lib/ascii-art";

describe("ASCII art configuration", () => {
  it("registers every requested render mode", () => {
    expect(ASCII_RENDER_MODES).toEqual([
      "characters", "dither", "mosaic", "pixel", "dots", "cross", "diamond",
      "voxel", "lego", "mixed", "lines", "diagonal", "braille", "disco",
      "hexdump", "matrix", "rings", "hearts", "stars", "hexagons", "triangles",
      "bubbles", "hatch", "contour", "halfblocks",
    ]);
  });

  it("preserves the supplied dither preset", () => {
    expect(ASCII_DITHER_PRESET).toMatchObject({
      renderMode: "dither",
      bgMode: "none",
      bgBlur: 12,
      bgOpacity: 90,
      cellSize: 6,
      coverage: 100,
      invert: false,
      styleBlend: "source-over",
      brightness: -11,
      contrast: 72,
      edgeEmphasis: 0,
      density: 41,
      tint: "#9d00ff",
      tintOpacity: 0,
      overlayBlend: "color",
      saturation: 0,
      grayscale: 100,
      blurType: "off",
      blurAmount: 35,
      animated: true,
      animStyle: "pulse",
      animSpeed: { enabled: true, intensity: 75 },
      animIntensity: { enabled: true, intensity: 100 },
      lights: { enabled: true, points: [] },
      mask: { enabled: false, invert: true },
    });
    expect(ASCII_DITHER_PRESET.toneCurve).toHaveLength(4);
    expect(ASCII_DITHER_PRESET.pfx.chromatic).toEqual({ enabled: true, intensity: 15 });
  });
});

describe("ASCII art processing", () => {
  it("interpolates the configured tone curve", () => {
    expect(applyToneCurve(0.5, [{ x: 0, y: 0 }, { x: 1, y: 1 }])).toBeCloseTo(0.5);
    expect(applyToneCurve(0.25, [{ x: 0, y: 0.5 }, { x: 0.5, y: 1 }, { x: 1, y: 1 }])).toBeCloseTo(0.75);
  });

  it("applies brightness, contrast, saturation, and grayscale in order", () => {
    const result = adjustColor({ r: 0.8, g: 0.2, b: 0.1, a: 1 }, {
      brightness: -10,
      contrast: 20,
      saturation: 0,
      grayscale: 100,
      invert: false,
      toneCurve: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
    });
    expect(result.r).toBeCloseTo(result.g);
    expect(result.g).toBeCloseTo(result.b);
    expect(result.r).toBeGreaterThan(0);
    expect(result.r).toBeLessThan(1);
  });

  it("uses deterministic coverage and supports every animation style", () => {
    expect(cellIsCovered(3, 7, 0)).toBe(false);
    expect(cellIsCovered(3, 7, 100)).toBe(true);
    expect(cellIsCovered(3, 7, 37)).toBe(cellIsCovered(3, 7, 37));
    for (const style of ["wave", "pulse", "shimmer", "ripple", "flicker"] as const) {
      expect(Number.isFinite(animationValue(style, 4, 8, 1.25, 0.8))).toBe(true);
    }
  });

  it("draws a primitive for every render mode", () => {
    for (const mode of ASCII_RENDER_MODES) {
      const operations: string[] = [];
      const context = new Proxy({}, {
        get: (_target, key) => {
          if (key === "measureText") return () => ({ width: 4 });
          if (key === "createLinearGradient" || key === "createRadialGradient") {
            return () => ({ addColorStop: () => operations.push("colorStop") });
          }
          return (..._args: unknown[]) => operations.push(String(key));
        },
        set: () => true,
      }) as CanvasRenderingContext2D;

      drawCellPrimitive(context, mode, {
        x: 12,
        y: 18,
        size: 6,
        luminance: 0.72,
        color: { r: 0.8, g: 0.7, b: 0.6, a: 1 },
        row: 3,
        column: 2,
        time: 1,
        chars: " .:-=+*#%@",
        matrixHead: 4,
      });
      expect(operations.length, mode).toBeGreaterThan(0);
    }
  });

  it("exposes all enabled pipeline stages", () => {
    expect(getEnabledPipelineStages({
      ...ASCII_DITHER_PRESET,
      tintOpacity: 30,
      blurType: "gaussian",
      pfx: Object.fromEntries(Object.keys(ASCII_DITHER_PRESET.pfx).map((key) => [key, { enabled: true, intensity: 20 }])) as typeof ASCII_DITHER_PRESET.pfx,
      lights: { enabled: true, points: [{ x: 0.5, y: 0.5, radius: 0.2, intensity: 80 }] },
      mask: { ...ASCII_DITHER_PRESET.mask, enabled: true },
    })).toEqual([
      "background", "sample", "cells", "tint", "blur", "scanLines", "vignette",
      "bloom", "chromatic", "filmGrain", "glitch", "halftone", "pixelate",
      "filmDust", "lights", "mask",
    ]);
  });
});
