import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import PublicationsPage from "../app/publications/page";

it("starts Publications with the archive after removing the first two viewports", () => {
  render(<PublicationsPage />);

  expect(screen.getByRole("heading", { name: "Browse the record." })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /Evidence, made public/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /One finding at a time/i })).not.toBeInTheDocument();
  expect(document.querySelector('[data-chapter="Archive"]')).toBeInTheDocument();
});
