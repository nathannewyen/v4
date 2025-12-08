import { ImageResponse } from "next/og";

// Open Graph image configuration
export const runtime = "edge";
export const alt = "Nhan Nguyen - Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Generate Open Graph image for social sharing
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          padding: "80px",
        }}
      >
        {/* Name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              fontSize: "96px",
              fontWeight: 900,
              color: "#1A2234",
              lineHeight: 1,
            }}
          >
            NHAN
          </span>
          <span
            style={{
              fontSize: "96px",
              fontWeight: 900,
              color: "#1A2234",
              lineHeight: 1,
            }}
          >
            NGUYEN
          </span>
        </div>

        {/* Thick underline */}
        <div
          style={{
            width: "400px",
            height: "8px",
            backgroundColor: "#1A2234",
            marginBottom: "32px",
          }}
        />

        {/* Title */}
        <span
          style={{
            fontSize: "32px",
            fontWeight: 600,
            color: "#1A2234",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Software Engineer @ JPMorgan Chase
        </span>

        {/* Description */}
        <span
          style={{
            fontSize: "24px",
            color: "#1A2234",
          }}
        >
          AI/ML/Engineer. Interested in AI agents, drones, rockets, and software development.
        </span>

        {/* Decorative boxes */}
        <div
          style={{
            position: "absolute",
            right: "80px",
            top: "120px",
            width: "300px",
            height: "300px",
            backgroundColor: "#E2E8F0",
            border: "4px solid #1A2234",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "48px", fontWeight: 700, color: "#1A2234" }}>
            AI
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            right: "200px",
            bottom: "80px",
            width: "200px",
            height: "200px",
            backgroundColor: "#CBD5E1",
            border: "4px solid #1A2234",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "36px", fontWeight: 700, color: "#1A2234" }}>
            OSS
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
