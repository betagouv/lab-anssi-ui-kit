import type { Plugin } from "postcss";

const removeFontFaces = (): Plugin => ({
  postcssPlugin: "remove-font-faces",
  AtRule: {
    "font-face": (rule, { result }) => {
      if (/\.svelte(?:[.?]|$)/.test(result.opts.from ?? "")) {
        rule.remove();
      }
    },
  },
});

export default removeFontFaces;
