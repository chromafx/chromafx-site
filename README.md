# chromafx.net

VitePress site for [chromafx.net](https://chromafx.net).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is written to `docs/.vitepress/dist`.

## Deploy

Production is [chromafx.net](https://chromafx.net) on Cloudflare Pages.

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Output directory | `docs/.vitepress/dist` |
| Node | 22 |

Custom domain: `docs/public/CNAME`. A GitHub Pages workflow (`.github/workflows/website.yml`) remains as an alternate path.

The library stays in [chromafx/chromafx](https://github.com/chromafx/chromafx). This repo is only the site.
