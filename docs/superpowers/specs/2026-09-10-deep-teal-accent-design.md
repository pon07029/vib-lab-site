# Deep Teal Accent Design

## Goal

Replace the newly applied cobalt-blue accent with a muted deep-teal accent that feels native to the site's off-white, gray, and charcoal research-archive palette.

## Visual Direction

- Use `#2D7773` as the sole accent hue.
- Keep the existing off-white paper, charcoal ink, black, and gray tokens unchanged.
- Preserve the current visual weight and behavior of selected navigation, status markers, arrows, keyboard focus, canvas scan strokes, and notice/project highlights.

## Implementation Scope

- Update the shared `--signal` token in `app/globals.css` from cobalt blue to `#2D7773`.
- Update the legacy `--ca-orange` accent token and cobalt-blue RGBA literals in `app/globals.css` to equivalent deep-teal values.
- Update the project-showcase canvas stroke literal in `components/project-showcase.tsx` to matching deep teal.
- Do not change typography, surfaces, layout, interaction behavior, or content.

## Verification

Search the style and canvas source for remaining cobalt-blue literals, check the patch for whitespace errors, and request the already-running local `/research` route. No automated test suite is needed for this visual-token-only change.
