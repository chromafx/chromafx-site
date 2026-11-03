# Packages

Current NuGet line is **0.5.0-beta.\*** (prerelease). Prefer `--prerelease` until 1.0.

| Package | Role | NuGet |
|---------|------|-------|
| **ChromaFx** | Meta-package (`Core` + `IO` + `Processing`) | [ChromaFx](https://www.nuget.org/packages/ChromaFx/?includePrerelease=true) |
| **ChromaFx.Core** | Image, color, animation, exceptions | [ChromaFx.Core](https://www.nuget.org/packages/ChromaFx.Core/?includePrerelease=true) |
| **ChromaFx.IO** | Decode/encode, Load/Save, format registry | [ChromaFx.IO](https://www.nuget.org/packages/ChromaFx.IO/?includePrerelease=true) |
| **ChromaFx.Processing** | Filters and Mutate/Clone | [ChromaFx.Processing](https://www.nuget.org/packages/ChromaFx.Processing/?includePrerelease=true) |

All packages target **net10.0** and ship under Apache 2.0.

```bash
dotnet add package ChromaFx --prerelease
# or modular:
dotnet add package ChromaFx.Core --prerelease
dotnet add package ChromaFx.IO --prerelease
dotnet add package ChromaFx.Processing --prerelease
```

## Next

- [Getting started](./getting-started)
- [Processing](./processing)
- [Filters](./filters)
