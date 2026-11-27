import { describe, expect, it } from "vitest";
import { coverUv, cssColorToVec3 } from "@/utils/webgl";

describe("cssColorToVec3", () => {
  it("parses 6-digit hex with surrounding whitespace", () => {
    expect(cssColorToVec3(" #ff0080 ")).toEqual([1, 0, 128 / 255]);
  });

  it("expands 3-digit hex", () => {
    expect(cssColorToVec3("#f08")).toEqual([1, 0, 136 / 255]);
  });

  it("returns null for anything that is not hex", () => {
    expect(cssColorToVec3("rgba(252, 249, 248, 0.7)")).toBeNull();
    expect(cssColorToVec3("")).toBeNull();
  });
});

describe("coverUv", () => {
  it("is identity when aspects match", () => {
    expect(coverUv(1.5, 1.5)).toEqual({ scale: [1, 1], offset: [0, 0] });
  });

  it("crops the sides of an image wider than its box", () => {
    expect(coverUv(2, 1)).toEqual({ scale: [0.5, 1], offset: [0.25, 0] });
  });

  it("crops top and bottom of an image taller than its box", () => {
    expect(coverUv(1, 2)).toEqual({ scale: [1, 0.5], offset: [0, 0.25] });
  });

  it("falls back to identity for unusable aspects", () => {
    expect(coverUv(0, 1)).toEqual({ scale: [1, 1], offset: [0, 0] });
    expect(coverUv(NaN, 1)).toEqual({ scale: [1, 1], offset: [0, 0] });
  });
});
