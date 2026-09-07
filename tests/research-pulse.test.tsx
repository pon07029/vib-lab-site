import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";

import { ResearchPulse } from "../components/research-pulse";
import { projects } from "../content/projects";

it("selects a project in the research field", async () => {
  const user = userEvent.setup();
  render(<ResearchPulse projects={projects} />);
  await user.click(screen.getByRole("button", { name: `Select ${projects[2].name}` }));
  expect(screen.getByRole("status")).toHaveTextContent(projects[2].descriptor);
});

it("renders the animated photo dither background", () => {
  render(<ResearchPulse projects={projects} />);
  const canvas = document.querySelector(".ascii-dither-canvas");
  expect(canvas).toBeInTheDocument();
  expect(canvas).toHaveAttribute("data-render-mode", "dither");
  expect(canvas).toHaveAttribute("data-cell-size", "6");
  expect(canvas).toHaveAttribute("data-animation", "pulse");
  expect(canvas).toHaveAttribute("data-source", "/research-pulse-cat.png");
  expect(canvas).toHaveAttribute("data-ascii-engine", "full-pipeline");
  expect(canvas).toHaveAttribute("data-render-mode-count", "25");
  expect(document.querySelector(".numeric-field")).not.toBeInTheDocument();
});
