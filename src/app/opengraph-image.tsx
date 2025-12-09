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
        fontFamily: "monospace",
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
            fontFamily: "monospace",
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
            fontFamily: "monospace",
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
          fontFamily: "monospace",
        }}
      >
        Software Engineer @ JPMorgan Chase
      </span>

      {/* Description */}
      <span
        style={{
          fontSize: "24px",
          color: "#666",
          fontFamily: "monospace",
        }}
      >
        Open source contributor to React Native, Kubernetes, Go, and LangChain.
      </span>
    </div>,
    {
      ...size,
    }
  );
}
