import type { AppProps } from "next/app";
import Head from "next/head";

import { supplyMono } from "@/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
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
          content="personal portfolio, nextjs, web development"
        />
        <meta
          name="description"
          content="Hi, I am a full-stack developer and designer. I love creating beautiful and functional websites."
        />
        <meta name="robots" content="all" />
      </Head>
      <main className={supplyMono.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
