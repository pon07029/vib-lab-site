# Alumni Archive Design

## Goal

Add the supplied eleven alumni records to the People page without mixing them with current lab members.

## Page Structure

The People page will retain its existing three stages and insert a fourth stage between the current member directory and Join:

1. People hero
2. Current member directory with portraits and role filters
3. Alumni Archive
4. Join the Lab

The hero count remains `08 PROFILES` because it describes only current people.

## Alumni Archive

The new section uses the existing paper background, ink rules, orange mono labels, and thin borders. It is a distinct archive rather than a directory filter.

- Left column: `PEOPLE / 02` label, `Alumni archive` heading, short archive description, and `11 RECORDS` count.
- Right column: an indexed list. Every row includes the sequence number, name, and degree or prior role.
- No photos, research fields, or project tags are shown because they were not provided.
- The archive appears after all current-member cards and before the existing orange Join section.
- On small screens, the archive becomes one column while retaining each list row's index, name, and credential.

## Data

Create a separate alumni content collection. Each item has an id, name, and credential:

1. Soo-ah Cho — M.S. Student
2. Byungwook Oh — M.S. Student
3. Wongyung Choi — Undergraduate Researcher
4. Ingi Song — Undergraduate Student
5. Nahyun Kim — Undergraduate Student
6. Seonggyun Han — M.S. Student
7. Youngjoo Jin — MD, Ph.D
8. Habtamu Minassie Aycheh — Ph.D
9. John Chamberlin — Ph.D
10. Juhyun Park — MSc. Student
11. Jaehang Shin — MSc. Student

## Component Boundaries

- `content/people.ts` owns both current people and alumni records.
- A new presentational `AlumniArchive` component receives alumni data and renders the archive list.
- `app/people/page.tsx` controls section order only.
- `app/globals.css` provides archive-specific layout and responsive rules.

## Verification

- Add a People page test that verifies an independent Alumni section exists after the member directory.
- Verify all eleven names and credentials are rendered.
- Verify the current People hero retains the eight-profile count.
- Run the focused People tests and a syntax/content check for the new data.
