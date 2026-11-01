# Agent guide — chromafx-site

VitePress documentation for [chromafx.net](https://chromafx.net). This repo is docs/deploy only.

## Layout

| Path | Role |
|------|------|
| `docs/` | VitePress content |
| `docs/.vitepress/config.ts` | Site config, nav, edit links |
| `docs/public/` | Static assets + `CNAME` |
| `.github/workflows/website.yml` | GitHub Pages build/deploy |

The .NET library lives in the sibling folder `../chromafx` ([chromafx/chromafx](https://github.com/chromafx/chromafx)). Workspace overview: `../AGENTS.md`.

## Commands

```bash
npm install
npm run dev
npm run build
```

Output: `docs/.vitepress/dist`.

## Conventions

1. Minimal diffs; match existing guide tone.
2. Commit only when asked; do not commit `node_modules/` or VitePress `cache` / `dist`.
3. Sample and benchmark paths that live in the library should link to [chromafx/chromafx](https://github.com/chromafx/chromafx), not assume they exist in this repo.
