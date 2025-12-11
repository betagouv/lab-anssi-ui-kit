import fs from "fs";
import postcss from "postcss";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { extractDataUriSvg } from "../../outils";

vi.mock("fs");

describe("Plugin PostCSS permettant d'extraire des SVG encodés en data-uri", () => {
  const assetsPath = "/assets";
  const POSTCSS_DEFAULT_OPTIONS = { from: undefined };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("transforme une data-uri SVG simple en un fichier SVG", async () => {
    const expectedSvgContent =
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M10 15.17l9.2-9.2 1.4 1.42L10 18l-6.36-6.36 1.4-1.42z'/></svg>";
    const inputCSS = `
      .simple-data-uri {
        background-color: graytext;
        background-image: url("data:image/svg+xml;charset=utf-8,${expectedSvgContent}");
      }
    `;

    const result = await postcss([extractDataUriSvg(assetsPath)]).process(
      inputCSS,
      POSTCSS_DEFAULT_OPTIONS,
    );

    // Vérifie que le CSS contient le nouveau chemin
    expect(result.css).toContain(`background-image: url("${assetsPath}/icones/extract/icon-`);
    expect(result.css).toMatch(/icon-[a-f0-9]{8}\.svg/);

    // Vérifie que le répertoire a été créé avec les bonnes options
    expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
    expect(fs.mkdirSync).toHaveBeenCalledWith(
      expect.stringContaining("dist/assets/icones/extract"),
      { recursive: true },
    );

    // Vérifie qu'un seul fichier SVG a été écrit avec le bon contenu
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
    expect(writeCall[0]).toMatch(/icon-[a-f0-9]{8}\.svg$/);
    expect(writeCall[1]).toBe(expectedSvgContent);
  });

  it("transforme plusieurs data-uri SVG dans la même propriété", async () => {
    const inputCSS = `
      .complex-data-uri {
        mask-image: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='4px' height='4px' viewBox='0 0 4 4'><circle fill='%23fff' r='2' cx='2' cy='2' /></svg>"),
          url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='4px' height='4px' viewBox='0 0 4 4'><circle fill='%23fff' r='2' cx='2' cy='2' /></svg>");
      }
    `;

    const result = await postcss([extractDataUriSvg(assetsPath)]).process(
      inputCSS,
      POSTCSS_DEFAULT_OPTIONS,
    );

    expect(result.css).toContain(`url("${assetsPath}/icones/extract/icon-`);
    const urlMatches = result.css.match(
      /url\("\/assets\/icones\/extract\/icon-[a-f0-9]{8}\.svg"\)/g,
    );
    expect(urlMatches).toHaveLength(2);
    expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  });

  it("transforme les data-uri SVG sans charset spécifié", async () => {
    const inputCSS = `
      .no-charset {
        background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><circle r='5'/></svg>");
      }
    `;

    const result = await postcss([extractDataUriSvg(assetsPath)]).process(
      inputCSS,
      POSTCSS_DEFAULT_OPTIONS,
    );

    expect(result.css).toContain(`url("${assetsPath}/icones/extract/icon-`);
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  });

  it("ne transforme pas le CSS sans data-uri", async () => {
    const inputCSS = `
      .sans-data-uri {
        color: currentColor;
        background-color: darkorange;
        font-size: 1rem;
      }
    `;

    const result = await postcss([extractDataUriSvg(assetsPath)]).process(
      inputCSS,
      POSTCSS_DEFAULT_OPTIONS,
    );

    expect(result.css).toBe(inputCSS);
    expect(fs.mkdirSync).not.toHaveBeenCalled();
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  it("ne transforme pas les data-uri non SVG", async () => {
    const inputCSS = `
      .data-uri-png {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA");
      }
    `;

    const result = await postcss([extractDataUriSvg(assetsPath)]).process(
      inputCSS,
      POSTCSS_DEFAULT_OPTIONS,
    );

    expect(result.css).toBe(inputCSS);
    expect(fs.mkdirSync).not.toHaveBeenCalled();
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
