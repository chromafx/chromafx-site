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
            { text: 'Formats & encoders', link: '/guide/formats' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/chromafx/chromafx' },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>NuGet</title><path d="M1.998.75v9.707l2.297 2.344H13.5V18.5h4.793v-5.699h5.699V4.344L21.646.75zm3.793 2.297h5.699v5.699H5.791zm9.121 0h5.699v5.699h-5.699zM1.998 13.5v9.75h9.75V13.5z"/></svg>',
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
      pattern: 'https://github.com/chromafx/website/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },
})
