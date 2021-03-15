import React from "react";

export default function BlockVideo({ video, image }) {
  return (
    <div className="section video">
      <video
        controls
        playsInline
        track={video.description}
        poster={image.file.url}
        src={video.file.url}
        alt="Video recording of the website"
      />
    </div>
  );
}
