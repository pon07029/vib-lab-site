"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import type { Person } from "../../content/people";
import { cn } from "../../lib/utils";

type MentorsSectionProps = {
  people: Person[];
};

function MentorCard({ person }: { person: Person }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="mentor-card"
    >
      <div className="mentor-card__portrait">
        <img src={person.image} alt={`${person.name} portrait`} />
        <i aria-hidden="true">{person.id}</i>
      </div>
      <p className="mentor-card__role">{person.role}</p>
      <h3>{person.name}</h3>
      <p className="mentor-card__focus">{person.focus}</p>
      <div className="mentor-card__projects"><span>CONNECTED PROJECTS</span><p>{person.projects.join(" · ")}</p></div>
      <p className="mentor-card__bio">{person.bio}</p>
    </motion.article>
  );
}

export function MentorsSection({ people }: MentorsSectionProps) {
  const categories = Array.from(new Set(people.map((person) => person.role)));
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredPeople = activeCategory === "All" ? people : people.filter((person) => person.role === activeCategory);

  return (
    <div className="mentors-section">
      <div className="mentors-section__header">
        <div><p className="eyebrow">PEOPLE DIRECTORY</p><h2>Lab members</h2></div>
        <p>Different fields, shared questions. Filter the directory by working role.</p>
      </div>
      <div className="mentors-section__filters" aria-label="People role filters">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            type="button"
            aria-label={`${category} members`}
            aria-pressed={activeCategory === category}
            className={cn(activeCategory === category && "is-active")}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <motion.div layout className="mentor-card-grid mentor-card-grid--stable">
        <AnimatePresence mode="popLayout">
          {filteredPeople.map((person) => <MentorCard key={person.id} person={person} />)}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
