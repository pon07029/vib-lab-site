"use client";

import { useMemo, useState } from "react";
import type { Publication } from "../content/publications";

export function PublicationBrowser({ publications }: { publications: Publication[] }) {
  const [year, setYear] = useState<number | "All">("All");
  const [area, setArea] = useState<Publication["area"] | "All">("All");
  const years = useMemo(() => Array.from(new Set(publications.map((item) => item.year))), [publications]);
  const areas = useMemo(() => Array.from(new Set(publications.map((item) => item.area))), [publications]);
  const filtered = publications.filter((item) => (year === "All" || item.year === year) && (area === "All" || item.area === area));
  const [selectedId, setSelectedId] = useState(publications[0]?.id ?? "");
  const selected = filtered.find((item) => item.id === selectedId) ?? filtered[0];

  return (
    <div className="publication-browser">
      <div className="publication-browser__toolbar">
        <div><span>YEAR</span><button className={year === "All" ? "is-active" : ""} onClick={() => setYear("All")}>ALL</button>{years.map((item) => <button key={item} className={year === item ? "is-active" : ""} onClick={() => setYear(item)}>{item}</button>)}</div>
        <div><span>FIELD</span><button className={area === "All" ? "is-active" : ""} onClick={() => setArea("All")}>ALL</button>{areas.map((item) => <button key={item} className={area === item ? "is-active" : ""} onClick={() => setArea(item)}>{item}</button>)}</div>
        <p>{String(filtered.length).padStart(2, "0")} RECORDS</p>
      </div>
      <div className="publication-browser__body">
        <div className="publication-list">
          {filtered.map((item, index) => (
            <button key={item.id} type="button" className={selected?.id === item.id ? "is-active" : ""} onMouseEnter={() => setSelectedId(item.id)} onFocus={() => setSelectedId(item.id)} onClick={() => setSelectedId(item.id)}>
              <span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong><small>{item.year}<br />{item.area}</small>
            </button>
          ))}
          {!filtered.length && <p className="publication-list__empty">No records in this filter.</p>}
        </div>
        <aside className="publication-preview" aria-live="polite">
          {selected && <>
            <div className="publication-preview__status"><span>SELECTED RECORD</span><i>● READ</i></div>
            <p className="eyebrow">{selected.year} / {selected.area}</p>
            <h2>{selected.title}</h2>
            <blockquote>“{selected.contribution}”</blockquote>
            <div><span>AUTHORS</span><p>{selected.authors}</p><span>JOURNAL</span><p>{selected.journal}</p></div>
            {selected.doi && <a href={selected.doi} target="_blank" rel="noreferrer">Open DOI ↗</a>}
          </>}
        </aside>
      </div>
    </div>
  );
}
