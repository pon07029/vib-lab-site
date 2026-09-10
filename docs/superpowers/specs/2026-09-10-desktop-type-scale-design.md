# Desktop Type Scale Design

## Goal

Keep the main overview and Publications archive within a 1920×1080 viewport by reducing oversized desktop typography while preserving mobile and other page layouts.

## Main Overview

- Apply the adjustment only at desktop widths of 1101px and above.
- Reduce the overview headline maximum from 80px to 72px and its viewport scale from 4.16vw to 3.75vw.
- Reduce the overview introduction maximum from 21px to 19px and its viewport scale from 1.08vw to 1vw.
- Reduce the overview kicker from 16px to 14px and action controls from 49px to 45px.
- Keep the established two-column desktop layout and existing mobile values unchanged.

## Publications Archive

- In the large-desktop archive rule, reduce the section heading maximum from 72px to 60px.
- Reduce list titles from a 15–19px range to 14–17px.
- Reduce the selected-record title maximum from 42px to 36px and its viewport scale from 2.25vw to 2vw.
- Reduce the selected-record quotation from 17px to 15px.
- Preserve archive filtering, preview behavior, row dimensions, and all mobile overrides.

## Verification

Confirm the desktop override includes the new size ranges, check the patch for whitespace errors, request `/` and `/publications` from the running local site, then commit and push the completed change. No automated test suite is needed for this visual sizing adjustment.
