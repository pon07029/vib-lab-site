# People Fixed Sidebar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep each People section's context on the left while its member or alumni list scrolls independently on the right at desktop widths.

**Architecture:** Preserve the existing `MentorsSection` and `AlumniArchive` component boundaries. Add accessible labels and focusability to the two scroll containers, then use one desktop media query to turn both viewport sections into bounded two-column layouts; the existing tablet and mobile rules remain the fallback.

**Tech Stack:** React, TypeScript, CSS, Vitest, Testing Library

---

### Task 1: Add bounded desktop list scrolling

**Files:**
- Modify: `tests/people-page.test.tsx`
- Modify: `components/ui/mentors-section.tsx`
- Modify: `components/alumni-archive.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Write the failing test**

Add structural and style assertions to `tests/people-page.test.tsx`:

```tsx
it("keeps People section controls fixed while only their lists scroll on desktop", () => {
  render(<PeoplePage />);

  expect(screen.getByRole("region", { name: "Lab members directory" })).toHaveAttribute("tabindex", "0");
  expect(screen.getByRole("list", { name: "Alumni records" })).toHaveAttribute("tabindex", "0");

  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  expect(css).toMatch(/@media\s*\(min-width:\s*901px\)[\s\S]*?\.mentors-section\s*\{[^}]*grid-template-columns:/);
  expect(css).toMatch(/@media\s*\(min-width:\s*901px\)[\s\S]*?\.mentor-card-grid\s*\{[^}]*overflow-y:\s*auto;/);
  expect(css).toMatch(/@media\s*\(min-width:\s*901px\)[\s\S]*?\.alumni-archive__list\s*\{[^}]*overflow-y:\s*auto;/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
npm test -- tests/people-page.test.tsx
```

Expected: FAIL because the scroll regions do not yet have accessible labels and the desktop two-column overflow rules do not exist.

- [ ] **Step 3: Make the two lists keyboard-reachable**

Update the member grid in `components/ui/mentors-section.tsx`:

```tsx
<motion.div
  layout
  className="mentor-card-grid mentor-card-grid--stable"
  role="region"
  aria-label="Lab members directory"
  tabIndex={0}
>
```

Update the alumni list in `components/alumni-archive.tsx`:

```tsx
<ol className="alumni-archive__list" aria-label="Alumni records" tabIndex={0}>
```

- [ ] **Step 4: Add the desktop layout and overflow rules**

Append this desktop-only block after the existing People responsive styles in `app/globals.css`:

```css
@media (min-width: 901px) {
  .mentors-viewport,
  .alumni-viewport {
    height: 100svh;
    min-height: 100svh;
    box-sizing: border-box;
    overflow: hidden;
  }

  .mentors-viewport { align-items: stretch; }
  .mentors-section {
    height: 100%;
    min-height: 0;
    display: grid;
    grid-template-columns: minmax(260px,.72fr) minmax(0,2.28fr);
    grid-template-rows: auto 1fr;
    column-gap: clamp(40px,7vw,110px);
    overflow: hidden;
  }
  .mentors-section__header {
    grid-column: 1;
    grid-row: 1;
    display: block;
    align-self: start;
    margin: 0;
  }
  .mentors-section__header > p { margin-top: 26px; }
  .mentors-section__filters {
    grid-column: 1;
    grid-row: 2;
    align-content: start;
    align-self: start;
    margin: 28px 0 0;
  }
  .mentor-card-grid {
    grid-column: 2;
    grid-row: 1 / span 2;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-gutter: stable;
    padding-right: 8px;
  }
  .mentor-card-grid--stable { min-height: 0; }

  .alumni-archive {
    height: 100%;
    min-height: 0;
    overflow: hidden;
  }
  .alumni-archive__intro { position: static; }
  .alumni-archive__list {
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-gutter: stable;
    padding-right: 8px;
  }
}
```

- [ ] **Step 5: Run the focused test and verify GREEN**

Run:

```powershell
npm test -- tests/people-page.test.tsx
```

Expected: all tests in `tests/people-page.test.tsx` pass.

- [ ] **Step 6: Build the site**

Run:

```powershell
npm run build
```

Expected: build exits with code 0.

- [ ] **Step 7: Commit the implementation**

```powershell
git add tests/people-page.test.tsx components/ui/mentors-section.tsx components/alumni-archive.tsx app/globals.css docs/superpowers/plans/2026-09-03-people-fixed-sidebar.md
git commit -m "feat: add fixed People directory sidebars"
```
