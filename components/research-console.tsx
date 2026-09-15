"use client";

import { useState } from "react";
import type { Project } from "../content/projects";

const tabs = ["Project", "Methods", "Data", "Researchers"] as const;
type Tab = (typeof tabs)[number];

export function ResearchConsole({ projects, initialSlug = "aichatvet" }: { projects: Project[]; initialSlug?: string }) {
  const [projectSlug, setProjectSlug] = useState(initialSlug);
  const [tab, setTab] = useState<Tab>("Project");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [view, setView] = useState<"RESEARCH" | "IMAGE">("RESEARCH");
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
          <button type="button" className={view === "IMAGE" ? "is-active" : ""} onClick={() => setView("IMAGE")}>IMAGE</button>
        </span>
        {view !== "IMAGE" ? (
          <button className="research-console__terminal-toggle" type="button" onClick={() => setTerminalOpen((open) => !open)}>{terminalOpen ? "Hide terminal" : "Show terminal"}</button>
        ) : (
          <span />
        )}
      </div>
      <div className="research-console__body">
        <aside className="research-console__tree">
          <p>ACTIVE_PROJECTS</p>
          {projects.map((item) => (
            <button key={item.slug} type="button" aria-label={item.name} className={item.slug === project.slug ? "is-active" : ""} onClick={() => setProjectSlug(item.slug)}>
              <span>{item.index}</span>{item.name}
            </button>
          ))}
          <div className="research-console__tree-meta"><span>STATUS</span><strong>07 / ACTIVE</strong></div>
        </aside>
        <div className="research-console__workspace">
          <div className="research-console__tabs" role="tablist" aria-label="Project details">
            {view === "IMAGE" ? (
              <button type="button" role="tab" aria-selected="true" className="is-active">
                IMAGE PREVIEW
              </button>
            ) : (
              tabs.map((item, index) => (
                <button id={`console-tab-${item}`} key={item} type="button" role="tab" aria-selected={tab === item} onClick={() => setTab(item)} onKeyDown={(event) => onTabKeyDown(event, index)}>
                  {item}
                </button>
              ))
            )}
          </div>
          {view === "IMAGE" ? (
            <div className="research-console__document research-console__document--image" role="tabpanel" key={`${project.slug}-image`}>
              <div className="research-console__line-numbers" aria-hidden="true">IMG<br />01<br />02<br />HD<br />RES<br />03<br />04<br />05<br />06</div>
              <div className="research-console__image-view">
                <div className="research-console__image-meta">
                  <span className="console-path">projects/{project.slug}/visual-records/ [2 Artifacts]</span>
                  <span className="research-console__image-badge">● KEYWORD GROUNDED · 2 ARTIFACTS</span>
                </div>
                <div className="research-console__image-grid">
                  {(project.images && project.images.length > 0 ? project.images : [{ url: project.image, title: project.name, caption: project.imageCaption || project.descriptor, tag: "RESEARCH VISUAL" }]).map((img, idx) => (
                    <div key={img.url + idx} className="research-console__image-card">
                      <div className="research-console__image-card-top">
                        <span>ARTIFACT 0{idx + 1}</span>
                        {img.tag && <i>{img.tag}</i>}
                      </div>
                      <div className="research-console__image-wrapper">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.url}
                          alt={`${project.name} - ${img.title}`}
                          className="research-console__project-img"
                        />
                      </div>
                      <div className="research-console__image-caption">
                        <strong>{img.title}</strong>
                        <p>{img.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="research-console__document research-console__document--research" role="tabpanel" key={`${project.slug}-${tab}`}>
              <div className="research-console__line-numbers" aria-hidden="true">01<br />02<br />03<br />04<br />05<br />06<br />07<br />08<br />09</div>
              <div className="research-console__content">
                <p className="console-path">projects/{project.slug}/{tab.toLowerCase()}.md</p>
                <h3>{project.name}</h3>
                {tab === "Project" ? (
                  <>
                    <p>{project.description}</p>
                    <div className="console-impact"><span>KEYWORD</span><p>{project.summary}</p></div>
                  </>
                ) : (
                  <ol className="console-list">
                    {entries.map((entry, index) => <li key={entry}><span>0{index + 1}</span>{entry}</li>)}
                  </ol>
                )}
              </div>
            </div>
          )}
          {terminalOpen && view !== "IMAGE" && <div className="research-console__terminal" role="region" aria-label="Research terminal">
            <span>$</span><span>open {project.slug}/{tab.toLowerCase()}</span><i>READY</i>
          </div>}
        </div>
      </div>
    </div>
  );
}
