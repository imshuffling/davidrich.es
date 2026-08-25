"use client";

import { useRef, useEffect, useState } from "react";
import { MediaGradient } from "@/components/ImageWrapper";

export default function HoverVideo({ url }: { url: string }) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const card = wrapperRef.current?.closest(".card");
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "50px" }
    );
    observer.observe(card);

    const play = () => videoRef.current?.play();
    const pause = () => {
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
    card.addEventListener("mouseenter", play);
    card.addEventListener("mouseleave", pause);

    return () => {
      observer.disconnect();
      card.removeEventListener("mouseenter", play);
      card.removeEventListener("mouseleave", pause);
    };
  }, []);

  return (
    <span ref={wrapperRef} style={{ display: "contents" }}>
      {shouldLoad && (
        <>
          <video ref={videoRef} loop muted playsInline preload="metadata">
            <source src={url} type="video/mp4" />
          </video>
          <MediaGradient zIndex={1} />
        </>
      )}
    </span>
  );
}
