# Alumni Archive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an Alumni Archive to the People page that is visibly separate from active lab members and records all eleven supplied alumni.

**Architecture:** `content/people.ts` will export a small `Alumnus` data model and the ordered alumni records beside current People data. A presentational `AlumniArchive` component will render the index; `app/people/page.tsx` will insert it between the active directory and Join. CSS will create the desktop split layout and a stacked mobile variant without changing existing People cards.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind utility classes where already used, project global CSS, Vitest and Testing Library.

---

## File Structure

- Modify: `content/people.ts` — export `Alumnus` and the eleven archival records.
- Create: `components/alumni-archive.tsx` — render the archive heading, count, and ordered rows.
- Modify: `app/people/page.tsx` — insert the Alumni viewport after the active member directory.
- Modify: `app/globals.css` — layout the archive and define the mobile stack.
- Modify: `tests/people-page.test.tsx` — assert the independent archive section, all records, and page order.

### Task 1: Add the failing People page coverage

**Files:**
- Modify: `tests/people-page.test.tsx`
- Reference: `app/people/page.tsx`

- [ ] **Step 1: Write the failing test**

Append the imports and test below:

```tsx
import { alumni } from "../content/people";

it("renders Alumni as a separate archive between the directory and Join", () => {
  render(<PeoplePage />);

  const viewports = Array.from(document.querySelectorAll(".viewport-section"));
  const archive = screen.getByRole("region", { name: "Alumni archive" });

  expect(viewports).toHaveLength(4);
  expect(viewports.indexOf(archive.closest(".viewport-section")!)).toBe(2);
  expect(screen.getByText("11 RECORDS")).toBeInTheDocument();
  alumni.forEach((alumnus, index) => {
    expect(screen.getByText(alumnus.name)).toBeInTheDocument();
    expect(screen.getByText(alumnus.credential)).toBeInTheDocument();
    expect(screen.getByText(String(index + 1).padStart(2, "0"))).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- tests/people-page.test.tsx
```

Expected: FAIL because `alumni` and the `Alumni archive` region do not yet exist.

### Task 2: Define the alumni data

**Files:**
- Modify: `content/people.ts`
- Test: `tests/people-page.test.tsx`

- [ ] **Step 1: Add the data model and records**

Append this export after `people`:

```ts
export type Alumnus = {
  id: string;
  name: string;
  credential: string;
};

export const alumni: Alumnus[] = [
  { id: "soo-ah-cho", name: "Soo-ah Cho", credential: "M.S. Student" },
  { id: "byungwook-oh", name: "Byungwook Oh", credential: "M.S. Student" },
  { id: "wongyung-choi", name: "Wongyung Choi", credential: "Undergraduate Researcher" },
  { id: "ingi-song", name: "Ingi Song", credential: "Undergraduate Student" },
  { id: "nahyun-kim", name: "Nahyun Kim", credential: "Undergraduate Student" },
  { id: "seonggyun-han", name: "Seonggyun Han", credential: "M.S. Student" },
  { id: "youngjoo-jin", name: "Youngjoo Jin", credential: "MD, Ph.D" },
  { id: "habtamu-minassie-aycheh", name: "Habtamu Minassie Aycheh", credential: "Ph.D" },
  { id: "john-chamberlin", name: "John Chamberlin", credential: "Ph.D" },
  { id: "juhyun-park", name: "Juhyun Park", credential: "MSc. Student" },
  { id: "jaehang-shin", name: "Jaehang Shin", credential: "MSc. Student" },
];
```

- [ ] **Step 2: Re-run the test**

Run:

```bash
npm test -- tests/people-page.test.tsx
```

Expected: still FAIL because no archive component is rendered, while the import now resolves.

### Task 3: Render the archive and insert it in the page flow

**Files:**
- Create: `components/alumni-archive.tsx`
- Modify: `app/people/page.tsx`
- Modify: `tests/people-page.test.tsx`

- [ ] **Step 1: Create the presentational component**

Create `components/alumni-archive.tsx`:

```tsx
import type { Alumnus } from "../content/people";

type AlumniArchiveProps = {
  alumni: Alumnus[];
};

export function AlumniArchive({ alumni }: AlumniArchiveProps) {
  return (
    <section className="alumni-archive" aria-labelledby="alumni-heading">
      <div className="alumni-archive__intro">
        <p className="eyebrow">PEOPLE / 02</p>
        <h2 id="alumni-heading">Alumni<br />archive</h2>
        <p>The people who carried VIB Lab&apos;s questions forward. A distinct record of the lab&apos;s research community.</p>
        <p className="alumni-archive__count">{String(alumni.length).padStart(2, "0")} RECORDS</p>
      </div>
      <ol className="alumni-archive__list">
        {alumni.map((alumnus, index) => (
          <li key={alumnus.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{alumnus.name}</h3>
            <p>{alumnus.credential} / Alumni</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 2: Insert the archive into `PeoplePage`**

Add these imports:

```tsx
import { AlumniArchive } from "../../components/alumni-archive";
import { alumni, people } from "../../content/people";
```

Then place this viewport immediately after the existing Directory viewport:

```tsx
<ViewportSection chapter="Alumni" className="alumni-viewport">
  <AlumniArchive alumni={alumni} />
</ViewportSection>
```

- [ ] **Step 3: Run the focused test to verify it passes**

Run:

```bash
npm test -- tests/people-page.test.tsx
```

Expected: PASS with the archive region, eleven rows, and the archive viewport in index 2.

### Task 4: Add the visual system and responsive layout

**Files:**
- Modify: `app/globals.css`
- Test: `tests/people-page.test.tsx`

- [ ] **Step 1: Add desktop archive rules**

Append the archive rules beside the People directory styles:

```css
.alumni-viewport { min-height: 100svh; padding: 112px 80px 84px; background: #f7f5f0; color: var(--ca-ink); }
.alumni-archive { width: min(1440px,100%); margin: 0 auto; display: grid; grid-template-columns: minmax(250px,.9fr) minmax(0,2.1fr); gap: clamp(40px,7vw,110px); }
.alumni-archive__intro { align-self: start; position: sticky; top: 104px; }
.alumni-archive__intro .eyebrow { color: var(--ca-orange); }
.alumni-archive__intro h2 { margin: 0; font-size: clamp(58px,6vw,106px); font-weight: 430; line-height: .82; letter-spacing: -.08em; }
.alumni-archive__intro > p:not(.eyebrow):not(.alumni-archive__count) { max-width: 280px; margin: 26px 0 0; color: rgba(35,35,35,.62); font-size: 15px; line-height: 1.45; }
.alumni-archive__count { margin: 36px 0 0; padding-top: 12px; border-top: 1px solid rgba(35,35,35,.4); font: 500 10px/1 var(--font-geist-mono),monospace; letter-spacing: .08em; }
.alumni-archive__list { margin: 0; padding: 0; list-style: none; border-top: 1px solid var(--ca-ink); }
.alumni-archive__list li { display: grid; grid-template-columns: 44px minmax(0,1fr) auto; gap: 16px; align-items: center; padding: 17px 0; border-bottom: 1px solid rgba(35,35,35,.28); }
.alumni-archive__list span, .alumni-archive__list p { margin: 0; font: 500 10px/1.2 var(--font-geist-mono),monospace; letter-spacing: .04em; text-transform: uppercase; }
.alumni-archive__list span { color: var(--ca-orange); }
.alumni-archive__list h3 { margin: 0; font-size: clamp(24px,2vw,34px); font-weight: 430; letter-spacing: -.05em; }
.alumni-archive__list p { color: rgba(35,35,35,.58); text-align: right; }
```

- [ ] **Step 2: Add the mobile breakpoint**

Inside the existing `@media (max-width: 900px)` block, append:

```css
.alumni-viewport { min-height: auto; padding: 110px 24px 72px; }
.alumni-archive { grid-template-columns: 1fr; gap: 48px; }
.alumni-archive__intro { position: static; }
```

Inside the existing `@media (max-width: 620px)` block, append:

```css
.alumni-archive__intro h2 { font-size: 64px; }
.alumni-archive__list li { grid-template-columns: 28px minmax(0,1fr); gap: 10px; }
.alumni-archive__list p { grid-column: 2; text-align: left; }
```

- [ ] **Step 3: Add a CSS regression assertion**

Append this test:

```tsx
it("keeps the alumni archive separate on desktop and stacks it on mobile", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

  expect(css).toMatch(/\.alumni-archive\s*\{[^}]*grid-template-columns:\s*minmax\(250px,\.9fr\) minmax\(0,2\.1fr\);/);
  expect(css).toMatch(/@media \(max-width: 900px\)\s*\{[\s\S]*?\.alumni-archive\s*\{[^}]*grid-template-columns:\s*1fr;/);
});
```

- [ ] **Step 4: Run the focused test suite**

Run:

```bash
npm test -- tests/people-page.test.tsx
```

Expected: PASS with no failing assertions.

### Task 5: Verify and commit the feature

**Files:**
- Modify: `content/people.ts`
- Create: `components/alumni-archive.tsx`
- Modify: `app/people/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/people-page.test.tsx`

- [ ] **Step 1: Run the focused lint and test commands**

Run:

```bash
npm test -- tests/people-page.test.tsx
npm run lint -- content/people.ts components/alumni-archive.tsx app/people/page.tsx
```

Expected: each command exits with status 0.

- [ ] **Step 2: Verify all eleven runtime records**

Run:

```bash
rg -n 'Soo-ah Cho|Byungwook Oh|Wongyung Choi|Ingi Song|Nahyun Kim|Seonggyun Han|Youngjoo Jin|Habtamu Minassie Aycheh|John Chamberlin|Juhyun Park|Jaehang Shin' content/people.ts
```

Expected: eleven matching alumni records.

- [ ] **Step 3: Commit the implementation**

Run:

```bash
git add content/people.ts components/alumni-archive.tsx app/people/page.tsx app/globals.css tests/people-page.test.tsx
git commit -m "feat: add people alumni archive"
```

Expected: one feature commit containing only the alumni archive implementation and its test.
