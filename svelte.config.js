import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const config = {
  compilerOptions: { customElement: true },
  preprocess: vitePreprocess({ script: true }),
};

export default config;
