import { BLOCK_REGISTRY } from "./registry";
import type { BlocksProps } from "@/types/components";
import type { ContentfulBlock } from "@/types/contentful";

function renderBlock(block: ContentfulBlock, key: number) {
  const def = BLOCK_REGISTRY[block.__typename];
  if (!def) {
    console.warn(`Unknown block type: ${(block as { __typename: string }).__typename}`);
    return null;
  }
  const Component = def.Component as (props: ContentfulBlock) => React.ReactNode;
  return <Component key={key} {...block} />;
}

export default function Blocks({ blocksCollection }: BlocksProps) {
  return <div>{blocksCollection.items.map(renderBlock)}</div>;
}
