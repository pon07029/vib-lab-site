"use client";

import { useState } from "react";
import type { Publication } from "../content/publications";

export function PublicationRail({ publications }: { publications: Publication[] }) {
  const [index, setIndex] = useState(0);
  const item = publications[index];
  const move = (delta: number) => setIndex((current) => (current + delta + publications.length) % publications.length);

  return (
    <div className="publication-rail">
      <div className="publication-rail__meta"><span>RECENT IMPACT</span><span>{String(index + 1).padStart(2, "0")} / {String(publications.length).padStart(2, "0")}</span></div>
      <article className="publication-card" key={item.id}>
        <div className="publication-card__year">{item.year}</div>
        <p className="publication-card__area">{item.area}</p>
        <blockquote>“{item.contribution}”<span className="typing-cursor" aria-hidden="true" /></blockquote>
        <div className="publication-card__citation"><strong>{item.title}</strong><span>{item.authors}</span><small>{item.journal}</small></div>
      </article>
      <div className="publication-rail__controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous publication">←</button>
        <div><i style={{ transform: `scaleX(${(index + 1) / publications.length})` }} /></div>
        <button type="button" onClick={() => move(1)} aria-label="Next publication">→</button>
      </div>
    </div>
  );
}
