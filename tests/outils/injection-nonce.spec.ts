import { expect, it, describe } from "vitest";
import { injecteNonceWebcomponents } from "../../outils/injection-nonce.js";

const codeFormatVite7 = `
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

const codeFormatVite8 = `
var WebComponents = (function(e) {
  Object.defineProperty(e, Symbol.toStringTag, {value: \`Module\`});
  function a() {
    let x = Sn(\`style\`);
  }
  function b() {
    var styleEl = Dr(\`style\`);
  }
}({}));
`;

const codeAvecCreateElement = `
var WebComponents = function() {
  function a() {
    let el = document.createElement(\`style\`);
  }
}({});
`;

describe("L'utilitaire d'injection du nonce (pour les styles des composants Svelte)", () => {
  it("insère la récupération du nonce au début du fichier", () => {
    const codeAvecNonce = injecteNonceWebcomponents(codeFormatVite7);

    expect(codeAvecNonce.startsWith("const nonce = document.currentScript?.nonce;\n")).toBe(true);
  });

  describe("affecte le nonce à toutes les balises de styles injectées", () => {
    it("avec le format Vite 7 (const + guillemets doubles)", () => {
      const codeAvecNonce = injecteNonceWebcomponents(codeFormatVite7);

      expect(codeAvecNonce).toContain(' const x = createElement("style");x.nonce=nonce;');
      expect(codeAvecNonce).toContain(' const styleEl = Dr("style");styleEl.nonce=nonce;');
    });

    it("avec le format Vite 8 (let/var + backticks)", () => {
      const codeAvecNonce = injecteNonceWebcomponents(codeFormatVite8);

      expect(codeAvecNonce).toContain("let x = Sn(`style`);x.nonce=nonce;");
      expect(codeAvecNonce).toContain("var styleEl = Dr(`style`);styleEl.nonce=nonce;");
    });

    it("avec document.createElement et backticks", () => {
      const codeAvecNonce = injecteNonceWebcomponents(codeAvecCreateElement);

      expect(codeAvecNonce).toContain("let el = document.createElement(`style`);el.nonce=nonce;");
    });
  });

  it("lève une erreur si aucun pattern de création de <style> n'est trouvé", () => {
    const codeSansStyle = `var WebComponents = function() { console.log("hello"); }({});`;

    expect(() => injecteNonceWebcomponents(codeSansStyle)).toThrow(
      "Le plugin injecteNonce n'a trouvé aucun pattern",
    );
  });
});
