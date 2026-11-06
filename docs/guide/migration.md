# Migration

ChromaFx removed several Structure.Sketching-era APIs. Prefer `Mutate` / `Clone`, typed encoders, and `ImageFormats` — nothing is marked obsolete; call sites must update.

| Removed | Use instead |
|---------|-------------|
| `img.Apply(...)` / `img.Apply<T>()` | `img.Mutate(c => c.Invert())` / `c.Apply(filter)` |
| `img.Process(...)` / `ImagePipeline` | `img.Mutate` / `Clone` |
| `ImageOperatorExtensions` (`BrightnessUp`, …) | `Clone`/`Mutate` + context ops |
| `img.Copy()` | `img.Clone()` |
| `img.Save(path)` → `bool` | `void` (throws on failure) |
| `IImageFormat.Encode` → `bool` | `void` (throws on failure) |
| `LoadAnimation(path)` | `Animation.Load(path)` |
| `FormatManager` / `Manager` | `ImageFormats.Register` |
| `IFormat` | `IImageFormat` |
| `FileFormats` enum, including `WebP` / `Avif` / `JpegXl` | `ImageFormatKey`. Managed ids stay on `FileFormats`. Native ids are `NativeFormats` |
| Public format types as the only API | Prefer `ImageFormats` / typed encoders (`BmpFormat` etc. remain public for advanced use) |

```csharp
// Before
img.Apply<Invert>();
img.Save("out.png"); // bool

// After
img.Mutate(c => c.Invert());
img.Save("out.png"); // throws on failure
```

See also [Processing](./processing) and [Formats & encoders](./formats).
