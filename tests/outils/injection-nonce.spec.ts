import { expect, it, describe } from "vitest";
import { injecteNonceWebcomponents } from "../../outils/injection-nonce.js";

const codeWebcomponents = `
var WebComponents = function() {
  function p(n) {
    return document.createElement(n);
  }
  function a() {
    const x = p("style");
  }
  function b() {
    const y = p("style");
  }
}({});
`;

describe("L'utilitaire d'injection du nonce (pour les styles des composants Svelte)", () => {
  it("insère la récupération du nonce au début du fichier", () => {
    const codeAvecNonce = injecteNonceWebcomponents(codeWebcomponents);

    expect(codeAvecNonce.startsWith("const nonce = document.currentScript?.nonce;\n")).toBe(true);
  });

  it("affecte le nonce a toutes les balises de styles injectées", () => {
    const codeAvecNonce = injecteNonceWebcomponents(codeWebcomponents);

    expect(codeAvecNonce).toContain(' const x = p("style");x.nonce=nonce;');
    expect(codeAvecNonce).toContain(' const y = p("style");y.nonce=nonce;');
  });
});
