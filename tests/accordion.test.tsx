import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";

import { Accordion } from "../components/accordion";

it("keeps one notice open", async () => {
  const user = userEvent.setup();
  render(<Accordion items={[{ id: "a", title: "A", body: "Alpha" }, { id: "b", title: "B", body: "Beta" }]} />);
  await user.click(screen.getByRole("button", { name: "B" }));
  expect(screen.getByRole("button", { name: "A" })).toHaveAttribute("aria-expanded", "false");
  expect(screen.getByRole("button", { name: "B" })).toHaveAttribute("aria-expanded", "true");
});
