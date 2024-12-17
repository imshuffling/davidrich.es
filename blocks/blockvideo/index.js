export default function BlockVideo({ video, image }) {
  return (
    <div className="section video">
      <video
        controls
        playsInline
        track={video.description}
        poster={`${image.url}`}
        src={video.url}
        alt="Video recording of the website"
      />
    </div>
  );
}
