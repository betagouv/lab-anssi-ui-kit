import { promises as fs } from "fs";
import * as path from "path";
import type { Plugin } from "vite";
import * as ts from "typescript";
import * as prettier from "prettier";

export default function genereJSX(): Plugin {
  let repertoireSortie = "build";
  let fichierSortie = "jsx.d.ts";
  let repertoireComposants = "src/lib";

  return {
    name: "genere-types-jsx",
    configResolved(config) {
      if (config.build.outDir) {
        repertoireSortie = config.build.outDir;
        fichierSortie = path.join(repertoireSortie, fichierSortie);
      }
      if (config.build.lib && config.build.lib.entry) {
        repertoireComposants = path.resolve(
          config.build.lib.entry.toString().replace("/index.js", ""),
        );
      }
    },
    async writeBundle() {
      console.log(`📝 Génération des types JSX dans: ${fichierSortie}`);

      try {
        const fichiers = await fs.readdir(repertoireComposants, { recursive: true });
        const fichiersSvelte = fichiers.filter((file) => file.endsWith(".svelte"));

        let typesJSX = `declare namespace JSX {\n\tinterface IntrinsicElements {\n`;

        for (const fichier of fichiersSvelte) {
          const chemin = path.join(repertoireComposants, fichier);
          const contenu = await fs.readFile(chemin, "utf-8");

          const nomComposant = contenu.match(/<svelte:options\s+customElement\s*=\s*"([^"]+)"/);
          if (!nomComposant) {
            console.warn(`⚠️ Aucun <svelte:options customElement="..."> trouvé dans ${fichier}`);
            continue;
          }
          const tag = nomComposant[1];
          typesJSX += `\t\t"${tag}": {\n`;

          const contenuFichierType = await fs.readFile(`${chemin}.d.ts`, "utf-8");

          const props = [...contenuFichierType.matchAll(/props:\s*{\n\s*([^}]*)\n\s*}/g)];
          if (props[0]) {
            const propsFormatees = props[0][1]
              .split("\n")
              .map((p) => p.replaceAll(" ", "").replaceAll(";", ""));

            for (const prop of propsFormatees) {
              typesJSX += `\t\t\t${prop}\n`;
            }
          }
          typesJSX += `\t\t};\n`;
        }
        typesJSX += `\t}\n}`;

        const typesJSXFormattes = await prettier.format(typesJSX, { parser: "typescript" });

        await fs.mkdir(path.dirname(fichierSortie), { recursive: true });
        await fs.writeFile(fichierSortie, typesJSXFormattes, "utf-8");

        const programmeTs = ts.createProgram([fichierSortie], {
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
        console.error("⚠️ Erreur lors de la génération des types JSX:", err);
        process.exit(1);
      }
    },
  };
}
