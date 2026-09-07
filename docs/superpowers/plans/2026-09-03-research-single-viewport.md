# Research Single-Viewport Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fit the Research route inside one browser viewport while preserving the existing research-console interaction.

**Architecture:** Add a route-specific section class so the global console styles remain unchanged elsewhere. The section becomes a fixed-height flex column, and the console document retains its own overflow area for long content.

**Tech Stack:** React, Next.js, CSS

---

### Task 1: Fit the Research route into one viewport

**Files:**
- Modify: `app/research/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add a route-specific layout class and shorten the title**

Update the Research page section to use `console-section--research` and replace the heading with one line:

```tsx
<ViewportSection chapter="Console" className="console-section console-section--full console-section--research">
  <div className="section-intro">
    <p className="eyebrow">RESEARCH CONSOLE</p>
    <h2>Explore our research.</h2>
  </div>
  <ResearchConsole projects={projects} />
</ViewportSection>
```

- [ ] **Step 2: Make the section and console consume the available viewport height**

Add route-scoped CSS that sets `height: 100svh`, removes fixed minimum heights, uses flex sizing, and keeps overflow inside the document panel:

```css
.console-section--research {
  height: 100svh;
  min-height: 0;
  padding: clamp(96px, 11vh, 120px) var(--page-pad) clamp(24px, 4vh, 42px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.console-section--research .section-intro { flex: 0 0 auto; max-width: none; margin-bottom: clamp(16px, 2.5vh, 28px); }
.console-section--research .section-intro h2 { white-space: nowrap; font-size: clamp(34px, 3.4vw, 62px); }
.console-section--research .research-console { flex: 1 1 auto; min-height: 0; }
.console-section--research .research-console__body { height: calc(100% - 44px); min-height: 0; }
.console-section--research .research-console__workspace { min-height: 0; }
.console-section--research .research-console__document { max-height: none; overflow: auto; }
```

Add narrow-screen overrides so later mobile console minimum-height rules do not reintroduce page scrolling:

```css
@media (max-width: 720px) {
  .console-section--research { padding: 96px 12px 20px; }
  .console-section--research .section-intro { margin: 0 8px 16px; }
  .console-section--research .section-intro h2 { font-size: clamp(28px, 9vw, 40px); }
  .console-section--research .research-console,
  .console-section--research .research-console__body,
  .console-section--research .research-console__workspace { min-height: 0; }
  .console-section--research .research-console__document { max-height: none; }
}
```

- [ ] **Step 3: Review the exact diff**

Run:

```powershell
git diff -- app/research/page.tsx app/globals.css
```

Expected: only the Research title, route-specific class, and route-scoped sizing rules change. Per the user's request, do not run automated tests.
