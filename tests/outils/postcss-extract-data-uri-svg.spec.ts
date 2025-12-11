import fs from "fs";
import postcss from "postcss";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import extractDataUriSvg from "../../outils/postcss-extract-data-uri-svg";

vi.mock("fs");

describe("Plugin PostCSS permettant d'extraire des SVG encodés en data-uri dans le CSS", () => {
  const assetsPath = "/assets";

  it("transforme une data-uri SVG simple en un fichier SVG", async () => {
    const inputCSS = `
      .simple-data-uri {
        background-color: graytext;
        background-image: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M10 15.17l9.2-9.2 1.4 1.42L10 18l-6.36-6.36 1.4-1.42z'/></svg>");
      }
    `;

    const result = await postcss([extractDataUriSvg(assetsPath)]).process(inputCSS, {
      from: undefined,
    });

    expect(result.css).toContain(`background-image: url("${assetsPath}/icones/extract/icon-`);
    expect(fs.mkdirSync).toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it("transforme plusieurs data-uri SVG dans la même propriété", async () => {
    const inputCSS = `
      .complex-data-uri {
        mask-image:
          linear-gradient(0deg, #fff 0, #fff 100%), linear-gradient(0deg, #fff 0, #fff 100%),
          url("data:image/svg+xml;charset=uft8,<svg xmlns='http://www.w3.org/2000/svg' width='4px' height='4px' viewBox='0 0 4 4'><circle fill='%23fff' r='2' cx='2' cy='2' /></svg>"),
          url("data:image/svg+xml;charset=uft8,<svg xmlns='http://www.w3.org/2000/svg' width='4px' height='4px' viewBox='0 0 4 4'><circle fill='%23fff' r='2' cx='2' cy='2' /></svg>"),
          url("data:image/svg+xml;charset=uft8,<svg xmlns='http://www.w3.org/2000/svg' width='4px' height='4px' viewBox='0 0 4 4'><circle fill='%23fff' r='2' cx='2' cy='2' /></svg>"),
          url("data:image/svg+xml;charset=uft8,<svg xmlns='http://www.w3.org/2000/svg' width='4px' height='4px' viewBox='0 0 4 4'><circle fill='%23fff' r='2' cx='2' cy='2' /></svg>");
        mask-size:
          calc(100% - 0.5rem) calc(100% - 0.75rem),
          calc(100% - 0.75rem) calc(100% - 0.5rem),
          0.25rem 0.25rem,
          0.25rem 0.25rem,
          0.25rem 0.25rem,
          0.25rem 0.25rem;
        mask-position:
          0.25rem 0.375rem,
          0.375rem 0.25rem,
          0.25rem 0.25rem,
          calc(100% - 0.25rem) 0.25rem,
          0.25rem calc(100% - 0.25rem),
          calc(100% - 0.25rem) calc(100% - 0.25rem);
        mask-repeat: no-repeat;
      }
    `;

    const result = await postcss([extractDataUriSvg(assetsPath)]).process(inputCSS, {
      from: undefined,
    });

    expect(result.css).toContain(`url("${assetsPath}/icones/extract/icon-`);
    expect(fs.mkdirSync).toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalledTimes(4);
  });

  it("ne doit pas transformer le CSS sans data-uri", async () => {
    const inputCSS = `
      .sans-data-uri {
        color: currentColor;
        background-color: darkorange;
        font-size: 1rem;
      }
    `;

    const result = await postcss([extractDataUriSvg(assetsPath)]).process(inputCSS, {
      from: undefined,
    });

    expect(result.css).toBe(inputCSS);
    expect(fs.mkdirSync).not.toHaveBeenCalled();
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  it("ne doit pas transformer les data-uri non SVG", async () => {
    const inputCSS = `
      .data-uri-png {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA");
      }
    `;

    const result = await postcss([extractDataUriSvg(assetsPath)]).process(inputCSS, {
      from: undefined,
    });

    expect(result.css).toBe(inputCSS);
    expect(fs.mkdirSync).not.toHaveBeenCalled();
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
