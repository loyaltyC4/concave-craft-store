import { ImageResponse } from "next/og";
import { join } from "path";
import { readFile } from "fs/promises";

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props,
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME || "Fingerboard Lab",
    },
    ...props,
  };

  const file = await readFile(join(process.cwd(), "./fonts/Inter-Bold.ttf"));
  const font = Uint8Array.from(file).buffer;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b0c0e",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* "The bearing" mark, rendered with satori-safe divs */}
        <div
          style={{
            width: 176,
            height: 176,
            borderRadius: 9999,
            border: "18px solid #c5f23c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 9999,
              border: "18px solid #c5f23c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 9999,
                background: "#c5f23c",
              }}
            />
          </div>
        </div>
        <p
          style={{
            marginTop: 48,
            fontSize: 64,
            fontWeight: 700,
            color: "#f3f1ea",
          }}
        >
          {title}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: font,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
