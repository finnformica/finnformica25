# finnformica.com

Personal site of Finn Formica. The site is a [Next.js](https://nextjs.org) 14 static export. A Cloudflare Worker with static assets serves it.

## Develop

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

`next build` writes the static site to `./out` (`output: "export"` in `next.config.mjs`).

- Images are not optimized at runtime (`images.unoptimized`), because a static export has no server.
- The social preview image comes from `src/app/og.png/route.tsx`. The build renders it once to `out/og.png`.
- `public/_redirects` sends the old `/api/og` URL to `/og.png`.

## Preview on the Workers runtime

```bash
npm run build
npx wrangler dev
```

Open [http://localhost:8787](http://localhost:8787). `npm run preview` does the two steps in one command.

`wrangler.jsonc` sets the Worker. It has no Worker script: the Worker serves `./out` as static assets. An unknown path gets `out/404.html` with status 404.

## Deploy

```bash
npm run deploy
```

This runs `npm run build && wrangler deploy`. Run `npx wrangler login` first to log in to the Cloudflare account.

## Workers Builds

Connect the GitHub repo to the `finnformica` Worker in the Cloudflare dashboard (Workers & Pages > finnformica > Settings > Build). Use these settings:

| Setting           | Value                 |
| ----------------- | --------------------- |
| Root directory    | `/`                   |
| Build command     | `npm run build`       |
| Deploy command    | `npx wrangler deploy` |
| Production branch | `main`                |

Workers Builds installs the dependencies from `package-lock.json` before the build command.
