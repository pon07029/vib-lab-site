import { describe, expect, it } from "vitest";

import { existsSync } from "node:fs";
import { join } from "node:path";

import { galleryItems } from "../content/gallery";
import { people } from "../content/people";
import { projects } from "../content/projects";
import { publications } from "../content/publications";
import { site } from "../content/site";

describe("VIB Lab content", () => {
  it("exposes the approved identity and six projects", () => {
    expect(site.name).toBe("VIB Lab");
    expect(site.email).toBe("amazon@snu.ac.kr");
    expect(projects).toHaveLength(6);
    expect(projects[0].name).toBe("AIChatVet");
  });
});

it("uses the provided member portraits and names for the People directory", () => {
  expect(people.map((person) => person.name)).toEqual([
    "Arok Choi",
    "Minkyung Choi",
    "Jeonghyun Lee",
    "Younghan Song",
    "Younghee Lee",
    "Hyeongjin Ju",
    "Solhee Hong",
    "Angela Do Youn Kim",
  ]);

  people.forEach((person) => {
    expect(person.image).toMatch(/^\/people\/.+\.jpg$/);
    expect(existsSync(join(process.cwd(), "public", person.image!))).toBe(true);
  });
});

it("uses every provided conference and daily-life photograph in the gallery", () => {
  expect(galleryItems).toHaveLength(15);
  expect(galleryItems.map((item) => item.title)).toContain("2026\nVeterinary Academy 01");
  expect(galleryItems.map((item) => item.title)).toContain("2026\nTeachers' Day");

  galleryItems.forEach((item) => {
    expect(item.image).toMatch(/^\/gallery\/(conference|daily)\/.+\.jpg$/);
    expect(existsSync(join(process.cwd(), "public", item.image))).toBe(true);
  });
});

it("loads the provided 47-record publication archive", () => {
  expect(publications).toHaveLength(47);
  expect(publications[0]).toMatchObject({
    year: 2025,
    type: "Article",
    doi: "10.1186/s12864-025-11362-x",
  });
  expect(publications[0].title).toContain("Alzheimer’s disease");
  expect(publications[0].authors).toContain("Younghee Lee");
});
