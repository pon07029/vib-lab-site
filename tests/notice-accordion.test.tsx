import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";

import { NoticeAccordion } from "../components/notice-accordion";
import { notices } from "../content/notices";

it("keeps exactly one notice open", async () => {
  const user = userEvent.setup();
  render(<NoticeAccordion notices={notices} />);
  expect(screen.getByRole("button", { name: notices[0].title })).toHaveAttribute("aria-expanded", "true");
  await user.click(screen.getByRole("button", { name: notices[1].title }));
  expect(screen.getByRole("button", { name: notices[0].title })).toHaveAttribute("aria-expanded", "false");
  expect(screen.getByRole("button", { name: notices[1].title })).toHaveAttribute("aria-expanded", "true");
});
