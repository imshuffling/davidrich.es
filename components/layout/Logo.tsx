import { useId } from "react";
import { BRAND_GRADIENT, LOGO } from "@/utils/logo";

export default function Logo({ className }: { className?: string }) {
  const gradientId = useId();

  return (
    <svg viewBox={LOGO.viewBox} className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={BRAND_GRADIENT[0]} />
          <stop offset="1" stopColor={BRAND_GRADIENT[1]} />
        </linearGradient>
      </defs>
      <polygon points={LOGO.hex} fill={`url(#${gradientId})`} />
      <line {...LOGO.divider} stroke="#fff" strokeWidth={5} />
      <path d={LOGO.letters} fill="#fff" />
    </svg>
  );
}
