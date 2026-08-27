"use client";

import { useMemo, useState } from "react";
import type { Project } from "../content/projects";

export function ResearchField({ projects }: { projects: Project[] }) {
  const [selectedSlug, setSelectedSlug] = useState(projects[0]?.slug ?? "");
  const selected = projects.find((project) => project.slug === selectedSlug) ?? projects[0];
  const fieldWords = useMemo(
    () => [...selected.fieldKeywords, ...selected.technologyKeywords, ...selected.methods],
    [selected],
  );

  return (
    <div className="research-field">
      <div className="research-field__grid" aria-hidden="true">
        {Array.from({ length: 54 }, (_, index) => (
          <span
            key={`${selected.slug}-${index}`}
            style={{
              left: `${7 + ((index * 37) % 86)}%`,
              top: `${8 + ((index * 53) % 82)}%`,
              opacity: 0.18 + ((index * 7) % 10) / 22,
              transform: `translate(-50%,-50%) rotate(${((index * 11) % 13) - 6}deg)`,
            }}
          >
            {fieldWords[index % fieldWords.length]}
          </span>
        ))}
      </div>
      <div className="research-field__header">
        <span>INTERACTIVE RESEARCH FIELD</span>
        <span>SELECT PROJECT / 001—006</span>
      </div>
      <div className="research-field__projects" aria-label="Research projects">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            className={selected.slug === project.slug ? "is-active" : ""}
            onClick={() => setSelectedSlug(project.slug)}
            aria-pressed={selected.slug === project.slug}
            aria-label={project.name}
          >
            <span>{project.index}</span>
            <strong>{project.name}</strong>
            <i style={{ height: `${36 + index * 11}px` }} />
          </button>
        ))}
      </div>
      <div className="research-field__selection" key={selected.slug}>
        <p className="eyebrow">SELECTED PROJECT / {selected.index}</p>
        <h2>{selected.name}</h2>
        <p>{selected.descriptor}</p>
        <div className="research-field__tags">
          {selected.technologyKeywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
        </div>
        {selected.slug !== projects[0].slug && (
          <button className="text-action text-action--light" type="button" aria-label="Reset to AIChatVet" onClick={() => setSelectedSlug(projects[0].slug)}>
            Reset to AIChatVet <span>↗</span>
          </button>
        )}
      </div>
    </div>
  );
}
