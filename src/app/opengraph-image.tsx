import { ImageResponse } from "next/og";
export const alt =
  "Saeed Contracting — Professional Service. Quality Work. North Vancouver & Greater Vancouver.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#0b1b2a",
        color: "#edf0f3",
        padding: "64px",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <svg width="150" height="95" viewBox="0 0 100 72" fill="#dbe3e8">
          <path d="M2 48 44 8l41 40H74L44 19 13 48z" />
          <path d="m64 23 13-11 23 36H89L76 24l-5 5z" />
          <path d="M38 30h5v6h-5zm8 0h5v6h-5zm-8 9h5v6h-5zm8 0h5v6h-5z" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{ fontFamily: "serif", fontSize: 62, letterSpacing: 10 }}
          >
            SAEED
          </span>
          <span style={{ fontSize: 22, letterSpacing: 8 }}>CONTRACTING</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontFamily: "serif", fontSize: 70 }}>
          Professional Service.
        </span>
        <span style={{ fontFamily: "serif", fontSize: 70, color: "#b9cbd7" }}>
          Quality Work.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #5a7283",
          paddingTop: 24,
          justifyContent: "space-between",
          fontSize: 23,
        }}
      >
        <span>North Vancouver & Greater Vancouver</span>
        <span>604-627-0166</span>
      </div>
    </div>,
    size,
  );
}
