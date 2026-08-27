"use client";

import { useEffect, useRef, useState } from "react";
import type { Person } from "../content/people";

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 3).toUpperCase();
}

export function PersonGrid({ people }: { people: Person[] }) {
  const [selected, setSelected] = useState<Person | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  const roles: Person["role"][] = ["Researcher", "Student", "Lab Member"];

  return <>
    <div className="person-groups">
      {roles.map((role) => (
        <section className="person-group" key={role}>
          <div className="person-group__label"><span>{role}</span><small>{String(people.filter((person) => person.role === role).length).padStart(2, "0")}</small></div>
          <div className="person-grid">
            {people.filter((person) => person.role === role).map((person, index) => (
              <button key={person.id} type="button" className="person-card" onClick={() => setSelected(person)}>
                <div className="person-card__portrait" aria-hidden="true">
                  <span>{initials(person.name)}</span>
                  {Array.from({ length: 14 }, (_, line) => <i key={line} style={{ width: `${38 + ((line * 19 + index * 11) % 56)}%` }}>{initials(person.name)}·{String(line).padStart(2,"0")}</i>)}
                </div>
                <div className="person-card__copy"><span>{person.role}</span><strong>{person.name}</strong><p>{person.focus}</p><i>OPEN PROFILE +</i></div>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
    <div className={`person-panel ${selected ? "is-open" : ""}`} aria-hidden={!selected}>
      <button className="person-panel__backdrop" type="button" aria-label="Close person profile" onClick={() => setSelected(null)} tabIndex={selected ? 0 : -1} />
      <aside role="dialog" aria-modal="true" aria-label={selected ? `${selected.name} profile` : "Person profile"}>
        {selected && <>
          <div className="person-panel__top"><span>PEOPLE / {selected.role}</span><button ref={closeRef} type="button" onClick={() => setSelected(null)}>CLOSE ×</button></div>
          <div className="person-panel__monogram" aria-hidden="true">{initials(selected.name)}</div>
          <div className="person-panel__copy"><p className="eyebrow">{selected.role}</p><h2>{selected.name}</h2><p>{selected.bio}</p></div>
          <dl><div><dt>RESEARCH FOCUS</dt><dd>{selected.focus}</dd></div><div><dt>PROJECTS</dt><dd>{selected.projects.join(" / ")}</dd></div></dl>
        </>}
      </aside>
    </div>
  </>;
}
