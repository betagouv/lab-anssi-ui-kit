// postcss-extract-data-uri-svg.ts
import { createHash } from "crypto";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

import type { Declaration, Root } from "postcss";

const extractDataUriSvg = (assetsPath: string) => {
  const ALLOWED_CSS_PROPS = [
    "--data-uri-svg",
    "background-image",
    "mask-image",
    "-webkit-mask-image",
  ];
  const svgMap = new Map();

  return {
    postcssPlugin: "postcss-extract-data-uri-svg",

    Once(root: Root) {
      root.walkDecls((decl: Declaration) => {
        if (!ALLOWED_CSS_PROPS.includes(decl.prop)) return;

        const dataUriRegex = /url\((['"])(data:image\/svg\+xml[^)]*?)\1\)/g;
        let match;

        while ((match = dataUriRegex.exec(decl.value)) !== null) {
          const fullDataUri = match[2];

          const commaIndex = fullDataUri.indexOf(",");
          if (commaIndex === -1) continue;

          const svgContentEncoded = fullDataUri.substring(commaIndex + 1);
          const svgContent = decodeURIComponent(svgContentEncoded);
          const hash = createHash("sha256").update(svgContent).digest("hex").slice(0, 8);
          const filename = `icon-${hash}.svg`;

          svgMap.set(filename, svgContent);

          decl.value = decl.value.replaceAll(
            match[0],
            `url("${assetsPath}/icones/extract/${filename}")`,
          );
        }
      });
    },

    OnceExit() {
      if (svgMap.size === 0) return;

      const assetsDir = join(process.cwd(), "dist", "assets", "icones", "extract");
      mkdirSync(assetsDir, { recursive: true });

      svgMap.forEach((content, filename) => {
        writeFileSync(join(assetsDir, filename), content);
      });

      if (svgMap.size > 0) {
        console.log(`✓ ${svgMap.size} fichiers extraits du SCSS`);
      }
    },
  };
};

export default extractDataUriSvg;
