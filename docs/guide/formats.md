# Formats & encoders

Built-in managed codecs: **BMP**, **PNG**, **JPEG**, **GIF** (including animation).

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

Encoders live under `ChromaFx.IO.Encoders` — `JpegEncoder` (`Quality`), `PngEncoder`, `BmpEncoder`, `GifEncoder` (also `IAnimationEncoder`).

`FileFormats.WebP` / `Avif` are reserved ids. Built-in typed encode helpers reject them today — register a plugin and save by extension, or wait for a future native package.

## Plugins

Implement `IImageFormat` / `IAnimationFormat`. `Encode` throws on failure (no bool return). `FileFormats.WebP` / `Avif` are reserved for a future native package or your own plugin.

## Animation

`Animation` supports per-frame delays (`GetFrameDelay` / `SetFrameDelay` / `FrameDelays`). `SetAllFrameDelays` / `Delay` set every frame.

`RepeatCount`: `0` = loop forever, `1` = play once, `N` = play N times (written as a NETSCAPE 2.0 block when not `1`).

```csharp
var anim = Animation.Load("rings.gif");
await anim.SaveAsync("out.gif");
anim.Save("frame0.png"); // non-GIF extension → first frame as still
```
