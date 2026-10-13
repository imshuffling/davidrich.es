import { describe, expect, it } from "vitest";
import { BLOCKS, type Document } from "@contentful/rich-text-types";
import {
  loadAbout,
  loadCaseStudy,
  loadHome,
  loadPortfolio,
  loadPortfolioSeo,
} from "@/utils/contentful/loaders";
import {
  ABOUT_QUERY,
  FEATURED_ORDER_QUERY,
  HOME_QUERY,
  PORTFOLIO_QUERY,
} from "@/utils/contentful/queries";
import { ASSET_BYTES, fixtureSource } from "./stubs/contentfulSource";
import type { ContentfulBlock, PortfolioItem } from "@/types/contentful";

const IMG = "https://images.ctfassets.net/a/b.jpg";
const image = { url: IMG, fileName: "b.jpg", width: 1600, height: 900 };
const BLUR = `data:image/webp;base64,${Buffer.from(ASSET_BYTES).toString("base64")}`;

const body = (text: string): { json: Document } => ({
  json: {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [{ nodeType: "text", value: text, marks: [], data: {} }],
      },
    ],
  },
});

const card = (slug: string, title = slug) => ({
  title,
  slug,
  client: "C",
  agency: "A",
  industry: "I",
  body: body(`about ${slug}`),
  image,
});

const home = (items: unknown[], featured = true) => ({
  [HOME_QUERY]: {
    featuredProjectsCollection: { items: featured ? [{ itemCollection: { items } }] : [] },
    sideProjectsCollection: {
      items: [{ title: "Side <script>x</script>", description: "<b>ok</b><img src=x>" }],
    },
  },
});

describe("loadHome", () => {
  it("gives only the first card a description and drops body", async () => {
    const { portfolioCollection } = await loadHome(
      fixtureSource(home([card("one"), card("two")])),
    );
    expect(portfolioCollection[0].description).toBe("about one");
    expect(portfolioCollection[1].description).toBeUndefined();
    expect(portfolioCollection.every((p) => p.body === undefined)).toBe(true);
  });

  it("sanitizes card and side project titles", async () => {
    const { portfolioCollection, sideProjectsCollection } = await loadHome(
      fixtureSource(home([card("one", "Shell<br><script>x</script>")])),
    );
    expect(portfolioCollection[0].title).toBe("Shell<br />");
    expect(sideProjectsCollection[0].title).toBe("Side ");
    expect(sideProjectsCollection[0].description).toBe("<b>ok</b>");
  });

  it("returns no cards when nothing is featured", async () => {
    const { portfolioCollection } = await loadHome(fixtureSource(home([], false)));
    expect(portfolioCollection).toEqual([]);
  });

  it("applies the card intent and blur placeholder", async () => {
    const { portfolioCollection } = await loadHome(fixtureSource(home([card("one")])));
    expect(portfolioCollection[0].image.url).toBe(`${IMG}?w=800`);
    expect(portfolioCollection[0].image.blurDataURL).toBe(BLUR);
  });

  it("falls back to a transparent pixel when the blur asset fails", async () => {
    const { portfolioCollection } = await loadHome(
      fixtureSource(home([card("one")]), { assets: false }),
    );
    expect(portfolioCollection[0].image.blurDataURL).toMatch(/^data:image\/png;base64,/);
  });
});

describe("loadAbout", () => {
  const about = (overrides: Record<string, unknown> = {}) => ({
    [ABOUT_QUERY]: {
      resumeCollection: { items: [{ image }] },
      jobCollection: { items: [] },
      skillsCollection: { items: [{ skill: [" Next.js ", "", "  ", "React"] }] },
      ...overrides,
    },
  });

  it("trims skills and drops empty ones", async () => {
    const { skills } = await loadAbout(fixtureSource(about()));
    expect(skills).toEqual(["Next.js", "React"]);
  });

  it("leaves photo undefined when the resume has no image", async () => {
    const { photo } = await loadAbout(
      fixtureSource(about({ resumeCollection: { items: [] }, skillsCollection: { items: [] } })),
    );
    expect(photo).toBeUndefined();
  });
});

const blocks: ContentfulBlock[] = [
  { __typename: "TextLeft", title: "T", body: "B" },
  { __typename: "Image", image },
  { __typename: "Video", image, video: { url: "v.mp4", fileName: "v.mp4" } },
  { __typename: "TwoColumn", image, body: "B" },
];

const portfolio = (items: unknown[]) => ({ [PORTFOLIO_QUERY]: { portfolioCollection: { items } } });

describe("loadPortfolio", () => {
  it("returns undefined for an unknown slug", async () => {
    expect(await loadPortfolio(fixtureSource(portfolio([])), "nope")).toBeUndefined();
  });

  it("passes the slug as a query variable", async () => {
    const source = fixtureSource(portfolio([]));
    await loadPortfolio(source, "grolsch");
    expect(source.calls[0].vars).toEqual({ slug: "grolsch" });
  });

  it("enriches block images per intent and sanitizes footer titles", async () => {
    const item = await loadPortfolio(
      fixtureSource(
        portfolio([
          {
            ...card("main"),
            blocksCollection: { items: blocks },
            footerCollection: { items: [card("other", "Other<script>x</script>")] },
          },
        ]),
      ),
      "main",
    );
    const urls = item!.blocksCollection!.items.map((b) => ("image" in b ? b.image.url : null));
    expect(urls).toEqual([
      null,
      `${IMG}?w=1600&h=900&fit=fill`,
      `${IMG}?w=1600&h=900&fit=fill`,
      `${IMG}?w=800`,
    ]);
    expect(item!.footerCollection!.items[0].title).toBe("Other");
    expect(item!.footerCollection!.items[0].image.url).toBe(`${IMG}?w=800`);
  });
});

describe("loadPortfolioSeo", () => {
  const item = (items: ContentfulBlock[]): PortfolioItem => ({
    ...card("main"),
    seoTitle: "",
    blocksCollection: { items },
  });

  it("takes the og image from the first Image block", async () => {
    const seo = await loadPortfolioSeo(fixtureSource({}), item(blocks));
    expect(seo.ogImage?.url).toBe(`${IMG}?w=1200&h=630&fit=fill&q=80&fm=jpg`);
    expect(seo.ogImage?.blurDataURL).toBeUndefined();
  });

  it("omits the og image when there is no Image block", async () => {
    const seo = await loadPortfolioSeo(fixtureSource({}), item([blocks[0]]));
    expect(seo.ogImage).toBeUndefined();
  });
});

describe("loadCaseStudy", () => {
  const featured = (slugs: string[]) => ({
    [FEATURED_ORDER_QUERY]: {
      featuredProjectsCollection: {
        items: [{ itemCollection: { items: slugs.map((slug) => ({ slug, title: `<em>${slug}</em><script>x</script>` })) } }],
      },
    },
  });

  const caseStudy = (slug: string, featuredSlugs: string[], sys?: PortfolioItem["sys"]) =>
    loadCaseStudy(
      fixtureSource({
        ...portfolio([{ ...card(slug), seoTitle: "", sys, blocksCollection: { items: blocks } }]),
        ...featured(featuredSlugs),
      }),
      slug,
    );

  it("returns undefined for an unknown slug", async () => {
    const source = fixtureSource({ ...portfolio([]), ...featured(["a", "b"]) });
    expect(await loadCaseStudy(source, "nope")).toBeUndefined();
  });

  it("links prev and next neighbours in featured order", async () => {
    const { pager } = (await caseStudy("b", ["a", "b", "c"]))!;
    expect(pager.prev?.slug).toBe("a");
    expect(pager.next?.slug).toBe("c");
  });

  it("wraps around at both ends", async () => {
    const first = (await caseStudy("a", ["a", "b", "c"]))!.pager;
    const last = (await caseStudy("c", ["a", "b", "c"]))!.pager;
    expect([first.prev?.slug, first.next?.slug]).toEqual(["c", "b"]);
    expect([last.prev?.slug, last.next?.slug]).toEqual(["b", "a"]);
  });

  it("gives non-featured items and single-item lists no pager", async () => {
    expect((await caseStudy("x", ["a", "b"]))!.pager).toEqual({});
    expect((await caseStudy("a", ["a"]))!.pager).toEqual({});
  });

  it("sanitizes pager titles", async () => {
    const { pager } = (await caseStudy("a", ["a", "b"]))!;
    expect(pager.next?.title).toBe("<em>b</em>");
  });

  it("includes seo with og image and publish dates", async () => {
    const { seo } = (await caseStudy("a", ["a"], { publishedAt: "2026-02-01", firstPublishedAt: "2025-01-01" }))!;
    expect(seo.ogImage?.url).toContain("w=1200&h=630");
    expect(seo.datePublished).toBe("2025-01-01");
    expect(seo.dateModified).toBe("2026-02-01");
  });

  it("falls back to whichever publish date exists", async () => {
    const { seo } = (await caseStudy("a", ["a"], { publishedAt: "2026-02-01" }))!;
    expect(seo.datePublished).toBe("2026-02-01");
    expect(seo.dateModified).toBe("2026-02-01");
  });
});
