import postcss from "postcss";
import { describe, expect, it } from "vitest";
import replaceIconPaths from "../../outils/postcss-replace-icon-paths";

describe("Plugin PostCSS permettant de remplacer les chemins d'icônes relatifs", () => {
  const assetsPath = "/assets";

  it("remplace les chemins d'icônes dans mask-image", async () => {
    const inputCSS = `
      .icon-class {
        mask-image: url("../icons/system/fr--close-line.svg");
      }
    `;

    const result = await postcss([replaceIconPaths({ assetsPath })]).process(inputCSS, {
      from: undefined,
    });

    expect(result.css).toContain(
      `mask-image: url("${assetsPath}/icones/dsfr/system/fr--close-line.svg")`,
    );
  });

  it("remplace plusieurs URLs d'icônes dans la même déclaration", async () => {
    const inputCSS = `
      .icon-class {
        mask-image: url("../icons/system/fr--close-line.svg"), url("../../icons/business/fr--bank-line.svg");
      }
    `;

    const result = await postcss([replaceIconPaths({ assetsPath })]).process(inputCSS, {
      from: undefined,
    });

    expect(result.css).toContain(`url("${assetsPath}/icones/dsfr/system/fr--close-line.svg")`);
    expect(result.css).toContain(`url("${assetsPath}/icones/dsfr/business/fr--bank-line.svg")`);
  });

  it("ne transforme pas les propriétés qui ne sont pas mask-image", async () => {
    const inputCSS = `
      .non-mask {
        background-image: url("../icons/system/fr--close-line.svg");
        background-color: blue;
      }
    `;

    const result = await postcss([replaceIconPaths({ assetsPath })]).process(inputCSS, {
      from: undefined,
    });

    expect(result.css).toBe(inputCSS);
  });

  it("ne transforme pas mask-image si le chemin ne contient pas 'icons/'", async () => {
    const inputCSS = `
      .non-icon {
        mask-image: url("../images/pattern.svg");
      }
    `;

    const result = await postcss([replaceIconPaths({ assetsPath })]).process(inputCSS, {
      from: undefined,
    });

    expect(result.css).toBe(inputCSS);
  });

  it("ne transforme pas le CSS sans propriété mask-image", async () => {
    const inputCSS = `
      .no-mask {
        color: currentColor;
        background-color: darkorange;
        font-size: 1rem;
      }
    `;

    const result = await postcss([replaceIconPaths({ assetsPath })]).process(inputCSS, {
      from: undefined,
    });

    expect(result.css).toBe(inputCSS);
  });
});
