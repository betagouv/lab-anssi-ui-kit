import type { Plugin } from "vite";

export default function injecteNonce(): Plugin {
  return {
    name: "injecte-nonce",
    enforce: "post",
    generateBundle(_options, bundle) {
      console.log("📝 Ajout de la gestion du Nonce");

      for (const file of Object.values(bundle)) {
        if (file.type === "chunk" && file.code) {
          file.code = `const nonce = document.currentScript?.nonce;\n${file.code}`;
          // Remplace `const a = u("style");`
          // par `const a = u("style");a.nonce=nonce;`
          file.code = file.code.replace(
            /const (.)\s*=\s*.\("style"\);/gm,
            (match, nomVariable) => `${match}${nomVariable}.nonce=nonce;`,
          );
        }
      }

      console.log("✅");
    },
  };
}
