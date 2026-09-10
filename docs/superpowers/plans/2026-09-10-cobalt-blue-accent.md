# Cobalt Blue Accent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the site's orange accent with a cobalt-blue accent while preserving the existing neutral palette.

**Architecture:** The site routes most accent styling through the global `--signal` CSS custom property. Update that token and the small set of legacy orange literals in visual effects so selected navigation states, markers, arrows, canvas strokes, and text selection are consistently cobalt blue without altering layout or component behavior.

**Tech Stack:** Next.js, React, global CSS custom properties.

---

### Task 1: Replace the global accent token

**Files:**
- Modify: `app/globals.css:11,31,479,602,880,939`
- Modify: `components/project-showcase.tsx:40`
- Test: manual source-token check only; the user requested no test suite for this visual token change.

- [x] **Step 1: Confirm the current accent declaration**

Run: `rg -n -- "--signal" app/globals.css`

Expected: the root token is declared as `--signal: #ff9100;`.

- [x] **Step 2: Set the cobalt-blue token**

Replace the root declaration with:

```css
  --signal: #3d63d8;
  --ca-orange: #3d63d8;
```

- [x] **Step 3: Confirm the new declaration**

Run: `rg -n -- "--signal" app/globals.css`

Expected: the root tokens are cobalt blue, every legacy `#ff9100` / `rgba(255,145,0,...)` literal has changed to the equivalent cobalt-blue value, and existing accent consumers remain unchanged.
