import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { NAV_LINKS, PAGES } from "@/utils/site";

const APP = join(__dirname, "..", "app");

// Static routes = app/**/page.tsx outside dynamic ([param]) and api segments
function staticRoutes(dir = APP, path = ""): string[] {
  const routes = existsSync(join(dir, "page.tsx")) ? [path || "/"] : [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith("[") || entry.name === "api") continue;
    routes.push(...staticRoutes(join(dir, entry.name), `${path}/${entry.name}`));
  }
  return routes;
}

const paths = Object.values(PAGES).map((page) => page.path);

describe("PAGES", () => {
  it("has an entry for every static route and no others", () => {
    expect([...paths].sort()).toEqual(staticRoutes().sort());
  });

  it("gives every page its own opengraph and twitter image", () => {
    for (const path of paths) {
      const dir = join(APP, path);
      expect(existsSync(join(dir, "opengraph-image.tsx")), path).toBe(true);
      expect(existsSync(join(dir, "twitter-image.tsx")), path).toBe(true);
    }
  });

  it("drives the nav in PAGES order", () => {
    expect(NAV_LINKS.map((link) => link.href)).toEqual(paths);
  });
});
