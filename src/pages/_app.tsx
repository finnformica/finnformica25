import type { AppProps } from "next/app";
import Head from "next/head";
import { useRef } from "react";

import Preloader from "@/components/sections/preloader";
import CustomCursorProvider from "@/context/custom-cursor-context";
import { PreloaderProvider } from "@/context/preloader-context";
import { supplyMono } from "@/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <Head>
        {/* favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* title */}
        <title>Finn Formica</title>

        {/* metadata */}
        <meta charSet="UTF-8" />
        <meta name="author" content="Finn Formica" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="finn formica, portfolio, full-stack developer, designer, next.js, react"
        />
        <meta
          name="description"
          content="Portfolio of Finn Formica — designing and building intuitive, scalable web applications."
        />
        <meta name="robots" content="all" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Finn Formica — Designer & Developer"
        />
        <meta
          property="og:description"
          content="Portfolio of Finn Formica — designing and building intuitive, scalable web applications."
        />
        <meta property="og:image" content="/api/og" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

      <main className={`${supplyMono.className} relative`} ref={ref}>
        <PreloaderProvider>
          <Preloader />
          <CustomCursorProvider containerRef={ref}>
            <Component {...pageProps} />
          </CustomCursorProvider>
        </PreloaderProvider>
      </main>
    </>
  );
}
