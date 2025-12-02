import { svelte } from "@sveltejs/vite-plugin-svelte";
import cssnano from "cssnano";
import path from "path";
import root2host from "postcss-root-to-host";
import { defineConfig } from "vite";
import {
  assetsPath,
  extractDataUriSvg,
  injecteNonce,
  replaceIconPaths,
  varEnv,
  viteScssPreprocessorOptions,
} from "./outils";

// Ce fichier permet de build la librairie en mode "WebComponents"
// En suivant cette issue : https://github.com/sveltejs/kit/issues/10320

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.ts"),
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
        extractDataUriSvg(assetsPath),
        replaceIconPaths({ assetsPath }),
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
      scss: viteScssPreprocessorOptions(varEnv),
    },
  },
  plugins: [svelte({ emitCss: false }), injecteNonce()],
});
