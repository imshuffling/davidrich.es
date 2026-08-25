import { describe, expect, it } from "vitest";
import { visualFor } from "@/utils/visuals";

describe("visualFor", () => {
  it("is deterministic for the same title and context", () => {
    const a = visualFor("Front-end Development", "service");
    const b = visualFor("Front-end Development", "service");
    expect(a.bg).toBe(b.bg);
    expect(a.color).toBe(b.color);
    expect(a.icon).toBe(b.icon);
  });

  it("returns the dumbbell icon for fitness side projects", () => {
    const fitness = visualFor("Fitness Tracker", "sideProject");
    const other = visualFor("Recipe Finder", "sideProject");
    expect(fitness.icon).not.toBe(other.icon);
    expect(visualFor("My Fitness App", "sideProject").icon).toBe(fitness.icon);
  });

  it("always returns a palette colour pair", () => {
    for (const title of ["Alpha", "Beta", "Gamma", "Delta"]) {
      for (const context of ["service", "sideProject"] as const) {
        const visual = visualFor(title, context);
        expect(visual.bg).toMatch(/^rgba\(/);
        expect(visual.color).toMatch(/^#/);
        expect(visual.icon).toBeDefined();
      }
    }
  });
});
