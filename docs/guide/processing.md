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
| `CharacterAspect` | `0` = auto — ASCII / full-block `█` → `2`, half-block `▀` → `1` |
| `UseHalfBlocks` | ANSI only; `▀` with FG+BG (default) or `█` with FG |
| `ColorMode` | ANSI `TrueColor` or `Ansi256` |
| `Invert` / `Characters` | ASCII ramp; Invert also picks black bg when `BackgroundColor` is unset |

For frequent redraws, reuse a `StringBuilder` with `AppendAsciiArt` / `AppendAnsiArt` (or `Write*Art` into an `IBufferWriter<char>`) instead of allocating a new string each time.

Inline images (Kitty / iTerm2):

```csharp
var png = image.ToByteArray(FileFormats.Png);
Console.Write(KittyGraphics.FromPng(png, columns: 24, rows: 12));
// or ITerm2InlineImage.FromPng(png, ...)
```

Use `TerminalImageCapabilities.Detect()` to choose a protocol.

```bash
# from the library repo (github.com/chromafx/chromafx)
dotnet run --project samples/TerminalArt
```

## Performance notes

Hot paths lean on `Span<T>`, `ArrayPool`, and SIMD where it pays off. Native codecs can still win raw pixel throughput; ChromaFx prioritizes **deployability** and allocation-conscious decode → filter → encode loops. Measure with `tests/ChromaFx.Benchmarks` in the [library repo](https://github.com/chromafx/chromafx).
