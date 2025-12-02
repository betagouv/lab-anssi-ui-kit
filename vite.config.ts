/// <reference types="vitest/config" />
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import path, { resolve } from "path";
import { defineConfig } from "vitest/config";
import { assetsPath, replaceIconPaths, varEnv } from "./outils";

const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// On charge manuellement les valeurs d'environnement de la production, car pour une raison qu'on ignore
// c'est la seule façon de charger Storybook avec nos valeurs
// Cela permet de faire fonctionner la méthode JS `srcAsset` dans le cas du Storybook déployé
if (process.env.STORYBOOK_ENV === "production")
  dotenv.config({ path: resolve(process.cwd(), ".env.production") });

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
  plugins: [svelte()],
  css: {
    postcss: {
      plugins: [replaceIconPaths({ assetsPath })],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'src/variables.scss' as *;
          @use 'src/responsive.scss' as *;
          @use 'src/assets.scss' as *;
          @use 'src/lib/styles/mixins.scss' as *;
          $assets-url-base: '${varEnv.VITE_LAB_ANSSI_UI_KIT_ASSET_BASE}';
        `,
        loadPaths: ["node_modules/@gouvfr/dsfr", "node_modules/@gouvfr/dsfr/src"],
        quietDeps: true,
      },
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // Le plugin exécutera des tests pour les histoires définies dans la configuration de votre Storybook.
          // Voir les options sur le site: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
