# VIB Lab Content Architecture Interaction Clone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the VIB Lab local frontend so its 1920 × 1080 layout, scene rhythm, and major interactions closely match the captured Content Architecture reference while retaining VIB content and separate routes.

**Architecture:** Keep the existing Vinext/React application and central content modules. Split new behavior into small client components, keep deterministic calculations in testable helpers, and compose the Overview from viewport-scale scenes. Shared navigation, minimap, and learn-more panel remain in `SiteShell`; other routes reuse the same visual system.

**Tech Stack:** React 19, Vinext, TypeScript, CSS, Canvas 2D, Vitest, Testing Library.

---

## File Map

- `app/page.tsx`: Overview scene composition.
- `app/globals.css`: source-matched design tokens, responsive layouts, and interaction states.
- `components/site-shell.tsx`: floating navigation, mobile menu, scene minimap, route transitions.
- `components/data-tunnel.tsx`: hero canvas pointer/hold/drag interaction.
- `components/research-pulse.tsx`: dark project field and click bloom.
- `components/research-console.tsx`: IDE-like project explorer with scrollable document and terminal toggle.
- `components/project-showcase.tsx`: project cards and hover/glitch/image transition.
- `components/publication-carousel.tsx`: two-up horizontal publication carousel.
- `components/notice-accordion.tsx`: one-at-a-time notice rows.
- `components/lab-index.tsx`: learn-more side panel.
- `lib/interaction.ts`: scene progress, wrap, and deterministic scramble helpers.
- `tests/interaction.test.ts`: pure interaction helper tests.
- `tests/site-shell.test.tsx`: mobile menu and navigation behavior tests.
- `tests/project-showcase.test.tsx`: card activation behavior tests.
- `tests/research-console.test.tsx`: project, tab, and terminal state tests.
- `public/research/*`: local source-study imagery used by the six mock research cards.
- `design-qa.md`: viewport and interaction QA record.

### Task 1: Interaction Primitives and Floating Shell

- [ ] **Step 1: Write failing helper and shell tests**

```ts
expect(clampProgress(550, 100, 1000)).toBeCloseTo(0.5);
expect(wrapIndex(-1, 6)).toBe(5);
expect(scrambleLabel("RESEARCH", 1)).toBe("RESEARCH");
```

Add a shell test that opens the mobile menu and expects a `Close menu` button plus all six links.

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test -- tests/interaction.test.ts tests/site-shell.test.tsx`
Expected: FAIL because `lib/interaction.ts` and the collapsed menu behavior do not exist.

- [ ] **Step 3: Implement helpers and shell**

Implement clamped progress, modular index wrapping, deterministic partial scrambling, the black centered desktop nav, expandable mobile shell, section observer, minimap, ticker, and route-aware link states.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `npm test -- tests/interaction.test.ts tests/site-shell.test.tsx`
Expected: PASS.

### Task 2: Exact First View and Canvas Behavior

- [ ] **Step 1: Write failing DataTunnel interaction tests**

Render `DataTunnel`, send pointer enter/down/up events, and assert its accessible status changes between `Explore data field` and `Data field held`.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/data-tunnel.test.tsx`
Expected: FAIL because held-state accessibility is absent.

- [ ] **Step 3: Implement the first viewport**

Rebuild the hero as an exact 50:50 desktop split, add the bottom-center scroll control, and refine the Canvas 2D tunnel so pointer position offsets the vanishing point, click-and-hold accelerates depth, and drag rotates the rings.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- tests/data-tunnel.test.tsx`
Expected: PASS.

### Task 3: Research Field and IDE Console

- [ ] **Step 1: Write failing research interaction tests**

Test that selecting `Canine Atlas` updates the field details; test that selecting the Console `Data` tab shows the selected project's data; test that `Show terminal` toggles the terminal region.

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test -- tests/research-pulse.test.tsx tests/research-console.test.tsx`
Expected: FAIL for missing pulse component and missing terminal toggle.

- [ ] **Step 3: Implement research scenes**

Create the tall dark project field with staggered items and pointer bloom. Upgrade the console with a scrollable tree/document, view-mode switch, terminal toggle, tabs, line numbers, minimap, and mock VIB files.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `npm test -- tests/research-pulse.test.tsx tests/research-console.test.tsx`
Expected: PASS.

### Task 4: Showcase, Publications, People, and Notice

- [ ] **Step 1: Write failing showcase and accordion tests**

Test pointer/focus activation of a project image, next/previous publication wrapping, and one-open-at-a-time notice behavior.

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test -- tests/project-showcase.test.tsx tests/publication-carousel.test.tsx tests/notice-accordion.test.tsx`
Expected: FAIL because the new overview components do not exist.

- [ ] **Step 3: Implement the remaining scenes**

Add six two-column project cards with generated text visualization and local images, two-up publication carousel, two large People/Join cards, dark Notice accordion, closing statement, and sticky footer reveal.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `npm test -- tests/project-showcase.test.tsx tests/publication-carousel.test.tsx tests/notice-accordion.test.tsx`
Expected: PASS.

### Task 5: Responsive Styling and Route Consistency

- [ ] **Step 1: Extend content/render tests**

Assert that all six navigation routes, all six project names, the approved public email, and required Overview headings are rendered from shared content.

- [ ] **Step 2: Run tests and verify RED where coverage is missing**

Run: `npm test -- tests/content.test.ts tests/rendered-html.test.mjs`
Expected: content assertions fail until new scenes are present.

- [ ] **Step 3: Finish responsive and route styles**

Match 390 × 844 stacking order, collapsed nav dimensions, stacked hero, one-column showcase, single-card carousel, stacked People cards, and mobile accordion. Align all dedicated route pages to the same off-white/black/orange system.

- [ ] **Step 4: Run full automated verification**

Run: `npm test && npm run lint && npm run build`
Expected: all commands exit 0 with no test failures or lint errors.

### Task 6: Visual and Interaction QA

- [ ] **Step 1: Start the local preview**

Run: `npm run dev`
Expected: local server remains available at `http://localhost:3000`.

- [ ] **Step 2: Capture implementation screenshots**

Use the in-app browser at 1920 × 1080 and 390 × 844. Capture hero, research field, console, showcase, publications, notice, menu-open, hero-held, project-hover, carousel-advanced, and accordion-changed states.

- [ ] **Step 3: Compare source and implementation together**

Create side-by-side comparisons using equal-size source and implementation screenshots. Inspect first-view split, nav placement, typography, padding, scene heights, cards, border radii, image cropping, and fixed controls. Correct visible mismatches and repeat.

- [ ] **Step 4: Record QA**

Write `design-qa.md` with tested viewports, interaction results, console status, known intentional content differences, and the final line `final result: passed` only after all checks succeed.

- [ ] **Step 5: Re-run fresh verification before handoff**

Run: `npm test && npm run lint && npm run build`
Expected: exit 0 for all commands. Keep the verified local preview open; do not deploy.
