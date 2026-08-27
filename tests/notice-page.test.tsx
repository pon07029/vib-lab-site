import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import NoticePage from "../app/notice/page";

it("renders the standalone Notice route as Gallery", () => {
  render(<NoticePage />);

  expect(screen.getByRole("heading", { name: "Gallery" })).toBeInTheDocument();
  expect(screen.getByRole("group", { name: "Featured looks" })).toBeInTheDocument();
  expect(screen.queryByText(/Signals from the lab/i)).not.toBeInTheDocument();
});
