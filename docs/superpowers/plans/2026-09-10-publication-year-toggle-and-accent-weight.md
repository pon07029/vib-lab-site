# Publication Year Toggle and Accent Weight Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show only the five newest publication years initially, reveal older years through an accessible circular toggle, and strengthen small point-label type without changing the burgundy color.

**Architecture:** `PublicationBrowser` owns the year-filter state, so it will also own a boolean controlling whether older years are visible. The visual treatment remains in `app/globals.css`: a small circular toggle joins the existing toolbar and shared label weights increase without changing content or layout.

**Tech Stack:** Next.js, React state, TypeScript, global CSS.

---

### Task 1: Add a compact expandable year filter

**Files:**
- Modify: `components/publication-browser.tsx:6-19`
- Test: local route request and source inspection only; the user requested no automated test suite for this interface refinement.

- [x] **Step 1: Derive display years and expansion state**

Add the expansion state and sorted year arrays:

```tsx
const [yearsExpanded, setYearsExpanded] = useState(false);
const years = useMemo(
  () => Array.from(new Set(publications.map((item) => item.year))).sort((a, b) => b - a),
  [publications],
);
const visibleYears = yearsExpanded ? years : years.slice(0, 5);
const hasOlderYears = years.length > 5;
```

- [x] **Step 2: Render the accessible circular toggle**

After mapping `visibleYears`, render this button only when `hasOlderYears` is true:

```tsx
<button
  type="button"
  className="publication-browser__year-toggle"
  aria-label={yearsExpanded ? "Show fewer publication years" : "Show all publication years"}
  aria-expanded={yearsExpanded}
  onClick={() => setYearsExpanded((expanded) => !expanded)}
>
  {yearsExpanded ? "−" : "+"}
</button>
```

- [x] **Step 3: Preserve existing filtering behavior**

Keep the existing `year` filter state and button click handler for `ALL` and every visible year. The expanded control must render the full existing year list rather than create a second filter or alter publication records.

### Task 2: Strengthen compact point labels

**Files:**
- Modify: `app/globals.css:61,341-342`
- Test: source-token and local-route checks only.

- [x] **Step 1: Increase shared small-label weight**

Replace the shared label declaration with:

```css
.hero-copy__kicker, .eyebrow { margin: 0 0 26px; font: 700 14px/1.3 var(--font-geist-mono), monospace; letter-spacing: .04em; text-transform: uppercase; }
```

- [x] **Step 2: Strengthen toolbar labels and style the toggle**

Set toolbar label weight to 700 and add:

```css
.publication-browser__year-toggle { width: 24px; height: 24px; padding: 0 !important; display: inline-grid; place-items: center; border-color: var(--ca-orange) !important; color: var(--ca-orange); font: 700 16px/1 var(--font-geist-mono), monospace !important; }
.publication-browser__year-toggle:hover, .publication-browser__year-toggle:focus-visible { color: var(--paper); background: var(--ca-orange); outline: none; }
```

- [x] **Step 3: Confirm the completed interface change**

Run: `rg -n -- 'yearsExpanded|visibleYears|publication-browser__year-toggle|font: 700 14px|font: 700 9px' components/publication-browser.tsx app/globals.css`, `git diff --check`, and `Invoke-WebRequest -UseBasicParsing -Uri 'http://localhost:3000/publications'`.

Expected: the five-year view and accessible toggle exist, point-label declarations use weight 700, the patch has no whitespace errors, and the local route returns status `200`.
