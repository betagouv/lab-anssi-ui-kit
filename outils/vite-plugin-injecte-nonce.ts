import type { Plugin } from "vite";
import { injecteNonceWebcomponents } from "./injection-nonce.ts";

export default function injecteNonce(): Plugin {
  return {
    name: "injecte-nonce",
    enforce: "post",
    generateBundle(_options, bundle) {
      console.log("📝 Ajout de la gestion du Nonce");

      for (const file of Object.values(bundle)) {
        if (file.type === "chunk" && file.code) {
          // Remplace `const a = u("style");`
          // par `const a = u("style");a.nonce=nonce;`
          file.code = injecteNonceWebcomponents(file.code);
        }
      }

      console.log("✅");
    },
  };
}
