"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { MediaGradient } from "@/components/ImageWrapper";

export default function HoverVideo({ url }: { url: string }) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantsPlayRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  const play = useCallback(() => {
    wantsPlayRef.current = true;
    wrapperRef.current?.closest(".card")?.classList.add("is-playing");
    const video = videoRef.current;
    if (video) {
      // iOS requires muted set before play() for gesture-free playback
      video.muted = true;
      void video.play().catch(() => {});
    }
  }, []);

  const pause = useCallback(() => {
    wantsPlayRef.current = false;
    wrapperRef.current?.closest(".card")?.classList.remove("is-playing");
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  // The video mounts lazily — if play was requested before it existed, start it now
  const videoMounted = useCallback(
    (video: HTMLVideoElement | null) => {
      videoRef.current = video;
      if (video && wantsPlayRef.current) play();
    },
    [play]
  );

  useEffect(() => {
    const card = wrapperRef.current?.closest(".card");
    if (!card) return;

    const loadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            loadObserver.disconnect();
          }
        });
      },
      { rootMargin: "50px" }
    );
    loadObserver.observe(card);

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
      loadObserver.disconnect();
      viewObserver?.disconnect();
      card.removeEventListener("mouseenter", play);
      card.removeEventListener("mouseleave", pause);
    };
  }, [play, pause]);

  return (
    <span ref={wrapperRef} style={{ display: "contents" }}>
      {shouldLoad && (
        <>
          <video
            ref={videoMounted}
            src={url}
            loop
            muted
            playsInline
            preload="metadata"
          />
          <MediaGradient zIndex={1} />
        </>
      )}
    </span>
  );
}
