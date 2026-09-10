# Deep Teal Accent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every cobalt-blue accent with deep teal `#2D7773` while retaining the existing neutral site palette and behavior.

**Architecture:** Shared CSS tokens control component accents throughout the site; a few legacy RGBA literals support glow, scan, and canvas effects. Change only those token and literal values so every visual accent uses the same muted teal hue.

**Tech Stack:** Next.js, React, CSS custom properties, Canvas 2D.

---

### Task 1: Apply the deep-teal accent palette

**Files:**
- Modify: `app/globals.css:11,31,479,602,880,939`
- Modify: `components/project-showcase.tsx:40`
- Test: source-token and local-route checks only; the user requested no automated test suite for this visual-only update.

- [x] **Step 1: Confirm the cobalt-blue accent locations**

Run: `rg -n -- '#3d63d8|61,99,216' app/globals.css components/project-showcase.tsx`

Expected: the global and legacy accent tokens plus their supporting RGBA effect values use cobalt blue.

- [x] **Step 2: Replace CSS accent values**

Use the following CSS values:

```css
  --signal: #2d7773;
  --ca-orange: #2d7773;
  box-shadow: 0 0 0 4px rgba(45,119,115,.15);
  box-shadow: 0 0 9px rgba(45,119,115,.75);
  background: linear-gradient(180deg,transparent,rgba(45,119,115,.18),transparent);
  background: rgba(45,119,115,.04);
```

- [x] **Step 3: Replace the Canvas scan-line color**

Set the highlighted row stroke in `components/project-showcase.tsx` to:

```tsx
context.strokeStyle = row % 6 === 0 ? "rgba(45,119,115,.58)" : "rgba(241,238,231,.14)";
```

- [x] **Step 4: Confirm the completed palette change**

Run: `rg -n -- '#3d63d8|61,99,216' app/globals.css components/project-showcase.tsx` and `Invoke-WebRequest -UseBasicParsing -Uri 'http://localhost:3000/research'`.

Expected: no cobalt-blue literal remains and the local route returns status `200`.
