"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "../content/projects";

function ProjectSignal({ project, active }: { project: Project; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window.CanvasRenderingContext2D === "undefined") return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let request = 0;
    let frame = 0;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(rect.width * ratio) || canvas.height !== Math.round(rect.height * ratio)) {
        canvas.width = Math.max(1, Math.round(rect.width * ratio));
        canvas.height = Math.max(1, Math.round(rect.height * ratio));
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      }
      const width = rect.width;
      const height = rect.height;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);
      context.strokeStyle = "rgba(241,238,231,.16)";
      context.lineWidth = 1;
      for (let row = 0; row < 22; row += 1) {
        context.beginPath();
        for (let column = 0; column < 44; column += 1) {
          const x = (column / 43) * width;
          const signal = Math.sin(column * 0.31 + row * 0.78 + frame * 0.015 + Number(project.index)) * 0.5 + 0.5;
          const y = (row / 21) * height + (signal - 0.5) * 22;
          if (column === 0) context.moveTo(x, y); else context.lineTo(x, y);
        }
        context.strokeStyle = row % 6 === 0 ? "rgba(255,145,0,.58)" : "rgba(241,238,231,.14)";
        context.stroke();
      }
      context.font = "500 11px GeistMono, monospace";
      context.fillStyle = "rgba(241,238,231,.72)";
      context.fillText(`${project.index} / ${project.technologyKeywords.join(" · ")}`, 20, 30);
      frame += active ? 3 : 1;
      request = requestAnimationFrame(draw);
    };
    request = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(request);
  }, [active, project]);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <div className="project-showcase">
      <div className="project-showcase__heading">
        <p className="eyebrow">SELECTED RESEARCH / 06</p>
        <h2>Research systems,<br />seen in context.</h2>
        <p>Move across each project to reveal the current visual study layer.</p>
      </div>
      <div className="project-showcase__grid">
        {projects.map((project) => {
          const active = activeSlug === project.slug;
          return (
            <article
              key={project.slug}
              className={`project-showcase__card ${active ? "is-active" : ""}`}
              aria-label={project.name}
              data-state={active ? "image" : "data"}
              onPointerEnter={() => setActiveSlug(project.slug)}
              onPointerLeave={() => setActiveSlug(null)}
            >
              <a className="project-showcase__link" href={`/research#${project.slug}`} aria-label={`Open ${project.name} project`} onFocus={() => setActiveSlug(project.slug)} onBlur={() => setActiveSlug(null)}>
                <div className="project-showcase__visual">
                  <ProjectSignal project={project} active={active} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/research/${project.slug}.webp`} alt={`${project.name} visual`} />
                  <div className="project-showcase__scan" aria-hidden="true" />
                </div>
                <div className="project-showcase__meta">
                  <span>{project.index}</span>
                  <h3>{project.name}</h3>
                  <p>{project.descriptor}</p>
                  <i>VIEW ↗</i>
                </div>
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
