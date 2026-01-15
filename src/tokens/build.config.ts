import StyleDictionary from "style-dictionary";
import type {
  Dictionary,
  FormatFnArguments,
  OutputReferences,
  PlatformConfig,
  TransformedToken,
  TransformedTokens,
} from "style-dictionary/types";
import { fileHeader, usesReferences, getReferences } from "style-dictionary/utils";
import { readdirSync, readFileSync, writeFileSync, appendFileSync, mkdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const REPERTOIRE_SOURCE = join(__dirname, "source");
const REPERTOIRE_THEMES = join(REPERTOIRE_SOURCE, "themes");
const REPERTOIRE_SORTIE = join(__dirname, "build");
const REPERTOIRE_STORYBOOK = join(__dirname, "..", "..", ".storybook");
const FICHIER_TOUS_THEMES = join(REPERTOIRE_STORYBOOK, "lab-anssi-themes.css");

/**
 * Génère les variables CSS pour une liste de tokens
 * Préserve uniquement les références internes au thème (pas les primitives)
 */
function transformeLesVariables(
  tokens: TransformedToken[],
  allTokens: TransformedTokens,
  outputReferences: OutputReferences | undefined,
): string[] {
  return tokens.map((token: TransformedToken) => {
    let valeurDuToken = token.$value as string;
    const valeurOriginale = token.original?.$value as string | undefined;

    if (outputReferences && valeurOriginale && usesReferences(valeurOriginale)) {
      try {
        const references = getReferences(valeurOriginale, allTokens);

        references.forEach((reference: TransformedToken) => {
          const valeurReference = reference.$value as string;
          const nomReference = reference.name || reference.path.join("-");

          if (
            valeurReference &&
            valeurDuToken.includes(valeurReference) &&
            !reference.filePath.includes("primitives.json")
          ) {
            valeurDuToken = valeurDuToken.replace(valeurReference, `var(--${nomReference})`);
          }
        });
      } catch {
        // Si la référence n'est pas trouvée, garder la valeurDuToken résolue
      }
    }

    return `  --${token.name}: ${valeurDuToken};`;
  });
}

/**
 * Format CSS avec sélecteur :root (pour consommateurs finaux)
 */
StyleDictionary.registerFormat({
  name: "css/theme-root",
  format: async ({ dictionary, options, file }: FormatFnArguments) => {
    const entete = await fileHeader({ file });
    const tousLesTokens: TransformedTokens = dictionary.unfilteredTokens ?? dictionary.tokens;
    const variables = transformeLesVariables(
      dictionary.allTokens,
      tousLesTokens,
      options.outputReferences,
    );
    return `${entete}:root {\n${variables.join("\n")}\n}\n`;
  },
});

/**
 * Action qui s'exécute après la génération des fichiers
 * Lit le fichier généré, remplace :root par .theme-{nom}, et l'ajoute au fichier contenant l'ensemble des thèmes
 */
StyleDictionary.registerAction({
  name: "concateneTousLesThemes",
  do: (_dictionary: Dictionary, config: PlatformConfig) => {
    const nomTheme = config.options?.themeName as string | undefined;
    if (!nomTheme) return;

    const fichierTheme = join(config.buildPath ?? "", `lab-anssi-theme.${nomTheme}.css`);
    const contenu = readFileSync(fichierTheme, "utf-8") + "\n";

    // Remplacer :root par .theme-{nom} et retirer le header
    const contenuTheme = contenu
      .replace(/\/\*\*[\s\S]*?\*\/\s*/, "") // Retirer le header
      .replace(":root {", `.theme-${nomTheme} {`);

    appendFileSync(FICHIER_TOUS_THEMES, contenuTheme);
  },
  undo: () => {},
});

/**
 * Génère les fichiers CSS pour tous les thèmes
 */
async function construisTousLesThemes() {
  const cheminPrimitives = join(REPERTOIRE_SOURCE, "primitives.json");
  const fichiersThemes = readdirSync(REPERTOIRE_THEMES).filter((f) => f.endsWith(".json"));

  console.log("🎨 Génération des tokens CSS avec Style Dictionary...\n");

  // Créer le dossier de sortie s'il n'existe pas
  mkdirSync(REPERTOIRE_SORTIE, { recursive: true });

  // Initialiser le fichier Storybook avec le header
  const enteteTousThemes = `/**
 * Ne modifiez pas directement ce fichier, il a été généré automatiquement.
 * Fichier combiné pour Storybook (switch de thèmes via classes)
 */

`;

  writeFileSync(FICHIER_TOUS_THEMES, enteteTousThemes);

  for (const fichierTheme of fichiersThemes) {
    const cheminTheme = join(REPERTOIRE_THEMES, fichierTheme);
    const nomTheme = basename(fichierTheme, ".json");

    const sd = new StyleDictionary({
      source: [cheminPrimitives, cheminTheme],
      usesDtcg: true,
      platforms: {
        css: {
          transformGroup: "css",
          buildPath: `${REPERTOIRE_SORTIE}/`,
          options: { themeName: nomTheme },
          actions: ["concateneTousLesThemes"],
          files: [
            {
              destination: `lab-anssi-theme.${nomTheme}.css`,
              format: "css/theme-root",
              options: { outputReferences: true },
              filter: (token: TransformedToken) => !token.filePath.includes("primitives.json"),
            },
          ],
        },
      },
      log: { verbosity: "silent" },
    });

    await sd.buildAllPlatforms();
    console.log(`✓ ${nomTheme}: lab-anssi-theme.${nomTheme}.css`);
  }

  console.log(`✓ Storybook: lab-anssi-themes.css`);
  console.log("\n✅ Génération terminée !");
}

construisTousLesThemes().catch(console.error);
