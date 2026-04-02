// @ts-check
import {defineConfig} from "astro/config"
import starlight from "@astrojs/starlight"

export default defineConfig({
  site: "https://uglier.gesslar.io",
  integrations: [
    starlight({
      title: "uglier",
      tagline: "Opinionated, composable ESLint flat configs for the rest of us.",
      favicon: "/favicon.svg",
      social: [
        {icon: "github", label: "GitHub", href: "https://github.com/gesslar/uglier"},
      ],
      components: {
        Header: "./src/components/Header.astro",
      },
      customCss: [
        "./src/styles/custom.css",
      ],
      sidebar: [
        {
          label: "Quick Start",
          autogenerate: {directory: "quick-start"},
        },
        {
          label: "Configs",
          autogenerate: {directory: "configs"},
        },
        {
          label: "Customization",
          autogenerate: {directory: "customization"},
        },
        {
          label: "Reference",
          autogenerate: {directory: "reference"},
        },
        {
          label: "Nerds",
          autogenerate: {directory: "nerds"},
        },
        {
          label: "Testimonials",
          slug: "testimonials",
        },
      ],
    }),
  ],
})
