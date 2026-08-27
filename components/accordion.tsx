"use client";

import { useState } from "react";

export type AccordionItem = {
  id: string;
  title: string;
  body: string;
  meta?: string;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? "");

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const open = item.id === openId;
        return (
          <article key={item.id} className={`accordion__item ${open ? "is-open" : ""}`}>
            <button type="button" aria-label={item.title} aria-expanded={open} aria-controls={`accordion-panel-${item.id}`} onClick={() => setOpenId(item.id)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
              {item.meta && <small>{item.meta}</small>}
              <i aria-hidden="true">{open ? "−" : "+"}</i>
            </button>
            <div id={`accordion-panel-${item.id}`} className="accordion__panel" aria-hidden={!open}>
              <div><span>ENTRY / {String(index + 1).padStart(2, "0")}</span><p>{item.body}</p></div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
