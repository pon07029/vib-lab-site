import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import ResearchPage from "../app/research/page";

it("keeps only the final Research console viewport", () => {
  render(<ResearchPage />);

  expect(document.querySelectorAll(".viewport-section")).toHaveLength(1);
  expect(screen.getByRole("heading", { name: /Inspect the complete project record/i })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /Research is a field/i })).not.toBeInTheDocument();
  expect(screen.queryByText("VIB / ACTIVE RESEARCH")).not.toBeInTheDocument();
});
