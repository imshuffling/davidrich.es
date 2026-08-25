import { describe, expect, it } from "vitest";
import { INTENTS, withParams } from "@/utils/imageParams";
import contentfulLoader from "@/utils/contentfulLoader";

describe("withParams", () => {
  it("appends transform params to a bare url", () => {
    expect(withParams("https://images.ctfassets.net/a/b.jpg", { w: 800 })).toBe(
      "https://images.ctfassets.net/a/b.jpg?w=800",
    );
  });

  it("replaces existing transform params and keeps unrelated ones", () => {
    expect(
      withParams("https://images.ctfassets.net/a/b.jpg?w=100&h=100&foo=bar", { w: 800, q: 80 }),
    ).toBe("https://images.ctfassets.net/a/b.jpg?foo=bar&w=800&q=80");
  });

  it("removes params set to undefined", () => {
    expect(withParams("https://images.ctfassets.net/a/b.jpg?h=100", {})).toBe(
      "https://images.ctfassets.net/a/b.jpg",
    );
  });
});

describe("INTENTS", () => {
  it("defines hero and poster as 16:9 fill crops", () => {
    for (const intent of ["hero", "poster"] as const) {
      expect(INTENTS[intent].params).toEqual({ w: 1600, h: 900, fit: "fill" });
      expect(INTENTS[intent].blur).toBe(true);
    }
  });

  it("defines card and twoColumn as width-only resizes", () => {
    for (const intent of ["card", "twoColumn"] as const) {
      expect(INTENTS[intent].params).toEqual({ w: 800 });
      expect(INTENTS[intent].blur).toBe(true);
    }
  });

  it("defines og as a 1200x630 jpg without blur", () => {
    expect(INTENTS.og.params).toEqual({ w: 1200, h: 630, fit: "fill", q: 80, fm: "jpg" });
    expect(INTENTS.og.blur).toBe(false);
  });
});

describe("contentfulLoader", () => {
  it("scales a baked-in crop proportionally", () => {
    const url = contentfulLoader({
      src: "https://images.ctfassets.net/a/b.jpg?w=1600&h=900&fit=fill",
      width: 800,
    });
    const params = new URLSearchParams(url.split("?")[1]);
    expect(params.get("w")).toBe("800");
    expect(params.get("h")).toBe("450");
    expect(params.get("fit")).toBe("fill");
    expect(params.get("fm")).toBe("avif");
    expect(params.get("q")).toBe("80");
  });

  it("passes width and quality through for uncropped sources", () => {
    const url = contentfulLoader({
      src: "https://images.ctfassets.net/a/b.jpg?w=800",
      width: 640,
      quality: 75,
    });
    const params = new URLSearchParams(url.split("?")[1]);
    expect(params.get("w")).toBe("640");
    expect(params.get("h")).toBeNull();
    expect(params.get("q")).toBe("75");
  });
});
