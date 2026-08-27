import { describe, expect, it } from "vitest";

import {
  clampProgress,
  scrambleLabel,
  tunnelBlinkTick,
  tunnelGlyph,
  tunnelOrbitAngle,
  tunnelPhrase,
  tunnelRingGeometry,
  tunnelRingProgress,
  tunnelSlotCount,
  wrapIndex,
} from "../lib/interaction";

describe("interaction helpers", () => {
  it("clamps scroll progress inside a section", () => {
    expect(clampProgress(50, 100, 1000)).toBe(0);
    expect(clampProgress(550, 100, 1000)).toBeCloseTo(0.5);
    expect(clampProgress(1200, 100, 1000)).toBe(1);
  });

  it("wraps negative and overflowing carousel indexes", () => {
    expect(wrapIndex(-1, 6)).toBe(5);
    expect(wrapIndex(6, 6)).toBe(0);
  });

  it("resolves the original label at full progress", () => {
    expect(scrambleLabel("RESEARCH", 1)).toBe("RESEARCH");
    expect(scrambleLabel("RESEARCH", 0)).not.toBe("RESEARCH");
  });

  it("keeps every tunnel label on a fixed-radius orbit", () => {
    expect(tunnelRingProgress(8, 24)).toBe(tunnelRingProgress(8, 24));
    expect(tunnelOrbitAngle(3, 12, 8, 0)).not.toBe(tunnelOrbitAngle(3, 12, 8, 10_000));
  });

  it("uses spaced character slots, dot gaps, and 100ms blink ticks", () => {
    expect(tunnelSlotCount(300, 260, 22)).toBeGreaterThan(110);
    expect(tunnelGlyph("AI LAB", 2)).toBe("·");
    expect(tunnelPhrase(["AI", "DATA"])).toContain("            ");
    expect(tunnelBlinkTick(99)).toBe(0);
    expect(tunnelBlinkTick(100)).toBe(1);
  });

  it("scales glyphs from small inner rings to large outer rings", () => {
    const inner = tunnelRingGeometry(0, 29, 960, 1080);
    const nextInner = tunnelRingGeometry(1, 29, 960, 1080);
    const previousOuter = tunnelRingGeometry(27, 29, 960, 1080);
    const outer = tunnelRingGeometry(28, 29, 960, 1080);
    expect(inner.fontSize).toBeLessThan(nextInner.fontSize);
    expect(previousOuter.fontSize).toBeLessThan(outer.fontSize);
    expect(inner.fontSize).toBe(14);
    expect(outer.fontSize).toBeCloseTo(44.6);
    expect(inner.radiusX).toBeGreaterThanOrEqual(44);
    expect(inner.radiusX).toBe(inner.radiusY);
    expect(outer.radiusX).toBe(outer.radiusY);
    expect(outer.radiusX).toBeCloseTo(44 + 1080 * 0.77);
    expect(inner.radiusX).toBeLessThan(outer.radiusX);
    expect(nextInner.radiusX - inner.radiusX).toBeCloseTo(outer.radiusX - previousOuter.radiusX);
  });
});
