export interface ContentfulSource {
  query<T>(gql: string, vars?: Record<string, unknown>): Promise<T>;
  fetchAsset(url: string): Promise<ArrayBuffer | undefined>;
}

const QUERY_TIMEOUT_MS = 8000;
const ASSET_TIMEOUT_MS = 2500;

function endpoint() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessKey = process.env.CONTENTFUL_ACCESS_KEY;
  if (!spaceId || !accessKey) {
    throw new Error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_KEY environment variable");
  }
  return {
    url: `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/master`,
    accessKey,
  };
}

function absoluteUrl(url: string): string {
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

export const graphqlSource: ContentfulSource = {
  async query<T>(graphql: string, variables?: Record<string, unknown>): Promise<T> {
    const { url, accessKey } = endpoint();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), QUERY_TIMEOUT_MS);

    let res: Response;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: graphql, variables }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Contentful ${res.status}: ${body.slice(0, 200)}`);
    }

    const json = await res.json();
    if (json.errors) {
      throw new Error(`Contentful GraphQL: ${JSON.stringify(json.errors).slice(0, 200)}`);
    }
    return json.data as T;
  },

  async fetchAsset(url: string): Promise<ArrayBuffer | undefined> {
    const assetUrl = absoluteUrl(url);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ASSET_TIMEOUT_MS);

    try {
      const response = await fetch(assetUrl, { signal: controller.signal });
      if (!response.ok) {
        console.error(`asset fetch ${response.status} for ${assetUrl}`);
        return undefined;
      }
      return await response.arrayBuffer();
    } catch (error) {
      if ((error as Error)?.name !== "AbortError") {
        console.error(`asset fetch failed for ${assetUrl}:`, error);
      }
      return undefined;
    } finally {
      clearTimeout(timer);
    }
  },
};
