# Design QA — radial text scale

## Source visual truth

- Source: `/var/folders/xt/9cygb2xn7wsd0dl6697n66w40000gn/T/TemporaryItems/NSIRD_screencaptureui_h7pw96/스크린샷 2026-08-22 오전 3.51.12.png`
- Source pixels: `2550 × 2632`
- Intended state: desktop overview first screen, radial text field visible

## Rendered implementation

- URL: `http://localhost:3000/overview`
- Screenshot: `implementation-overview-outer-4px-smaller-top.png`
- Implementation pixels: `1689 × 1306`
- CSS viewport: `1704 × 1318`, device pixel ratio `2`
- State: overview at scroll position 0 after reload
- Primary interaction checked: overview navigation and scroll cue are present; canvas text field renders
- Console errors/warnings: none

The source capture includes browser chrome and uses a different viewport size, so the comparison was normalized to the right-hand radial text-field region rather than treated as a pixel-identical full-page comparison.

## Findings

- No actionable P0/P1/P2 findings remain.
- The central rings start at approximately `14px`, while the outer rings are approximately `4px` smaller than the previous implementation.
- Typography remains monospaced and white on black; the existing dashed frame and dotted radial structure are preserved.

## Comparison history

1. Baseline: every ring used a fixed `22px` glyph size, so the requested center-to-edge scale was absent.
2. Fix: `tunnelRingGeometry()` keeps the `14px` inner start and subtracts `4px` from the computed outer size.
3. Post-fix evidence: `implementation-overview-outer-4px-smaller-top.png` shows the slightly reduced outer text while preserving the radial hierarchy.

## Implementation checklist

- [x] Inner glyphs start at approximately `14px`.
- [x] Outer glyphs are approximately `4px` smaller than before.
- [x] Outer glyphs are larger than inner glyphs.
- [x] Responsive sizing is bounded for desktop and mobile dimensions.
- [x] Existing radial rotation, density, and color treatment remain intact.

## Follow-up polish

- P3: If an exact pixel match is needed, capture both source and implementation at the same browser viewport and device pixel ratio.

final result: passed

## Design QA — Publications 1920×1080 viewport fit

### Rendered implementation

- URL: `http://localhost:3000/publications`
- Screenshot: `implementation-publications-1920x1080.png`
- Test viewport: `1920 × 1080`
- State: the archive heading, filters, six records, and selected-record panel remain inside the first viewport.
- Console errors/warnings: none in a fresh browser verification tab

### Findings

- The archive section now uses the full desktop viewport height at large screen sizes.
- Desktop-only spacing and row sizing prevent the list or selected-record panel from being cut off at the bottom.
- The footer remains available immediately after the archive viewport instead of overlapping it.

final result: passed

## Design QA — Gallery-only transparent header

### Rendered implementation

- URL: `http://localhost:3000/notice`
- Screenshot: `implementation-notice-gallery-header.png`
- State: Gallery uses a dark transparent glass header so the full-bleed blue field remains visible behind the navigation.
- Other route check: `/publications` keeps the standard header treatment.
- Console errors/warnings: none in a fresh browser verification tab

### Findings

- The Gallery treatment is scoped to `.site-nav--gallery` and activates only when the current pathname is `/notice`.
- The active Gallery link keeps a light contrast state, while the ticker remains readable without making the whole header opaque.

final result: passed

## Design QA — Canvas2D trippin spiral ASCII field

### Source visual truth

- Source: the user-supplied `21st.dev` ASCII-art recipe and `shaderSource` parameters, tuned to the existing VIB Lab palette
- Reference: `https://21st.dev/community/ascii`
- Intended state: a photo-free procedural charcoal/white ring field sampled into tightly packed hexadecimal ASCII cells, with a subtle animated shimmer and halftone texture.

### Rendered implementation

- URL: `http://localhost:3000/overview`
- Screenshot: `implementation-overview-ascii-white.png`
- Implementation viewport: `1280 × 720`
- State: `Research field` viewport at its top edge
- Primary interaction checked: pointer-reactive spiral motion and existing project selection remain available above the animated canvas
- Console errors/warnings: none in a fresh browser verification tab

### Findings

- The previous Three.js particle layer is replaced by a Canvas2D pipeline: procedural rings → average cell sampling → `hexdump` glyph rendering → color correction → halftone/post-effects.
- The supplied `cellSize: 8`, full coverage, grayscale/contrast treatment, `color-dodge` style blend, shimmer animation, and mouse swirl response are active with a neutral charcoal/white palette.
- The canvas is resize-aware, rendered at a 72% internal scale, device-pixel-ratio bounded, throttled to a 24fps render budget, and falls back cleanly when a 2D context is unavailable.
- Halftone dots are pre-rendered once per resize instead of being rebuilt on every animation frame.
- IntersectionObserver pauses the animation completely while the third viewport is off-screen.

final result: passed

## Design QA — standalone Notice route as Gallery

### Source visual truth

- Source: the user-provided `HeroCarousel` reference component and demo layout
- Intended state: `/notice` itself renders the full-bleed Gallery viewport, not the previous laboratory log.

### Rendered implementation

- URL: `http://localhost:3000/notice`
- Screenshot: `implementation-notice-gallery.png`
- Implementation viewport: `1280 × 720`
- State: Gallery at the page top with the first research project focused
- Primary interaction checked: selecting `MultiModal Vet Diagnostic Imaging` moves the focused card and updates the active state
- Console errors/warnings: none in a fresh browser verification tab

### Findings

- The standalone `/notice` route now uses the same shared Gallery data and `HeroCarousel` as the Overview Gallery section.
- The former Notice hero and laboratory log are no longer rendered on this route.
- The full-height stage, clipped neighbouring cards, graded research image, metadata, and progress rail are visible in the captured viewport.

final result: passed

## Design QA — Gallery viewport

### Source visual truth

- Source: user-provided `HeroCarousel` reference component and demo layout
- Intended state: a full-bleed, image-led Gallery viewport with one focused 3:4 card, clipped neighbouring cards, graded background, title/meta overlay, and a progress rail.

### Rendered implementation

- URL: `http://localhost:3000/overview`
- Screenshot: `implementation-overview-gallery.png`
- Implementation viewport: `1280 × 720`
- State: `Gallery` section at its top edge, default first project selected
- Primary interaction checked: selecting `MultiModal Vet` moves the focused card and updates the active title
- Console errors/warnings: none in a fresh browser verification tab

### Findings

- The former Notice viewport is replaced by a `Gallery` section with `100svh` height.
- The carousel uses the existing research images from `public/research`, avoiding external CDN dependencies.
- Keyboard focus, click selection, wheel stepping, drag movement, reduced-motion handling, and resize measurement are preserved from the reference behavior.
- The shadcn-compatible `components/ui` directory and `lib/utils.ts` `cn` helper were added; the existing Tailwind 4 and TypeScript setup remains unchanged.

final result: passed

## Design QA — third viewport particle field (superseded)

### Source visual truth

- Source: the user-provided Three.js `WebGLCanvas` reference code
- Historical state: the third `Research field` viewport briefly used a sparse, slowly rotating particle field with pointer parallax.

### Rendered implementation

- This capture documents the previous implementation and is retained only for comparison history.

### Findings

- The particle layer was replaced by the Canvas2D ASCII spiral documented above.

final result: superseded

## Design QA — Publications archive-first layout

### Rendered implementation

- URL: `http://localhost:3000/publications`
- Screenshot: `implementation-publications-archive-first.png`
- State: the former Publications hero and Highlights viewports are removed; the Archive section starts at the top of the route.
- Console errors/warnings: none in a fresh browser verification tab

### Findings

- `Browse the record.` is now the first page heading.
- The publication filters, selected record panel, and Learn More control remain available.
- No content from the removed `Evidence, made public.` or `One finding at a time.` viewports is rendered.

final result: passed
