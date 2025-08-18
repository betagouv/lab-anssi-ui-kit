/// <reference types="vitest/config" />
import { sveltekit } from "@sveltejs/kit/vite";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";
import dotenv from "dotenv";
import path, { resolve } from "path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Charge le bon environnement pour faire fonctionner la méthode SCSS `url-asset`
// - Build webcomponent : "production"
// - Storybook local : "development"
// - Storybook déployé : "production"
const varEnv = loadEnv(process.env.STORYBOOK_ENV ?? "production", process.cwd(), "VITE_");

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
  plugins: [sveltekit()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'src/variables.scss' as *;
          @use 'src/responsive.scss' as *;
          @use 'src/assets.scss' as *;
          $assets-url-base: '${varEnv.VITE_LAB_ANSSI_UI_KIT_ASSET_BASE}';
        `,
        loadPaths: ["node_modules/@gouvfr/dsfr", "node_modules/@gouvfr/dsfr/src"],
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
