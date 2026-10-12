#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import * as sass from "sass";
import postcss from "postcss";
import replaceIconPaths from "../outils/postcss-replace-icon-paths.ts";

const ASSETS_URL = "https://lab-anssi-ui-kit-prod-s3-assets.cellar-c2.services.clever-cloud.com";

const sassResult = sass.compile("src/lib/styles/dsfr-icons.scss", {
  loadPaths: ["node_modules", "node_modules/@gouvfr/dsfr", "node_modules/@gouvfr/dsfr/src"],
  style: "compressed",
  silenceDeprecations: ["import"],
});

const postcssResult = await postcss([replaceIconPaths({ assetsPath: ASSETS_URL })]).process(
  sassResult.css,
  { from: undefined },
);

const css = postcssResult.css;

mkdirSync("dist/assets", { recursive: true });
writeFileSync("dist/assets/dsfr-icons.css", css);
console.log("✓ dist/assets/dsfr-icons.css");

mkdirSync("dist/styles", { recursive: true });
writeFileSync("dist/styles/dsfr-icons.css", css);
console.log("✓ dist/styles/dsfr-icons.css");

const iconsStylesheetPath = "dist/utilitaires/icons-stylesheet.js";
const iconsStylesheet = readFileSync(iconsStylesheetPath, "utf-8");
writeFileSync(
  iconsStylesheetPath,
  iconsStylesheet.replace("dsfr-icons.scss?inline", "dsfr-icons.css?inline"),
);
console.log("✓ dist/utilitaires/icons-stylesheet.js (import .scss → .css)");
