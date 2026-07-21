import { ImageResponse } from "next/og";
import { join } from "path";
import { readFile } from "fs/promises";
import { SITE_NAME, SITE_TAGLINE } from "lib/brand";

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props,
): Promise<ImageResponse> {
  const title = props?.title || SITE_NAME;

  const file = await readFile(join(process.cwd(), "./fonts/Inter-Bold.ttf"));
  const font = Uint8Array.from(file).buffer;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0c0e",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "12px",
              background: "#c5f23c",
            }}
          />
          <div
            style={{
              color: "#c5f23c",
              fontSize: "24px",
              letterSpacing: "4px",
            }}
          >
            {SITE_TAGLINE.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "86px",
              fontWeight: 700,
              color: "#f3f1ea",
              lineHeight: 1.03,
              maxWidth: "1010px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: "26px",
              height: "8px",
              width: "150px",
              background: "#c5f23c",
            }}
          />
        </div>

        <div style={{ color: "#8a8f98", fontSize: "28px" }}>
          fingerboardlab.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Inter", data: font, style: "normal", weight: 700 }],
    },
  );
}
