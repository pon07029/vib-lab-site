# Research Single-Viewport Design

## Goal

Keep the Research route inside one browser viewport without changing the existing research-console interaction.

## Design

- Replace the long page heading with the single-line title `Explore our research.`
- Size the Research section to `100svh` and prevent page-level overflow.
- Use a vertical flex layout so the introduction keeps only the space it needs and the research console fills the remainder.
- Remove fixed console minimum heights within this route.
- Preserve scrolling inside the console document when project content exceeds its available panel height.
- Keep the existing project tree, tabs, terminal toggle, colors, spacing language, and responsive structure.

## Responsive Behavior

The heading remains on one line with a responsive font size. On narrow screens, the project tree stays horizontally scrollable and long project content scrolls inside the console rather than extending the page.

## Verification

Run the linter on the changed page and stylesheet. No browser-driven visual test is required.
