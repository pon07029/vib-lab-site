# Oxblood Burgundy Accent Design

## Goal

Replace the deep-teal accent with oxblood burgundy `#7A3340`, giving the neutral laboratory archive a warmer, more editorial point of contrast.

## Visual Direction

- Use `#7A3340` as the sole accent hue.
- Keep off-white, charcoal, black, and gray surfaces unchanged.
- Preserve the existing emphasis hierarchy and behavior for active navigation, status markers, arrows, keyboard focus, canvas scan strokes, selection state, and notice/project highlights.

## Implementation Scope

- Replace the shared `--signal` and `--ca-orange` values in `app/globals.css` with `#7A3340`.
- Replace deep-teal RGBA values with matching oxblood burgundy RGB values `122, 51, 64` while retaining each effect's current opacity.
- Replace the project-showcase Canvas 2D scan-line stroke with `rgba(122,51,64,.58)`.
- Do not modify layout, typography, content, components, or interaction behavior.

## Verification

Confirm that no deep-teal literal remains in the stylesheet or project-showcase source, check the patch for whitespace errors, and request the existing local `/people` route. No automated test suite is needed for this visual-only token replacement.
