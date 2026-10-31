# Getting started

Install the meta-package and start with `Image.Load` / `Mutate` / `Clone` / `Save`.

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

Prefer `ChromaFx` for new apps. Pull Core / IO / Processing separately when you want a smaller graph.

## Next

- [Packages](./packages) — NuGet layout
- [Processing](./processing) — Mutate, Clone, filters
- [Formats & encoders](./formats) — JPEG/PNG/GIF/BMP and plugins
