"use client";

import Link from "next/link";
import ImageWrapper, { MediaGradient } from "@/components/ImageWrapper";
import RichText from "@/components/RichText";
import { useRef, useEffect, useState, startTransition, useCallback } from "react";
import type { PortfolioCardProps } from "@/types/components";

export default function PortfolioCard({ item, index, priority = false }: PortfolioCardProps) {
  const { title, slug, media, image, industry, description } = item;
  const isLarge = index === 0;
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(!media);

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
      className={`card ${media ? "has-video" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={"/portfolio/" + slug}>
        <div className="card__image">
          <ImageWrapper
            image={image}
            variant="card"
            alt={title}
            priority={priority}
            showGradient={true}
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
