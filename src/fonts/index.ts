import localFont from "next/font/local";

export const supplyMono = localFont({
  variable: "--font-supply-mono",
  src: "../fonts/PPSupplyMono-Regular.otf",
});

export const outerSans = localFont({
  variable: "--font-outer-sans",
  src: [
    {
      path: "../fonts/Outer Sans Alt Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/Outer Sans Alt Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Outer Sans Alt Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
});
