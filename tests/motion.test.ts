import { expect, it } from "vitest";

import { motionAllowed } from "../lib/motion";

it("disables decorative motion when the user requests reduced motion", () => {
  expect(motionAllowed({ matches: true })).toBe(false);
  expect(motionAllowed({ matches: false })).toBe(true);
  expect(motionAllowed(null)).toBe(true);
});
