"use client";

import { useEffect, useRef } from "react";

const CAT_SIZE = 64;
const WALK_SPEED = 110;

export function CyberCatCursor() {
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cat = catRef.current;
    if (!cat || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const target = { x: window.innerWidth * 0.72, y: window.innerHeight * 0.7 };
    const current = { ...target };
    let frameId = 0;
    let previousFrameAt = 0;
    let facing = 1;

    const updateTarget = (event: PointerEvent) => {
      target.x = Math.max(28, Math.min(window.innerWidth - 28, event.clientX));
      target.y = Math.max(32, Math.min(window.innerHeight - 24, event.clientY));
      cat.style.opacity = "1";
    };

    const animate = (now: number) => {
      const elapsed = previousFrameAt ? Math.min((now - previousFrameAt) / 1000, 0.05) : 0;
      previousFrameAt = now;
      const distanceX = target.x - current.x;
      const distanceY = target.y - current.y;
      const distance = Math.hypot(distanceX, distanceY);

      if (Math.abs(distanceX) > 2) facing = distanceX > 0 ? 1 : -1;

      const resting = distance < 7;
      const walking = !resting;
      if (walking) {
        const step = Math.min(distance, WALK_SPEED * elapsed);
        current.x += distanceX / distance * step;
        current.y += distanceY / distance * step;
      }

      cat.dataset.motion = resting ? "rest" : walking ? "walk" : "idle";
      cat.style.transform = `translate3d(${current.x - CAT_SIZE * 0.42}px, ${current.y - CAT_SIZE * 0.78}px, 0) scaleX(${facing})`;
      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", updateTarget, { passive: true });
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", updateTarget);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div ref={catRef} className="cyber-cat-cursor" data-motion="idle" aria-hidden="true">
      <span className="cyber-cat-cursor__sprite" />
    </div>
  );
}
