export const injecteNonceWebcomponents = (code: string) => {
  let codeAvecNonce = `const nonce = document.currentScript?.nonce;\n${code}`;
  codeAvecNonce = codeAvecNonce
    .replace(
      /const (.)\s*=\s*.\(["']style["']\);/gm,
      (match, nomVariable) => `${match}${nomVariable}.nonce=nonce;`,
    )
    .replace(
      /const (.)\s*=\s*document\.createElement\(["']style["']\);/gm,
      (match, nomVariable) => `${match}${nomVariable}.nonce=nonce;`,
    );

  return codeAvecNonce;
};
