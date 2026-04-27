import type { AppProps } from "next/app";
import Head from "next/head";
import { useRef } from "react";

import Preloader from "@/components/sections/preloader";
import CustomCursorProvider from "@/context/custom-cursor-context";
import { PreloaderProvider } from "@/context/preloader-context";
import { supplyMono } from "@/fonts";
import "@/styles/globals.css";

// Canonical site URL. WhatsApp/iMessage/LinkedIn crawlers don't resolve
// relative og:image URLs — they fetch the meta tag value verbatim — so the
// image URL has to be absolute. Override via NEXT_PUBLIC_SITE_URL for staging
// deployments.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.finnformica.com";
const OG_IMAGE_URL = `${SITE_URL}/api/og`;

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
        <meta property="og:site_name" content="Finn Formica" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="Finn Formica" />
        <meta
          property="og:description"
          content="Portfolio of Finn Formica — designing and building intuitive, scalable web applications."
        />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:secure_url" content={OG_IMAGE_URL} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Finn Formica" />
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
