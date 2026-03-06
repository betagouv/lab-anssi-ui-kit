import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/svelte-vite";
import path, { dirname } from "path";
import { loadEnv } from "vite";
import viteScssPreprocessorOptions from "../outils/vite-preprocessor-options.ts";

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
        scss: viteScssPreprocessorOptions(varEnv),
      },
    };
    return config;
  },
};
export default config;
