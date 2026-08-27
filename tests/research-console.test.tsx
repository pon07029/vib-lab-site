import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";

import { ResearchConsole } from "../components/research-console";
import { projects } from "../content/projects";

it("switches project data and toggles its terminal", async () => {
  const user = userEvent.setup();
  render(<ResearchConsole projects={projects} />);

  await user.click(screen.getByRole("button", { name: projects[2].name }));
  await user.click(screen.getByRole("tab", { name: "Data" }));
  expect(screen.getByText(projects[2].data[0])).toBeInTheDocument();

  expect(screen.queryByRole("region", { name: "Research terminal" })).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Show terminal" }));
  expect(screen.getByRole("region", { name: "Research terminal" })).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Hide terminal" }));
  expect(screen.queryByRole("region", { name: "Research terminal" })).not.toBeInTheDocument();
});
