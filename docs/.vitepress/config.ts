import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ChromaFx',
  description:
    'Pure managed .NET image processing — BMP, PNG, JPEG, GIF. No native codec DLLs.',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,
  appearance: 'force-dark',

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/icon.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Outfit:wght@400;500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap',
      },
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'ChromaFx' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Pure managed .NET image processing — BMP, PNG, JPEG, GIF. No native codec DLLs.',
      },
    ],
    ['meta', { property: 'og:image', content: 'https://chromafx.net/og.png' }],
    ['meta', { property: 'og:url', content: 'https://chromafx.net/' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'theme-color', content: '#0B1020' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'ChromaFx',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Packages', link: '/guide/packages' },
      {
        text: 'NuGet',
        link: 'https://www.nuget.org/packages/ChromaFx/',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/chromafx/chromafx',
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting started', link: '/guide/getting-started' },
            { text: 'Packages', link: '/guide/packages' },
            { text: 'Processing', link: '/guide/processing' },
            { text: 'Filters', link: '/guide/filters' },
            { text: 'Formats & encoders', link: '/guide/formats' },
            { text: 'Migration', link: '/guide/migration' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/chromafx/chromafx' },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>NuGet</title><path d="M1.998.342a1.997 1.997 0 1 0 0 3.995 1.997 1.997 0 0 0 0-3.995zm9.18 4.34a6.156 6.156 0 0 0-6.153 6.155v6.667c0 3.4 2.756 6.154 6.154 6.154h6.667c3.4 0 6.154-2.755 6.154-6.154v-6.667a6.154 6.154 0 0 0-6.154-6.155zm-1.477 2.8a2.496 2.496 0 1 1 0 4.993 2.496 2.496 0 0 1 0-4.993zm7.968 6.16a3.996 3.996 0 1 1-.002 7.992 3.996 3.996 0 0 1 .002-7.992z"/></svg>',
        },
        link: 'https://www.nuget.org/packages/ChromaFx/',
        ariaLabel: 'NuGet',
      },
    ],

    footer: {
      message: 'Released under the Apache License 2.0.',
      copyright: 'Copyright © 2023–2026 Ho Tzin Mein · Fork of Structure.Sketching by JaCraig',
    },

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/chromafx/chromafx-site/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },
})
