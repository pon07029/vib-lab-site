"use client";

import { useEffect, useRef } from "react";
import {
  tunnelGlyph,
  tunnelOrbitAngle,
  tunnelPhrase,
  tunnelRingGeometry,
  tunnelSlotCount,
} from "../lib/interaction";

type OrbitLayer = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
};

type FlashCandidate = {
  id: string;
  layer: OrbitLayer;
  x: number;
  y: number;
  angle: number;
  fontSize: number;
  character: string;
  alpha: number;
};

export function DataTunnel({ words }: { words: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clockwiseBaseRef = useRef<HTMLCanvasElement>(null);
  const counterBaseRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvases = [
      clockwiseBaseRef.current,
      counterBaseRef.current,
    ];
    if (!container || canvases.some((canvas) => !canvas)) return;

    const layers = canvases.map((canvas) => {
      const context = canvas?.getContext("2d");
      return canvas && context ? { canvas, context } : null;
    });
    if (layers.some((layer) => !layer)) return;

    const [clockwiseBase, counterBase] = layers as OrbitLayer[];
    let resizeAnimation = 0;
    let flashTimer = 0;
    let flashCandidates: FlashCandidate[] = [];
    let activeFlashes: FlashCandidate[] = [];

    const configureLayer = (layer: OrbitLayer, size: number, ratio: number) => {
      layer.canvas.width = Math.max(1, Math.round(size * ratio));
      layer.canvas.height = Math.max(1, Math.round(size * ratio));
      layer.canvas.style.width = `${size}px`;
      layer.canvas.style.height = `${size}px`;
      layer.context.setTransform(ratio, 0, 0, ratio, 0, 0);
      layer.context.clearRect(0, 0, size, size);
      layer.context.textAlign = "center";
      layer.context.textBaseline = "middle";
    };

    const renderField = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      const ringCount = 24;
      const phrase = tunnelPhrase(words);
      const outerRing = tunnelRingGeometry(ringCount - 1, ringCount, width, height);
      const fieldSize = Math.ceil((outerRing.radiusX + outerRing.fontSize * 2.5) * 2);
      const center = fieldSize / 2;

      const orbitLayers = [clockwiseBase, counterBase];
      orbitLayers.forEach((layer) => configureLayer(layer, fieldSize, ratio));
      flashCandidates = [];
      activeFlashes = [];

      for (let ring = ringCount - 1; ring >= 0; ring -= 1) {
        const { progress, radiusX, radiusY, fontSize } = tunnelRingGeometry(ring, ringCount, width, height);
        const alpha = 0.64 + progress * 0.35;
        const segments = tunnelSlotCount(radiusX, radiusY, fontSize);
        const oddRing = ring % 2 === 0;
        const baseLayer = oddRing ? clockwiseBase : counterBase;
        baseLayer.context.font = `500 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;

        for (let segment = 0; segment < segments; segment += 1) {
          const angle = tunnelOrbitAngle(segment, segments, ring, 0);
          const character = tunnelGlyph(phrase, segment + ring * 17);
          const x = center + Math.cos(angle) * radiusX;
          const y = center + Math.sin(angle) * radiusY;
          const target = baseLayer.context;

          target.save();
          target.translate(x, y);
          target.rotate(angle + Math.PI / 2);
          if (character === "·") {
            target.fillStyle = `rgba(248,248,246,${alpha * 0.38})`;
            target.beginPath();
            target.arc(0, 0, Math.max(0.7, fontSize * 0.075), 0, Math.PI * 2);
            target.fill();
          } else {
            target.fillStyle = `rgba(248,248,246,${alpha})`;
            target.fillText(character, 0, 0);
          }
          target.restore();

          flashCandidates.push({
            id: `${ring}-${segment}`,
            layer: baseLayer,
            x,
            y,
            angle,
            fontSize,
            character,
            alpha,
          });
        }
      }
    };

    const paintCandidate = (candidate: FlashCandidate, visible: boolean) => {
      const { context } = candidate.layer;
      context.save();
      context.translate(candidate.x, candidate.y);
      context.rotate(candidate.angle + Math.PI / 2);
      if (!visible) {
        const clearWidth = candidate.character === "·" ? 6 : candidate.fontSize * 0.68;
        const clearHeight = candidate.character === "·" ? 6 : candidate.fontSize * 1.24;
        context.clearRect(-clearWidth / 2, -clearHeight / 2, clearWidth, clearHeight);
      } else if (candidate.character === "·") {
        context.fillStyle = `rgba(248,248,246,${candidate.alpha * 0.38})`;
        context.beginPath();
        context.arc(0, 0, Math.max(0.7, candidate.fontSize * 0.075), 0, Math.PI * 2);
        context.fill();
      } else {
        context.font = `500 ${candidate.fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
        context.fillStyle = `rgba(248,248,246,${candidate.alpha})`;
        context.fillText(candidate.character, 0, 0);
      }
      context.restore();
    };

    const randomizeFlashes = () => {
      activeFlashes.forEach((candidate) => paintCandidate(candidate, true));
      if (flashCandidates.length === 0) return;

      const previousIds = new Set(activeFlashes.map((candidate) => candidate.id));
      const nextFlashes: FlashCandidate[] = [];
      const nextIds = new Set<string>();
      const flashCount = Math.max(4, Math.min(12, Math.round(flashCandidates.length * 0.004)));
      let attempts = 0;
      while (nextFlashes.length < flashCount && attempts < flashCandidates.length * 2) {
        const candidate = flashCandidates[Math.floor(Math.random() * flashCandidates.length)];
        attempts += 1;
        if (previousIds.has(candidate.id) || nextIds.has(candidate.id)) continue;
        nextIds.add(candidate.id);
        nextFlashes.push(candidate);
      }
      activeFlashes = nextFlashes;
      activeFlashes.forEach((candidate) => paintCandidate(candidate, false));
    };

    const scheduleResize = () => {
      cancelAnimationFrame(resizeAnimation);
      resizeAnimation = requestAnimationFrame(renderField);
    };

    renderField();
    randomizeFlashes();
    flashTimer = window.setInterval(randomizeFlashes, 100);
    window.addEventListener("resize", scheduleResize);
    return () => {
      window.removeEventListener("resize", scheduleResize);
      cancelAnimationFrame(resizeAnimation);
      window.clearInterval(flashTimer);
      layers.forEach((layer) => {
        if (layer) {
          layer.canvas.width = 1;
          layer.canvas.height = 1;
        }
      });
    };
  }, [words]);

  return (
    <div ref={containerRef} className="data-tunnel" role="img" aria-label="Veterinary data field">
      <canvas ref={clockwiseBaseRef} className="data-tunnel__orbit-layer is-clockwise" aria-hidden="true" />
      <canvas ref={counterBaseRef} className="data-tunnel__orbit-layer is-counterclockwise" aria-hidden="true" />
      <div className="data-tunnel__status" aria-hidden="true"><span>VETERINARY DATA FIELD</span><span>LIVE / 06 PROJECTS</span></div>
      <p className="sr-only">Orbital field containing the words {words.join(", ")}.</p>
    </div>
  );
}
