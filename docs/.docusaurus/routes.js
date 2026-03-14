import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'ec9'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'a94'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'f5d'),
            routes: [
              {
                path: '/docs/configs/cjs-override',
                component: ComponentCreator('/docs/configs/cjs-override', '8a5'),
                exact: true,
                sidebar: "configsSidebar"
              },
              {
                path: '/docs/configs/language-options',
                component: ComponentCreator('/docs/configs/language-options', 'f2a'),
                exact: true,
                sidebar: "configsSidebar"
              },
              {
                path: '/docs/configs/lints-js',
                component: ComponentCreator('/docs/configs/lints-js', '4ce'),
                exact: true,
                sidebar: "configsSidebar"
              },
              {
                path: '/docs/configs/lints-jsdoc',
                component: ComponentCreator('/docs/configs/lints-jsdoc', '710'),
                exact: true,
                sidebar: "configsSidebar"
              },
              {
                path: '/docs/configs/mjs-override',
                component: ComponentCreator('/docs/configs/mjs-override', '57d'),
                exact: true,
                sidebar: "configsSidebar"
              },
              {
                path: '/docs/configs/node',
                component: ComponentCreator('/docs/configs/node', '6f0'),
                exact: true,
                sidebar: "configsSidebar"
              },
              {
                path: '/docs/configs/react',
                component: ComponentCreator('/docs/configs/react', 'd21'),
                exact: true,
                sidebar: "configsSidebar"
              },
              {
                path: '/docs/configs/tauri',
                component: ComponentCreator('/docs/configs/tauri', '598'),
                exact: true,
                sidebar: "configsSidebar"
              },
              {
                path: '/docs/configs/vscode-extension',
                component: ComponentCreator('/docs/configs/vscode-extension', '1f2'),
                exact: true,
                sidebar: "configsSidebar"
              },
              {
                path: '/docs/configs/web',
                component: ComponentCreator('/docs/configs/web', '313'),
                exact: true,
                sidebar: "configsSidebar"
              },
              {
                path: '/docs/customization/examples',
                component: ComponentCreator('/docs/customization/examples', '121'),
                exact: true,
                sidebar: "customizationSidebar"
              },
              {
                path: '/docs/customization/options',
                component: ComponentCreator('/docs/customization/options', 'd0e'),
                exact: true,
                sidebar: "customizationSidebar"
              },
              {
                path: '/docs/customization/overrides',
                component: ComponentCreator('/docs/customization/overrides', 'cdf'),
                exact: true,
                sidebar: "customizationSidebar"
              },
              {
                path: '/docs/customization/with-without',
                component: ComponentCreator('/docs/customization/with-without', '81d'),
                exact: true,
                sidebar: "customizationSidebar"
              },
              {
                path: '/docs/nerds/cjs-override',
                component: ComponentCreator('/docs/nerds/cjs-override', '43f'),
                exact: true,
                sidebar: "nerdsSidebar"
              },
              {
                path: '/docs/nerds/exports',
                component: ComponentCreator('/docs/nerds/exports', '9bb'),
                exact: true,
                sidebar: "nerdsSidebar"
              },
              {
                path: '/docs/nerds/languageOptions',
                component: ComponentCreator('/docs/nerds/languageOptions', '4c9'),
                exact: true,
                sidebar: "nerdsSidebar"
              },
              {
                path: '/docs/nerds/lints-js',
                component: ComponentCreator('/docs/nerds/lints-js', 'acc'),
                exact: true,
                sidebar: "nerdsSidebar"
              },
              {
                path: '/docs/nerds/lints-jsdoc',
                component: ComponentCreator('/docs/nerds/lints-jsdoc', 'c5c'),
                exact: true,
                sidebar: "nerdsSidebar"
              },
              {
                path: '/docs/nerds/mjs-override',
                component: ComponentCreator('/docs/nerds/mjs-override', '636'),
                exact: true,
                sidebar: "nerdsSidebar"
              },
              {
                path: '/docs/nerds/node',
                component: ComponentCreator('/docs/nerds/node', '4c3'),
                exact: true,
                sidebar: "nerdsSidebar"
              },
              {
                path: '/docs/nerds/react',
                component: ComponentCreator('/docs/nerds/react', 'de0'),
                exact: true,
                sidebar: "nerdsSidebar"
              },
              {
                path: '/docs/nerds/tauri',
                component: ComponentCreator('/docs/nerds/tauri', 'cd7'),
                exact: true,
                sidebar: "nerdsSidebar"
              },
              {
                path: '/docs/nerds/vscode-extension',
                component: ComponentCreator('/docs/nerds/vscode-extension', 'b7a'),
                exact: true,
                sidebar: "nerdsSidebar"
              },
              {
                path: '/docs/nerds/web',
                component: ComponentCreator('/docs/nerds/web', '310'),
                exact: true,
                sidebar: "nerdsSidebar"
              },
              {
                path: '/docs/quick-start/init',
                component: ComponentCreator('/docs/quick-start/init', 'b13'),
                exact: true,
                sidebar: "quickStartSidebar"
              },
              {
                path: '/docs/quick-start/installation',
                component: ComponentCreator('/docs/quick-start/installation', '86a'),
                exact: true,
                sidebar: "quickStartSidebar"
              },
              {
                path: '/docs/quick-start/intro',
                component: ComponentCreator('/docs/quick-start/intro', '318'),
                exact: true,
                sidebar: "quickStartSidebar"
              },
              {
                path: '/docs/quick-start/managing-configs',
                component: ComponentCreator('/docs/quick-start/managing-configs', 'cd8'),
                exact: true,
                sidebar: "quickStartSidebar"
              },
              {
                path: '/docs/quick-start/running-eslint',
                component: ComponentCreator('/docs/quick-start/running-eslint', '952'),
                exact: true,
                sidebar: "quickStartSidebar"
              },
              {
                path: '/docs/reference/api',
                component: ComponentCreator('/docs/reference/api', '08e'),
                exact: true,
                sidebar: "referenceSidebar"
              },
              {
                path: '/docs/reference/cli',
                component: ComponentCreator('/docs/reference/cli', '55f'),
                exact: true,
                sidebar: "referenceSidebar"
              },
              {
                path: '/docs/reference/types',
                component: ComponentCreator('/docs/reference/types', '512'),
                exact: true,
                sidebar: "referenceSidebar"
              },
              {
                path: '/docs/testimonials',
                component: ComponentCreator('/docs/testimonials', '44c'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
