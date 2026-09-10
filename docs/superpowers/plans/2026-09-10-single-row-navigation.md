# Single-Row Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the fixed site navigation a single row by removing the decorative VIB dot and lower information ticker.

**Architecture:** The header markup in `SiteShell` supplies both the VIB mark and ticker content. Removing the dot span and ticker subtree preserves the existing bar, links, route state, gallery variant, and mobile menu with no layout replacement required.

**Tech Stack:** Next.js, React, TypeScript.

---

### Task 1: Remove secondary header content

**Files:**
- Modify: `components/site-shell.tsx:35,48-52`
- Test: source inspection and local route request only; the user requested no automated test suite for this visual cleanup.

- [x] **Step 1: Simplify the home mark**

Replace the home link content with:

```tsx
<a className="site-nav__mark" href="/overview" aria-label="VIB Lab home">VIB</a>
```

- [x] **Step 2: Remove the ticker subtree**

Delete the complete `<div className="site-nav__ticker">...</div>` block below `.site-nav__bar`, including both duplicated ticker-track sequences.

- [x] **Step 3: Confirm the single-row header source**

Run: `rg -n -- 'site-nav__ticker|VIB<span>|VETERINARY INFORMATICS' components/site-shell.tsx` and `Invoke-WebRequest -UseBasicParsing -Uri 'http://localhost:3000/people'`.

Expected: the source search returns no result, while the local route returns status `200`.
