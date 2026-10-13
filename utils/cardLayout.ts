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

/* Featured grid is 12 columns at md+: the first card spans 8 next to one
   standard card, then rows of three 4-column cards. The last card stretches
   to close a short final row: alone → full width, after one other → span 8. */
export function cardLayout(grid: CardGrid, index: number, count: number): CardSlot {
  if (grid === "footer") return FOOTER_SLOT;

  if (index === 0) {
    return { size: "large", variant: "cardLarge", priority: true, showDescription: true };
  }

  const isLast = index === count - 1;
  const lastRowCount = (count - 2) % 3;
  if (isLast && count >= 3 && lastRowCount === 1) {
    return { size: "full", variant: "hero", priority: false, showDescription: false };
  }
  if (isLast && count >= 3 && lastRowCount === 2) {
    return { size: "large", variant: "cardLarge", priority: false, showDescription: false };
  }

  return { size: "standard", variant: "card", priority: false, showDescription: false };
}
