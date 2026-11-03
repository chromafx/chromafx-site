---
layout: home
title: ChromaFx
titleTemplate: .NET image processing
hero:
  name: ChromaFx
  text: Image processing without native codec DLLs.
  tagline: Pure managed C# on .NET 10 — BMP, PNG, JPEG, GIF. Span-friendly, allocation-conscious, deploy anywhere.
  image:
    src: /logo.svg
    alt: ChromaFx logomark
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: View on NuGet
      link: https://www.nuget.org/packages/ChromaFx/?includePrerelease=true
features:
  - title: Fully managed
    details: No third-party NuGet deps and no native codec binaries — simpler Docker, Lambda, and multi-arch deploys.
  - title: Explicit pipelines
    details: Mutate and Clone keep side effects obvious. Fluent filters with an Apply escape hatch when you need it.
  - title: Opt-in PixelArt
    details: Scale2x / Scale3x / Hq2x–4x / CleanEdge / Eagle / SaI and RotateSprite / CleanEdgeRotate ship in ChromaFx.PixelArt — not pulled in by the meta-package.
---
