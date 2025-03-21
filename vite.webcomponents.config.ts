import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import { resolve } from "path";
import genereJSX from "./outils/vite-plugin-genere-jsx.js";

// Ce fichier permet de build la librairie en mode "WebComponents"
// En suivant cette issue : https://github.com/sveltejs/kit/issues/10320

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "dist/index.js"),
      name: "WebComponents",
      fileName: "index",
      formats: ["iife"],
    },
    outDir: "dist/webcomponents",
  },
  plugins: [svelte(), genereJSX()],
});
