# Formats & encoders

Built-in managed codecs: **BMP**, **PNG**, **JPEG**, **GIF** (including animation), **TGA**, and **TIFF** (first page).

## Loading

```csharp
var fromPath = Image.Load("input.png");
var fromBytes = Image.Load(pngBytes);                 // zero-copy when array-backed
var fromMemory = Image.Load(pngBytes.AsMemory());
var fromSpan = Image.Load(pngBytes.AsSpan());         // one pooled copy

var asyncImage = await Image.LoadAsync("input.png");  // async read, sync decode
await using var network = /* non-seekable stream */;
var buffered = Image.Load(network);                   // sync Load buffers if !CanSeek
```

`Animation.Load` / `LoadAsync` mirror the same shapes (path, stream, memory, span, byte[]).

## Saving

```csharp
image.Save("out.jpg", new JpegEncoder { Quality = 85 });
image.Save("out.png"); // extension → registered format
await image.SaveAsync("out.png"); // sync encode, async write

var bytes = image.ToByteArray(FileFormats.Png);
var b64 = image.ToBase64String(FileFormats.Png);
```

Path `Save` / `SaveAsync` pick the **last** registered format that accepts the extension (plugins can override built-ins). Look up by id with `ImageFormats.TryGetFormat` (returns the **first** match).

## Typed encoders

Encoders live under `ChromaFx.IO.Encoders` — `JpegEncoder` (`Quality`), `PngEncoder`, `BmpEncoder`, `GifEncoder` (also `IAnimationEncoder`), `TgaEncoder`, `TiffEncoder`.

`TgaEncoder` writes uncompressed 32-bit top-left TGA (`.tga`, `.targa`). Decode reads raw and RLE images: 8-bit indexed or greyscale, and 15/16/24/32-bit truecolor, including a bottom-left origin. `TiffEncoder` writes little-endian uncompressed 8-bit RGBA (`.tif`, `.tiff`). Decode reads the first IFD only: bilevel, greyscale, palette, or RGB, with optional alpha on greyscale and RGB, 1/4/8 bits per sample, chunky strips or tiles, uncompressed, PackBits, LZW, or Deflate (horizontal differencing on LZW and Deflate). BigTIFF, JPEG-in-TIFF, CMYK, 16-bit, float, and planar images are rejected.

## WebP, AVIF, and JPEG XL

`FileFormats.WebP` / `Avif` / `JpegXl` are not in the meta-package. Opt-in [`ChromaFx.Native`](./packages) registers them when the package is referenced and decodes and encodes **still** images. Animated WebP, AVIF, and JPEG XL throw `NotSupportedException` (use GIF for animation).

```csharp
using ChromaFx.Native.Encoders;

image.Save("out.webp", new WebPEncoder { Quality = 75 });
image.Save("lossless.webp", new WebPEncoder { Lossless = true });
image.Save("out.avif", new AvifEncoder { Quality = 60 });
image.Save("out.jxl", new JxlEncoder { Quality = 75 });
image.Save("lossless.jxl", new JxlEncoder { Lossless = true });
var still = Image.Load("photo.avif");
```

`WebPEncoder.Quality` defaults to 75 and is ignored when `Lossless` is set. `AvifEncoder.Quality` defaults to 60. `AvifEncoder.Lossless` writes full-range 4:4:4 with an identity matrix; lossy AVIF is 4:2:0. `JxlEncoder.Quality` defaults to 75. Lossy distance is `(100 - quality) / 10`. `Lossless`, and quality 100, write distance 0. A later `ImageFormats.Register` wins for `Save` by extension and for `FileFormats.WebP` / `Avif` / `JpegXl` encode. `ImageFormats.TryGetFormat` still returns the first match. Native binaries ship inside the package for linux-x64, linux-arm64, osx-arm64, osx-x64, and win-x64.

## Plugins

Implement `IImageFormat` / `IAnimationFormat`. `Encode` throws on failure (no bool return). Register your own WebP, AVIF, or JPEG XL plugin after `ChromaFx.Native` if you need to override it. The last registration wins.

## Animation

`Animation` supports per-frame delays (`GetFrameDelay` / `SetFrameDelay` / `FrameDelays`). `SetAllFrameDelays` / `Delay` set every frame.

`RepeatCount`: `0` = loop forever, `1` = play once, `N` = play N times (written as a NETSCAPE 2.0 block when not `1`).

```csharp
var anim = Animation.Load("rings.gif");
await anim.SaveAsync("out.gif");
anim.Save("frame0.png"); // non-GIF extension → first frame as still
```
