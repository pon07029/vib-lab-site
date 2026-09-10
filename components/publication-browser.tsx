"use client";

import { useMemo, useState } from "react";
import type { Publication } from "../content/publications";

export function PublicationBrowser({ publications }: { publications: Publication[] }) {
  const [year, setYear] = useState<number | "All">("All");
  const [type, setType] = useState<Publication["type"] | "All">("All");
  const [yearsExpanded, setYearsExpanded] = useState(false);
  const years = useMemo(
    () => Array.from(new Set(publications.map((item) => item.year))).sort((a, b) => b - a),
    [publications],
  );
  const visibleYears = yearsExpanded ? years : years.slice(0, 5);
  const hasOlderYears = years.length > 5;
  const types = useMemo(() => Array.from(new Set(publications.map((item) => item.type))), [publications]);
  const filtered = publications.filter((item) => (year === "All" || item.year === year) && (type === "All" || item.type === type));
  const [selectedId, setSelectedId] = useState(publications[0]?.id ?? "");
  const selected = filtered.find((item) => item.id === selectedId) ?? filtered[0];

  return (
    <div className="publication-browser">
      <div className="publication-browser__toolbar">
        <div><span>YEAR</span><button className={year === "All" ? "is-active" : ""} onClick={() => setYear("All")}>ALL</button>{visibleYears.map((item) => <button key={item} className={year === item ? "is-active" : ""} onClick={() => setYear(item)}>{item}</button>)}{hasOlderYears && <button type="button" className="publication-browser__year-toggle" aria-label={yearsExpanded ? "Show fewer publication years" : "Show all publication years"} aria-expanded={yearsExpanded} onClick={() => setYearsExpanded((expanded) => !expanded)}>{yearsExpanded ? "−" : "+"}</button>}</div>
        <div><span>TYPE</span><button className={type === "All" ? "is-active" : ""} onClick={() => setType("All")}>ALL</button>{types.map((item) => <button key={item} className={type === item ? "is-active" : ""} onClick={() => setType(item)}>{item}</button>)}</div>
        <p>{String(filtered.length).padStart(2, "0")} RECORDS</p>
      </div>
      <div className="publication-browser__body">
        <div className="publication-list">
          {filtered.map((item, index) => (
            <button key={item.id} type="button" className={selected?.id === item.id ? "is-active" : ""} onMouseEnter={() => setSelectedId(item.id)} onFocus={() => setSelectedId(item.id)} onClick={() => setSelectedId(item.id)}>
              <span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong><small>{item.year}<br />{item.type}</small>
            </button>
          ))}
          {!filtered.length && <p className="publication-list__empty">No records in this filter.</p>}
        </div>
        <aside className="publication-preview" aria-live="polite">
          {selected && <>
            <div className="publication-preview__status"><span>SELECTED RECORD</span><i>● READ</i></div>
            <p className="eyebrow">{selected.year} / {selected.type}</p>
            <h2>{selected.title}</h2>
            <blockquote>“{selected.contribution}”</blockquote>
            <div><span>AUTHORS</span><p>{selected.authors}</p><span>JOURNAL</span><p>{selected.journal}</p></div>
            {selected.url && <a href={selected.url} target="_blank" rel="noreferrer">Open record ↗</a>}
          </>}
        </aside>
      </div>
    </div>
  );
}
