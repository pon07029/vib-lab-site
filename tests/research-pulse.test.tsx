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

it("renders a static numeric background without the animated ripple canvas", () => {
  render(<ResearchPulse projects={projects} />);
  expect(document.querySelector(".numeric-field")).toBeInTheDocument();
  expect(document.querySelector(".ascii-canvas")).not.toBeInTheDocument();
});
