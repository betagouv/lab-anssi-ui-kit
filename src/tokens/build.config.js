import StyleDictionary from "style-dictionary";
import { fileHeader, usesReferences, getReferences } from "style-dictionary/utils";
import { readdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR = join(__dirname, "source");
const THEMES_DIR = join(SOURCE_DIR, "themes");
const OUTPUT_DIR = join(__dirname, "build");

/**
 * Format CSS personnalisé avec sélecteur :root
 * Préserve uniquement les références internes au thème (pas les primitives)
 */
StyleDictionary.registerFormat({
  name: "css/theme-variables",
  format: async ({ dictionary, options, file }) => {
    const { outputReferences } = options;
    const header = await fileHeader({ file });

    // Utiliser unfilteredTokens pour résoudre les références vers les primitives
    const allTokens = dictionary.unfilteredTokens || dictionary.tokens;

    const variables = dictionary.allTokens.map((token) => {
      let value = token.$value;
      const originalValue = token.original?.$value;

      // Si outputReferences est activé et que le token original a des références
      if (outputReferences && originalValue && usesReferences(originalValue)) {
        try {
          const refs = getReferences(originalValue, allTokens);
          refs.forEach((ref) => {
            const refValue = ref.$value;
            const refName = ref.name || ref.path.join("-");

            // Ne remplacer par var() que si la référence est dans le même fichier (thème)
            // Les références vers les primitives restent résolues en valeurs finales
            if (refValue && value.includes(refValue) && !ref.filePath.includes("primitives.json")) {
              value = value.replace(refValue, `var(--${refName})`);
            }
          });
        } catch {
          // Si la référence n'est pas trouvée, garder la valeur résolue
        }
      }

      return `  --${token.name}: ${value};`;
    });

    return `${header}:root {\n${variables.join("\n")}\n}\n`;
  },
});

/**
 * Génère la configuration pour chaque thème
 */
async function buildAllThemes() {
  const themeFiles = readdirSync(THEMES_DIR).filter((f) => f.endsWith(".json"));

  console.log("🎨 Génération des tokens CSS avec Style Dictionary...\n");

  for (const themeFile of themeFiles) {
    const primitivesPath = join(SOURCE_DIR, "primitives.json");
    const themePath = join(THEMES_DIR, themeFile);
    const themeName = basename(themeFile, ".json");

    const sd = new StyleDictionary({
      source: [primitivesPath, themePath],
      usesDtcg: true,
      platforms: {
        css: {
          transformGroup: "css",
          buildPath: `${OUTPUT_DIR}/`,
          files: [
            {
              destination: `lab-anssi-theme.${themeName}.css`,
              format: "css/theme-variables",
              options: {
                outputReferences: true,
              },
              filter: (token) => {
                // Exclure les primitives, ne garder que les tokens sémantiques du thème
                return !token.filePath.includes("primitives.json");
              },
            },
          ],
        },
      },
      log: {
        verbosity: "silent",
      },
    });

    await sd.buildAllPlatforms();
    console.log(`✓ ${themeName}: lab-anssi-theme.${themeName}.css`);
  }

  console.log("\n✅ Génération terminée !");
}

buildAllThemes().catch(console.error);
