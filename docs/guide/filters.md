# Filters

Most filters implement `IFilter` and run through `Mutate` / `Clone`. Prefer fluent helpers when they exist; otherwise `Apply(new SomeFilter(...))`.

## Fluent helpers

On `IImageProcessingContext`:

`Apply`, `Resize`, `Rotate`, `Crop`, `Flip`, `Invert`, `Brightness`, `Contrast`, `Gamma`, `Greyscale`, `GaussianBlur`, `Sharpen`, `Threshold`, `DrawRectangle`, `DrawEllipse`

Extensions: `Grayscale`, `BoxBlur`, `Saturation`, `Hue`, `Dilate`, `Erode`, `Noise`, `Pixellate`, `Sepia`, `Emboss`, `SobelEmboss`, `StretchContrast`, `Equalize`

```csharp
image.Mutate(ctx => ctx
    .Resize(800, 600)
    .BoxBlur()
    .Apply(new Unsharp()));
```

## Catalog

Base / helper types (`*FilterBase`, `ColorMatrix`, `ConvolutionFilter`, `FilterList`, …) are omitted.

| Category | Filters |
|----------|---------|
| Arithmetic | `Add`, `Subtract`, `Multiplication`, `Division`, `Modulo`, `And`, `Or`, `XOr` |
| Binary | `Threshold`, `AdaptiveThreshold`, `NonMaximalSuppression` |
| Color | `Brightness`, `Contrast`, `Gamma`, `Hue`, `Saturation`, `Temperature`, `Alpha`, `BlackWhite`, `Greyscale601`, `Greyscale709`, channel filters, `SepiaTone`, `Kodachrome`, `Lomograph`, `Polaroid` |
| Convolution | `BoxBlur`, `Sharpen`, `SharpenLess`, `Emboss`, `SobelEmboss`, `Prewitt`, `Scharr`, `Kirsch`, `Kayyali`, `Robinson`, `RobertsCross`, `LaplaceEdgeDetection`, `LaplacianOfGaussianEdgeDetector` |
| Drawing | `Line`, `Rectangle`, `Ellipse` |
| Effects | `Invert`, `Posterize`, `Solarize`, `Pixellate`, `Noise`, `Jitter`, `Replace`, `SinWave`, `Pointillism`, `Turbulence` |
| Morphology | `Dilate`, `Constrict` (fluent `Erode`) |
| Normalization | `Equalize`, `AdaptiveEqualize`, `StretchContrast`, `Logarithm`, `Gamma` |
| Overlays | `Blend`, `Glow`, `Vignette` |
| Pipelines | `GaussianBlur`, `CannyEdgeDetection`, `BumpMap`, `NormalMap`, `Polaroid`, `Lomograph` |
| Resampling | `Resize`, `ResizeCanvas`, `Crop`, `Flip`, `Rotate`, `Scale`, `Skew`, `Translate`, `AffineTransformation` |
| Sharpening | `Unsharp` |
| Smoothing | `Median`, `Kuwahara`, `SNNBlur` |

Drawing via fluent API today: `DrawRectangle` / `DrawEllipse`. Use `Apply(new Line(...))` for lines.

Full sources: [`Filters/`](https://github.com/chromafx/chromafx/tree/master/src/ChromaFx.Processing/Filters) in the library repo.

## PixelArt package

Opt-in [`ChromaFx.PixelArt`](./packages) is **not** in the meta-package. After `dotnet add package ChromaFx.PixelArt --prerelease` and `using ChromaFx.PixelArt;`:

| Family | Fluent helpers |
|--------|----------------|
| EPX | `Scale2x`, `Scale4x`, `Scale8x` |
| Eagle | `Eagle`, `SuperEagle` |
| SaI | `Scale2xSaI`, `Super2xSaI` (may blend edge colors) |
| Rotation | `RotateSprite(degrees)` |

```csharp
image.Mutate(ctx => ctx.Scale2x());
image.Mutate(ctx => ctx.Eagle());
image.Mutate(ctx => ctx.RotateSprite(45));
```
