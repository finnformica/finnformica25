import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { supplyMono } from "@/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${supplyMono.className} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
