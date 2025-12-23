import BlockTextLeft from "./BlockTextLeft/index";
import BlockTextArea from "./BlockTextArea/index";
import BlockImage from "./BlockImage/index";
import BlockTwoColumn from "./BlockTwoColumn/index";
import BlockVideo from "./BlockVideo/index";
import type { BlocksProps } from "@/types/components";
import type { ContentfulBlock } from "@/types/contentful";

const MODULE_MAP: Record<string, React.ComponentType<any>> = {
  TextLeft: BlockTextLeft,
  TextArea: BlockTextArea,
  Image: BlockImage,
  Video: BlockVideo,
  TwoColumn: BlockTwoColumn,
};

export default function Blocks({ blocksCollection }: BlocksProps) {
  return (
    <div>
      {blocksCollection.items.map((block: ContentfulBlock, i: number) => {
        const { __typename: type, ...props } = block;
        const Component = MODULE_MAP[type];

        if (!Component) {
          console.warn(`Unknown block type: ${type}`);
          return null;
        }

        return <Component key={i} {...props} />;
      })}
    </div>
  );
}
