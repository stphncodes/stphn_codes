import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
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
          padding: 72,
          background: "#121211",
          color: "#f7f5f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="40" height="40" viewBox="0 0 32 32">
            <rect x="2" y="2" width="12" height="12" fill="#f7f5f0" />
            <rect x="10" y="10" width="12" height="12" fill="#f7f5f0" fillOpacity="0.55" />
            <rect x="18" y="18" width="12" height="12" fill="#f7f5f0" />
            <rect x="23" y="4" width="5" height="5" fill="#f4552e" />
          </svg>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 600, letterSpacing: -3, lineHeight: 1.02, maxWidth: 1000 }}>
            We engineer digital experiences that move businesses forward.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#b3b3ac" }}>{siteConfig.tagline}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#8d8d86", textTransform: "uppercase", letterSpacing: 3 }}>
          <div style={{ display: "flex" }}>Web · Mobile · AI · Automation</div>
          <div style={{ display: "flex" }}>Nigeria · Worldwide</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
