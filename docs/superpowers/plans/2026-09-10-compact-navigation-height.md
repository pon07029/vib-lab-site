# Compact Navigation Height Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Reduce the single-row navigation to 39px on desktop and mobile.

**Architecture:** The fixed navigation shell and each contained row use explicit dimensions. Update the shell, bar, link cells, animation distance, and mobile expanded height as one matched dimension set.

**Tech Stack:** Next.js, CSS.

---

### Task 1: Match navigation dimensions to the single-row header

**Files:**
- Modify: `app/globals.css:495,513,522-529,541,561,978,987`
- Test: source dimension and local route checks only.

- [x] **Step 1: Apply 39px closed-row dimensions**

Set the desktop shell, navigation bar, links, and link cells to `39px`, and change label animation positions to `39px`.

- [x] **Step 2: Apply matching mobile dimensions**

Set the closed mobile shell to `39px` and the expanded mobile menu shell to `353px`.

- [x] **Step 3: Verify the compact header**

Run: `rg -n -- 'height: 39px|nav-roll|height: 353px' app/globals.css`, `git diff --check`, and `Invoke-WebRequest -UseBasicParsing -Uri 'http://localhost:3000/people'`.

Expected: matched compact navigation dimensions, no whitespace errors, and a local `200` response.
