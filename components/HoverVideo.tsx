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

    const play = () => {
      card.classList.add("is-playing");
      videoRef.current?.play().catch(() => {});
    };
    const pause = () => {
      card.classList.remove("is-playing");
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
    card.addEventListener("mouseenter", play);
    card.addEventListener("mouseleave", pause);

    // Touch devices have no hover — autoplay while the card is mostly in view
    const touchOnly = window.matchMedia("(hover: none)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let viewObserver: IntersectionObserver | undefined;
    if (touchOnly && !reducedMotion) {
      viewObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => (entry.isIntersecting ? play() : pause()));
        },
        { threshold: 0.6 }
      );
      viewObserver.observe(card);
    }

    return () => {
      observer.disconnect();
      viewObserver?.disconnect();
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
