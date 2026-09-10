# Publication Year Toggle and Accent Weight Design

## Goal

Make the publication year filter easier to scan by showing only the five newest years initially, while making existing burgundy point text more legible through heavier type rather than a color change.

## Publication Year Control

- Keep the `ALL` filter and show the five newest unique publication years beside it.
- Place a compact circular `+` button after those years when older years exist.
- Clicking the button expands the remaining years in the same filter control; its visible sign and accessible label switch to `−` / “Show fewer publication years”.
- Selecting any year retains the existing publication filtering and record-preview behavior. The selected older year stays visible until the user collapses the control.
- No year is removed from the archive; this changes only the initial density of controls.

## Accent Typography

- Retain oxblood burgundy `#7A3340` for all accent elements.
- Increase the common small uppercase label treatment (`.eyebrow` and hero kicker) from font weight 500 to 700.
- Increase the `YEAR` and `TYPE` toolbar labels from 600 to 700 so they remain clear against the gray control surface.
- Leave publication titles, abstracts, body copy, and navigation sizing unchanged.

## Verification

Confirm the browser derives five visible years plus an expandable remainder from the existing publication data, check the new control's accessible label, check the patch for whitespace errors, and request the existing local `/publications` route. No automated test suite is needed for this focused interface adjustment.
