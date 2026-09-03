import { readFileSync } from "node:fs";
import { join } from "node:path";

import { render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";

import PeoplePage from "../app/people/page";
import { alumni, people } from "../content/people";

it("uses the mentor-card directory in the second People viewport", () => {
  render(<PeoplePage />);

  expect(document.querySelectorAll(".viewport-section")).toHaveLength(4);
  expect(screen.getByRole("heading", { name: "Lab members" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "All members" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Researcher members" })).toBeInTheDocument();
  expect(document.querySelector(".mentor-card-grid")).toHaveClass("mentor-card-grid--stable");
  people.forEach((person) => expect(screen.getByRole("heading", { name: person.name })).toBeInTheDocument());
});

it("renders Alumni as a separate archive between the directory and Join", () => {
  render(<PeoplePage />);

  const viewports = Array.from(document.querySelectorAll(".viewport-section"));
  const archive = screen.getByRole("region", { name: "Alumniarchive" });
  const archiveScreen = within(archive);

  expect(viewports).toHaveLength(4);
  expect(viewports.indexOf(archive.closest(".viewport-section")!)).toBe(2);
  expect(alumni).toHaveLength(11);
  expect(archiveScreen.getByText("11 RECORDS")).toBeInTheDocument();
  alumni.forEach((alumnus, index) => {
    const row = archiveScreen.getByText(alumnus.name).closest("li")!;
    const rowScreen = within(row);
    expect(rowScreen.getByText(alumnus.credential, { exact: false })).toBeInTheDocument();
    expect(rowScreen.getByText(String(index + 1).padStart(2, "0"))).toBeInTheDocument();
  });
});

it("renders each member's provided portrait", () => {
  render(<PeoplePage />);

  people.forEach((person) => {
    expect(screen.getByRole("img", { name: `${person.name} portrait` })).toHaveAttribute("src", person.image);
  });
});

it("keeps filtered cards at their natural height", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

  expect(css).toMatch(/\.mentor-card-grid--stable\s*\{[^}]*align-content:\s*start;/);
});

it("keeps the People headings sticky while their lists move with the page", () => {
  render(<PeoplePage />);

  const sidebar = document.querySelector(".mentors-section__sidebar");
  expect(sidebar).toContainElement(screen.getByRole("heading", { name: "Lab members" }));
  expect(sidebar).toContainElement(screen.getByRole("button", { name: "All members" }));

  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  expect(css).toMatch(/@media\s*\(min-width:\s*901px\)[\s\S]*?\.mentors-section__sidebar\s*\{[^}]*position:\s*sticky;[^}]*top:\s*104px;/);
  expect(css).toMatch(/\.alumni-archive__intro\s*\{[^}]*position:\s*sticky;[^}]*top:\s*104px;/);
  expect(css).not.toMatch(/\.mentor-card-grid\s*\{[^}]*overflow-y:\s*auto;/);
  expect(css).not.toMatch(/\.alumni-archive__list\s*\{[^}]*overflow-y:\s*auto;/);
});

it("keeps the Alumni archive readable across desktop and mobile layouts", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

  expect(css).toMatch(/\.alumni-archive\s*\{[^}]*grid-template-columns:\s*minmax\(250px,\s*\.9fr\)\s+minmax\(0,\s*2\.1fr\);/);
  expect(css).toMatch(/@media\s*\(max-width:\s*900px\)\s*\{[\s\S]*?\.alumni-archive\s*\{[^}]*grid-template-columns:\s*1fr;/);
  expect(css).toMatch(/@media\s*\(max-width:\s*620px\)\s*\{[\s\S]*?\.alumni-archive__list\s+li\s*\{[^}]*grid-template-columns:\s*[^;}]*;[\s\S]*?\.alumni-archive__list\s+p\s*\{[^}]*grid-column:\s*2;/);
});
