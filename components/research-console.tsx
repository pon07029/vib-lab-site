"use client";

import { useState } from "react";
import type { Project } from "../content/projects";

const tabs = ["Project", "Methods", "Data", "Researchers"] as const;
type Tab = (typeof tabs)[number];

export function ResearchConsole({ projects, initialSlug = "aichatvet" }: { projects: Project[]; initialSlug?: string }) {
  const [projectSlug, setProjectSlug] = useState(initialSlug);
  const [tab, setTab] = useState<Tab>("Project");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [view, setView] = useState<"RESEARCH" | "GRAPH">("RESEARCH");
  const project = projects.find((item) => item.slug === projectSlug) ?? projects[0];
  const entries = tab === "Methods" ? project.methods : tab === "Data" ? project.data : tab === "Researchers" ? project.participants : [];

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const next = (index + delta + tabs.length) % tabs.length;
    setTab(tabs[next]);
    document.getElementById(`console-tab-${tabs[next]}`)?.focus();
  };

  return (
    <div className="research-console">
      <div className="research-console__bar">
        <span className="console-dots"><i /><i /><i /></span>
        <span className="research-console__view-switch">
          <button type="button" className={view === "RESEARCH" ? "is-active" : ""} onClick={() => setView("RESEARCH")}>Research</button>
          <button type="button" className={view === "GRAPH" ? "is-active" : ""} onClick={() => setView("GRAPH")}>Graph</button>
        </span>
        <button className="research-console__terminal-toggle" type="button" onClick={() => setTerminalOpen((open) => !open)}>{terminalOpen ? "Hide terminal" : "Show terminal"}</button>
      </div>
      <div className="research-console__body">
        <aside className="research-console__tree">
          <p>ACTIVE_PROJECTS</p>
          {projects.map((item) => (
            <button key={item.slug} type="button" aria-label={item.name} className={item.slug === project.slug ? "is-active" : ""} onClick={() => setProjectSlug(item.slug)}>
              <span>{item.index}</span>{item.name}
            </button>
          ))}
          <div className="research-console__tree-meta"><span>STATUS</span><strong>06 / ACTIVE</strong></div>
        </aside>
        <div className="research-console__workspace">
          <div className="research-console__tabs" role="tablist" aria-label="Project details">
            {tabs.map((item, index) => (
              <button id={`console-tab-${item}`} key={item} type="button" role="tab" aria-selected={tab === item} onClick={() => setTab(item)} onKeyDown={(event) => onTabKeyDown(event, index)}>
                {item}
              </button>
            ))}
          </div>
          <div className={`research-console__document research-console__document--${view.toLowerCase()}`} role="tabpanel" key={`${project.slug}-${tab}-${view}`}>
            <div className="research-console__line-numbers" aria-hidden="true">01<br />02<br />03<br />04<br />05<br />06<br />07<br />08<br />09</div>
            <div className="research-console__content">
              <p className="console-path">projects/{project.slug}/{tab.toLowerCase()}.md</p>
              <h3>{project.name}</h3>
              {tab === "Project" ? (
                <>
                  <p className="console-lead">{project.summary}</p>
                  <p>{project.description}</p>
                  <div className="console-impact"><span>IMPACT</span><p>{project.impact}</p></div>
                </>
              ) : (
                <ol className="console-list">
                  {entries.map((entry, index) => <li key={entry}><span>0{index + 1}</span>{entry}</li>)}
                </ol>
              )}
            </div>
          </div>
          {terminalOpen && <div className="research-console__terminal" role="region" aria-label="Research terminal">
            <span>$</span><span>open {project.slug}/{tab.toLowerCase()}</span><i>READY</i>
          </div>}
        </div>
      </div>
    </div>
  );
}
