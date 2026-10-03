"use client";

import { useMemo, useState } from "react";
import type { NewsItem } from "../content/news";

export function NewsBrowser({ items }: { items: NewsItem[] }) {
  const [selectedYear, setSelectedYear] = useState<string>("All");

  const years = useMemo(
    () => Array.from(new Set(items.map((item) => item.date.slice(0, 4)))).sort((a, b) => b.localeCompare(a)),
    [items]
  );

  const filtered = items.filter(
    (item) => selectedYear === "All" || item.date.startsWith(selectedYear)
  );

  return (
    <div className="news-browser">
      <div className="news-browser__toolbar">
        <div className="news-browser__filters">
          <div className="news-browser__filter-group">
            <span>YEAR</span>
            <button
              type="button"
              className={selectedYear === "All" ? "is-active" : ""}
              onClick={() => setSelectedYear("All")}
            >
              ALL
            </button>
            {years.map((year) => (
              <button
                key={year}
                type="button"
                className={selectedYear === year ? "is-active" : ""}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <p className="news-browser__count">
          {String(filtered.length).padStart(2, "0")} ARTICLES
        </p>
      </div>

      <div className="news-list">
        {filtered.map((item, index) => (
          <article key={item.id} className="news-card">
            <div className="news-card__header">
              <div className="news-card__badges">
                <span className="news-card__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="news-card__category">{item.category}</span>
                <span className="news-card__source">{item.source}</span>
              </div>
              <time className="news-card__date" dateTime={item.date}>
                {item.date.replace(/-/g, ".")}
              </time>
            </div>

            <h3 className="news-card__title">{item.title}</h3>

            <div className="news-card__body">
              {item.content.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {item.originalLink && (
              <div className="news-card__footer">
                <a
                  href={item.originalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="news-card__link"
                >
                  Read original article ↗
                </a>
              </div>
            )}
          </article>
        ))}

        {!filtered.length && (
          <p className="news-list__empty">No news articles found for the selected filter.</p>
        )}
      </div>
    </div>
  );
}
