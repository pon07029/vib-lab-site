# Single-Row Navigation Design

## Goal

Simplify the fixed navigation to a single compact row containing only the VIB home mark and primary route links.

## Change

- Change the home mark from `VIB•` to `VIB`.
- Remove the entire lower information ticker containing the laboratory name, university, project count, and decorative bullets.
- Retain the current 47px navigation bar, primary route links, active-route treatment, gallery variant, and mobile menu behavior.
- Remove no route, content, or interaction outside the navigation header.

## Verification

Confirm the header source contains no ticker markup or decorative VIB dot, check the patch for whitespace errors, and request the existing local `/people` route. No automated test suite is needed for this focused visual cleanup.
