export const ASCII_RENDER_MODES = [
  "characters", "dither", "mosaic", "pixel", "dots", "cross", "diamond",
  "voxel", "lego", "mixed", "lines", "diagonal", "braille", "disco",
  "hexdump", "matrix", "rings", "hearts", "stars", "hexagons", "triangles",
  "bubbles", "hatch", "contour", "halfblocks",
] as const;

export type AsciiRenderMode = (typeof ASCII_RENDER_MODES)[number];
export type AnimationStyle = "wave" | "pulse" | "shimmer" | "ripple" | "flicker";
export type BlurType = "off" | "gaussian" | "motion" | "zoom" | "tilt" | "lens" | "progressive";
export type BackgroundMode = "blurred" | "solid" | "original" | "none";
export type EffectName = "scanLines" | "vignette" | "bloom" | "chromatic" | "filmGrain" | "glitch" | "halftone" | "pixelate" | "filmDust";

export type Color = { r: number; g: number; b: number; a: number };
export type TonePoint = { x: number; y: number };
export type ToggleIntensity = { enabled: boolean; intensity: number };
export type PostEffects = Record<EffectName, ToggleIntensity>;
export type LightPoint = { x: number; y: number; radius: number; intensity: number; color?: string };
export type MaskShape = { id: string; type: string; x: number; y: number; w: number; h: number };

export type AsciiArtConfig = {
  renderMode: AsciiRenderMode;
  bgMode: BackgroundMode;
  bgColor?: string;
  bgBlur: number;
  bgOpacity: number;
  cellSize: number;
  coverage: number;
  invert: boolean;
  styleBlend: GlobalCompositeOperation;
  charSet: string;
  customChars: string;
  brightness: number;
  contrast: number;
  edgeEmphasis: number;
  density: number;
  toneCurve: TonePoint[];
  tint: string;
  tintOpacity: number;
  overlayBlend: GlobalCompositeOperation;
  saturation: number;
  grayscale: number;
  blurType: BlurType;
  blurAmount: number;
  blurAngle: number;
  directionalBothSides: boolean;
  tiltFocus: number;
  tiltPosition: number;
  tiltFeather: number;
  lensFocus: number;
  blurCenterX: number;
  blurCenterY: number;
  progressivePosition: number;
  progressiveReverse: boolean;
  pfx: PostEffects;
  animated: boolean;
  animStyle: AnimationStyle;
  animSpeed: ToggleIntensity;
  animIntensity: ToggleIntensity;
  lights: { enabled: boolean; points: LightPoint[] };
  mask: {
    enabled: boolean;
    tool: string;
    brushSize: number;
    showOverlay: boolean;
    invert: boolean;
    dataUrl: string | null;
    shapes: MaskShape[];
  };
};

export const ASCII_DITHER_PRESET: AsciiArtConfig = {
  renderMode: "hexdump",
  bgMode: "original",
  bgBlur: 12,
  bgOpacity: 82,
  cellSize: 9,
  coverage: 100,
  invert: false,
  styleBlend: "source-over",
  charSet: "binary",
  customChars: "",
  brightness: -40,
  contrast: 60,
  edgeEmphasis: 40,
  density: 0,
  toneCurve: [
    { x: 0, y: 0.28135888501742157 },
    { x: 1, y: 1 },
  ],
  tint: "rgba(0, 255, 102, 0)",
  tintOpacity: 45,
  overlayBlend: "overlay",
  saturation: 100,
  grayscale: 0,
  blurType: "off",
  blurAmount: 35,
  blurAngle: 0,
  directionalBothSides: false,
  tiltFocus: 35,
  tiltPosition: 50,
  tiltFeather: 15,
  lensFocus: 40,
  blurCenterX: 50,
  blurCenterY: 50,
  progressivePosition: 55,
  progressiveReverse: false,
  pfx: {
    vignette: { enabled: true, intensity: 38 },
    scanLines: { enabled: true, intensity: 28 },
    chromatic: { enabled: false, intensity: 15 },
    bloom: { enabled: true, intensity: 25 },
    filmGrain: { enabled: true, intensity: 40 },
    glitch: { enabled: true, intensity: 20 },
    pixelate: { enabled: false, intensity: 15 },
    halftone: { enabled: false, intensity: 20 },
    filmDust: { enabled: false, intensity: 20 },
  },
  animated: true,
  animStyle: "flicker",
  animSpeed: { enabled: true, intensity: 100 },
  animIntensity: { enabled: true, intensity: 68 },
  lights: { enabled: false, points: [] },
  mask: {
    enabled: false,
    tool: "freehand",
    brushSize: 30,
    showOverlay: false,
    invert: false,
    dataUrl: null,
    shapes: [],
  },
};

const CHARACTER_SETS: Record<string, string> = {
  standard: " .:-=+*#%@",
  blocks: " ░▒▓█",
  binary: " 01",
  technical: " .,:;irsXA253hMHGS#9B&@",
};
const BAYER_4X4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5] as const;
const PFX_ORDER: EffectName[] = ["scanLines", "vignette", "bloom", "chromatic", "filmGrain", "glitch", "halftone", "pixelate", "filmDust"];

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function applyToneCurve(value: number, points: TonePoint[]) {
  const input = clamp01(value);
  const curve = [...points].sort((a, b) => a.x - b.x);
  if (!curve.length) return input;
  if (input <= curve[0].x) return clamp01(curve[0].y);
  for (let index = 1; index < curve.length; index += 1) {
    const previous = curve[index - 1];
    const next = curve[index];
    if (input <= next.x) {
      const mix = (input - previous.x) / Math.max(0.000001, next.x - previous.x);
      return clamp01(previous.y + (next.y - previous.y) * mix);
    }
  }
  return clamp01(curve[curve.length - 1].y);
}

type ColorAdjustment = Pick<AsciiArtConfig, "brightness" | "contrast" | "saturation" | "grayscale" | "invert" | "toneCurve">;

export function adjustColor(color: Color, config: ColorAdjustment): Color {
  let r = clamp01(color.r + config.brightness / 100);
  let g = clamp01(color.g + config.brightness / 100);
  let b = clamp01(color.b + config.brightness / 100);
  const contrast = 1 + config.contrast / 100;
  r = clamp01((r - 0.5) * contrast + 0.5);
  g = clamp01((g - 0.5) * contrast + 0.5);
  b = clamp01((b - 0.5) * contrast + 0.5);
  const luminance = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const saturation = Math.max(0, config.saturation / 100);
  r = clamp01(luminance + (r - luminance) * saturation);
  g = clamp01(luminance + (g - luminance) * saturation);
  b = clamp01(luminance + (b - luminance) * saturation);
  const grayscale = clamp01(config.grayscale / 100);
  r += (luminance - r) * grayscale;
  g += (luminance - g) * grayscale;
  b += (luminance - b) * grayscale;
  r = applyToneCurve(r, config.toneCurve);
  g = applyToneCurve(g, config.toneCurve);
  b = applyToneCurve(b, config.toneCurve);
  if (config.invert) {
    r = 1 - r;
    g = 1 - g;
    b = 1 - b;
  }
  return { r: clamp01(r), g: clamp01(g), b: clamp01(b), a: color.a };
}

function coordinateHash(row: number, column: number, salt = 0) {
  const value = Math.sin(row * 127.1 + column * 311.7 + salt * 74.7) * 43758.5453;
  return value - Math.floor(value);
}

export function cellIsCovered(row: number, column: number, coverage: number) {
  if (coverage <= 0) return false;
  if (coverage >= 100) return true;
  return coordinateHash(row, column) < coverage / 100;
}

export function animationValue(style: AnimationStyle, x: number, y: number, time: number, intensity: number) {
  const amount = clamp01(intensity);
  if (style === "pulse") return Math.sin(time * 2.6) * amount;
  if (style === "shimmer") return Math.sin(time * 4.2 + x * 0.19 - y * 0.04) * amount;
  if (style === "ripple") return Math.sin(time * 3 - Math.hypot(x, y) * 0.12) * amount;
  if (style === "flicker") return (coordinateHash(Math.floor(y + time * 18), Math.floor(x), Math.floor(time * 11)) * 2 - 1) * amount;
  return Math.sin(time * 2.2 + x * 0.09 + y * 0.055) * amount;
}

function colorCss(color: Color, alpha = color.a) {
  return `rgba(${Math.round(color.r * 255)},${Math.round(color.g * 255)},${Math.round(color.b * 255)},${clamp01(alpha)})`;
}

function polygon(context: CanvasRenderingContext2D, points: Array<[number, number]>, fill = true) {
  context.beginPath();
  points.forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y));
  context.closePath();
  fill ? context.fill() : context.stroke();
}

export type CellPrimitive = {
  x: number;
  y: number;
  size: number;
  luminance: number;
  color: Color;
  row: number;
  column: number;
  time: number;
  chars: string;
  matrixHead: number;
};

export function drawCellPrimitive(context: CanvasRenderingContext2D, mode: AsciiRenderMode, cell: CellPrimitive) {
  const { x, y, size: cellSize, luminance, color, row, column, time, chars, matrixHead } = cell;
  const centerX = x + cellSize / 2;
  const centerY = y + cellSize / 2;
  const size = Math.max(0.75, cellSize * (0.22 + luminance * 0.78));
  const half = size / 2;
  context.save();
  context.fillStyle = colorCss(color, 0.92);
  context.strokeStyle = colorCss(color, 0.9);
  context.lineWidth = Math.max(0.55, cellSize * 0.1);

  switch (mode) {
    case "characters": {
      const glyph = chars[Math.min(chars.length - 1, Math.floor(luminance * chars.length))] || " ";
      context.font = `${Math.max(2, size * 1.18)}px ui-monospace, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(glyph, centerX, centerY);
      break;
    }
    case "dither": {
      const ditherSize = Math.max(1, cellSize - 1);
      context.fillRect(x, y, ditherSize, ditherSize);
      break;
    }
    case "pixel":
      context.fillRect(centerX - half, centerY - half, size, size);
      break;
    case "mosaic":
      context.globalAlpha = 0.45 + luminance * 0.55;
      context.fillRect(x, y, cellSize + 0.5, cellSize + 0.5);
      break;
    case "dots":
      context.beginPath(); context.arc(centerX, centerY, half, 0, Math.PI * 2); context.fill();
      break;
    case "cross":
      context.beginPath(); context.moveTo(centerX - half, centerY); context.lineTo(centerX + half, centerY);
      context.moveTo(centerX, centerY - half); context.lineTo(centerX, centerY + half); context.stroke();
      break;
    case "diamond":
      polygon(context, [[centerX, centerY - half], [centerX + half, centerY], [centerX, centerY + half], [centerX - half, centerY]]);
      break;
    case "voxel": {
      const top = colorCss({ ...color, r: clamp01(color.r + 0.18), g: clamp01(color.g + 0.18), b: clamp01(color.b + 0.18) });
      polygon(context, [[centerX, centerY - half], [centerX + half, centerY - half / 2], [centerX, centerY], [centerX - half, centerY - half / 2]]);
      context.fillStyle = top; polygon(context, [[centerX - half, centerY - half / 2], [centerX, centerY], [centerX, centerY + half], [centerX - half, centerY + half / 2]]);
      context.globalAlpha = 0.65; polygon(context, [[centerX, centerY], [centerX + half, centerY - half / 2], [centerX + half, centerY + half / 2], [centerX, centerY + half]]);
      break;
    }
    case "lego":
      context.fillRect(centerX - half, centerY - half * 0.7, size, size * 0.7);
      context.beginPath(); context.arc(centerX, centerY - half * 0.65, Math.max(0.5, half * 0.36), 0, Math.PI * 2); context.fill();
      break;
    case "mixed": {
      const modes: AsciiRenderMode[] = ["dots", "cross", "diamond", "pixel", "lines"];
      drawCellPrimitive(context, modes[Math.floor(coordinateHash(row, column) * modes.length)], cell);
      break;
    }
    case "lines":
      context.beginPath(); context.moveTo(centerX - half, centerY); context.lineTo(centerX + half, centerY); context.stroke();
      break;
    case "diagonal":
      context.beginPath(); context.moveTo(centerX - half, centerY + half); context.lineTo(centerX + half, centerY - half); context.stroke();
      break;
    case "braille": {
      const code = 0x2800 + Math.max(1, Math.floor(luminance * 255));
      context.font = `${Math.max(3, size * 1.2)}px ui-monospace, monospace`; context.textAlign = "center"; context.textBaseline = "middle";
      context.fillText(String.fromCharCode(code), centerX, centerY);
      break;
    }
    case "disco":
      context.fillStyle = `hsla(${(row * 19 + column * 31 + time * 80) % 360},90%,${35 + luminance * 45}%,.9)`;
      context.fillRect(centerX - half, centerY - half, size, size);
      break;
    case "hexdump":
      context.font = `${Math.max(3, size)}px ui-monospace, monospace`; context.textAlign = "center"; context.textBaseline = "middle";
      context.fillText(Math.floor(luminance * 15).toString(16).toUpperCase(), centerX, centerY);
      break;
    case "matrix": {
      const distance = Math.abs(row - matrixHead);
      context.fillStyle = distance < 1 ? "#eaffea" : `rgba(20,255,88,${clamp01(1 - distance / 12)})`;
      context.font = `${Math.max(3, size)}px ui-monospace, monospace`; context.textAlign = "center"; context.textBaseline = "middle";
      context.fillText(String.fromCharCode(0x30a0 + ((row * 13 + column * 7) % 80)), centerX, centerY);
      break;
    }
    case "rings":
      context.beginPath(); context.arc(centerX, centerY, half, 0, Math.PI * 2); context.stroke();
      break;
    case "hearts":
      context.beginPath(); context.moveTo(centerX, centerY + half);
      context.bezierCurveTo(centerX - half * 1.4, centerY, centerX - half, centerY - half, centerX, centerY - half * 0.25);
      context.bezierCurveTo(centerX + half, centerY - half, centerX + half * 1.4, centerY, centerX, centerY + half); context.fill();
      break;
    case "stars": {
      const points: Array<[number, number]> = [];
      for (let index = 0; index < 10; index += 1) {
        const radius = index % 2 ? half * 0.42 : half;
        const angle = -Math.PI / 2 + index * Math.PI / 5;
        points.push([centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius]);
      }
      polygon(context, points);
      break;
    }
    case "hexagons": {
      const points: Array<[number, number]> = [];
      for (let index = 0; index < 6; index += 1) {
        const angle = Math.PI / 6 + index * Math.PI / 3;
        points.push([centerX + Math.cos(angle) * half, centerY + Math.sin(angle) * half]);
      }
      polygon(context, points, luminance > 0.55);
      break;
    }
    case "triangles":
      polygon(context, [[centerX, centerY - half], [centerX + half, centerY + half], [centerX - half, centerY + half]], luminance > 0.45);
      break;
    case "bubbles":
      context.globalAlpha = 0.28 + luminance * 0.55;
      context.beginPath(); context.arc(centerX, centerY, half, 0, Math.PI * 2); context.fill(); context.stroke();
      break;
    case "hatch":
      context.beginPath();
      context.moveTo(centerX - half, centerY + half); context.lineTo(centerX + half, centerY - half);
      if (luminance > 0.55) { context.moveTo(centerX - half, centerY - half); context.lineTo(centerX + half, centerY + half); }
      context.stroke();
      break;
    case "contour":
      context.beginPath(); context.ellipse(centerX, centerY, half, half * (0.35 + luminance * 0.45), 0, 0, Math.PI * 2); context.stroke();
      break;
    case "halfblocks":
      context.globalAlpha = clamp01(luminance * 1.35); context.fillRect(x, y, cellSize, cellSize / 2);
      context.globalAlpha = clamp01((1 - luminance) * 0.75); context.fillRect(x, y + cellSize / 2, cellSize, cellSize / 2);
      break;
  }
  context.restore();
}

export function getEnabledPipelineStages(config: AsciiArtConfig) {
  const stages = ["background", "sample", "cells"];
  if (config.tintOpacity > 0) stages.push("tint");
  if (config.blurType !== "off") stages.push("blur");
  PFX_ORDER.forEach((name) => config.pfx[name].enabled && stages.push(name));
  if (config.lights.enabled && config.lights.points.length) stages.push("lights");
  if (config.mask.enabled) stages.push("mask");
  return stages;
}

export type AsciiCanvasBuffers = {
  plain: HTMLCanvasElement;
  sample: HTMLCanvasElement;
  effect: HTMLCanvasElement;
  work: HTMLCanvasElement;
  auxiliary: HTMLCanvasElement;
};

export type AsciiFrameInput = {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  time: number;
  source: CanvasImageSource | null;
  mask: CanvasImageSource | null;
  buffers: AsciiCanvasBuffers;
  matrixHeads: number[];
  config: AsciiArtConfig;
};

function canvasSourceSize(source: CanvasImageSource) {
  const candidate = source as HTMLImageElement & HTMLVideoElement;
  return {
    width: candidate.naturalWidth || candidate.videoWidth || candidate.width || 1,
    height: candidate.naturalHeight || candidate.videoHeight || candidate.height || 1,
  };
}

function drawCover(context: CanvasRenderingContext2D, source: CanvasImageSource, width: number, height: number) {
  const dimensions = canvasSourceSize(source);
  const scale = Math.max(width / dimensions.width, height / dimensions.height);
  const drawWidth = dimensions.width * scale;
  const drawHeight = dimensions.height * scale;
  context.drawImage(source, (width - drawWidth) * 0.82, (height - drawHeight) / 2, drawWidth, drawHeight);
}

function sizeCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;
}

function copyCanvas(target: CanvasRenderingContext2D, source: HTMLCanvasElement, width: number, height: number) {
  target.save(); target.setTransform(1, 0, 0, 1, 0, 0); target.globalAlpha = 1; target.globalCompositeOperation = "source-over";
  target.clearRect(0, 0, width, height); target.drawImage(source, 0, 0, width, height); target.restore();
}

function applyBlur(config: AsciiArtConfig, canvas: HTMLCanvasElement, work: HTMLCanvasElement, width: number, height: number) {
  const context = canvas.getContext("2d");
  const workContext = work.getContext("2d");
  if (!context || !workContext || config.blurType === "off" || config.blurAmount <= 0) return;
  copyCanvas(workContext, canvas, width, height);
  context.clearRect(0, 0, width, height);
  const amount = config.blurAmount / 12;
  context.save();
  if (config.blurType === "gaussian") {
    context.filter = `blur(${amount}px)`; context.drawImage(work, 0, 0);
  } else if (config.blurType === "motion") {
    const angle = config.blurAngle * Math.PI / 180;
    const sides = config.directionalBothSides ? [-1, 1] : [1];
    context.globalAlpha = 1 / (sides.length * 6);
    for (const side of sides) for (let step = 0; step < 6; step += 1) context.drawImage(work, Math.cos(angle) * amount * step * side, Math.sin(angle) * amount * step * side);
  } else if (config.blurType === "zoom") {
    context.globalAlpha = 1 / 7;
    const cx = width * config.blurCenterX / 100; const cy = height * config.blurCenterY / 100;
    for (let step = 0; step < 7; step += 1) {
      const scale = 1 + step * amount / 500;
      context.setTransform(scale, 0, 0, scale, cx * (1 - scale), cy * (1 - scale)); context.drawImage(work, 0, 0);
    }
  } else {
    const strip = 12;
    for (let y = 0; y < height; y += strip) {
      const normalized = y / height;
      let distance = Math.abs(normalized * 100 - config.tiltPosition) / Math.max(1, config.tiltFeather);
      if (config.blurType === "lens") distance = Math.hypot((0.5 - config.blurCenterX / 100) * 2, normalized - config.blurCenterY / 100) * 100 / Math.max(1, config.lensFocus);
      if (config.blurType === "progressive") distance = config.progressiveReverse ? 1 - normalized : normalized;
      context.filter = `blur(${Math.max(0, distance - config.tiltFocus / 100) * amount}px)`;
      context.drawImage(work, 0, y, width, strip, 0, y, width, strip);
    }
  }
  context.restore();
}

function applyPostEffect(name: EffectName, intensity: number, canvas: HTMLCanvasElement, work: HTMLCanvasElement, sample: HTMLCanvasElement, width: number, height: number, time: number) {
  const context = canvas.getContext("2d");
  const workContext = work.getContext("2d");
  if (!context || !workContext) return;
  const amount = clamp01(intensity / 100);
  context.save();
  if (name === "scanLines") {
    context.fillStyle = `rgba(0,0,0,${amount * 0.5})`; for (let y = 0; y < height; y += 4) context.fillRect(0, y, width, 1);
  } else if (name === "vignette") {
    const gradient = context.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.18, width / 2, height / 2, Math.max(width, height) * 0.72);
    gradient.addColorStop(0, "rgba(0,0,0,0)"); gradient.addColorStop(1, `rgba(0,0,0,${amount * 0.9})`); context.fillStyle = gradient; context.fillRect(0, 0, width, height);
  } else if (name === "bloom") {
    copyCanvas(workContext, canvas, width, height); context.globalCompositeOperation = "screen"; context.globalAlpha = amount * 0.7; context.filter = `blur(${2 + amount * 18}px)`; context.drawImage(work, 0, 0);
  } else if (name === "chromatic") {
    copyCanvas(workContext, canvas, width, height);
    sizeCanvas(sample, width, height);
    const channelContext = sample.getContext("2d");
    if (channelContext) {
      const shift = 0.75 + amount * 9;
      const drawChannel = (offset: number, color: string) => {
        channelContext.clearRect(0, 0, width, height);
        channelContext.globalCompositeOperation = "source-over";
        channelContext.drawImage(work, offset, 0);
        channelContext.globalCompositeOperation = "source-in";
        channelContext.fillStyle = color;
        channelContext.fillRect(0, 0, width, height);
        channelContext.globalCompositeOperation = "source-over";
        context.globalCompositeOperation = "screen";
        context.globalAlpha = amount * 0.72;
        context.drawImage(sample, 0, 0);
      };
      drawChannel(-shift, "rgb(255,0,64)");
      drawChannel(shift, "rgb(0,176,255)");
    }
  } else if (name === "filmGrain") {
    const count = Math.floor(width * height * amount / 900);
    for (let index = 0; index < count; index += 1) { const x = coordinateHash(index, Math.floor(time * 20), 1) * width; const y = coordinateHash(index, Math.floor(time * 20), 2) * height; context.fillStyle = `rgba(255,255,255,${coordinateHash(index, 4) * amount * 0.28})`; context.fillRect(x, y, 1, 1); }
  } else if (name === "glitch") {
    copyCanvas(workContext, canvas, width, height); const bands = Math.max(1, Math.floor(amount * 14));
    for (let index = 0; index < bands; index += 1) { const y = coordinateHash(index, Math.floor(time * 12)) * height; const bandHeight = 2 + coordinateHash(index, 8) * 24; const shift = (coordinateHash(index, 3) - 0.5) * amount * 70; context.drawImage(work, 0, y, width, bandHeight, shift, y, width, bandHeight); }
  } else if (name === "halftone") {
    context.fillStyle = `rgba(0,0,0,${amount * 0.36})`; const gap = Math.max(5, 14 - amount * 8);
    for (let y = 0; y < height; y += gap) for (let x = 0; x < width; x += gap) { context.beginPath(); context.arc(x, y, gap * 0.16, 0, Math.PI * 2); context.fill(); }
  } else if (name === "pixelate") {
    const scale = Math.max(2, Math.floor(2 + amount * 16)); sizeCanvas(sample, Math.ceil(width / scale), Math.ceil(height / scale));
    const sampleContext = sample.getContext("2d"); if (sampleContext) { sampleContext.imageSmoothingEnabled = false; sampleContext.drawImage(canvas, 0, 0, sample.width, sample.height); context.imageSmoothingEnabled = false; context.clearRect(0, 0, width, height); context.drawImage(sample, 0, 0, width, height); }
  } else if (name === "filmDust") {
    const count = Math.floor(8 + amount * 80); context.strokeStyle = `rgba(255,255,255,${amount * 0.45})`;
    for (let index = 0; index < count; index += 1) { const x = coordinateHash(index, Math.floor(time * 5), 9) * width; const y = coordinateHash(index, 6, 2) * height; context.beginPath(); context.moveTo(x, y); context.lineTo(x + (coordinateHash(index, 7) - 0.5) * 18, y + coordinateHash(index, 8) * 35); context.stroke(); }
  }
  context.restore();
}

export function renderAsciiFrame(input: AsciiFrameInput) {
  const { context, width, height, time, source, mask, buffers, matrixHeads, config } = input;
  const pixelWidth = Math.max(1, Math.round(width)); const pixelHeight = Math.max(1, Math.round(height));
  for (const canvas of [buffers.plain, buffers.effect, buffers.work, buffers.auxiliary]) sizeCanvas(canvas, pixelWidth, pixelHeight);
  const plainContext = buffers.plain.getContext("2d"); const effectContext = buffers.effect.getContext("2d", { willReadFrequently: true });
  const workContext = buffers.work.getContext("2d"); const auxiliaryContext = buffers.auxiliary.getContext("2d");
  if (!plainContext || !effectContext || !workContext || !auxiliaryContext) return;

  plainContext.clearRect(0, 0, width, height);
  if (source) drawCover(plainContext, source, width, height);
  effectContext.clearRect(0, 0, width, height);
  effectContext.save(); effectContext.globalAlpha = clamp01(config.bgOpacity / 100);
  if (config.bgMode === "solid") { effectContext.fillStyle = config.bgColor || "#050505"; effectContext.fillRect(0, 0, width, height); }
  if ((config.bgMode === "original" || config.bgMode === "blurred") && source) {
    effectContext.filter = config.bgMode === "blurred" ? `blur(${config.bgBlur}px)` : "none"; drawCover(effectContext, source, width, height);
  }
  effectContext.restore();

  const cellSize = Math.max(2, Math.round(config.cellSize)); const columns = Math.ceil(width / cellSize); const rows = Math.ceil(height / cellSize);
  sizeCanvas(buffers.sample, columns, rows); const sampleContext = buffers.sample.getContext("2d", { willReadFrequently: true });
  if (!sampleContext) return;
  sampleContext.clearRect(0, 0, columns, rows); if (source) drawCover(sampleContext, source, columns, rows);
  const pixels = sampleContext.getImageData(0, 0, columns, rows).data;
  const chars = config.customChars || CHARACTER_SETS[config.charSet] || CHARACTER_SETS.standard;
  const speed = config.animSpeed.enabled ? 0.35 + config.animSpeed.intensity / 35 : 1;
  const animationIntensity = config.animated && config.animIntensity.enabled ? config.animIntensity.intensity / 100 : 0;
  effectContext.globalCompositeOperation = config.styleBlend;
  for (let row = 0; row < rows; row += 1) for (let column = 0; column < columns; column += 1) {
    if (!cellIsCovered(row, column, config.coverage)) continue;
    const offset = (row * columns + column) * 4;
    let color = adjustColor({ r: (pixels[offset] || 0) / 255, g: (pixels[offset + 1] || 0) / 255, b: (pixels[offset + 2] || 0) / 255, a: (pixels[offset + 3] || 255) / 255 }, config);
    let luminance = color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722;
    if (config.edgeEmphasis > 0) {
      const right = Math.min(columns - 1, column + 1); const below = Math.min(rows - 1, row + 1);
      const rightOffset = (row * columns + right) * 4; const belowOffset = (below * columns + column) * 4;
      const neighbor = ((pixels[rightOffset] || 0) + (pixels[belowOffset] || 0)) / 510;
      luminance = clamp01(luminance + Math.abs(luminance - neighbor) * config.edgeEmphasis / 45);
    }
    if (animationIntensity) luminance = clamp01(luminance + animationValue(config.animStyle, column, row, time * speed, animationIntensity) * 0.17);
    const densityLuminance = clamp01(luminance + (config.density - 50) / 180);
    const threshold = (BAYER_4X4[(row % 4) * 4 + (column % 4)] + 0.5) / 16;
    if (config.renderMode === "dither" ? densityLuminance <= threshold : densityLuminance < (1 - config.density / 100) * 0.45) continue;
    color = { ...color, a: clamp01(0.3 + densityLuminance * 0.7) };
    if (config.renderMode === "matrix") {
      matrixHeads[column] ??= coordinateHash(column, 1) * rows;
      matrixHeads[column] = (matrixHeads[column] + 0.06 + speed * 0.06) % (rows + 14);
    }
    drawCellPrimitive(effectContext, config.renderMode, { x: column * cellSize, y: row * cellSize, size: cellSize, luminance: densityLuminance, color, row, column, time, chars, matrixHead: matrixHeads[column] || 0 });
  }

  if (config.tintOpacity > 0) { effectContext.save(); effectContext.globalCompositeOperation = config.overlayBlend; effectContext.globalAlpha = config.tintOpacity / 100; effectContext.fillStyle = config.tint; effectContext.fillRect(0, 0, width, height); effectContext.restore(); }
  applyBlur(config, buffers.effect, buffers.work, width, height);
  PFX_ORDER.forEach((name) => config.pfx[name].enabled && applyPostEffect(name, config.pfx[name].intensity, buffers.effect, buffers.work, buffers.sample, width, height, time));
  if (config.lights.enabled) for (const point of config.lights.points) {
    const x = point.x * width; const y = point.y * height; const radius = point.radius * Math.min(width, height);
    const gradient = effectContext.createRadialGradient(x, y, 0, x, y, radius); gradient.addColorStop(0, point.color || `rgba(255,255,255,${point.intensity / 100})`); gradient.addColorStop(1, "rgba(255,255,255,0)");
    effectContext.save(); effectContext.globalCompositeOperation = "screen"; effectContext.fillStyle = gradient; effectContext.fillRect(x - radius, y - radius, radius * 2, radius * 2); effectContext.restore();
  }
  if (config.mask.enabled && mask && source) {
    auxiliaryContext.clearRect(0, 0, width, height);
    if (config.mask.invert) { auxiliaryContext.fillStyle = "white"; auxiliaryContext.fillRect(0, 0, width, height); auxiliaryContext.globalCompositeOperation = "destination-out"; }
    drawCover(auxiliaryContext, mask, width, height); auxiliaryContext.globalCompositeOperation = "source-over";
    copyCanvas(workContext, buffers.plain, width, height); workContext.globalCompositeOperation = "destination-in"; workContext.drawImage(buffers.auxiliary, 0, 0); workContext.globalCompositeOperation = "source-over";
    effectContext.drawImage(buffers.work, 0, 0);
  }
  context.save(); context.setTransform(1, 0, 0, 1, 0, 0); context.clearRect(0, 0, context.canvas.width, context.canvas.height); context.drawImage(buffers.effect, 0, 0, context.canvas.width, context.canvas.height); context.restore();
}
