"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

type MousePosition = { x: number; y: number };

type WebGLCanvasProps = {
  mousePosRef: MutableRefObject<MousePosition>;
};

export function WebGLCanvas({ mousePosRef }: WebGLCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 80;

    const particleCount = 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount * 3; index += 3) {
      positions[index] = (Math.random() - 0.5) * 160;
      positions[index + 1] = (Math.random() - 0.5) * 160;
      positions[index + 2] = (Math.random() - 0.5) * 80;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.2,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
    };

    const handlePointerMove = (event: PointerEvent) => {
      mousePosRef.current = { x: event.clientX, y: event.clientY };
    };

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0004;

      const targetX = (mousePosRef.current.x - window.innerWidth / 2) * 0.03;
      const targetY = -(mousePosRef.current.y - window.innerHeight / 2) * 0.03;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    resize();
    if (mousePosRef.current.x === 0 && mousePosRef.current.y === 0) {
      mousePosRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [mousePosRef]);

  return <canvas ref={canvasRef} className="webgl-canvas" aria-hidden="true" />;
}
