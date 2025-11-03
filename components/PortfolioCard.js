import Link from "next/link";
import Image from "next/image";
import imageBlur from "../utils/imageBlur";
import { useRef, useEffect, useState } from "react";

export default function PortfolioCard({ item, loading }) {
  const { title, slug, media, image, agency, index } = item;
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(!media);

  useEffect(() => {
    if (!media || !cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px",
      }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [media]);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      ref={cardRef}
      className={`card ${media ? 'has-video' : ''}`}
      data-aos="fade-in"
      data-aos-once="true"
      data-aos-delay={index * 100}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={"/portfolio/" + slug}>
        <div className="card__image">
          <Image
            src={image.url}
            width={image.width}
            height={image.height}
            blurDataURL={`data:image/png;base64,${imageBlur}`}
            placeholder="blur"
            loading={loading ? loading : "lazy"}
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
            sizes="(min-width: 1960px) 1407px, 71.89vw"
            alt={title}
            quality={50}
          />
          {media && (
            shouldLoadVideo ? (
              <video ref={videoRef} loop muted playsInline preload="metadata">
                <source src={media.url} type="video/mp4" />
              </video>
            ) : null
          )}
        </div>
        <div className="card__details">
          <div className="card__content">
            <span>{agency ? agency : "Mirum"}</span>
            <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
            {/* <div>View project</div> */}
          </div>
        </div>
      </Link>
    </div>
  );
}
