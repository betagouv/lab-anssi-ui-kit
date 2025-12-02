// postcss-svg-extract.js
import { createHash } from "crypto";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

import type { Declaration, Root } from "postcss";

const extractDataUriSvg = (assetsPath: string) => {
  const ALLOWED_PROPS = ["--data-uri-svg", "background-image", "mask-image", "-webkit-mask-image"];
  const svgMap = new Map();

  return {
    postcssPlugin: "postcss-extract-data-uri-svg",

    Once(root: Root) {
      root.walkDecls((decl: Declaration) => {
        if (!ALLOWED_PROPS.includes(decl.prop)) return;

        const dataUriRegex = /url\("(data:image\/svg\+xml[^"]+)"\)/g;
        let match;

        while ((match = dataUriRegex.exec(decl.value)) !== null) {
          const svgContent = decodeURIComponent(match[1]);
          const hash = createHash("md5").update(svgContent).digest("hex").slice(0, 8);
          const filename = `icon-${hash}.svg`;

          svgMap.set(filename, svgContent);

          decl.value = decl.value.replace(
            match[0],
            `url("${assetsPath}/icones/extract/${filename}")`,
          );
        }
      });
    },

    OnceExit() {
      const assetsDir = join(process.cwd(), "dist", "assets", "icones", "extract");
      mkdirSync(assetsDir, { recursive: true });

      svgMap.forEach((content, filename) => {
        writeFileSync(join(assetsDir, filename), content);
      });

      if (svgMap.size > 0) {
        console.log(`✓ Extracted ${svgMap.size} SVG file(s) from SCSS`);
      }
    },
  };
};

export default extractDataUriSvg;
