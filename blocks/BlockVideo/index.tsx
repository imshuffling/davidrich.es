import type { BlockVideo as BlockVideoProps } from "@/types/contentful";

export default function BlockVideo({ video, image }: BlockVideoProps) {
  return (
    <div className="section video">
      <video
        controls
        playsInline
        poster={`${image.url}`}
        src={video.url}
        aria-label={video.description || "Video recording of the website"}
      >
        <track kind="captions" />
      </video>
    </div>
  );
}
