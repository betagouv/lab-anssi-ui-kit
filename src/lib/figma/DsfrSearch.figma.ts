// url=https://www.figma.com/design/6zxupO1ivYTw5qxzAyB0XZ/DSFR---Composants---LAB?node-id=92-1978
// source=src/lib/dsfr/DsfrSearch.svelte
// component=DsfrSearch
import figma from "figma";

const instance = figma.selectedInstance;

const text = instance.getString("Texte");
const size = instance.getEnum("Taille", {
  MD: "md",
  LG: "lg",
});

// Instance : "Texte placeholder"
const placeholder = instance.findText("Rechercher");

// Instance : "Bouton de recherche"
const searchButton = instance.findInstance("⚙️ Varier les propriétés - Bouton", {
  traverseInstances: true,
});
let buttonLabel = "";
if (searchButton && searchButton.type === "INSTANCE") {
  buttonLabel = searchButton.getString("Libellé") || "";
}

export default {
  example: figma.code`<dsfr-search
  ${buttonLabel ? `button-label="${buttonLabel}"` : ""}
  size="${size}"
  ${placeholder ? `placeholder="${placeholder}"` : ""}
  ${text ? `value="${text}"` : ""}
></dsfr-search>`,
  id: "dsfr-search",
  metadata: {
    nestable: true,
  },
};
