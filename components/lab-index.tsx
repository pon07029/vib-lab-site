"use client";

import { useEffect, useRef, useState } from "react";
import { labIndex, site } from "../content/site";

type LabIndexProps = { open: boolean; onClose: () => void };

export function LabIndex({ open, onClose }: LabIndexProps) {
  const [active, setActive] = useState(labIndex[0].id);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("dialog-open");
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("dialog-open");
      previous?.focus();
    };
  }, [open, onClose]);

  const selected = labIndex.find((item) => item.id === active) ?? labIndex[0];

  return (
    <div className={`lab-index ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button className="lab-index__backdrop" aria-label="Close lab index" onClick={onClose} tabIndex={open ? 0 : -1} />
      <div className="lab-index__panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="lab-index-title">
        <div className="lab-index__rail" role="tablist" aria-label="Lab index sections">
          <div className="lab-index__rail-mark" aria-hidden="true">VIB / INDEX</div>
          {labIndex.map((item, index) => (
            <button key={item.id} type="button" role="tab" aria-selected={active === item.id} className={active === item.id ? "is-active" : ""} onClick={() => setActive(item.id)}>
              <span>0{index + 1}</span>{item.label}
            </button>
          ))}
        </div>
        <div className="lab-index__content" role="tabpanel">
          <div className="lab-index__topline">
            <span>LAB INFORMATION</span>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close lab index">CLOSE ×</button>
          </div>
          <div className="lab-index__copy">
            <p className="eyebrow">{selected.label}</p>
            <h2 id="lab-index-title">{selected.heading}</h2>
            <p>{selected.body}</p>
          </div>
          <div className="lab-index__contact">
            <span>PUBLIC CONTACT</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <small>{site.affiliation}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
