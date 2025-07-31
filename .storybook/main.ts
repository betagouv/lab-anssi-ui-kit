import path from "path";
import type { StorybookConfig } from "@storybook/sveltekit";
import { loadEnv } from "vite";

const varEnv = loadEnv(process.env.HISTOIRE_ENV ?? "production", process.cwd(), "VITE_");

const config: StorybookConfig = {
  stories: ["../stories_storybook/**/*.mdx", "../stories_storybook/**/*.stories.@(js|ts|svelte)"],
  addons: [
    "@storybook/addon-svelte-csf",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/sveltekit",
    options: {},
  },
  viteFinal: async (config) => {
    config.server = {
      ...config.server,
      fs: {
        ...config.server?.fs,
        allow: [...(config.server?.fs?.allow || []), "./stories_storybook", "./src", "./static"],
      },
    };
    config.css = {
      ...config.css,
      preprocessorOptions: {
        ...config.preprocessorOptions,
        scss: {
          ...config.preprocessorOptions?.scss,
          additionalData: `
            @use '${path.resolve(__dirname, "../src/variables.scss")}' as *;
            @use '${path.resolve(__dirname, "../src/responsive.scss")}' as *;
            @use '${path.resolve(__dirname, "../src/assets.scss")}' as *;
            $assets-url-base: '${varEnv.VITE_LAB_ANSSI_UI_KIT_ASSET_BASE}';
          `,
        },
      },
    };
    return config;
  },
};
export default config;
