import type { ReactNode } from "react";
import BlockTextLeft, { fragment as textLeftFragment } from "./BlockTextLeft";
import BlockTextArea, { fragment as textAreaFragment } from "./BlockTextArea";
import BlockImage, { fragment as imageFragment, enrich as enrichImageBlock } from "./BlockImage";
import BlockVideo, { fragment as videoFragment, enrich as enrichVideoBlock } from "./BlockVideo";
import BlockTwoColumn, {
  fragment as twoColumnFragment,
  enrich as enrichTwoColumnBlock,
} from "./BlockTwoColumn";
import type { ContentfulBlock } from "@/types/contentful";

type BlockOf<T extends ContentfulBlock["__typename"]> = Extract<ContentfulBlock, { __typename: T }>;

interface BlockDef<T extends ContentfulBlock["__typename"]> {
  fragment: string;
  enrich?: (block: BlockOf<T>) => Promise<BlockOf<T>>;
  Component: (props: BlockOf<T>) => ReactNode;
}

export const BLOCK_REGISTRY: { [T in ContentfulBlock["__typename"]]: BlockDef<T> } = {
  TextLeft: { fragment: textLeftFragment, Component: BlockTextLeft },
  TextArea: { fragment: textAreaFragment, Component: BlockTextArea },
  Image: { fragment: imageFragment, enrich: enrichImageBlock, Component: BlockImage },
  Video: { fragment: videoFragment, enrich: enrichVideoBlock, Component: BlockVideo },
  TwoColumn: { fragment: twoColumnFragment, enrich: enrichTwoColumnBlock, Component: BlockTwoColumn },
};

export const BLOCKS_FRAGMENT = Object.values(BLOCK_REGISTRY)
  .map((def) => def.fragment)
  .join("\n");

type AnyEnrich = (block: ContentfulBlock) => Promise<ContentfulBlock>;

export async function enrichBlocks(blocks: ContentfulBlock[]): Promise<ContentfulBlock[]> {
  return Promise.all(
    blocks.map((block) => {
      const enrich = BLOCK_REGISTRY[block.__typename]?.enrich as AnyEnrich | undefined;
      return enrich ? enrich(block) : Promise.resolve(block);
    }),
  );
}
