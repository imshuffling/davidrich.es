import type { ContentfulSource } from "@/utils/contentful/source";

export const ASSET_BYTES = new Uint8Array([1, 2, 3]).buffer;

export function fixtureSource(
  responses: Record<string, unknown>,
  { assets = true }: { assets?: boolean } = {},
): ContentfulSource & { calls: { gql: string; vars?: Record<string, unknown> }[] } {
  const calls: { gql: string; vars?: Record<string, unknown> }[] = [];
  return {
    calls,
    async query<T>(gql: string, vars?: Record<string, unknown>) {
      calls.push({ gql, vars });
      if (!(gql in responses)) throw new Error("fixtureSource: no response for query");
      return responses[gql] as T;
    },
    async fetchAsset() {
      return assets ? ASSET_BYTES : undefined;
    },
  };
}
