import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "1:1 Android Mentoring with Kate Lint";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#073042",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(61, 220, 132, 0.15)",
            border: "1px solid #3DDC84",
            padding: "10px 24px",
            borderRadius: "30px",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#3DDC84",
            }}
          />
          <span
            style={{
              color: "#3DDC84",
              fontSize: "20px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Personal 1:1 Mentorship
          </span>
        </div>

        {/* Center Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1.15,
              maxWidth: "950px",
            }}
          >
            Make your next Android career move with a clear plan.
          </div>
          <div
            style={{
              color: "#94a3b8",
              fontSize: "28px",
              fontWeight: 500,
              maxWidth: "850px",
            }}
          >
            90-Minute Private Strategy Session · System Design · Staff Architecture
          </div>
        </div>

        {/* Bottom Footer Details */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "#3DDC84",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#073042",
                fontWeight: 900,
                fontSize: "24px",
              }}
            >
              1:1
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#ffffff", fontSize: "24px", fontWeight: 800 }}>
                AndroidEngineers.1on1
              </span>
              <span style={{ color: "#3DDC84", fontSize: "16px", fontWeight: 600 }}>
                Kate Lint · Staff Mobile Architect
              </span>
            </div>
          </div>

          <div
            style={{
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: 700,
              background: "rgba(255, 255, 255, 0.1)",
              padding: "12px 28px",
              borderRadius: "16px",
            }}
          >
            mentoringandroid.dev
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
