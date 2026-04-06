import type { BlockVideo as BlockVideoProps } from "@/types/contentful";

export default function BlockVideo({ video, image }: BlockVideoProps) {
  return (
    <div className="section" style={{ borderRadius: "0.75rem", overflow: "hidden" }}>
      <video
        controls
        playsInline
        poster={`${image.url}`}
        src={video.url}
        aria-label={video.description || "Video recording of the website"}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <track kind="captions" />
      </video>
    </div>
  );
}
