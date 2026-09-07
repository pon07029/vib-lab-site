"use client";

import { useEffect, useRef } from "react";

import {
  ASCII_DITHER_PRESET,
  ASCII_RENDER_MODES,
  renderAsciiFrame,
  type AsciiCanvasBuffers,
} from "../lib/ascii-art";

const SOURCE = "/research-pulse-cat.png";
const FRAME_INTERVAL = 1000 / 30;

function createBuffers(): AsciiCanvasBuffers {
  return {
    plain: document.createElement("canvas"),
    sample: document.createElement("canvas"),
    effect: document.createElement("canvas"),
    work: document.createElement("canvas"),
    auxiliary: document.createElement("canvas"),
  };
}

export function AsciiDitherBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const context = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!context) return;

    const buffers = createBuffers();
    const sourceImage = new Image();
    sourceImage.decoding = "async";
    sourceImage.src = SOURCE;

    const maskImage = new Image();
    if (ASCII_DITHER_PRESET.mask.enabled && ASCII_DITHER_PRESET.mask.dataUrl) {
      maskImage.crossOrigin = "anonymous";
      maskImage.decoding = "async";
      maskImage.src = ASCII_DITHER_PRESET.mask.dataUrl;
    }

    let width = 1;
    let height = 1;
    let ratio = 1;
    let frameId = 0;
    let lastFrame = 0;
    let running = false;
    let visible = true;
    let sourceReady = false;
    let maskReady = false;
    const matrixHeads: number[] = [];
    const startedAt = performance.now();

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.imageSmoothingEnabled = false;
      matrixHeads.length = Math.ceil(width / ASCII_DITHER_PRESET.cellSize);
    };

    const draw = (now: number) => {
      if (!running) return;
      if (!lastFrame || now - lastFrame >= FRAME_INTERVAL) {
        lastFrame = now;
        renderAsciiFrame({
          context,
          width,
          height,
          time: (now - startedAt) / 1000,
          source: sourceReady ? sourceImage : null,
          mask: maskReady ? maskImage : null,
          buffers,
          matrixHeads,
          config: ASCII_DITHER_PRESET,
        });
      }
      frameId = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || document.hidden || !visible) return;
      running = true;
      lastFrame = 0;
      frameId = requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    const handleVisibility = () => document.hidden ? stop() : start();

    sourceImage.onload = () => { sourceReady = true; start(); };
    sourceImage.onerror = () => { sourceReady = false; start(); };
    maskImage.onload = () => { maskReady = true; };
    maskImage.onerror = () => { maskReady = false; };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    resizeObserver?.observe(host);
    const intersectionObserver = typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(([entry]) => {
          visible = Boolean(entry?.isIntersecting);
          visible ? start() : stop();
        }, { rootMargin: "180px" });
    intersectionObserver?.observe(host);
    if (!intersectionObserver) start();

    return () => {
      stop();
      sourceImage.onload = null;
      sourceImage.onerror = null;
      maskImage.onload = null;
      maskImage.onerror = null;
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ascii-dither-canvas"
      aria-hidden="true"
      data-render-mode={ASCII_DITHER_PRESET.renderMode}
      data-cell-size={ASCII_DITHER_PRESET.cellSize}
      data-animation={ASCII_DITHER_PRESET.animStyle}
      data-source={SOURCE}
      data-ascii-engine="full-pipeline"
      data-render-mode-count={ASCII_RENDER_MODES.length}
    />
  );
}
