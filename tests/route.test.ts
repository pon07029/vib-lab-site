import { expect, it } from "vitest";

import { activeRoute } from "../lib/route";

it("maps root and nested paths to navigation labels", () => {
  expect(activeRoute("/")).toBe("Overview");
  expect(activeRoute("/overview")).toBe("Overview");
  expect(activeRoute("/research")).toBe("Research");
  expect(activeRoute("/publications/paper")).toBe("Publications");
});
