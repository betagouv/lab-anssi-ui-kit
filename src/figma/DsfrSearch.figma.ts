// url=https://www.figma.com/design/6zxupO1ivYTw5qxzAyB0XZ/DSFR---Composants---LAB?node-id=92-1978
// source=src/lib/dsfr/DsfrSearch.svelte
// component=DsfrSearch
import figma from "figma";
import { isInstance, safeGet } from "./helpers/index.ts";

// Instance principale du composant
const instance = figma.selectedInstance;

// Propriétés de l'instance principale
const text = instance.getString("Texte");
const size = instance.getEnum("Taille", {
  MD: "md",
  LG: "lg",
});

// Instance imbriquée : "⚙️ Varier les propriétés - Bouton"
const searchButton = safeGet(() =>
  instance.findInstance("⚙️ Varier les propriétés - Bouton", {
    traverseInstances: true,
  }),
);

// Propriétés calculées
const buttonLabel = isInstance(searchButton) ? searchButton.getString("Libellé") || "" : "";

// Code final poussé dans Figma Code Connect
const codeExample = figma.code`<dsfr-search
  ${buttonLabel ? `button-label="${buttonLabel}"` : ""}
  size="${size}"
  placeholder="Rechercher"
  ${text ? `value="${text}"` : ""}
></dsfr-search>`;

export default {
  example: codeExample,
  id: "dsfr-search",
  metadata: {
    nestable: true,
  },
};
