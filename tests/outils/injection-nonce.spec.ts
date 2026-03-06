import { expect, it, describe } from "vitest";
import { injecteNonceWebcomponents } from "../../outils/injection-nonce.js";

const codeWebcomponents = `
var WebComponents = function() {
  function createElement(n) {
    return document.createElement(n);
  }
  function a() {
    const x = createElement("style");
  }
  function b() {
    const styleEl = Dr("style");
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

    expect(codeAvecNonce).toContain(' const x = createElement("style");x.nonce=nonce;');
    expect(codeAvecNonce).toContain(' const styleEl = Dr("style");styleEl.nonce=nonce;');
  });
});
