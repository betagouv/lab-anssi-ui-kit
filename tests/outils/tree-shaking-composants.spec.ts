import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { afterEach, expect, test } from "vitest";
import { build, type Rollup } from "vite";

let dossierTemporaire: string | undefined;

afterEach(async () => {
  if (dossierTemporaire) await rm(dossierTemporaire, { recursive: true, force: true });
});

test("retire du bundle les composants Svelte inutilisés", async () => {
  dossierTemporaire = await mkdtemp(join(tmpdir(), "lab-anssi-tree-shaking-"));
  const dossierPaquet = join(dossierTemporaire, "node_modules", "paquet-test");
  await mkdir(dossierPaquet, { recursive: true });

  const { sideEffects } = JSON.parse(await readFile("package.json", "utf8"));
  expect(sideEffects).not.toContain("**/*.svelte");

  await writeFile(
    join(dossierPaquet, "package.json"),
    JSON.stringify({
      name: "paquet-test",
      type: "module",
      sideEffects,
      exports: { ".": { svelte: "./index.js", import: "./index.js" } },
    }),
  );
  await writeFile(
    join(dossierPaquet, "index.js"),
    [
      'export { default as ComposantUtilise } from "./ComposantUtilise.svelte";',
      'export { default as ComposantInutilise } from "./ComposantInutilise.svelte";',
    ].join("\n"),
  );
  await writeFile(
    join(dossierPaquet, "ComposantUtilise.svelte"),
    "<p>marqueur-composant-utilise</p>",
  );
  await writeFile(
    join(dossierPaquet, "ComposantInutilise.svelte"),
    '<script module>globalThis.marqueurComposantInutilise = "present";</script>',
  );
  const entrée = join(dossierTemporaire, "index.js");
  await writeFile(
    entrée,
    'import { ComposantUtilise } from "paquet-test"; globalThis.composantUtilise = ComposantUtilise;',
  );

  const résultat = await build({
    configFile: false,
    root: dossierTemporaire,
    logLevel: "silent",
    plugins: [svelte()],
    build: {
      write: false,
      lib: { entry: entrée, formats: ["es"] },
      rollupOptions: { external: [/^svelte(?:\/|$)/] },
    },
  });
  const résultats = (Array.isArray(résultat) ? résultat : [résultat]) as Rollup.RollupOutput[];
  const sorties = résultats.flatMap((sortie) => sortie.output);
  const code = sorties
    .filter((sortie): sortie is Rollup.OutputChunk => sortie.type === "chunk")
    .map((sortie) => sortie.code)
    .join("\n");

  expect(code).toContain("marqueur-composant-utilise");
  expect(code).not.toContain("marqueurComposantInutilise");
});
