# Processing

ChromaFx uses an explicit **Mutate / Clone** model instead of silent in-place helpers.

## Mutate vs Clone

```csharp
// In-place
image.Mutate(ctx => ctx.Resize(800, 600).Brightness(0.1f));

// New image; original unchanged
var copy = image.Clone(ctx => ctx.Rotate(90).Invert());
```

## Fluent context

Core ops live on `IImageProcessingContext`. More filters arrive via extensions (`BoxBlur`, `Saturation`, `Dilate`, `Grayscale`, …). Escape hatch:

```csharp
image.Mutate(ctx => ctx.Apply(myFilter));
```

See the [filters catalog](./filters) for the full list.

## Image similarity

::: tip 0.6.5
`ImageSimilarity` and `ColorDifference` (see the library [changelog](https://github.com/chromafx/chromafx/blob/master/CHANGELOG.md)). Same-size metrics; alpha ignored; not an `IFilter`.
:::

```csharp
var mse = ImageSimilarity.Mse(a, b);
var psnr = ImageSimilarity.Psnr(a, b);   // ∞ when identical
var ssim = ImageSimilarity.Ssim(a, b);
var diff = ImageSimilarity.CreateDiffImage(a, b);

var de = ColorDifference.Cie76(colorA, colorB);
var meanDe = ColorDifference.MeanCie76(a, b);
```

Also: `Rmse`, `Mae`, `CountDifferingPixels`.

## Pixel art

Opt-in [`ChromaFx.PixelArt`](./packages) (Scale2x / Scale3x / Hq2x–4x / CleanEdge / Eagle / SaI / `RotateSprite` / `CleanEdgeRotate`) — see the [filters guide](./filters#pixelart-package).

## Retro

Adaptive palette: `Quantize(maxColors, dither?)` (shared Core octree; `DitherMethod` Bayer / Floyd–Steinberg). Fixed retro palettes: opt-in [`ChromaFx.Retro`](./packages) (`WebSafeQuantize`, `CgaQuantize`, … with Core `OrderedDitherMethod`) — see the [filters guide](./filters#retro-package).

## Terminal art

`ChromaFx.Processing.Terminal` renders images for TUIs (album-art panels, previews). The meta-package injects this namespace automatically.

```csharp
// Grayscale ramp (dark terminal)
var ascii = image.ToAsciiArt(new AsciiArtOptions
{
    MaxWidth = 40,
    Invert = true,
});

// Truecolor half-blocks in a fixed 24×12 panel
var ansi = cover.ToAnsiArt(new AnsiArtOptions
{
    MaxWidth = 24,
    MaxHeight = 12,
    SizeMode = TerminalArtSizeMode.Exact,
    BackgroundColor = new Color(0, 0, 0),
});
```

| Option | Notes |
|--------|--------|
| `SizeMode` | `Fit` (default) or `Exact` letterbox (requires both maxima) |
| `CharacterAspect` | `0` = auto → `2` (typical monospace cell height/width); half-block `▀` still uses `2` |
| `UseHalfBlocks` | ANSI only; `▀` with FG+BG (default) or `█` with FG |
| `ColorMode` | ANSI `TrueColor` or `Ansi256` |
| `Invert` / `Characters` | ASCII ramp; Invert also picks black bg when `BackgroundColor` is unset |

For frequent redraws, reuse a `StringBuilder` with `AppendAsciiArt` / `AppendAnsiArt` (or `Write*Art` into an `IBufferWriter<char>`) instead of allocating a new string each time.

Inline images (Kitty / iTerm2):

```csharp
var png = image.ToByteArray(ManagedFormats.Png);
Console.Write(KittyGraphics.FromPng(png, columns: 24, rows: 12));
// or ITerm2InlineImage.FromPng(png, ...)
```

Use `TerminalImageCapabilities.Detect()` to choose a protocol.

## HTML art

`ChromaFx.Processing.HtmlArt` emits the same half-block / full-block grid as ANSI art, but as fixed-width colored HTML (`<pre>` + merged `<span>` CSS colors). Also injected by the meta-package.

```csharp
var html = image.ToHtmlArt(new HtmlArtOptions
{
    MaxWidth = 48,
    MaxHeight = 24,
    SizeMode = TerminalArtSizeMode.Exact,
});
```

```bash
# from the library repo (github.com/chromafx/chromafx)
dotnet run --project samples/TextArt
```

## Performance notes

Hot paths lean on `Span<T>`, `ArrayPool`, and SIMD (`Vector` / AVX2 / SSE2 / AdvSimd) where it pays off — color-matrix rows, IQ metrics, byte abs-diff, PNG predictors, JPEG IDCT/YCbCr. Native codecs can still win raw pixel throughput; ChromaFx prioritizes **deployability** and allocation-conscious decode → filter → encode loops. Measure with `tests/ChromaFx.Benchmarks` in the [library repo](https://github.com/chromafx/chromafx).
