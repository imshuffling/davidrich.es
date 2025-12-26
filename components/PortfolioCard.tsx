"use client";

import Link from "next/link";
import ImageWrapper from "@/components/ImageWrapper";
import { useRef, useEffect, useState, startTransition } from "react";
import type { PortfolioCardProps } from "@/types/components";

export default function PortfolioCard({
  item,
  loading = "lazy",
}: PortfolioCardProps) {
  const { title, slug, media, image, industry } = item;
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(!media);

  useEffect(() => {
    if (!media || !cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use startTransition for non-urgent state update to avoid blocking more critical renders
            startTransition(() => {
              setShouldLoadVideo(true);
            });
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
      className={`card ${media ? "has-video" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={"/portfolio/" + slug}>
        <div className="card__image">
          <ImageWrapper
            image={image}
            alt={title}
            loading={loading}
            quality={80}
            sizes="(min-width: 1960px) 1407px, 71.89vw"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
            showGradient={true}
          />
          {media &&
            (shouldLoadVideo ? (
              <video ref={videoRef} loop muted playsInline preload="metadata">
                <source src={media.url} type="video/mp4" />
              </video>
            ) : null)}
        </div>
        <div className="card__details">
          <div className="card__content">
            {industry && <span>{industry}</span>}
            <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
          </div>
        </div>
      </Link>
    </div>
  );
}
