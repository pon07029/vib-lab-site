# Desktop Type Scale Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Fit the overview and Publications typography comfortably within a 1920×1080 desktop viewport.

**Architecture:** Existing desktop-specific CSS already scopes the overview layout and large archive viewport. Adjust only those existing type and control values, leaving global and mobile rules unchanged.

**Tech Stack:** Next.js, CSS.

---

### Task 1: Reduce overview desktop type scale

**Files:**
- Modify: `app/globals.css:632-644`

- [x] **Step 1: Reduce overview type and action dimensions**

Set the kicker to 14px, use `clamp(56px,3.75vw,72px)` for the headline, use `clamp(16px,1vw,19px)` for the introduction, and set action height to 45px.

### Task 2: Reduce archive desktop type scale

**Files:**
- Modify: `app/globals.css:1206-1240`

- [x] **Step 1: Reduce archive heading, list, and preview sizes**

Set the large-desktop heading to `clamp(48px,3.5vw,60px)`, list title to `clamp(14px,.9vw,17px)`, preview title to `clamp(28px,2vw,36px)`, and preview quotation to 15px.

### Task 3: Verify and publish

**Files:**
- Modify: none

- [x] **Step 1: Confirm the desktop values and routes**

Run source checks, `git diff --check`, and local requests for `/` and `/publications`; then commit the source and documentation and push `codex/vib-lab-site`.
