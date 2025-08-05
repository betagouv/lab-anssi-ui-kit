import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: { customElement: true },
  preprocess: vitePreprocess({ script: true }),
  kit: { adapter: adapter() },
};

export default config;
