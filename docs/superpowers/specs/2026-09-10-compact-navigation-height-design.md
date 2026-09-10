# Compact Navigation Height Design

## Goal

Reduce the now single-row navigation from its former ticker-sized shell to a compact 39px bar on desktop and mobile.

## Change

- Set the closed desktop navigation shell, bar, links, and link cells to 39px high.
- Move the navigation label animation distance from 47px to 39px so hover motion stays aligned.
- Set the closed mobile shell to 39px high; retain the existing 39px mobile row.
- Reduce the open mobile menu height to 353px, matching one 39px header, six 50px links, and 14px of menu padding.
- Keep width, route links, active state, and all other navigation behavior unchanged.

## Verification

Confirm no 47px navigation-row dimensions remain in the header CSS, check the patch for whitespace errors, and request the existing local `/people` route. No automated test suite is needed for this layout-only refinement.
