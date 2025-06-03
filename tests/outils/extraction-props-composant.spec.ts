import { expect, it, describe } from "vitest";
import { extraitPropsComposant } from "../../outils/extraction-props-composant";

const contenuSvelteOptionsSimple = `<svelte:options customElement="lab-anssi-un-composant" />`;
const contenuSvelteOptionsComplexe = `
<svelte:options
  customElement={{
    tag: "lab-anssi-un-composant",
    props: {
      uneProps: { reflect: false, type: "String", attribute: "une-props" }
    },
  }}
/>
`;
const contenuFichierDeclarationType = (
  nomProp: string = "uneprops",
  estOptionnelle: boolean = false,
) => `
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        ${nomProp}${estOptionnelle ? "?" : ""}: {
          propsA: string;
          propsB: string;
        };
    };
    events: {};
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type UnComposantProps = typeof __propDef.props;
export type UnComposantEvents = typeof __propDef.events;
export type UnComposantSlots = typeof __propDef.slots;
export default class UnComposant extends SvelteComponent<UnComposantProps, UnComposantEvents, UnComposantSlots> {
}
export {};
`;

describe("L'utilitaire d'extraction des props de composants (pour le fichier JSX)", () => {
  describe("sur extraction du nom du web component", () => {
    it("sait extraire le nom pour une déclaration  simple", () => {
      const { nomWebComponent } = extraitPropsComposant(
        contenuSvelteOptionsSimple,
        contenuFichierDeclarationType(),
      );

      expect(nomWebComponent).toBe("lab-anssi-un-composant");
    });

    it("sait extraire le nom pour une déclaration complexe", () => {
      const { nomWebComponent } = extraitPropsComposant(
        contenuSvelteOptionsComplexe,
        contenuFichierDeclarationType(),
      );

      expect(nomWebComponent).toBe("lab-anssi-un-composant");
    });
  });

  describe("sur extraction des props du web component", () => {
    describe("pour une déclaration simple", () => {
      it("sait extraire les props", () => {
        const { props } = extraitPropsComposant(
          contenuSvelteOptionsSimple,
          contenuFichierDeclarationType(),
        );

        expect(props[0].nom).toBe("uneprops");
      });

      it("sait dire si une props est optionnelle", () => {
        const { props } = extraitPropsComposant(
          contenuSvelteOptionsSimple,
          contenuFichierDeclarationType("uneprops", true),
        );

        expect(props[0].optionnelle).toBe(true);
      });

      it("jette une erreur si une props a un nom avec majuscule", () => {
        expect(() =>
          extraitPropsComposant(
            contenuSvelteOptionsSimple,
            contenuFichierDeclarationType("unePropsAvecMajuscule"),
          ),
        ).not.toThrowError();
      });

      it("reste robuste si le composant n'a pas de props", () => {
        const contenuSvelteOptionsComplexeSansProps = `
            <svelte:options
              customElement={{
                tag: "lab-anssi-un-composant",
              }}
            />
          `;

        const { props } = extraitPropsComposant(
          contenuSvelteOptionsComplexeSansProps,
          contenuFichierDeclarationType(),
        );

        expect(props).toEqual([]);
      });
    });

    describe("pour une déclaration complexe", () => {
      it("sait extraire les props", () => {
        const { props } = extraitPropsComposant(
          contenuSvelteOptionsComplexe,
          contenuFichierDeclarationType("uneProps"),
        );

        expect(props[0].nom).toBe("une-props");
      });

      it("sait dire si une props est optionnelle", () => {
        const { props } = extraitPropsComposant(
          contenuSvelteOptionsComplexe,
          contenuFichierDeclarationType("uneProps", true),
        );

        expect(props[0]).toEqual({ nom: "une-props", optionnelle: true });
      });

      it("jette une erreur si une props a un nom avec majuscule", () => {
        const contenuSvelteOptionsComplexeAvecMajuscule = contenuSvelteOptionsComplexe.replace(
          "une-props",
          "Une-Props-Avec-Majuscule",
        );

        expect(() =>
          extraitPropsComposant(
            contenuSvelteOptionsComplexeAvecMajuscule,
            contenuFichierDeclarationType("uneProps", true),
          ),
        ).toThrowError(
          "Il est impossible d'utiliser des props avec majuscules pour les web components",
        );
      });
    });
  });
});
