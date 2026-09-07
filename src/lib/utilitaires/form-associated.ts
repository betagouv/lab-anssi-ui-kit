import type { SvelteCustomElementClass } from "./icons-stylesheet";
import { getIconsStyleSheet } from "./icons-stylesheet";

type SvelteCustomElementClassWithLifecycle = new () => HTMLElement & {
  connectedCallback(): void;
};

export function withFormAssociated(CustomElementClass: SvelteCustomElementClass) {
  return class extends CustomElementClass {
    static formAssociated = true;
    internals: ElementInternals;

    constructor() {
      super();
      this.internals = this.attachInternals();
    }
  };
}

export function withFormAndIcons(CustomElementClass: SvelteCustomElementClass) {
  return class extends (CustomElementClass as SvelteCustomElementClassWithLifecycle) {
    static formAssociated = true;
    internals: ElementInternals;

    constructor() {
      super();
      this.internals = this.attachInternals();
    }

    connectedCallback() {
      super.connectedCallback();

      const iconsStyleSheet = getIconsStyleSheet();
      const shadow = this.shadowRoot;

      if (shadow && !shadow.adoptedStyleSheets.includes(iconsStyleSheet)) {
        shadow.adoptedStyleSheets = [iconsStyleSheet, ...shadow.adoptedStyleSheets];
      }
    }
  };
}
