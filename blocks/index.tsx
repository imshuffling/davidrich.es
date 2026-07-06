import BlockTextLeft from "./BlockTextLeft/index";
import BlockTextArea from "./BlockTextArea/index";
import BlockImage from "./BlockImage/index";
import BlockTwoColumn from "./BlockTwoColumn/index";
import BlockVideo from "./BlockVideo/index";
import type { BlocksProps } from "@/types/components";
import type { ContentfulBlock } from "@/types/contentful";

function renderBlock(block: ContentfulBlock, key: number) {
  switch (block.__typename) {
    case "TextLeft":
      return <BlockTextLeft key={key} {...block} />;
    case "TextArea":
      return <BlockTextArea key={key} {...block} />;
    case "Image":
      return <BlockImage key={key} {...block} />;
    case "Video":
      return <BlockVideo key={key} {...block} />;
    case "TwoColumn":
      return <BlockTwoColumn key={key} {...block} />;
    default:
      console.warn(`Unknown block type: ${(block as { __typename: string }).__typename}`);
      return null;
  }
}

export default function Blocks({ blocksCollection }: BlocksProps) {
  return <div>{blocksCollection.items.map(renderBlock)}</div>;
}
