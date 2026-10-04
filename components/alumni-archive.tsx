"use client";

import { useState } from "react";

import type { Alumnus } from "../content/people";
import { cn } from "../lib/utils";

type AlumniArchiveProps = { alumni: Alumnus[] };

export const ALUMNI_AFFILIATIONS = [
  "All",
  "SNU",
  "University of Utah",
] as const;

export type AlumniFilter = (typeof ALUMNI_AFFILIATIONS)[number];

export function AlumniArchive({ alumni }: AlumniArchiveProps) {
  const [activeFilter, setActiveFilter] = useState<AlumniFilter>("All");

  const filteredAlumni =
    activeFilter === "All"
      ? alumni
      : alumni.filter((alumnus) => alumnus.affiliation === activeFilter);

  return (
    <section className="alumni-archive" aria-labelledby="alumni-heading">
      <div className="alumni-archive__intro">
        <p className="eyebrow">PEOPLE / 02</p>
        <h2 id="alumni-heading">Alumni<br />archive</h2>
        <p>The people who carried VIB Lab&apos;s questions forward. A distinct record of the lab&apos;s research community.</p>
        <div className="alumni-archive__filters" role="group" aria-label="Alumni affiliation filters">
          {ALUMNI_AFFILIATIONS.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-label={filter === "All" ? "All alumni" : `${filter} alumni`}
              aria-pressed={activeFilter === filter}
              className={cn(activeFilter === filter && "is-active")}
              onClick={(e) => {
                e.preventDefault();
                setActiveFilter(filter);
              }}
            >
              {filter}
            </button>
          ))}
        </div>
        <p className="alumni-archive__count">{String(filteredAlumni.length).padStart(2, "0")} RECORDS</p>
      </div>
      <ol className="alumni-archive__list">
        {filteredAlumni.map((alumnus) => {
          const originalIndex = alumni.findIndex((item) => item.id === alumnus.id);
          const displayIndex = originalIndex >= 0 ? originalIndex : 0;
          return (
            <li key={alumnus.id}>
              <span>{String(displayIndex + 1).padStart(2, "0")}</span>
              <h3>{alumnus.name}</h3>
              <p>
                <span className="alumni-archive__credential">{alumnus.credential} / Alumni</span>
                <span
                  className={cn(
                    "alumni-archive__institution",
                    alumnus.affiliation === "SNU"
                      ? "alumni-archive__institution--snu"
                      : "alumni-archive__institution--utah"
                  )}
                >
                  {alumnus.affiliation}
                </span>
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

