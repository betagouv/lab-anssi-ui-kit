import { sveltekit } from "@sveltejs/kit/vite";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

// On ne build jamais pour le local : allons chercher en dur les variables de PROD.
const varEnvDeProduction = loadEnv("production", process.cwd(), "VITE_");

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    environment: "jsdom",
  },
  resolve: process.env.VITEST ? { conditions: ["browser"] } : undefined,
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'src/variables.scss' as *; 
          @use 'src/responsive.scss' as *; 
          @use 'src/assets.scss' as *;
          $assets-url-base: '${varEnvDeProduction.VITE_LAB_ANSSI_UI_KIT_ASSET_BASE}'; 
        `,
      },
    },
  },
});
