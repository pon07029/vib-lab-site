"use client";

import { useState } from "react";
import type { Publication } from "../content/publications";
import { wrapIndex } from "../lib/interaction";

export function PublicationCarousel({ publications }: { publications: Publication[] }) {
  const groupCount = Math.max(1, Math.ceil(publications.length / 2));
  const [group, setGroup] = useState(0);
  const visible = publications.slice(group * 2, group * 2 + 2);
  const move = (delta: number) => setGroup((current) => wrapIndex(current + delta, groupCount));

  return (
    <div className="publication-carousel">
      <div className="publication-carousel__viewport">
        {visible.map((publication, index) => (
          <article className="publication-carousel__card" key={publication.id}>
            <div className="publication-carousel__top"><span>{publication.area}</span><span>{publication.year}</span></div>
            <blockquote>{publication.contribution}</blockquote>
            <div className="publication-carousel__citation">
              <span>0{group * 2 + index + 1}</span>
              <div><strong>{publication.title}</strong><small>{publication.authors}<br />{publication.journal}</small></div>
            </div>
          </article>
        ))}
      </div>
      <div className="publication-carousel__controls">
        <button type="button" aria-label="Previous publications" onClick={() => move(-1)}>←</button>
        <div role="status" aria-live="polite">{String(group + 1).padStart(2, "0")} / {String(groupCount).padStart(2, "0")}</div>
        <button type="button" aria-label="Next publications" onClick={() => move(1)}>→</button>
      </div>
    </div>
  );
}
