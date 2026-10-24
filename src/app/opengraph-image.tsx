import { ImageResponse } from "next/og";

export const alt = "Anudit Khatri (Lazzy Badger) | Cybersecurity Researcher & Fullstack Systems Engineer";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#030406",
          padding: "60px 70px",
          fontFamily: "sans-serif",
          border: "2px solid rgba(215, 181, 109, 0.4)",
          position: "relative"
        }}
      >
        {/* Subtle glow background */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            backgroundColor: "rgba(215, 181, 109, 0.12)",
            filter: "blur(90px)"
          }}
        />

        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            paddingBottom: "24px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor: "#d7b56d"
              }}
            />
            <span
              style={{
                color: "#d7b56d",
                fontSize: "18px",
                letterSpacing: "0.25em",
                fontWeight: 700,
                textTransform: "uppercase"
              }}
            >
              LAZZY BADGER // SEC_SYS v1.4
            </span>
          </div>
          <span
            style={{
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "14px",
              letterSpacing: "0.15em"
            }}
          >
            LATENCY: 24ms // STATUS: ONLINE
          </span>
        </div>

        {/* Center Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span
            style={{
              color: "#d7b56d",
              fontSize: "16px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 600
            }}
          >
            [ REMEMBER THE NAME ]
          </span>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#f5f3ef",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.02em"
            }}
          >
            Anudit Khatri
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "rgba(255, 255, 255, 0.75)",
              margin: 0,
              maxWidth: "950px",
              lineHeight: 1.4
            }}
          >
            Fullstack Software Engineer • AI Systems Architect • Cybersecurity Researcher • Nepal Police Hackathon Winner
          </p>
        </div>

        {/* Bottom Tags */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "24px"
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            {["Next.js", "Python", "Rust", "Bug Bounty", "AWS", "Azure", "LoRa / ESP32"].map((tag) => (
              <div
                key={tag}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(215, 181, 109, 0.3)",
                  borderRadius: "6px",
                  padding: "6px 14px",
                  color: "#d7b56d",
                  fontSize: "13px",
                  fontWeight: 600
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <span
            style={{
              color: "#f5f3ef",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.1em"
            }}
          >
            anuditk.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
