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

export type SvelteCustomElementClass = new () => HTMLElement;

type SvelteCustomElementClassWithLifecycle = new () => HTMLElement & {
  connectedCallback(): void;
};

/**
 * Permet d'étendre la class des WebComponents afin d'injecter la feuille de style des icônes DSFR dans le Shadow DOM.
 */
export function withIconsStyleSheet(CustomElementClass: SvelteCustomElementClass) {
  return class extends (CustomElementClass as SvelteCustomElementClassWithLifecycle) {
    connectedCallback() {
      super.connectedCallback();

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
