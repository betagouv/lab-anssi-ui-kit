export const injecteNonceWebcomponents = (code: string) => {
  let codeAvecNonce = `const nonce = document.currentScript?.nonce;\n${code}`;

  let nombreInjections = 0;

  codeAvecNonce = codeAvecNonce
    .replace(
      /(?:const|let|var)\s+(\w+)\s*=\s*\w+\(["'`]style["'`]\)\s*[;,]/gm,
      (match, nomVariable) => {
        nombreInjections++;
        return `${match}${nomVariable}.nonce=nonce;`;
      },
    )
    .replace(
      /(?:const|let|var)\s+(\w+)\s*=\s*document\.createElement\(["'`]style["'`]\)\s*[;,]/gm,
      (match, nomVariable) => {
        nombreInjections++;
        return `${match}${nomVariable}.nonce=nonce;`;
      },
    );

  if (nombreInjections === 0) {
    throw new Error(
      "Le plugin injecteNonce n'a trouvé aucun pattern de création de <style> à injecter. " +
        "Le format du bundle produit par Vite a peut-être changé.",
    );
  }

  return codeAvecNonce;
};
