import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import NewsPage from "../app/news/page";
import { newsItems } from "../content/news";

it("renders News page with hero and all 5 articles", () => {
  render(<NewsPage />);

  expect(screen.getByRole("heading", { name: "What’s happening in VIB Lab." })).toBeInTheDocument();
  expect(screen.getAllByText("04 ARTICLES")).toHaveLength(2);
  expect(newsItems).toHaveLength(4);

  newsItems.forEach((item) => {
    expect(screen.getByRole("heading", { name: item.title })).toBeInTheDocument();
  });
});

it("does not include the lab website renewal notice", () => {
  render(<NewsPage />);

  expect(screen.queryByText(/Lab Website Renewal/i)).not.toBeInTheDocument();
});
