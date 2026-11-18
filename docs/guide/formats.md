# Formats & encoders

Built-in managed codecs: **BMP**, **PNG**, **JPEG**, **GIF** (including animation), **TGA**, **TIFF** (first page), and **ICO**.

::: tip 0.6.4
Multi-size **ICO** encode, TIFF **Deflate** encode option, `ManagedFormats` rename, and native **win-arm64** RIDs.
:::

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

// ManagedFormats holds ImageFormatKey ids (bmp/png/jpeg/gif/tga/tiff/ico); registry is ImageFormats.
var bytes = image.ToByteArray(ManagedFormats.Png);
var b64 = image.ToBase64String(ManagedFormats.Png);
```

Path `Save` / `SaveAsync` pick the **last** registered format that accepts the extension (plugins can override built-ins). `Save(stream, ManagedFormats.Png)` does the same by id: the last registration whose `ImageFormatKey` matches (ordinal-ignore-case) supplies `CreateEncoder`. `ImageFormats.TryGetFormat` still returns the **first** match.

## Typed encoders

Encoders live under `ChromaFx.IO.Encoders` — `JpegEncoder` (`Quality`), `PngEncoder`, `BmpEncoder`, `GifEncoder` (also `IAnimationEncoder`), `TgaEncoder`, `TiffEncoder`, `IcoEncoder`.

GIF still/animation encode builds its palette with the shared Core `Octree` (same algorithm as Processing `Quantize`). Transparent-index plumbing stays GIF-specific in IO.

`TgaEncoder` writes uncompressed 32-bit top-left TGA (`.tga`, `.targa`). Decode reads raw and RLE images: 8-bit indexed or greyscale, and 15/16/24/32-bit truecolor, including a bottom-left origin. `TiffEncoder` writes little-endian 8-bit RGBA (`.tif`, `.tiff`); set `Compression` to `TiffCompression.None` (default) or `Deflate`. Decode reads the first IFD only: bilevel, greyscale, palette, or RGB, with optional alpha on greyscale and RGB, 1/4/8 bits per sample, chunky strips or tiles, uncompressed, PackBits, LZW, or Deflate (horizontal differencing on LZW and Deflate). BigTIFF, JPEG-in-TIFF, CMYK, 16-bit, float, and planar images are rejected. `IcoEncoder` writes PNG image(s), each at most 256×256 (`.ico`); use `Encode(stream, images)` for multi-size icons. Decode uses the largest directory entry: a PNG payload, or an uncompressed 1/4/8/24/32-bit BMP plus its AND mask.

JPEG, PNG, TIFF, and WebP decode read orientation tag 274 and bake values 1–8 into the pixels, so a phone photo loads upright.

::: tip 0.6.5
`Image.Metadata` holds optional EXIF (raw TIFF IFD) and XMP. JPEG and PNG decode populate it; encode writes it back with orientation forced to **1** (pixels stay upright). Assign `image.Metadata.Exif` / `Xmp` before save to inject. TIFF/WebP/AVIF/JPEG XL do not round-trip this bag yet.
:::

## WebP, AVIF, and JPEG XL

Opt-in [`ChromaFx.Native`](./packages) registers still WebP, AVIF, and JPEG XL when the package is referenced. Their ids are `NativeFormats.WebP`, `Avif`, and `JpegXl` (`webp`, `avif`, `jxl`), not members of `ManagedFormats`. Animated WebP, AVIF, and JPEG XL throw `NotSupportedException` (use GIF for animation).

```csharp
using ChromaFx.Native;
using ChromaFx.Native.Encoders;

image.Save("out.webp", new WebPEncoder { Quality = 75 });
var webp = image.ToByteArray(NativeFormats.WebP);
image.Save("lossless.webp", new WebPEncoder { Lossless = true });
image.Save("out.avif", new AvifEncoder { Quality = 60 });
image.Save("out.jxl", new JxlEncoder { Quality = 75 });
var jxl = image.ToByteArray(NativeFormats.JpegXl);
image.Save("lossless.jxl", new JxlEncoder { Lossless = true });
var still = Image.Load("photo.avif");
```

`WebPEncoder.Quality` defaults to 75 and is ignored when `Lossless` is set. `AvifEncoder.Quality` defaults to 60. `AvifEncoder.Lossless` writes full-range 4:4:4 with an identity matrix; lossy AVIF is 4:2:0. `JxlEncoder.Quality` defaults to 75. Lossy distance is `(100 - quality) / 10`. `Lossless`, and quality 100, write distance 0. A later `ImageFormats.Register` wins for `Save` by extension and for `NativeFormats.WebP` / `Avif` / `JpegXl`. Native binaries ship inside the package for linux-x64, linux-arm64, osx-arm64, win-x64, and win-arm64.

## Plugins

Implement `IImageFormat` / `IAnimationFormat` and give it an `ImageFormatKey`. `Encode` throws on failure (no bool return). `CreateEncoder` defaults to calling `Encode`; override it to return a typed encoder. A plugin can use `new ImageFormatKey("qoi")` without a change to `ChromaFx.IO`. Register your own WebP, AVIF, or JPEG XL plugin after `ChromaFx.Native` if you need to override it. The last registration wins for encode.

## Animation

`Animation` supports per-frame delays (`GetFrameDelay` / `SetFrameDelay` / `FrameDelays`). `SetAllFrameDelays` / `Delay` set every frame.

`RepeatCount`: `0` = loop forever, `1` = play once, `N` = play N times (written as a NETSCAPE 2.0 block when not `1`).

```csharp
var anim = Animation.Load("rings.gif");
await anim.SaveAsync("out.gif");
anim.Save("frame0.png"); // non-GIF extension → first frame as still
```
