import postcss from "postcss";
import { describe, expect, it } from "vitest";
import removeFontFaces from "../../outils/postcss-remove-font-faces";

describe("Les déclarations de polices des composants", () => {
  it.each([
    "DsfrCard.svelte",
    "DsfrCard.svelte.vite-preprocess.scss",
    "DsfrCard.svelte?svelte&type=style&lang.css",
  ])("retire les polices DSFR du composant (%s)", async (from) => {
    const css = `
      @font-face {
        font-family: Marianne;
        src: url("../fonts/Marianne-Regular.woff2") format("woff2");
        font-weight: 400;
      }
      @font-face {
        font-family: Spectral;
        src: url("../fonts/Spectral-Regular.woff") format("woff");
      }
      .fr-card { font-family: Marianne, arial, sans-serif; }
    `;
    const { root } = await postcss([removeFontFaces()]).process(css, {
      from,
    });

    expect(root.nodes).toHaveLength(1);
    expect(root.first?.toString()).toBe(".fr-card { font-family: Marianne, arial, sans-serif; }");
  });

  it("retire aussi les déclarations dans les règles conditionnelles", async () => {
    const css = `
      @supports (font-tech(variations)) {
        @font-face { font-family: Marianne; src: url("../fonts/Marianne.woff2"); }
        .fr-card { color: black; }
      }
    `;
    const { css: result } = await postcss([removeFontFaces()]).process(css, {
      from: "DsfrCard.svelte.vite-preprocess.scss",
    });

    expect(result).not.toContain("@font-face");
    expect(result).toContain("@supports (font-tech(variations))");
    expect(result).toContain(".fr-card { color: black; }");
  });

  it.each(["styles.fonts.css", "fonts.scss", undefined])(
    "conserve les déclarations globales de polices (%s)",
    async (from) => {
      const css =
        '@font-face { font-family: Marianne; src: url("/assets/fonts/Marianne-Regular.woff2"); }';
      const { css: result } = await postcss([removeFontFaces()]).process(css, { from });

      expect(result).toBe(css);
    },
  );

  it("conserve les autres règles et les références aux ressources", async () => {
    const css = `
      @media (min-width: 40rem) { .fr-card { display: flex; } }
      @keyframes entree { to { opacity: 1; } }
      .icone { mask-image: url("../icons/system/download-line.svg"); }
    `;
    const { css: result } = await postcss([removeFontFaces()]).process(css, {
      from: "DsfrCard.svelte.vite-preprocess.scss",
    });

    expect(result).toBe(css);
  });
});
