import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";

import { PublicationCarousel } from "../components/publication-carousel";
import { publications } from "../content/publications";

it("advances and wraps publication groups", async () => {
  const user = userEvent.setup();
  render(<PublicationCarousel publications={publications} />);
  expect(screen.getByRole("status")).toHaveTextContent("01 / 24");
  await user.click(screen.getByRole("button", { name: "Previous publications" }));
  expect(screen.getByRole("status")).toHaveTextContent("24 / 24");
  await user.click(screen.getByRole("button", { name: "Next publications" }));
  expect(screen.getByRole("status")).toHaveTextContent("01 / 24");
});
