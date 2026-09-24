import { ImageResponse } from "next/og";

export const alt = "Ruslan Raxmonov — AI Builder & Founder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#FFFFFF",
          padding: "72px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#999999",
          }}
        >
          AI Builder · Founder · Product Designer
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              fontWeight: 500,
            }}
          >
            Ruslan Raxmonov
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              color: "#999999",
              maxWidth: 760,
            }}
          >
            I build AI products, startups and digital experiences.
          </div>
        </div>
        <div style={{ fontSize: 20, color: "#666666" }}>Tashkent, Uzbekistan</div>
      </div>
    ),
    { ...size },
  );
}
