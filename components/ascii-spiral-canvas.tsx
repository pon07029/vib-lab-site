"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

type MousePosition = { x: number; y: number };

type AsciiSpiralCanvasProps = {
  mousePosRef: MutableRefObject<MousePosition>;
};

type Rgb = [number, number, number];

const CELL_SIZE = 12;
export const ASCII_SPIRAL_QUALITY = {
  renderScale: 0.75,
  maxDevicePixelRatio: 1.5,
  renderFps: 90,
  backgroundFps: 60,
} as const;
const FRAME_INTERVAL = 1000 / ASCII_SPIRAL_QUALITY.renderFps;
const BACKGROUND_FRAME_INTERVAL = 1000 / ASCII_SPIRAL_QUALITY.backgroundFps;
const HEX_DIGITS = "0123456789ABCDEF";

const PALETTE: Rgb[] = [
  [7, 7, 7],
  [36, 36, 36],
  [119, 119, 119],
  [248, 248, 246],
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function paletteColor(amount: number): Rgb {
  const scaled = clamp(amount) * (PALETTE.length - 1);
  const index = Math.min(PALETTE.length - 2, Math.floor(scaled));
  const mix = scaled - index;
  const first = PALETTE[index] ?? PALETTE[0];
  const second = PALETTE[index + 1] ?? first;
  return [
    first[0] + (second[0] - first[0]) * mix,
    first[1] + (second[1] - first[1]) * mix,
    first[2] + (second[2] - first[2]) * mix,
  ];
}

function renderProceduralBackground(
  image: ImageData,
  width: number,
  height: number,
  elapsed: number,
  pointer: { x: number; y: number },
) {
  const data = image.data;
  const aspect = width / Math.max(1, height);
  const phase = elapsed * 17 * 0.018;
  const pointerX = pointer.x * 0.32;
  const pointerY = pointer.y * 0.32;
  const frameSeed = Math.floor(elapsed * 8);

  for (let y = 0; y < height; y += 1) {
    const normalizedY = (y / Math.max(1, height - 1) - 0.5) * 2;

    for (let x = 0; x < width; x += 1) {
      const normalizedX = (x / Math.max(1, width - 1) - 0.5) * 2 * aspect;
      let px = normalizedX;
      let py = normalizedY;
      const cursorDistance = Math.hypot(px - pointerX, py - pointerY);
      const cursorFalloff = clamp(1 - cursorDistance / 0.5);
      const swirl = cursorFalloff * 65 * 0.012;
      const radius = Math.hypot(px, py);
      const angle = Math.atan2(py, px) + swirl * Math.sin(radius * 10 - phase);
      px += Math.cos(angle) * swirl * 0.08;
      py += Math.sin(angle) * swirl * 0.08;

      const warpedRadius = Math.hypot(px, py);
      const warpedAngle = Math.atan2(py, px);
      const ringWave = Math.sin(
        warpedRadius * (51 * 0.34) - phase +
        Math.sin(warpedAngle * (48 * 0.08) + phase * 0.6) * (50 * 0.045),
      );
      const spiralWave = Math.sin(
        warpedAngle * 5.5 + warpedRadius * (48 * 0.2) - phase * 1.4 +
        Math.sin(warpedRadius * 8 + phase) * 20 * 0.025,
      );
      let value = 0.5 + ringWave * 0.34 + spiralWave * 0.16;
      value = clamp((value - 0.5) * 1.3 + 0.5);
      value = clamp(value * (0.72 + 50 / 250) + 50 / 260);
      value *= clamp(1 - Math.max(0, warpedRadius - 0.56) * 0.26);

      const color = paletteColor(value);
      // A cheap integer grain keeps the field alive without a second noise pass.
      const grain = (((x * 17 + y * 31 + frameSeed * 7) & 15) - 8) * 0.35;
      const offset = (y * width + x) * 4;
      data[offset] = clamp((color[0] + grain) / 255) * 255;
      data[offset + 1] = clamp((color[1] + grain) / 255) * 255;
      data[offset + 2] = clamp((color[2] + grain) / 255) * 255;
      data[offset + 3] = 255;
    }
  }
}

function buildHalftonePattern(context: CanvasRenderingContext2D, cellSize: number) {
  const patternCanvas = document.createElement("canvas");
  const size = Math.max(4, Math.round(cellSize * 1.8));
  patternCanvas.width = size;
  patternCanvas.height = size;
  const patternContext = patternCanvas.getContext("2d");
  if (!patternContext) return null;

  patternContext.fillStyle = "rgba(8, 8, 8, .08)";
  patternContext.beginPath();
  patternContext.arc(size / 2, size / 2, Math.max(0.5, size * 0.08), 0, Math.PI * 2);
  patternContext.fill();
  return context.createPattern(patternCanvas, "repeat");
}

function drawRaster(
  context: CanvasRenderingContext2D,
  sourceCanvas: HTMLCanvasElement,
  sourceImage: ImageData,
  width: number,
  height: number,
  cellSize: number,
  elapsed: number,
  halftonePattern: CanvasPattern | null,
) {
  context.save();
  context.imageSmoothingEnabled = false;
  context.globalCompositeOperation = "source-over";
  context.globalAlpha = 1;
  context.fillStyle = "#090909";
  context.fillRect(0, 0, width, height);
  context.globalAlpha = 0.9;
  context.drawImage(sourceCanvas, 0, 0);

  context.globalCompositeOperation = "color-dodge";
  context.globalAlpha = 0.95;
  context.font = `600 ${Math.max(6, cellSize * 0.9)}px ui-monospace, monospace`;
  context.textAlign = "center";
  context.textBaseline = "middle";

  const columns = Math.ceil(width / cellSize);
  const rows = Math.ceil(height / cellSize);
  const pixels = sourceImage.data;

  for (let row = 0; row < rows; row += 1) {
    const sampleY = Math.min(height - 1, Math.floor((row + 0.5) * cellSize));

    for (let column = 0; column < columns; column += 1) {
      const sampleX = Math.min(width - 1, Math.floor((column + 0.5) * cellSize));
      const offset = (sampleY * width + sampleX) * 4;
      const red = pixels[offset] ?? 0;
      const green = pixels[offset + 1] ?? 0;
      const blue = pixels[offset + 2] ?? 0;
      let value = clamp((red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255);

      // Match the reference engine's contrast and animated shimmer.
      value = clamp((value - 0.5) * 1.5 + 0.5);
      const wave = Math.sin(column * 0.12 + row * 0.04 + elapsed * 4.8);
      value = clamp(value + wave * 0.11 * 0.6);
      if (value < 0.12) continue;

      const seed = (column * 92821 + row * 68917) & 4095;
      const digit = HEX_DIGITS[(seed + Math.floor(value * 16) + Math.floor(elapsed * 3)) & 15];
      const shade = Math.round(76 + value * 179);
      context.fillStyle = `rgba(${shade}, ${shade}, ${shade}, ${0.2 + value * 0.8})`;
      context.fillText(digit, column * cellSize + cellSize / 2, row * cellSize + cellSize / 2);
    }
  }

  context.restore();

  if (halftonePattern) {
    context.save();
    context.globalCompositeOperation = "source-over";
    context.globalAlpha = 0.72;
    context.fillStyle = halftonePattern;
    context.fillRect(0, 0, width, height);
    context.restore();
  }
}

export function AsciiSpiralCanvas({ mousePosRef }: AsciiSpiralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const context = canvas.getContext("2d", { alpha: false, desynchronized: true });
    const sourceCanvas = document.createElement("canvas");
    const sourceContext = sourceCanvas.getContext("2d", { alpha: false });
    if (!context || !sourceContext) return;

    let width = 1;
    let height = 1;
    let cellSize = CELL_SIZE;
    let sourceImage = sourceContext.createImageData(width, height);
    let halftonePattern: CanvasPattern | null = null;
    let frameId = 0;
    let lastFrame = 0;
    let lastBackgroundFrame = 0;
    let running = false;
    let visible = true;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let targetPointerX = 0.5;
    let targetPointerY = 0.5;
    const startedAt = performance.now();

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const scale = Math.max(
        0.5,
        Math.min(window.devicePixelRatio || 1, ASCII_SPIRAL_QUALITY.maxDevicePixelRatio)
          * ASCII_SPIRAL_QUALITY.renderScale,
      );
      width = Math.max(1, Math.floor(rect.width * scale));
      height = Math.max(1, Math.floor(rect.height * scale));
      cellSize = Math.max(4, Math.round(CELL_SIZE * scale));

      canvas.width = width;
      canvas.height = height;
      sourceCanvas.width = width;
      sourceCanvas.height = height;
      sourceImage = sourceContext.createImageData(width, height);
      halftonePattern = buildHalftonePattern(context, cellSize);
      context.imageSmoothingEnabled = false;
    };

    const drawFrame = (now: number) => {
      if (!running) return;
      if (!lastFrame || now - lastFrame >= FRAME_INTERVAL) {
        lastFrame = now;
        pointerX += (targetPointerX - pointerX) * 0.08;
        pointerY += (targetPointerY - pointerY) * 0.08;
        const elapsed = (now - startedAt) / 1000;
        if (!lastBackgroundFrame || now - lastBackgroundFrame >= BACKGROUND_FRAME_INTERVAL) {
          lastBackgroundFrame = now;
          renderProceduralBackground(sourceImage, width, height, elapsed, {
            x: pointerX - 0.5,
            y: pointerY - 0.5,
          });
          sourceContext.putImageData(sourceImage, 0, 0);
        }
        drawRaster(context, sourceCanvas, sourceImage, width, height, cellSize, elapsed, halftonePattern);
      }
      frameId = requestAnimationFrame(drawFrame);
    };

    const startLoop = () => {
      if (running || document.hidden || !visible) return;
      running = true;
      lastFrame = 0;
      lastBackgroundFrame = 0;
      frameId = requestAnimationFrame(drawFrame);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };
    const handlePointerMove = (event: PointerEvent) => {
      targetPointerX = clamp(event.clientX / Math.max(1, window.innerWidth));
      targetPointerY = clamp(event.clientY / Math.max(1, window.innerHeight));
      mousePosRef.current = { x: event.clientX, y: event.clientY };
    };
    const handleVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };

    resize();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    resizeObserver?.observe(host);
    const intersectionObserver = typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible) startLoop();
        else stopLoop();
      }, { rootMargin: "160px" });
    intersectionObserver?.observe(host);
    if (!intersectionObserver) startLoop();

    return () => {
      stopLoop();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
    };
  }, [mousePosRef]);

  return <canvas ref={canvasRef} className="ascii-canvas" aria-hidden="true" />;
}
