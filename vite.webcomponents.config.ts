import { svelte } from "@sveltejs/vite-plugin-svelte";
import cssnano from "cssnano";
import path, { resolve } from "path";
import root2host from "postcss-root-to-host";
import { defineConfig, loadEnv } from "vite";
import { injecteNonce, replaceIconPaths } from "./outils";

// Charge le bon environnement pour faire fonctionner la méthode SCSS `url-asset`
// - Build webcomponent : "production"
// - Storybook local : "development"
// - Storybook déployé : "production"
const varEnv = loadEnv(process.env.STORYBOOK_ENV ?? "production", process.cwd(), "VITE_");

// Ce fichier permet de build la librairie en mode "WebComponents"
// En suivant cette issue : https://github.com/sveltejs/kit/issues/10320

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      name: "WebComponents",
      fileName: "lab-anssi-ui-kit",
      formats: ["iife"],
    },
    outDir: "dist/webcomponents",
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      $lib: path.resolve(__dirname, "src/lib"),
    },
  },
  css: {
    postcss: {
      plugins: [
        replaceIconPaths({ assetsPath: varEnv.VITE_LAB_ANSSI_UI_KIT_ASSET_BASE }),
        root2host,
        cssnano({
          preset: [
            "default",
            {
              discardEmpty: true,
              discardComments: {
                removeAll: true,
              },
            },
          ],
        }),
      ],
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
  plugins: [svelte({ emitCss: false }), injecteNonce()],
});
