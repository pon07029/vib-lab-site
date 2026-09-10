# Oxblood Burgundy Accent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the deep-teal accent with oxblood burgundy `#7A3340` while preserving all neutral colors and interface behavior.

**Architecture:** Shared CSS tokens drive accent uses across the site; a small set of RGB literals controls matching glow, scan, and Canvas 2D effects. Change only those color values to retain the existing visual hierarchy.

**Tech Stack:** Next.js, React, CSS custom properties, Canvas 2D.

---

### Task 1: Apply the oxblood-burgundy accent

**Files:**
- Modify: `app/globals.css:11,31,479,602,880,939`
- Modify: `components/project-showcase.tsx:40`
- Test: source-token and local-route checks only; the user requested no automated test suite for this visual-only update.

- [x] **Step 1: Confirm deep-teal accent locations**

Run: `rg -n -- '#2d7773|45,119,115' app/globals.css components/project-showcase.tsx`

Expected: the shared tokens and visual-effect literals use deep teal.

- [x] **Step 2: Replace stylesheet accent values**

Use these values while retaining the current alpha for each effect:

```css
  --signal: #7a3340;
  --ca-orange: #7a3340;
  box-shadow: 0 0 0 4px rgba(122,51,64,.15);
  box-shadow: 0 0 9px rgba(122,51,64,.75);
  background: linear-gradient(180deg,transparent,rgba(122,51,64,.18),transparent);
  background: rgba(122,51,64,.04);
```

- [x] **Step 3: Replace the Canvas effect value**

Use this highlighted-row stroke:

```tsx
context.strokeStyle = row % 6 === 0 ? "rgba(122,51,64,.58)" : "rgba(241,238,231,.14)";
```

- [x] **Step 4: Confirm the completed change**

Run: `rg -n -- '#2d7773|45,119,115' app/globals.css components/project-showcase.tsx`, `git diff --check`, and `Invoke-WebRequest -UseBasicParsing -Uri 'http://localhost:3000/people'`.

Expected: no deep-teal literal remains, the patch has no whitespace errors, and the local route returns status `200`.
