"use client";

import Link from "next/link";
import ImageWrapper, { MediaGradient } from "@/components/ImageWrapper";
import RichText from "@/components/RichText";
import { useRef, useEffect, useState, startTransition, useCallback } from "react";
import type { PortfolioCardProps } from "@/types/components";

export default function PortfolioCard({
  item,
  index,
  priority = false,
  className,
}: PortfolioCardProps & { className?: string }) {
  const { title, slug, media, image, industry, description } = item;
  const isLarge = index === 0;
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(!media);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!media || !cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTransition(() => {
              setShouldLoadVideo(true);
            });
            observer.disconnect();
          }
        });
      },
      { rootMargin: "50px" }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [media]);

  const handleMouseEnter = useCallback(() => {
    if (videoRef.current) videoRef.current.play();
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`card ${media ? "has-video" : ""} ${className || ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={"/portfolio/" + slug}>
        <div className="card__image">
          {!imageLoaded && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
          )}
          <ImageWrapper
            image={image}
            variant="card"
            alt={title}
            priority={priority}
            showGradient={true}
            onLoad={() => setImageLoaded(true)}
          />
          {media &&
            (shouldLoadVideo ? (
              <>
                <video ref={videoRef} loop muted playsInline preload="metadata">
                  <source src={media.url} type="video/mp4" />
                </video>
                <MediaGradient zIndex={1} />
              </>
            ) : null)}
        </div>
        <div className="card__details">
          <div className="card__content">
            {industry && <span>{industry}</span>}
            <RichText as="h2" html={title} />
            {isLarge && description && (
              <p className="card__description">{description}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
