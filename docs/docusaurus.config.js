// @ts-check

import {themes as prismThemes} from "prism-react-renderer"

const {vsDark: PrismLight, vsDark: PrismDark} = prismThemes

/**
 * @import {Config} from "@docusaurus/types"
 * @import {Options, ThemeConfig} from "@docusaurus/preset-classic"
 */

/** @type {Config} */
const config = {
  title: "uglier",
  tagline: "Opinionated, composable ESLint flat configs for the rest of us.",
  favicon: "img/favicon.svg",

  future: {
    v4: true,
  },

  url: "https://uglier.gesslar.io",
  baseUrl: "/",

  organizationName: "gesslar",
  projectName: "uglier",

  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",
  onDuplicateRoutes: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    hooks: {
      onBrokenMarkdownImages: "throw",
      onBrokenMarkdownLinks: "throw",
    }
  },

  presets: [
    [
      "classic",
      /** @type {Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  /** @type {ThemeConfig} */
  themeConfig:
    ({
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

      image: "img/favicon.svg",

      scrollToTop: true,
      scrollToTopOptions: {
        zIndex: 100,
      },

      docs: {
      },

      navbar: {
        title: "Uglier",
        hideOnScroll: false,
        logo: {
          alt: "Uglier Logo",
          src: "img/favicon.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "quickStartSidebar",
            position: "left",
            label: "Quick Start",
          },
          {
            type: "docSidebar",
            sidebarId: "configsSidebar",
            position: "left",
            label: "Configs",
          },
          {
            type: "docSidebar",
            sidebarId: "customizationSidebar",
            position: "left",
            label: "Customization",
          },
          {
            type: "docSidebar",
            sidebarId: "referenceSidebar",
            position: "left",
            label: "Reference",
          },
          {
            type: "docSidebar",
            sidebarId: "nerdsSidebar",
            position: "left",
            label: "Nerds",
          },
          {
            type: "html",
            value: `<a href="https://github.com/gesslar/uglier" target="_blank"><img class="header-svg" src="/img/line-md--github-loop.svg" /></a>`,
            position: "right",
          },
          {
            type: "html",
            value: `<a href="/docs/testimonials"><img class="header-svg" src="/img/hugeicons--promotion.svg" /></a>`,
            position: "right",
          },
          {
            type: "html",
            value: `|`,
            position: "right",
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `<del title="lololol">Copyright ©${new Date().getFullYear()}</del><br /><a href="https://unlicense.org/">Unlicense</a>. Built with <a href="https://docusaurus.io/">Docusaurus</a>.`,
      },
      prism: {
        additionalLanguages: [
          'powershell',
          'bash',
          'diff',
          'json',
          'yaml',
        ],
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
          {
            className: 'code-block-error-line',
            line: 'This will error',
          },
        ],
        theme: PrismLight,
        darkTheme: PrismDark,
      },
    }),
  clientModules: [
    "./src/clientModules/routeTransition.js",
  ],
  scripts: [
    {
      src: "https://kit.fontawesome.com/9ecaefec6a.js",
      async: true
    }
  ]
}

export default config
