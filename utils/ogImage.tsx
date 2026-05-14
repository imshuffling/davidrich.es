import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;

type OgCardProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function renderOgImage({ eyebrow, title, subtitle }: OgCardProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #630ed4 0%, #7c3aed 100%)",
          color: "#ffffff",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: "30px",
                fontWeight: 400,
                lineHeight: 1.35,
                opacity: 0.9,
                maxWidth: "900px",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: 600,
            opacity: 0.95,
          }}
        >
          <div style={{ display: "flex" }}>davidrich.es</div>
          <div style={{ display: "flex" }}>David Riches</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
