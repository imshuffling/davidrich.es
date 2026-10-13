import { describe, expect, it } from "vitest";
import { cardLayout } from "@/utils/cardLayout";

const sizes = (count: number) =>
  Array.from({ length: count }, (_, i) => cardLayout("featured", i, count).size);

describe("cardLayout featured grid", () => {
  it("makes the first card large, prioritised and described", () => {
    expect(cardLayout("featured", 0, 5)).toEqual({
      size: "large",
      variant: "cardLarge",
      priority: true,
      showDescription: true,
    });
  });

  it("only prioritises and describes the first card", () => {
    for (let i = 1; i < 6; i++) {
      const slot = cardLayout("featured", i, 6);
      expect(slot.priority, `index ${i}`).toBe(false);
      expect(slot.showDescription, `index ${i}`).toBe(false);
    }
  });

  // 12 cols: large = 8, standard = 4, full = 12. Matches the old nth-child rule;
  // 4 and 7 cards still leave a gap before the full-width card.
  it.each([
    [1, ["large"]],
    [2, ["large", "standard"]],
    [3, ["large", "standard", "full"]],
    [4, ["large", "standard", "standard", "full"]],
    [5, ["large", "standard", "standard", "standard", "standard"]],
    [6, ["large", "standard", "standard", "standard", "standard", "full"]],
    [7, ["large", "standard", "standard", "standard", "standard", "standard", "full"]],
  ])("lays out %i cards", (count, expected) => {
    expect(sizes(count)).toEqual(expected);
  });

  it("uses the hero image variant for full-width cards", () => {
    expect(cardLayout("featured", 2, 3).variant).toBe("hero");
  });
});

describe("cardLayout footer grid", () => {
  it("gives every footer card the same plain slot", () => {
    for (let i = 0; i < 3; i++) {
      expect(cardLayout("footer", i, 3)).toEqual({
        size: "standard",
        variant: "footerCard",
        priority: false,
        showDescription: false,
      });
    }
  });
});
