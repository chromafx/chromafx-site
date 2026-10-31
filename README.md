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

GitHub Pages (`.github/workflows/website.yml`) builds this repo on `main` and publishes `docs/.vitepress/dist`. The custom domain is `chromafx.net` (`docs/public/CNAME`).

The library stays in [chromafx/chromafx](https://github.com/chromafx/chromafx). This repo is only the site.
