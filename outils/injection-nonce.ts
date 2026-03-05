export const injecteNonceWebcomponents = (code: string) => {
  let codeAvecNonce = `const nonce = document.currentScript?.nonce;\n${code}`;

  const createElementFuncName =
    code.match(/function (.+)\(.,.,.\){return document.createElementNS\(/g)?.[1] ??
    "document.createElement";

  const modeleRecherche = `const (.)\\s*=\\s*${createElementFuncName}\\(["']style["']\\);`;

  codeAvecNonce = codeAvecNonce
    .replace(
      /const (.)\s*=\s*.\(["']style["']\);/gm,
      (match, nomVariable) => `${match}${nomVariable}.nonce=nonce;`,
    )
    .replace(
      new RegExp(modeleRecherche, "gm"),
      (match, nomVariable) => `${match}${nomVariable}.nonce=nonce;`,
    );

  return codeAvecNonce;
};
