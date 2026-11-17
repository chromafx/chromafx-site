# Agent guide — chromafx-site

VitePress documentation for [chromafx.net](https://chromafx.net). This repo is docs only; production deploys via **Cloudflare Pages**.

## Layout

| Path | Role |
|------|------|
| `docs/` | VitePress content |
| `docs/.vitepress/config.ts` | Site config, nav, edit links |
| `docs/public/` | Static assets (logo, icons, OG image) |

The .NET library lives in the sibling folder `../chromafx` ([chromafx/chromafx](https://github.com/chromafx/chromafx)). Workspace overview: `../AGENTS.md`.

## Commands

```bash
npm install
npm run dev
npm run build
```

Output: `docs/.vitepress/dist` (Cloudflare Pages build output directory).

## Conventions

1. Minimal diffs; match existing guide tone.
2. Commit only when asked; do not commit `node_modules/` or VitePress `cache` / `dist`.
3. Sample and benchmark paths that live in the library should link to [chromafx/chromafx](https://github.com/chromafx/chromafx), not assume they exist in this repo.
4. Do not add GitHub Pages workflows or a `CNAME` file — hosting is Cloudflare-only.
5. Describe what is on NuGet now. The current version line is repeated in `guide/getting-started.md`, `guide/packages.md`, and `guide/formats.md`; keep them in sync with the library `CHANGELOG.md`. Features only in library `CHANGELOG` **Unreleased** (or untagged master) use an Unreleased tip — do not imply they are on the current NuGet line.
6. New guide pages need a `sidebar` entry in `docs/.vitepress/config.ts`.
7. Dither APIs: Processing adaptive quantize uses `DitherMethod`; Retro fixed palettes use Core `OrderedDitherMethod`. Do not document the removed `QuantizeDitherMethod` / `RetroDitherMethod` names.

## Where to look

- Path-scoped agent rules (local only, gitignored): `.devin/rules/`
