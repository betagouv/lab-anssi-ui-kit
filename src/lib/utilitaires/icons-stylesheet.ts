import dsfrIcons from "../styles/dsfr-icons.scss?inline";

let iconsStyleSheet: CSSStyleSheet | null = null;

/**
 * Retourne la feuille de style partagée des icônes DSFR.
 */
export function getIconsStyleSheet(): CSSStyleSheet {
  if (!iconsStyleSheet) {
    iconsStyleSheet = new CSSStyleSheet();
    iconsStyleSheet.replaceSync(dsfrIcons);
  }

  return iconsStyleSheet;
}
