export const genereImageDePlaceholder = (
  largeur: number,
  longeur: number,
  texteAffiche?: string,
): string => {
  return `https://placehold.co/${largeur}x${longeur}${texteAffiche ? `?text=${encodeURIComponent(texteAffiche)}` : ""}`;
};
