"use client";

import { useState } from "react";
import type { Notice } from "../content/notices";

export function NoticeAccordion({ notices }: { notices: Notice[] }) {
  const [openId, setOpenId] = useState(notices[0]?.id ?? "");

  return (
    <div className="notice-accordion">
      {notices.map((notice, index) => {
        const open = notice.id === openId;
        return (
          <article key={notice.id} className={open ? "is-open" : ""}>
            <button type="button" aria-label={notice.title} aria-expanded={open} aria-controls={`${notice.id}-panel`} onClick={() => setOpenId(notice.id)}>
              <span>0{index + 1}</span>
              <strong>{notice.title}</strong>
              <small>{notice.date} / {notice.category}</small>
              <i>{open ? "−" : "+"}</i>
            </button>
            <div id={`${notice.id}-panel`} hidden={!open}>
              <p>{notice.body}</p>
              <a href="/notice">OPEN LAB LOG ↗</a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
