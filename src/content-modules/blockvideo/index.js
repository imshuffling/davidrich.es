import React from "react";

export default function BlockVideo({ video, image }) {
  return (
    <div className="section video">
      <video
        muted
        playsInline
        track={video.description}
        poster={image.file.url}
        controls
        alt="Video recording of the website"
      >
        <source src={video.file.url} type="video/mp4" />
        <track kind="captions" />
      </video>
    </div>
  );
}
