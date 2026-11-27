"use client";

import { useEffect, useRef } from "react";
import { motionAllowed } from "@/utils/webgl";

export default function CardShader() {
  const slotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const slot = slotRef.current;
    const card = slot?.closest<HTMLElement>(".card");
    if (!slot || !card) return;
    if (!motionAllowed() || !window.matchMedia("(hover: hover)").matches) return;

    let scene: typeof import("./cardScene") | undefined;
    let hovering = false;
    let active = false;

    const position = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      return [(event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height] as const;
    };

    const onEnter = async (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      hovering = true;
      // Shader chunk loads on first hover of any card
      scene ??= await import("./cardScene");
      if (!hovering) return;
      const img = card.querySelector<HTMLImageElement>(".card__image img");
      if (!img || !scene.enter(slot, card, img)) return;
      active = true;
      // Canvas now does the zoom, so the CSS hover scale underneath is switched off
      card.classList.add("has-shader");
      scene.move(...position(event), true);
    };

    const onMove = (event: PointerEvent) => {
      if (active) scene?.move(...position(event));
    };

    const onLeave = () => {
      hovering = false;
      active = false;
      scene?.leave(slot);
    };

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);

    return () => {
      onLeave();
      card.classList.remove("has-shader");
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <span ref={slotRef} style={{ display: "contents" }} />;
}
