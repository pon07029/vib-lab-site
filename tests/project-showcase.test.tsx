import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { ProjectShowcase } from "../components/project-showcase";
import { projects } from "../content/projects";

it("reveals a project's image on hover and keyboard focus", () => {
  render(<ProjectShowcase projects={projects.slice(0, 2)} />);
  const card = screen.getByRole("article", { name: projects[0].name });
  expect(card).toHaveAttribute("data-state", "data");
  fireEvent.pointerEnter(card);
  expect(card).toHaveAttribute("data-state", "image");
  fireEvent.pointerLeave(card);
  expect(card).toHaveAttribute("data-state", "data");
  fireEvent.focus(screen.getByRole("link", { name: `Open ${projects[0].name} project` }));
  expect(card).toHaveAttribute("data-state", "image");
});
