# Publications Compact Typography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce Publications archive typography and spacing so long records are easier to scan and the page feels less oversized.

**Architecture:** Keep the existing component and interaction structure unchanged. Update only the Publications-specific CSS rules, including the large-desktop overrides that currently enlarge typography again.

**Tech Stack:** CSS, React presentation styles

---

### Task 1: Apply compact Publications typography

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Reduce the base archive typography and spacing**

Update the Publications rules to use these values:

```css
.section-heading-row h2 { font-size: clamp(48px,4.3vw,78px); }
.section-heading-row > p { font-size: 16px; line-height: 1.45; }
.publication-browser__toolbar { min-height: 78px; padding: 12px 16px; }
.publication-browser__toolbar span { font-size: 9px; }
.publication-browser__toolbar button { padding: 6px 9px; font-size: 9px; }
.publication-browser__toolbar > p { font-size: 9px; }
.publication-list button { min-height: 96px; padding: 14px 16px; }
.publication-list button > span,
.publication-list button small { font-size: 9px; line-height: 1.4; }
.publication-list button strong { font-size: clamp(15px,1.05vw,19px); line-height: 1.2; }
.publication-preview h2 { font-size: clamp(30px,2.3vw,44px); line-height: 1; }
.publication-preview blockquote { margin: 22px 0; font-size: 17px; line-height: 1.45; }
.publication-preview > div:last-of-type p { font-size: 13px; line-height: 1.4; }
.publication-preview > a { margin-top: 18px; font-size: 10px; }
```

- [ ] **Step 2: Keep the large-desktop viewport override compact**

Within the existing `min-width: 1101px` and `min-height: 900px` media query, update the heading to `clamp(52px,4vw,72px)`, list rows to `clamp(78px,8vh,92px)`, preview title to `clamp(30px,2.25vw,42px)`, and quote to `17px`.

- [ ] **Step 3: Review the stylesheet diff**

Run:

```powershell
git diff -- app/globals.css
```

Expected: only Publications typography and spacing rules change in this task. Do not run automated tests, per the user's request.
