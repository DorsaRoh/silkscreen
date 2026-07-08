import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const alt = "silkscreen — hidden messages on circuit boards";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PICKS = ["peekaboo.jpg", "teslacat.jpg", "hobbit.jpg", "ringo.jpg"];

async function dataUri(file: string) {
  const buf = await readFile(
    path.join(process.cwd(), "public", "images", file)
  );
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

export default async function Image() {
  const images = await Promise.all(PICKS.map(dataUri));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f6f6f4",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontSize: 56,
            fontWeight: 600,
            letterSpacing: -1,
            color: "#2e7d4f",
          }}
        >
          silkscreen
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontStyle: "italic",
            color: "#7c837c",
            marginTop: 8,
          }}
        >
          hidden messages, found on circuit boards
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 48 }}>
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              width={246}
              height={330}
              style={{
                objectFit: "cover",
                borderRadius: 10,
                border: "1px solid #e7e7e3",
              }}
            />
          ))}
        </div>
      </div>
    ),
    size
  );
}
