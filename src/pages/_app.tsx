import type { AppProps } from "next/app";

import { supplyMono } from "@/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${supplyMono.className} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
