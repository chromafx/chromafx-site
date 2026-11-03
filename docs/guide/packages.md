# Packages

Current NuGet line is **0.5.0-beta.\*** (prerelease). Prefer `--prerelease` until 1.0.

| Package | Role | NuGet |
|---------|------|-------|
| **ChromaFx** | Meta-package (`Core` + `IO` + `Processing`) | [ChromaFx](https://www.nuget.org/packages/ChromaFx/?includePrerelease=true) |
| **ChromaFx.Core** | Image, color, animation, exceptions | [ChromaFx.Core](https://www.nuget.org/packages/ChromaFx.Core/?includePrerelease=true) |
| **ChromaFx.IO** | Decode/encode, Load/Save, format registry | [ChromaFx.IO](https://www.nuget.org/packages/ChromaFx.IO/?includePrerelease=true) |
| **ChromaFx.Processing** | Filters and Mutate/Clone | [ChromaFx.Processing](https://www.nuget.org/packages/ChromaFx.Processing/?includePrerelease=true) |
| **ChromaFx.PixelArt** | Opt-in Scale2x / Scale3x / Hq2x–4x / CleanEdge / Eagle / SaI and `RotateSprite` / `CleanEdgeRotate` (not in the meta-package) | [ChromaFx.PixelArt](https://www.nuget.org/packages/ChromaFx.PixelArt/?includePrerelease=true) |

All packages target **net10.0** and ship under Apache 2.0.

```bash
dotnet add package ChromaFx --prerelease

# modular (instead of the meta-package):
dotnet add package ChromaFx.Core --prerelease
dotnet add package ChromaFx.IO --prerelease
dotnet add package ChromaFx.Processing --prerelease

# pixel-art upscaling / rotation (opt-in; not included in ChromaFx)
dotnet add package ChromaFx.PixelArt --prerelease
```

## Next

- [Getting started](./getting-started)
- [Processing](./processing)
- [Filters](./filters)
