import BlockTextLeft from "./blocktextleft";
import BlockTextArea from "./blocktextarea";
import BlockImage from "./blockimage";
import BlockTwoColumn from "./blocktwocolumn";
import BlockVideo from "./blockvideo";

const MODULE_MAP = {
  TextLeft: BlockTextLeft,
  TextArea: BlockTextArea,
  Image: BlockImage,
  Video: BlockVideo,
  TwoColumn: BlockTwoColumn,
};

export default function ContentModules({ blocksCollection }) {
  return (
    <div>
      {blocksCollection.items.map(({ __typename: type, ...props }, i) => {
        const Component = MODULE_MAP[type];
        return <Component key={i} {...props} />;
      })}
    </div>
  );
}
