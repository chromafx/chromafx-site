# Filters

Most filters implement `IFilter` (`ChromaFx.Processing.Filters`) and run through `Mutate` / `Clone`. Prefer fluent helpers when they exist; otherwise `Apply(new SomeFilter(...))`. Resize kernels take `ResamplingFilter` (`…Filters.Resampling`).

## Fluent helpers

On `IImageProcessingContext`:

`Apply`, `Resize`, `Rotate`, `Crop`, `Flip`, `Invert`, `Brightness`, `Contrast`, `Gamma`, `Greyscale`, `GaussianBlur`, `Sharpen`, `Threshold`, `DrawRectangle`, `DrawEllipse`

Extensions: `Grayscale`, `BoxBlur`, `Saturation`, `Hue`, `Dilate`, `Erode`, `MorphOpen`, `MorphClose`, `Noise`, `FilmGrain`, `Pixellate`, `Sepia`, `Emboss`, `SobelEmboss`, `StretchContrast`, `Equalize`, `AdaptiveEqualize`, `Logarithm`, `Levels`, `Alpha`, `KelvinTint`, `Tint`, `WhiteBalance`, `AutoWhiteBalance`, `Kodachrome`, `Polaroid`, `Lomograph`, `Median`, `Kuwahara`, `SnnBlur`, `Unsharp`, `Posterize`, `Solarize`, `Jitter`, `Glow`, `Vignette`, `Blend` (optional `BlendMode`), `AdaptiveThreshold`, `Canny`, `EdgeDetect`, `Duotone`, `Colorize`, `MotionBlur`, `ShadowsHighlights`, `OilPaint`, `Quantize`, `DrawLine`, `Skew`, `Translate`, `ResizeCanvas`

```csharp
image.Mutate(ctx => ctx
    .Resize(800, 600)
    .BoxBlur()
    .Apply(new Unsharp()));
```

## Catalog

Base / helper types (`*FilterBase`, `ColorMatrix`, `ConvolutionFilter`, `ResamplingKernels`, …) are omitted.

| Category | Filters |
|----------|---------|
| Arithmetic | `Add`, `Subtract`, `Multiplication`, `Division`, `Modulo`, `And`, `Or`, `XOr` |
| Binary | `Threshold`, `AdaptiveThreshold`, `NonMaximalSuppression` |
| Color | `Brightness`, `Contrast`, `Gamma`, `Hue`, `Saturation`, `KelvinTint` (Helland illuminant tint; not WB), `Tint` (green↔magenta), `WhiteBalance`, `AutoWhiteBalance` (GrayWorld / WhitePatch), `Alpha`, `BlackWhite`, `Greyscale601`, `Greyscale709`, channel filters, `SepiaTone`, `Kodachrome`, `Lomograph`, `Polaroid` |
| Convolution | `BoxBlur`, `Sharpen`, `SharpenLess`, `Emboss`, `SobelEmboss`, `Prewitt`, `Scharr`, `Kirsch`, `Kayyali`, `Robinson`, `RobertsCross`, `LaplaceEdgeDetection`, `LaplacianOfGaussianEdgeDetector` |
| Drawing | `Line`, `Rectangle`, `Ellipse` |
| Effects | `Invert`, `Posterize`, `Solarize`, `Pixellate`, `Noise`, `FilmGrain`, `Jitter`, `Replace`, `SinWave`, `Pointillism`, `Turbulence`, `Duotone`, `Colorize`, `MotionBlur`, `ShadowsHighlights`, `OilPaint` |
| Morphology | `Dilate`, `Constrict` (fluent `Erode`), `MorphOpen`, `MorphClose` |
| Normalization | `Equalize`, `AdaptiveEqualize`, `StretchContrast`, `Logarithm`, `Gamma`, `Levels` |
| Overlays | `Blend` (+ `BlendMode`), `Glow`, `Vignette` |
| Pipelines | `GaussianBlur`, `CannyEdgeDetection`, `EdgeDetect`, `BumpMap`, `NormalMap`, `Polaroid`, `Lomograph` |
| Quantize | `Quantize` (+ `DitherMethod`: None / Bayer4x4 / Bayer8x8 / FloydSteinberg) |
| Resampling | `Resize`, `ResizeCanvas`, `Crop`, `Flip`, `Rotate`, `Scale`, `Skew`, `Translate`, `AffineTransformation` |
| Sharpening | `Unsharp` |
| Smoothing | `Median`, `Kuwahara`, `SNNBlur` |

Drawing via fluent API today: `DrawRectangle` / `DrawEllipse` / `DrawLine` / `DrawPolygon` / `DrawPolyline` / `FloodFill`.

Full sources: [`Filters/`](https://github.com/chromafx/chromafx/tree/master/src/ChromaFx.Processing/Filters) in the library repo. Visual samples: [filter gallery](./gallery).

## PixelArt package

Opt-in [`ChromaFx.PixelArt`](./packages) is **not** in the meta-package. After `dotnet add package ChromaFx.PixelArt` and `using ChromaFx.PixelArt;`:

| Family | Fluent helpers |
|--------|----------------|
| EPX | `Scale2x`, `Scale3x`, `Scale4x`, `Scale8x` |
| HQX | `Hq2x`, `Hq3x`, `Hq4x` (may blend) |
| cleanEdge | `CleanEdge(scale)` — edge/line reconstruction (default 4×) |
| Eagle | `Eagle`, `SuperEagle` (SuperEagle may blend) |
| SaI | `Scale2xSaI`, `Super2xSaI` (may blend) |
| Rotation | `RotateSprite(degrees)` — RotSprite (similarity Scale2x → 8×); `CleanEdgeRotate(degrees)` — cleanEdge sample-through. Both use a 1× AABB canvas, exact cardinal remaps, and opaque-black empty fill by default (`emptyColor` optional). |

```csharp
image.Mutate(ctx => ctx.Scale2x());
image.Mutate(ctx => ctx.CleanEdge(4));
image.Mutate(ctx => ctx.RotateSprite(45));
image.Mutate(ctx => ctx.CleanEdgeRotate(45));
```

## Retro package

Opt-in [`ChromaFx.Retro`](./packages) is **not** in the meta-package. After `dotnet add package ChromaFx.Retro` and `using ChromaFx.Retro;`:

| Filter | Fluent helper |
|--------|----------------|
| Netscape 6×6×6 | `WebSafeQuantize(dither?, strength?)` |
| CGA Mode 4 / RGBI / mono | `CgaQuantize(mode, dither?, strength?)` |
| EGA 64-color `00/55/AA/FF` approx | `EgaQuantize(dither?, strength?)` |
| VGA 6-bit DAC levels | `VgaQuantize(dither?, strength?)` |
| Bad web scale (NN down→up) | `BadWebScale(factor?, webSafe?, dither?, strength?)` |
| Soft bevel (lighten/darken edges) | `Bevel(depth?, style?, expandCanvas?, strength?)` |
| Mode resolution snap | `RetroMode(width?, height?)` (default 320×200, nearest-neighbor) |
| Rotated circular-dot halftone | `Halftone(cellSize?, angleDegrees?, strength?)` |
| Lens flare (hot spot + ghosts) | `LensFlare(centerX?, centerY?, strength?)` |
| Liquid metal chrome | `LiquidChrome(strength?)` |
| Plastic wrap / jelly sheen | `PlasticWrap(strength?)` |
| JPEG macroblock crush | `JpegBlocks(blockSize?, strength?)` |
| Purple fringe / CA look-alike | `ChromaticAberration(amount?, strength?)` |
| Digicam flash glare + cross streak | `CcdBloom(threshold?, radius?, strength?)` |
| Page curl | `PageCurl(amount?, fromRight?)` |
| Twirl / pinch / sphere warp | `Warp(mode?, amount?, radius?, centerX?, centerY?)` |
| Glass lens | `GlassLens(refraction?, radius?, centerX?, centerY?, rim?)` |
| Kaleidoscope | `Kaleidoscope(segments?, centerX?, centerY?)` |
| Vortex tile | `VortexTile(twist?, zoom?, centerX?, centerY?)` |
| Lightning overlay | `Lightning(seed?, strength?, bolts?)` |
| Fractal noise overlay | `FractalNoise(strength?, frequency?, seed?, octaves?)` |
| Plasma | `Plasma(strength?, scale?, time?)` |
| Fire | `Fire(strength?, seed?, cooling?)` |

Alpha is preserved on palette snaps. Optional ordered dither: Core `OrderedDitherMethod.None` (default), `Bayer4x4`, `Bayer8x8`; `strength` ~0.3–0.6 is typical (Retro bias scale ~±127.5 at strength 1). Adaptive `Quantize` uses Processing `DitherMethod` (adds Floyd–Steinberg) with a milder Bayer scale (~±32). `JpegBlocks` is a fun NxN crush, not a DCT codec.

```csharp
using ChromaFx.Core.Quantization;
using ChromaFx.Processing.Filters;
using ChromaFx.Retro.Filters;

image.Mutate(ctx => ctx.WebSafeQuantize());
image.Mutate(ctx => ctx.WebSafeQuantize(OrderedDitherMethod.Bayer4x4, 0.4f));
image.Mutate(ctx => ctx.CgaQuantize());
image.Mutate(ctx => ctx.BadWebScale(0.25f, webSafe: true));
image.Mutate(ctx => ctx.RetroMode(320, 200).Bevel());
image.Mutate(ctx => ctx.Halftone(6, 45f));
image.Mutate(ctx => ctx.ChromaticAberration(3f).CcdBloom());
image.Mutate(ctx => ctx.LensFlare().LiquidChrome(0.8f));
image.Mutate(ctx => ctx.PlasticWrap().JpegBlocks());
image.Mutate(ctx => ctx.Warp(WarpMode.Twirl).PageCurl());
image.Mutate(ctx => ctx.Plasma().Fire(0.7f));
image.Mutate(ctx => ctx.Quantize(16, DitherMethod.Bayer4x4));
```
