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

type CustomElementConstructor = new (...args: unknown[]) => HTMLElement;

/**
 * Permet d'étendre la class des WebComponents afin d'injecter la feuille de style des icônes DSFR dans le Shadow DOM.
 */
export function withIconsStyleSheet(CustomElementClass: CustomElementConstructor) {
  const ParentClass = CustomElementClass as new (
    ...args: unknown[]
  ) => HTMLElement & { connectedCallback?(): void };

  return class extends ParentClass {
    connectedCallback() {
      super.connectedCallback?.();

      const iconsStyleSheet = getIconsStyleSheet();
      const shadow = this.shadowRoot;
      if (!shadow) return;

      const styleSheets = shadow?.adoptedStyleSheets;
      if (!Array.isArray(styleSheets)) return;

      if (!styleSheets.includes(iconsStyleSheet)) {
        shadow.adoptedStyleSheets = [iconsStyleSheet, ...shadow.adoptedStyleSheets];
      }
    }
  };
}
