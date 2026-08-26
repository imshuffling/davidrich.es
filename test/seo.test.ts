import { describe, expect, it } from "vitest";
import { BLOCKS, type Document } from "@contentful/rich-text-types";
import { deriveSeo } from "@/utils/metadata";
import { SITE_URL } from "@/utils/site";

const json: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [{ nodeType: "text", value: "x".repeat(300), marks: [], data: {} }],
    },
  ],
};

const body = { json };

describe("deriveSeo", () => {
  it("strips html from the title and prefers seoTitle", () => {
    const seo = deriveSeo({ title: "Fallback", seoTitle: "Shell <br> V-Power", slug: "shell", body });
    expect(seo.plainTitle).toBe("Shell  V-Power");
  });

  it("falls back to title when seoTitle is empty", () => {
    const seo = deriveSeo({ title: "My <span>Project</span>", seoTitle: "", slug: "p", body });
    expect(seo.plainTitle).toBe("My Project");
  });

  it("truncates the description to 160 characters", () => {
    const seo = deriveSeo({ title: "T", seoTitle: "T", slug: "p", body });
    expect(seo.description).toHaveLength(160);
  });

  it("builds the canonical page url from the slug", () => {
    const seo = deriveSeo({ title: "T", seoTitle: "T", slug: "grolsch", body });
    expect(seo.pageUrl).toBe(`${SITE_URL}/portfolio/grolsch`);
  });
});
