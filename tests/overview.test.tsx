import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import Home from "../app/page";
import { projects } from "../content/projects";

it("keeps the first three Overview viewports and adds the glass image study as the fourth", () => {
  render(<Home />);
  expect(document.querySelector(".overview-page")).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1, name: /Connecting animal health/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Three data worlds/i })).toBeInTheDocument();
  expect(document.querySelectorAll(".viewport-section")).toHaveLength(4);
  const glassStudy = screen.getByRole("region", { name: "Glass image study" });
  expect(glassStudy.querySelector("canvas")).toHaveAttribute("data-shape", "square");
  expect(glassStudy.querySelector("canvas")).toHaveAttribute("data-scale", "0.8");
  expect(glassStudy.querySelector("canvas")).toHaveAttribute("data-zoom", "fixed");
  expect(glassStudy.querySelector("canvas")).toHaveAttribute("data-environment", "hdr");
  expect(glassStudy.querySelector("canvas")).toHaveAttribute("data-opacity", "0.68");
  expect(glassStudy.querySelector("canvas")).toHaveAttribute("data-finish", "polished");
  expect(glassStudy.querySelector("canvas")).toHaveAttribute("data-roughness", "0.015");
  expect(glassStudy.querySelector("canvas")).toHaveAttribute("data-visibility", "enhanced");
  expect(glassStudy.querySelector("canvas")).toHaveAttribute("data-background", "paper");
  expect(glassStudy.querySelector("canvas")).toHaveAttribute("data-image", "/glass-image-study.png");
  expect(glassStudy.querySelector("canvas")).toHaveAttribute("data-footprint", "0.7");
  expect(glassStudy.querySelector("canvas")).toHaveAttribute("data-depth", "1.5");
  expect(screen.queryByLabelText("Upload image")).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "Square frame" })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /Research systems/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /Publications with a job to do/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /Gallery/i })).not.toBeInTheDocument();
  projects.forEach((project) => expect(screen.getAllByText(project.name).length).toBeGreaterThan(0));
});
