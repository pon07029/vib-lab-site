import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { DataTunnel } from "../components/data-tunnel";

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});

afterEach(() => {
  vi.useRealTimers();
});

it("renders a non-clickable orbital field with opposite direction layers", () => {
  render(<DataTunnel words={["ANIMAL HEALTH", "BIOLOGICAL DATA", "AI"]} />);
  const field = screen.getByRole("img", { name: "Veterinary data field" });
  expect(field.querySelectorAll(".is-clockwise")).toHaveLength(1);
  expect(field.querySelectorAll(".is-counterclockwise")).toHaveLength(1);
  expect(screen.queryByText("CLICK & HOLD")).not.toBeInTheDocument();
});

it("pre-renders glyphs once and leaves orbit animation to CSS", () => {
  const context = {
    arc: vi.fn(),
    beginPath: vi.fn(),
    clearRect: vi.fn(),
    drawImage: vi.fn(),
    fill: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    restore: vi.fn(),
    rotate: vi.fn(),
    save: vi.fn(),
    setTransform: vi.fn(),
    translate: vi.fn(),
  };
  vi.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValue(context as unknown as CanvasRenderingContext2D);
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ width: 960, height: 1080 } as DOMRect);
  vi.stubGlobal("requestAnimationFrame", vi.fn());
  vi.stubGlobal("cancelAnimationFrame", vi.fn());

  render(<DataTunnel words={["ANIMAL HEALTH", "BIOLOGICAL DATA", "AI"]} />);
  const preRenderedGlyphs = context.fillText.mock.calls.length;
  expect(preRenderedGlyphs).toBeGreaterThan(0);
  expect(context.fillText).toHaveBeenCalledTimes(preRenderedGlyphs);
  expect(context.drawImage).not.toHaveBeenCalled();
  expect(requestAnimationFrame).not.toHaveBeenCalled();
});

it("draws a freshly selected flash set every 100ms", () => {
  vi.useFakeTimers();
  const context = {
    arc: vi.fn(),
    beginPath: vi.fn(),
    clearRect: vi.fn(),
    fill: vi.fn(),
    fillText: vi.fn(),
    restore: vi.fn(),
    rotate: vi.fn(),
    save: vi.fn(),
    setTransform: vi.fn(),
    translate: vi.fn(),
  };
  vi.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValue(context as unknown as CanvasRenderingContext2D);
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ width: 960, height: 1080 } as DOMRect);

  render(<DataTunnel words={["ANIMAL HEALTH", "BIOLOGICAL DATA", "AI"]} />);
  const initialClears = context.clearRect.mock.calls.length;
  act(() => vi.advanceTimersByTime(100));
  const firstFlashClears = context.clearRect.mock.calls.length;
  act(() => vi.advanceTimersByTime(100));

  expect(firstFlashClears).toBeGreaterThan(initialClears);
  expect(context.clearRect.mock.calls.length).toBeGreaterThan(firstFlashClears);
});
