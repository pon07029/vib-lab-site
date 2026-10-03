"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import type { Person } from "../../content/people";
import { cn } from "../../lib/utils";

type MentorsSectionProps = {
  people: Person[];
};

export const PEOPLE_CATEGORIES = [
  "All",
  "Professor",
  "Graduate Students",
  "Research Staff",
  "Undergraduate",
  "Developer",
] as const;

export type PeopleCategory = (typeof PEOPLE_CATEGORIES)[number];

function MentorCard({ person }: { person: Person }) {
  if (person.role === "Professor") {
    return (
      <motion.article
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.18 }}
        className="mentor-card mentor-card--professor"
      >
        <div className="mentor-card__portrait mentor-card__portrait--professor">
          <img src={person.image} alt={`${person.name} portrait`} />
          <i aria-hidden="true">{person.id}</i>
        </div>
        <div className="mentor-card__content--professor">
          <p className="mentor-card__role">{person.displayRole || person.role}</p>
          <h3 className="mentor-card__name--professor">{person.name}</h3>
          <p className="mentor-card__bio--professor">{person.bio}</p>
          <div className="mentor-card__footer--professor">
            <div className="mentor-card__email--professor">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <strong>Email</strong>
              <a href={`mailto:${person.email || "amazon@snu.ac.kr"}`}>
                {person.email || "amazon@snu.ac.kr"}
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.18 }}
      className="mentor-card"
    >
      <div className="mentor-card__portrait">
        <img src={person.image} alt={`${person.name} portrait`} />
        <i aria-hidden="true">{person.id}</i>
      </div>
      <p className="mentor-card__role">{person.displayRole || person.role}</p>
      <h3>{person.name}</h3>
      <p className="mentor-card__focus">{person.focus || "\u00A0"}</p>
      <div className="mentor-card__projects">
        <span>CONNECTED PROJECTS</span>
        <p>{person.projects.length ? person.projects.join(" · ") : "—"}</p>
      </div>
      {person.bio ? <p className="mentor-card__bio">{person.bio}</p> : null}
    </motion.article>
  );
}

export function MentorsSection({ people }: MentorsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<PeopleCategory>("All");

  const filteredPeople =
    activeCategory === "All"
      ? people
      : people.filter((person) => person.role === activeCategory);

  const handleCategorySelect = (category: PeopleCategory) => {
    setActiveCategory(category);

    // If user has scrolled down into the lower rows of cards, bring view back to top of directory
    if (typeof window !== "undefined") {
      const section = document.querySelector(".mentors-viewport");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < 60) {
          const targetY = window.scrollY + rect.top - 80;
          window.scrollTo({ top: Math.max(0, targetY), behavior: "instant" });
        }
      }
    }
  };

  return (
    <div className="mentors-section">
      <div className="mentors-section__sidebar">
        <div className="mentors-section__header">
          <div><p className="eyebrow">PEOPLE / 01</p><h2>Lab members</h2></div>
          <p>Filter the directory by working role.</p>
        </div>
        <div className="mentors-section__filters" aria-label="People role filters">
          {PEOPLE_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              aria-label={`${category} members`}
              aria-pressed={activeCategory === category}
              className={cn(activeCategory === category && "is-active")}
              onClick={(e) => {
                e.preventDefault();
                handleCategorySelect(category);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="mentor-card-grid mentor-card-grid--stable">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ display: "contents" }}
          >
            {filteredPeople.map((person) => (
              <MentorCard key={person.id} person={person} />
            ))}
            {filteredPeople.length === 0 && (
              <div
                style={{
                  gridColumn: "1 / -1",
                  padding: "80px 20px",
                  textAlign: "center",
                  color: "rgba(35, 35, 35, 0.45)",
                  font: "500 14px/1.6 var(--font-geist-mono), monospace",
                }}
              >
                No members registered under {activeCategory} yet.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
