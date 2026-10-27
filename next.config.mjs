/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: `next build` writes the site to ./out, which a Cloudflare
  // Worker serves as static assets (see wrangler.jsonc).
  output: "export",
  // The Next.js image optimizer needs a server, so serve images as-is.
  images: { unoptimized: true },
};

export default nextConfig;
