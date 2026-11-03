# Getting started

Install the meta-package and start with `Image.Load` / `Mutate` / `Clone` / `Save`.

::: tip 0.x line
Current line is **0.6.0** on NuGet (tag-only releases). API may still change before 1.0. See the [library changelog](https://github.com/chromafx/chromafx/blob/master/CHANGELOG.md).
:::

## Install

```bash
dotnet add package ChromaFx
```


Requires the **.NET 10** SDK. The meta-package injects common usings via `buildTransitive` props.

## Quick example

```csharp
var thumb = Image.Load("input.png")
    .Clone(ctx => ctx
        .Resize(200, 200)
        .Rotate(90)
        .Invert());

thumb.Save("output.jpg", new JpegEncoder { Quality = 85 });

Image.Load("input.png")
    .Mutate(ctx => ctx.Resize(800, 600).Brightness(0.1f))
    .Save("output.png");
```

## Where things live

| Concern | Package |
|---------|---------|
| `Image`, `Color`, `Animation` | `ChromaFx.Core` |
| `Load` / `Save`, encoders, `ImageFormats` | `ChromaFx.IO` |
| `Mutate` / `Clone`, filters | `ChromaFx.Processing` |
| Scale2x / Scale3x / Hq2x–4x / CleanEdge / Eagle / SaI / `RotateSprite` / `CleanEdgeRotate` | `ChromaFx.PixelArt` (opt-in; [details](./filters#pixelart-package)) |

Prefer `ChromaFx` for new apps. Pull Core / IO / Processing separately when you want a smaller graph. Add `ChromaFx.PixelArt` only when you need pixel-art upscaling or rotation.

## Next

- [Packages](./packages) — NuGet layout
- [Processing](./processing) — Mutate, Clone, Terminal
- [Filters](./filters) — fluent helpers and catalog
- [Formats & encoders](./formats) — JPEG/PNG/GIF/BMP and plugins
- [Migration](./migration) — Structure.Sketching-era API removals
