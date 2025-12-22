import { promises as fs } from "fs";
import * as path from "path";
import type { Plugin } from "vite";
import * as ts from "typescript";
import * as prettier from "prettier";
import { parse } from "svelte/compiler";
import { extraitPropsComposant } from "./extraction-props-composant";

/**
 * Extrait le contenu de la balise <script> d'un composant Svelte
 * en utilisant le parser officiel Svelte.
 *
 * Pour gérer les composants avec du SCSS (qui ne peut pas être parsé par le
 * parser CSS de Svelte), on remplace temporairement le contenu de <style>
 * par du CSS vide valide avant le parsing, puis on utilise les positions de l'AST
 * pour extraire le contenu du <script> du fichier original.
 */
function extraitScriptComposant(contenuSvelte: string): string | undefined {
  try {
    // Remplace le contenu de <style> par du CSS vide valide pour éviter les erreurs de parsing
    // On garde les balises pour préserver les positions dans l'AST
    const contenuAvecStyleVide = contenuSvelte.replace(
      /(<style[^>]*>)[\s\S]*?(<\/style>)/g,
      "$1$2",
    );

    // Parse le composant Svelte modifié
    const ast = parse(contenuAvecStyleVide);

    // Cherche le nœud <script> dans l'AST
    const instanceScript = ast.instance;
    if (instanceScript && instanceScript.content) {
      const start = instanceScript.content.start;
      const end = instanceScript.content.end;
      return contenuSvelte.substring(start, end);
    }

    return undefined;
  } catch (error) {
    // Si le parsing échoue, on retourne undefined
    console.error("Erreur lors du parsing Svelte:", error);
    return undefined;
  }
}

export default function genereJSX(): Plugin {
  let repertoireSortie = "build";
  let fichierJsx = "lab-anssi-ui-kit.jsx.d.ts";
  let fichierIndexVide = "index.vide.js";
  let repertoireComposants = "src/lib";

  return {
    name: "genere-types-jsx",
    configResolved(config) {
      if (config.build.outDir) {
        repertoireSortie = config.build.outDir;
        fichierJsx = path.join(repertoireSortie, fichierJsx);
        fichierIndexVide = path.join(repertoireSortie, fichierIndexVide);
      }
      if (config.build.lib && config.build.lib.entry) {
        repertoireComposants = path.resolve(
          config.build.lib.entry.toString().replace(/\/index\.(js|ts)$/, ""),
        );
      }
    },
    async writeBundle() {
      try {
        console.log(`📝 Génération des types JSX dans: ${fichierJsx}`);
        const fichiers = await fs.readdir(repertoireComposants, { recursive: true });
        const fichiersSvelte = fichiers.filter((file) => file.endsWith(".svelte"));

        let typesJSX = `declare namespace JSX {\n\tinterface IntrinsicElements {\n`;

        const cheminFichierExport = path.join(repertoireComposants, "index.ts");
        const contenuFichierExport = await fs.readFile(cheminFichierExport, "utf-8");
        for (const fichier of fichiersSvelte) {
          const chemin = path.join(repertoireComposants, fichier);
          const contenu = await fs.readFile(chemin, "utf-8");

          const nomFichierSvelte = chemin.match(/[^/]+\.svelte$/)?.[0];
          if (!nomFichierSvelte) continue;
          if (!contenuFichierExport.includes(nomFichierSvelte)) {
            continue;
          }

          const contenuSvelteOptions = contenu.match(/<svelte:options[\s\S]*?\/>/)?.[0];
          if (!contenuSvelteOptions)
            throw new Error(
              `Impossible d'extraire le contenu du <svelte:options ... /> pour le fichier ${nomFichierSvelte}`,
            );

          const contenuSvelteScript = extraitScriptComposant(contenu);
          if (!contenuSvelteScript)
            throw new Error(
              `Impossible d'extraire le contenu du <script> pour le fichier ${nomFichierSvelte}`,
            );

          const { nomWebComponent, props } = extraitPropsComposant(
            contenuSvelteOptions,
            contenuSvelteScript,
          );

          typesJSX += `"${nomWebComponent}": { ${props
            .map((prop: { nom: string; optionnelle: boolean }) => {
              const guillemetOptionnel = prop.nom.includes("-") ? '"' : "";
              const identifiant = `${guillemetOptionnel}${prop.nom}${guillemetOptionnel}${prop.optionnelle ? "?" : ""}`;
              return `${identifiant}: string;`;
            })
            .join("\n")} };\n`;
        }
        typesJSX += `\t}\n}`;

        const typesJSXFormattes = await prettier.format(typesJSX, { parser: "typescript" });

        await fs.mkdir(path.dirname(fichierJsx), { recursive: true });
        await fs.writeFile(fichierJsx, typesJSXFormattes, "utf-8");

        const programmeTs = ts.createProgram([fichierJsx], {
          noEmit: true,
          strict: true,
          moduleResolution: ts.ModuleResolutionKind.NodeNext,
          skipLibCheck: true,
          module: ts.ModuleKind.NodeNext,
        });
        const diagnostiques = ts.getPreEmitDiagnostics(programmeTs);

        if (diagnostiques.length > 0) {
          diagnostiques.forEach((diagnostic) => {
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.error(`❌ Erreur TypeScript: ${message}`);
            process.exit(1);
          });
        } else {
          console.log(`\n✓ Fichier JSX généré`);
        }
      } catch (err) {
        console.error("⚠️ Erreur lors de la génération des types JSX :", err);
        process.exit(1);
      }

      try {
        console.log(`📝 Génération du fichier index.js vide : ${fichierIndexVide}`);
        await fs.mkdir(path.dirname(fichierIndexVide), { recursive: true });
        await fs.writeFile(fichierIndexVide, "function noOp() { }", "utf-8");
      } catch (err) {
        console.error("⚠️ Erreur lors de la génération de l'index vide :", err);
        process.exit(1);
      }
    },
  };
}
