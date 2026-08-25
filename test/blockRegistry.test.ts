import { describe, expect, it } from "vitest";
import { BLOCK_REGISTRY, BLOCKS_FRAGMENT } from "@/blocks/registry";

const TYPENAMES = ["TextLeft", "TextArea", "Image", "Video", "TwoColumn"] as const;
const IMAGE_BEARING = ["Image", "Video", "TwoColumn"] as const;

describe("BLOCK_REGISTRY", () => {
  it("has an entry with a matching fragment and component for every block type", () => {
    for (const name of TYPENAMES) {
      const def = BLOCK_REGISTRY[name];
      expect(def, name).toBeDefined();
      expect(def.fragment).toContain(`... on ${name}`);
      expect(def.Component).toBeTypeOf("function");
    }
  });

  it("has an enricher for every image-bearing block type", () => {
    for (const name of IMAGE_BEARING) {
      expect(BLOCK_REGISTRY[name].enrich, name).toBeTypeOf("function");
    }
  });

  it("composes every fragment into BLOCKS_FRAGMENT", () => {
    for (const name of TYPENAMES) {
      expect(BLOCKS_FRAGMENT).toContain(`... on ${name}`);
    }
  });
});
