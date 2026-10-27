type ConstructeurWebComponentSvelte = new () => HTMLElement & {
  connectedCallback(): void;
  internals: ElementInternals;
};

type ExtensionWebComponent = (
  constructeur: ConstructeurWebComponentSvelte,
) => CustomElementConstructor;

export const avecEnregistrementIdempotent = (
  nomWebComponent: string,
  étend?: ExtensionWebComponent,
): ((constructeur: CustomElementConstructor) => CustomElementConstructor) => {
  return (constructeur) => {
    const constructeurÉtendu =
      étend?.(constructeur as ConstructeurWebComponentSvelte) ?? constructeur;
    const registre = globalThis.customElements;

    if (registre && !registre.get(nomWebComponent)) {
      registre.define(nomWebComponent, constructeurÉtendu);
    }

    return constructeurÉtendu;
  };
};
