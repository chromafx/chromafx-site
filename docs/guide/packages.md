# Packages

Current NuGet line is **0.6.0** (published from version tags only). SemVer 0.x may still change before 1.0.

| Package | Role | NuGet |
|---------|------|-------|
| **ChromaFx** | Meta-package (`Core` + `IO` + `Processing`) | [ChromaFx](https://www.nuget.org/packages/ChromaFx/) |
| **ChromaFx.Core** | Image, color, animation, exceptions | [ChromaFx.Core](https://www.nuget.org/packages/ChromaFx.Core/) |
| **ChromaFx.IO** | Decode/encode, Load/Save, format registry | [ChromaFx.IO](https://www.nuget.org/packages/ChromaFx.IO/) |
| **ChromaFx.Processing** | Filters and Mutate/Clone | [ChromaFx.Processing](https://www.nuget.org/packages/ChromaFx.Processing/) |
| **ChromaFx.PixelArt** | Opt-in Scale2x / Scale3x / Hq2x–4x / CleanEdge / Eagle / SaI and `RotateSprite` / `CleanEdgeRotate` (not in the meta-package) | [ChromaFx.PixelArt](https://www.nuget.org/packages/ChromaFx.PixelArt/) |

All packages target **net10.0** and ship under Apache 2.0.

```bash
dotnet add package ChromaFx

# modular (instead of the meta-package):
dotnet add package ChromaFx.Core
dotnet add package ChromaFx.IO
dotnet add package ChromaFx.Processing

# pixel-art upscaling / rotation (opt-in; not included in ChromaFx)
dotnet add package ChromaFx.PixelArt
```

## Next

- [Getting started](./getting-started)
- [Processing](./processing)
- [Filters](./filters)
