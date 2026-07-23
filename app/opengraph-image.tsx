import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Magic Carpet — Your move, lifted.";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(ellipse 60% 40% at 80% 0%, #1E6BFF 0%, transparent 50%), linear-gradient(135deg, #0C1A3E 0%, #16305F 100%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            opacity: 0.9,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#1E6BFF",
            }}
          />
          Magic Carpet
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 130,
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontFamily: "Georgia, serif",
              maxWidth: 900,
            }}
          >
            Your move,
          </div>
          <div
            style={{
              fontSize: 130,
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              color: "#1E6BFF",
            }}
          >
            lifted.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <div>Local · Long-distance · Commercial · Packing · Storage</div>
          <div
            style={{
              padding: "10px 24px",
              background: "#1E6BFF",
              color: "#FFFFFF",
              borderRadius: 999,
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            (514) 246-8463
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
