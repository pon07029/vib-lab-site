"use client";

import { useState } from "react";
import type { Project } from "../content/projects";
import { AsciiDitherBackground } from "./ascii-dither-background";

type ResearchPulseProps = { projects: Project[] };

export function ResearchPulse({ projects }: ResearchPulseProps) {
  const [selectedSlug, setSelectedSlug] = useState(projects[0]?.slug ?? "");
  const selected = projects.find((project) => project.slug === selectedSlug) ?? projects[0];

  return (
    <div className="research-pulse">
      <AsciiDitherBackground />
      <div className="research-pulse__topline"><span>VIB LAB / CURRENT RESEARCH</span></div>
      <div className="research-pulse__intro">
        <p className="eyebrow">WHAT WE ARE WORKING ON</p>
        <h2>Select a project.</h2>
      </div>
      <div className="research-pulse__list">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            aria-label={`Select ${project.name}`}
            className={project.slug === selected.slug ? "is-active" : ""}
            onClick={() => setSelectedSlug(project.slug)}
            style={{ marginLeft: `${(index % 3) * 13}%` }}
          >
            <span>{project.index}</span>
            <strong>{project.name}</strong>
            <i>↗</i>
          </button>
        ))}
      </div>
      <div className="research-pulse__selection" role="status" aria-live="polite" key={selected.slug}>
        <span>{selected.descriptor}</span>
        <div className="research-pulse__tags">
          {selected.summary
            .split(/[\/|]/)
            .map((item) => item.trim())
            .filter(Boolean)
            .map((tag) => (
              <span key={tag} className="research-pulse__tag">
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
