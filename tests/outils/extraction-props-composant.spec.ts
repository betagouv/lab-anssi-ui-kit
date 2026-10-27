import { expect, it, describe } from "vitest";
import {
  extraitConfigurationWebComponent,
  extraitPropsComposant,
} from "../../outils/extraction-props-composant";

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
const contenuSvelteScript = (nomProp: string = "uneprops", estOptionnelle: boolean = false) => `
  interface Props {
    ${nomProp}${estOptionnelle ? "?" : ""}: {
      propsA: string;
      propsB: string;
    };
  }

  let { ${nomProp} }: Props = $props();
`;

describe("L'utilitaire d'extraction des props de composants (pour le fichier JSX)", () => {
  describe("sur extraction du nom du web component", () => {
    it("sait extraire le nom pour une déclaration  simple", () => {
      const { nomWebComponent } = extraitPropsComposant(
        contenuSvelteOptionsSimple,
        contenuSvelteScript(),
      );

      expect(nomWebComponent).toBe("lab-anssi-un-composant");
    });

    it("sait extraire le nom pour une déclaration complexe", () => {
      const { nomWebComponent } = extraitPropsComposant(
        contenuSvelteOptionsComplexe,
        contenuSvelteScript(),
      );

      expect(nomWebComponent).toBe("lab-anssi-un-composant");
    });

    it("extrait la configuration normalisée des props", () => {
      const configuration = extraitConfigurationWebComponent(contenuSvelteOptionsComplexe);

      expect(configuration.props.uneProps).toEqual({
        reflect: false,
        type: "String",
        attribute: "une-props",
      });
    });
  });

  describe("sur extraction des props du web component", () => {
    describe("pour une déclaration simple", () => {
      it("sait extraire les props", () => {
        const { props } = extraitPropsComposant(contenuSvelteOptionsSimple, contenuSvelteScript());

        expect(props[0].nom).toBe("uneprops");
      });

      it("sait dire si une props est optionnelle", () => {
        const { props } = extraitPropsComposant(
          contenuSvelteOptionsSimple,
          contenuSvelteScript("uneprops", true),
        );

        expect(props[0].optionnelle).toBe(true);
      });

      it("jette une erreur si une props a un nom avec majuscule", () => {
        expect(() =>
          extraitPropsComposant(
            contenuSvelteOptionsSimple,
            contenuSvelteScript("unePropsAvecMajuscule"),
          ),
        ).not.toThrowError();
      });

      it("conserve les props si aucune configuration spécifique n'est fournie", () => {
        const contenuSvelteOptionsComplexeSansProps = `
            <svelte:options
              customElement={{
                tag: "lab-anssi-un-composant",
              }}
            />
          `;

        const { props } = extraitPropsComposant(
          contenuSvelteOptionsComplexeSansProps,
          contenuSvelteScript(),
        );

        expect(props).toEqual([{ nom: "uneprops", optionnelle: false }]);
      });
    });

    describe("pour une déclaration complexe", () => {
      it("sait extraire les props", () => {
        const { props } = extraitPropsComposant(
          contenuSvelteOptionsComplexe,
          contenuSvelteScript("uneProps"),
        );

        expect(props[0].nom).toBe("une-props");
      });

      it("utilise le nom de la prop si aucun attribut n'est configuré", () => {
        const contenuSvelteOptionsSansAttribut = contenuSvelteOptionsComplexe.replace(
          ', attribute: "une-props"',
          "",
        );
        const { props } = extraitPropsComposant(
          contenuSvelteOptionsSansAttribut,
          contenuSvelteScript("uneProps"),
        );

        expect(props[0].nom).toBe("uneProps");
      });

      it("sait dire si une props est optionnelle", () => {
        const { props } = extraitPropsComposant(
          contenuSvelteOptionsComplexe,
          contenuSvelteScript("uneProps", true),
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
            contenuSvelteScript("uneProps", true),
          ),
        ).toThrowError(
          "Il est impossible d'utiliser des props avec majuscules pour les web components",
        );
      });
    });
  });
});
