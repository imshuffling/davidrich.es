import { enrichImage } from "@/utils/contentfulImage";
import type { BlockVideo as BlockVideoProps } from "@/types/contentful";

export const fragment = `... on Video {
  image { url fileName width height }
  video { fileName url description }
}`;

export async function enrich(block: BlockVideoProps): Promise<BlockVideoProps> {
  return { ...block, image: await enrichImage(block.image, "poster") };
}

export default function BlockVideo({ video, image }: BlockVideoProps) {
  return (
    <div className="section" style={{ borderRadius: "0.75rem", overflow: "hidden" }}>
      <video
        controls
        playsInline
        poster={image.url}
        src={video.url}
        aria-label={video.description || "Video recording of the website"}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <track kind="captions" />
      </video>
    </div>
  );
}
