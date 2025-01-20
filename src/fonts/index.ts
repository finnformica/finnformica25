import localFont from "next/font/local";

export const supplyMono = localFont({
  variable: "--font-supply-mono",
  src: "./PPSupplyMono-Regular.otf",
});

export const outerSans = localFont({
  variable: "--font-outer-sans",
  src: [
    {
      path: "./Outer Sans Alt Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./Outer Sans Alt Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Outer Sans Alt Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
});
