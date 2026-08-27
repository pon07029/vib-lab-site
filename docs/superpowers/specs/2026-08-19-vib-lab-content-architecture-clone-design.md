# VIB Lab Content Architecture Interaction Clone — Design Specification

## Objective

Rebuild the existing VIB Lab frontend as a local-only study implementation that closely matches the layout rhythm and interaction model of `contentarchitecture.dev`, while keeping VIB Lab branding, research content, and six separate navigation routes.

## Reference Conditions

- Primary visual viewport: 1920 × 1080.
- Responsive verification viewport: 390 × 844.
- Source evidence: `reference-captures/source-desktop` and `reference-captures/source-mobile`.
- Source palette: off-white `#f1eee7`, black `#000000`, ink `#232323`, orange `#ff9100`.
- Typography: Geist Sans for display/body and Geist Mono for controls, metadata, and technical interfaces.
- The local prototype is not deployed or republished.

## Information Architecture

The fixed primary navigation contains six route links:

1. Overview — `/`
2. Research — `/research`
3. Publications — `/publications`
4. People — `/people`
5. Notice — `/notice`
6. Contact — `/contact`

Every route is a real page. Overview additionally provides the long, scene-based scroll narrative.

## Overview Sequence

1. **Hero:** Exact desktop 50:50 split. The left panel presents the VIB Lab statement and institution; the right panel contains an interactive data tunnel. A bottom-center scroll cue moves to the next scene.
2. **Research gaps:** Off-white split layout with a dark terminal-like evidence panel and a large statement about connecting clinical, genomic, and intelligent systems.
3. **Research field:** Tall black scene with six staggered project entries and a pointer-triggered particle bloom.
4. **Research console:** Full-width IDE-like interface. Project tree, document tabs, internal scrolling, terminal visibility, and project switching mirror the source interaction pattern.
5. **Project showcase:** Two-column desktop and one-column mobile cards. Each card starts with a generated text/data visualization and transitions through a short scrambling state to a real local image on hover/focus.
6. **Publications:** Dark horizontal snap carousel showing two cards at desktop width and one card on mobile.
7. **People / Join:** Two large off-white cards within a light scene.
8. **Notice:** Dark accordion. One notice is open at a time and the selected row receives the orange focus treatment.
9. **Closing statement and footer:** An off-white technical statement reveals a sticky dark footer with the lab email and route links.

## Persistent Interactions

- The centered floating desktop navigation uses a black shell, a compact link row, and a live ticker row. Hovered labels use a short character/odometer roll.
- Mobile navigation collapses into the same black shell and expands downward over the page.
- A fixed upper-right minimap shows the current Overview scene and scroll progress.
- A fixed lower-right `LEARN MORE` control opens a right-side lab information panel with internal section switching.
- The hero canvas responds to pointer position. Click-and-hold increases tunnel velocity; drag changes orientation.
- Project names, code tabs, carousel controls, accordion rows, route links, and contact links are functional and keyboard reachable.
- `prefers-reduced-motion` disables non-essential looping and glitch effects.

## Content Mapping

- Source problem statement → VIB research gaps and connected data pipeline.
- Source feature list → six VIB research projects.
- Source repository → VIB Research Console with Methods, Data, and Researchers.
- Source showcase → six project cards.
- Source reviews → publication carousel.
- Source pricing → People and Join cards.
- Source FAQ → Notice accordion.
- Source closing message → “Connecting animal health, biological data, and AI.”

## Acceptance Criteria

- At 1920 × 1080, the first screen is a true 960/960 split with source-matched spacing, nav placement, fixed minimap, fixed learn-more control, and full-height tunnel.
- Overview contains one dominant topic per viewport-height scene.
- All six routes load directly and preserve the common navigation system.
- The mobile header is collapsed by default and its expanded menu fits within the viewport.
- Hero pointer/hold/drag, research click bloom, console switching, showcase hover, publication carousel, and notice accordion are demonstrably interactive.
- `npm test`, `npm run lint`, and `npm run build` succeed.
- Source and implementation screenshots are compared side-by-side at both target viewports, with visual mismatches corrected.
- `design-qa.md` ends with `final result: passed`.
