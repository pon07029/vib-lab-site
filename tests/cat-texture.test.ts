import { describe, expect, it } from "vitest";
import { isInsideCatSilhouette } from "../lib/cat-texture";

describe("cat text silhouette mask", () => {
  it("includes the head and body but excludes the far corner", () => {
    expect(isInsideCatSilhouette(0.68, 0.34)).toBe(true);
    expect(isInsideCatSilhouette(0.62, 0.56)).toBe(true);
    expect(isInsideCatSilhouette(0.05, 0.05)).toBe(false);
  });

  it("keeps the ears as part of the silhouette", () => {
    expect(isInsideCatSilhouette(0.64, 0.16)).toBe(true);
    expect(isInsideCatSilhouette(0.74, 0.16)).toBe(true);
  });
});
