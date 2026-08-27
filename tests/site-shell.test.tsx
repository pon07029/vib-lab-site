import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { SiteShell } from "../components/site-shell";
import { site } from "../content/site";

describe("SiteShell", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        disconnect() {}
      },
    );
  });

  it("opens and closes the mobile menu while exposing every route", async () => {
    const user = userEvent.setup();
    render(<SiteShell><section data-chapter="Overview">Overview scene</section></SiteShell>);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();
    site.navigation.forEach((item) => {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);
    });

    await user.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("opens the Learn More panel", async () => {
    const user = userEvent.setup();
    render(<SiteShell><section data-chapter="Overview">Overview scene</section></SiteShell>);
    await user.click(screen.getByRole("button", { name: "Learn more about VIB Lab" }));
    expect(screen.getByRole("dialog", { name: /connected view of animal health/i })).toBeInTheDocument();
  });
});
