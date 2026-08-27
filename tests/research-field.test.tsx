import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ResearchField } from "../components/research-field";
import { projects } from "../content/projects";

describe("ResearchField", () => {
  it("selects another project and resets to AIChatVet", async () => {
    const user = userEvent.setup();
    render(<ResearchField projects={projects} />);
    await user.click(screen.getByRole("button", { name: projects[1].name }));
    expect(screen.getByText(projects[1].descriptor)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reset to AIChatVet" }));
    expect(screen.getByText(projects[0].descriptor)).toBeInTheDocument();
  });
});
