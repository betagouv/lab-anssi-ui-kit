const ACCENTS: Record<string, string> = {
  à: "a",
  â: "a",
  ä: "a",
  é: "e",
  è: "e",
  ê: "e",
  ë: "e",
  î: "i",
  ï: "i",
  ô: "o",
  ö: "o",
  ù: "u",
  û: "u",
  ü: "u",
  ç: "c",
};

/**
 * Normalise une chaîne de caractères en slug.
 *
 * Convertit les accents, remplace les caractères non alphanumériques
 * par des tirets et supprime les tirets en début et fin de chaîne.
 *
 * @param value - La chaîne à transformer.
 *
 * @returns Le slug généré.
 */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[àâäéèêëîïôöùûüç]/g, (char) => ACCENTS[char] ?? char)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default slugify;
