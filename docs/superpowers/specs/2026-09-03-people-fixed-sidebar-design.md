# People fixed sidebar design

## Goal

Make the Lab members and Alumni archive sections easier to scan on desktop. The section context stays visible on the left while only the related people list scrolls on the right.

## Desktop layout

Both sections use a two-column, viewport-height layout.

- The left column remains fixed within the section.
- The right column owns the vertical overflow and scrolls independently.
- Each section remains visually contained within one viewport so its internal list does not push the following section downward.

For Lab members, the left column contains the eyebrow, Lab members heading, supporting copy, and the All, Student, Lab Member, and Researcher filters. The right column contains the filtered member cards.

For Alumni archive, the left column contains the eyebrow, Alumni archive heading, supporting copy, and record count. The right column contains the alumni name list.

## Responsive behavior

At tablet and mobile widths, both sections return to the existing single-column document flow. Fixed positioning and internal scrolling are removed so touch scrolling remains natural and all content remains accessible.

## Interaction and accessibility

The existing filter buttons, labels, content order, keyboard behavior, and animation behavior remain unchanged. Only layout ownership and overflow behavior change. The scrollable lists remain reachable with normal pointer, wheel, trackpad, touch, and keyboard scrolling.

## Verification

Add focused structural style assertions for the desktop two-column layout, fixed left column, independently scrolling right column, and mobile fallback. Run the People page test and the project build.
