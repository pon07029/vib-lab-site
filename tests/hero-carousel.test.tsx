import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";

import { HeroCarousel } from "../components/ui/hero-carousel";

const items = [
  { id: "one", title: "One\nField", image: "/one.webp" },
  { id: "two", title: "Two\nField", image: "/two.webp" },
];

it("moves the focused card when a gallery item is selected", async () => {
  const user = userEvent.setup();
  render(<HeroCarousel items={items} brand="VIB / GALLERY" />);

  expect(screen.getByRole("group", { name: "Featured looks" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "One Field" })).toHaveAttribute("aria-current", "true");

  await user.click(screen.getByRole("button", { name: "Two Field" }));

  expect(screen.getByRole("button", { name: "Two Field" })).toHaveAttribute("aria-current", "true");
});
