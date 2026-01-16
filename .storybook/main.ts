import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/svelte-vite";
import path, { dirname } from "path";
import { loadEnv } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const varEnv = loadEnv(process.env.STORYBOOK_ENV ?? "production", process.cwd(), "VITE_");

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|ts|svelte)"],
  addons: [
    "@storybook/addon-svelte-csf",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/svelte-vite",
    options: {},
  },
  viteFinal: async (config) => {
    config.server = {
      ...config.server,
      fs: {
        ...config.server?.fs,
        allow: [
          ...(config.server?.fs?.allow || []),
          "./stories",
          "./src",
          "./static",
          ".storybook",
          "node_modules",
        ],
      },
    };
    config.resolve = {
      alias: {
        src: path.resolve(__dirname, "../src"),
        $lib: path.resolve(__dirname, "../src/lib"),
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
            @use '${path.resolve(__dirname, "../src/lib/styles/mixins.scss")}' as *;
            $assets-url-base: '${varEnv.VITE_LAB_ANSSI_UI_KIT_ASSET_BASE}';
          `,
          loadPaths: [
            `${path.resolve(__dirname, "../node_modules/@gouvfr/dsfr")}`,
            `${path.resolve(__dirname, "../node_modules/@gouvfr/dsfr/src")}`,
          ],
        },
      },
    };
    return config;
  },
};
export default config;
