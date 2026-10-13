import type { ImageVariant } from "@/components/ImageWrapper";

export type CardGrid = "featured" | "footer";

export interface CardSlot {
  size: "standard" | "large" | "full";
  variant: ImageVariant;
  priority: boolean;
  showDescription: boolean;
}

const FOOTER_SLOT: CardSlot = {
  size: "standard",
  variant: "footerCard",
  priority: false,
  showDescription: false,
};

/* Featured grid is 12 columns at md+: the first card spans 8, the rest 4.
   A last card that would sit alone in a row with a gap goes full width. */
export function cardLayout(grid: CardGrid, index: number, count: number): CardSlot {
  if (grid === "footer") return FOOTER_SLOT;

  if (index === 0) {
    return { size: "large", variant: "cardLarge", priority: true, showDescription: true };
  }

  const isLast = index === count - 1;
  if (isLast && count >= 3 && count % 3 !== 2) {
    return { size: "full", variant: "hero", priority: false, showDescription: false };
  }

  return { size: "standard", variant: "card", priority: false, showDescription: false };
}
