const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>[]{}";

export function clampProgress(scroll: number, start: number, end: number) {
  if (end <= start) return 0;
  return Math.min(1, Math.max(0, (scroll - start) / (end - start)));
}

export function wrapIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

export function tunnelRingProgress(ring: number, ringCount: number) {
  if (ringCount <= 1) return 0;
  return Math.min(1, Math.max(0, ring / (ringCount - 1)));
}

export function tunnelRingGeometry(ring: number, ringCount: number, width: number, height: number) {
  const progress = tunnelRingProgress(ring, ringCount);
  const radius = 44 + progress * Math.max(width, height) * 0.77;
  const innerFontSize = 14;
  const outerFontSize = Math.min(52, Math.max(28, Math.max(width, height) * 0.045)) - 4;
  const fontSize = innerFontSize + Math.pow(progress, 0.82) * (outerFontSize - innerFontSize);
  return {
    progress,
    radiusX: radius,
    radiusY: radius,
    fontSize,
  };
}

export function tunnelOrbitAngle(segment: number, segmentCount: number, ring: number, elapsedMs: number) {
  const spacing = segmentCount > 0 ? (segment / segmentCount) * Math.PI * 2 : 0;
  const orbitSpeed = 0.000085;
  return spacing + ring * 0.34 + elapsedMs * orbitSpeed;
}

export function tunnelSlotCount(radiusX: number, radiusY: number, fontSize: number) {
  const a = Math.max(1, Math.abs(radiusX));
  const b = Math.max(1, Math.abs(radiusY));
  const circumference = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
  const glyphAdvance = Math.max(4, fontSize * 0.62 + 0.6);
  return Math.max(8, Math.floor(circumference / glyphAdvance));
}

export function tunnelPhrase(words: string[]) {
  const projectGap = " ".repeat(14);
  return `${words.join(projectGap)}${projectGap}`;
}

export function tunnelGlyph(source: string, index: number) {
  if (!source) return "·";
  const character = source[((index % source.length) + source.length) % source.length];
  return /\s/.test(character) ? "·" : character.toUpperCase();
}

export function tunnelBlinkTick(elapsedMs: number) {
  return Math.floor(Math.max(0, elapsedMs) / 100);
}

export function scrambleLabel(label: string, progress: number) {
  if (progress >= 1) return label;
  const resolved = Math.max(0, Math.floor(label.length * Math.max(0, progress)));
  return label
    .split("")
    .map((character, index) => {
      if (character === " " || index < resolved) return character;
      return GLYPHS[(index * 11 + label.length * 7) % GLYPHS.length];
    })
    .join("");
}
