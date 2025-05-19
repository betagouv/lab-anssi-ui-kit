import { sveltekit } from "@sveltejs/kit/vite";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";
import dotenv from 'dotenv';
import { resolve } from 'path'

// Charge le bon environnement pour faire fonctionner la méthode SCSS `url-asset`
// - Build webcomponent : "production"
// - Storybook local : "development"
// - Storybook déployé : "production"
const varEnv = loadEnv(process.env.HISTOIRE_ENV ?? "production", process.cwd(), "VITE_");

// On charge manuellement les valeurs d'environnement de la production, car pour une raison qu'on ignore
// c'est la seule façon de charger Histoire avec nos valeurs
// Cela permet de faire fonctionner la méthode JS `srcAsset` dans le cas du Storybook déployé
if(process.env.HISTOIRE_ENV === 'production')
  dotenv.config({ path: resolve(process.cwd(), '.env.production') })

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
          $assets-url-base: '${varEnv.VITE_LAB_ANSSI_UI_KIT_ASSET_BASE}'; 
        `,
      },
    },
  },
});
