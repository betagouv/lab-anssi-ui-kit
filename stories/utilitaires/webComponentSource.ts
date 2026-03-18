import type { StoryContext } from "@storybook/svelte-vite";

/**
 * Génère une fonction de transformation Storybook qui produit le code HTML
 * d'un web component à partir des args de la story.
 * - convertit les noms de propriétés en kebab-case pour les attributs HTML
 * - rend les attributs booléens sans valeur (présence/absence)
 * - ignore les valeurs vides, nulles ou undefined pour les autres attributs
 *
 * @param tagName Nom de la balise du web component à afficher dans la source.
 * @returns {(source: string, context: StoryContext) => string} Fonction qui génère la balise HTML formatée à afficher dans le panneau Source de Storybook.
 */
export default function webComponentSourceCode(tagName: string) {
  return (source: string, { argTypes, args }: StoryContext) => {
    const camelToKebab = (str: string) =>
      str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

    // On utilise les `argTypes` pour déterminer les attributs booléens des autres types d'attributs
    const objectAttrs: string[] = [];
    const booleanAttrs: string[] = [];
    const stringAttrs: string[] = [];

    for (const [key, value] of Object.entries(argTypes)) {
      if (!value.control) continue;

      if (value.control.type === "array" || value.control.type === "object") {
        objectAttrs.push(key);
      } else if (value.control.type === "boolean") {
        booleanAttrs.push(key);
      } else {
        stringAttrs.push(key);
      }
    }

    // On créé la liste des attributs à afficher dans la source de la story en fonction des `args` passés
    const attrs: string[] = [];

    for (const [key, value] of Object.entries(args)) {
      if (stringAttrs.includes(key) || objectAttrs.includes(key)) {
        const attrName = camelToKebab(key);

        if (
          (Array.isArray(value) && value.length > 0) ||
          (typeof value === "object" && value !== null)
        ) {
          attrs.push(`${attrName}='${JSON.stringify(value)}'`);
        } else if (value !== undefined && value !== null && value !== "") {
          attrs.push(`${attrName}="${value}"`);
        }
      }
    }

    booleanAttrs.forEach((element) => {
      if (args[element]) {
        const attrName = camelToKebab(element);
        attrs.push(attrName);
      }
    });

    return `<${tagName}\n  ${attrs.join("\n  ")}\n></${tagName}>`;
  };
}
