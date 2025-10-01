import { customElementJsxPlugin } from "custom-element-jsx-integration";
import { customElementSveltePlugin } from "custom-element-svelte-integration";
import sveltePlugin from "./outils/cem-plugin-svelte5/index.js";

const options = {
  outdir: "dist/webcomponents",
};

export default {
  // dev: true,
  fast: true,
  litelement: true,
  stencil: true,
  globs: ["src/lib/**/*.svelte"],
  plugins: [
    sveltePlugin(),
    customElementJsxPlugin({ ...options, fileName: "lab-anssi-ui-kit.jsx.d.ts" }),
    customElementSveltePlugin({ ...options, fileName: "lab-anssi-ui-kit.svelte.d.ts" }),
  ],
};
