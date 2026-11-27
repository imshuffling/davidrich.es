"use client";

import { useEffect, useRef } from "react";
import { motionAllowed } from "@/utils/webgl";

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !motionAllowed()) return;

    let cancelled = false;
    let destroy: (() => void) | null = null;

    // Shader chunk loads once the main thread is idle so it never competes with LCP
    const load = () => {
      void import("./ambientScene").then(({ createAmbientScene }) => {
        if (!cancelled) destroy = createAmbientScene(canvas);
      });
    };
    const idle = typeof window.requestIdleCallback === "function";
    const handle = idle ? window.requestIdleCallback(load, { timeout: 3000 }) : window.setTimeout(load, 1500);

    return () => {
      cancelled = true;
      if (idle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      destroy?.();
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-canvas" aria-hidden="true" />;
}
