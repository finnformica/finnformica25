import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const config = { runtime: "edge" };

const FG = "#fcfcfd";
const BG = "#16171a";
const MUTED = "#7a7d85";

export default async function handler(req: NextRequest) {
  const { origin } = new URL(req.url);

  const [outerSansBlack, supplyMono] = await Promise.all([
    fetch(new URL("/fonts/OuterSansAlt-Black.otf", origin)).then((r) =>
      r.arrayBuffer(),
    ),
    fetch(new URL("/fonts/PPSupplyMono-Regular.otf", origin)).then((r) =>
      r.arrayBuffer(),
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: BG,
          color: FG,
          fontFamily: "Mono",
          padding: 64,
          position: "relative",
        }}
      >
        {/* Crosshair ticks in each corner */}
        {[
          { top: 32, left: 32 },
          { top: 32, right: 32 },
          { bottom: 32, left: 32 },
          { bottom: 32, right: 32 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              width: 16,
              height: 16,
              display: "flex",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 7,
                left: 0,
                width: 16,
                height: 1,
                backgroundColor: MUTED,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 7,
                width: 1,
                height: 16,
                backgroundColor: MUTED,
              }}
            />
          </div>
        ))}

        {/* Top meta row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <span>[ ff / portfolio ]</span>
          <span>[ 2025 ]</span>
        </div>

        {/* Wordmark + subtitle, centered vertically */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Display",
              fontSize: 180,
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: "-0.06em",
              color: FG,
            }}
          >
            finn
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Display",
              fontSize: 180,
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: "-0.06em",
              color: FG,
              marginTop: 8,
            }}
          >
            formica
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 36,
              gap: 20,
            }}
          >
            <div
              style={{
                width: 64,
                height: 1,
                backgroundColor: FG,
                opacity: 0.4,
              }}
            />
            <span
              style={{
                fontSize: 24,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: FG,
              }}
            >
              designer · developer
            </span>
          </div>
        </div>

        {/* Bottom meta row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <span>finnformica.com</span>
          <span>[ design / develop / deploy ]</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Display",
          data: outerSansBlack,
          style: "normal",
          weight: 900,
        },
        {
          name: "Mono",
          data: supplyMono,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
