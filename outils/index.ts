import { loadEnv } from "vite";

export { default as extractDataUriSvg } from "./postcss-extract-data-uri-svg.ts";
export { default as replaceIconPaths } from "./postcss-replace-icon-paths.ts";
export { default as genereJSX } from "./vite-plugin-genere-jsx.ts";
export { default as injecteNonce } from "./vite-plugin-injecte-nonce.ts";
export { default as viteScssPreprocessorOptions } from "./vite-preprocessor-options.ts";

// Variables d'environnement chargées selon le contexte d'exécution.
// Charge le bon environnement pour faire fonctionner la fonction SCSS `url-asset()`
// - Build webcomponent : "production"
// - Storybook local : "development"
// - Storybook déployé : "production"
export const varEnv = loadEnv(process.env.STORYBOOK_ENV ?? "production", process.cwd(), "VITE_");
export const assetsPath = varEnv.VITE_LAB_ANSSI_UI_KIT_ASSET_BASE;
