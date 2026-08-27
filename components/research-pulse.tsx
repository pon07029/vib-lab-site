"use client";

import { useState } from "react";
import type { Project } from "../content/projects";
import { NumericField } from "./numeric-field";

type ResearchPulseProps = { projects: Project[] };

export function ResearchPulse({ projects }: ResearchPulseProps) {
  const [selectedSlug, setSelectedSlug] = useState(projects[0]?.slug ?? "");
  const selected = projects.find((project) => project.slug === selectedSlug) ?? projects[0];

  return (
    <div className="research-pulse">
      <NumericField />
      <div className="research-pulse__topline"><span>VIB / ACTIVE RESEARCH</span><span>CLICK THE FIELD</span></div>
      <div className="research-pulse__intro">
        <p className="eyebrow">RESEARCH WITH A CONNECTED PURPOSE</p>
        <h2>One question.<br />Many kinds of evidence.</h2>
      </div>
      <div className="research-pulse__list">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            aria-label={`Select ${project.name}`}
            className={project.slug === selected.slug ? "is-active" : ""}
            onClick={() => setSelectedSlug(project.slug)}
            style={{ marginLeft: `${(index % 3) * 16}%` }}
          >
            <span>{project.index}</span>
            <strong>{project.name}</strong>
            <i>↗</i>
          </button>
        ))}
      </div>
      <div className="research-pulse__selection" role="status" aria-live="polite" key={selected.slug}>
        <span>{selected.descriptor}</span>
        <p>{selected.summary}</p>
      </div>
    </div>
  );
}
