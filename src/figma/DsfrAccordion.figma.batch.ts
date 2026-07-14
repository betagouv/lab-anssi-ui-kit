import figma from "figma";
import { safeGet, slugify } from "./helpers/index.ts";

// Instance principale du composant
const instance = figma.selectedInstance;

// Mapping des propriétés entre le code et Figma
const isExpanded = safeGet(
  () =>
    instance.getEnum("Ouvert", {
      True: true,
      False: false,
    }),
  false,
);

// Instance imbriquée : "Haut"
const instanceHaut =
  safeGet(() => instance.findInstance("Haut", { traverseInstances: true })) ?? instance;

const label = safeGet(() => instanceHaut.getString("Intitulé accordéon"), "Intitulé accordéon");

// Contenu enfant injecté (Desktop/Mobile Complet)
const slot = safeGet(() => instance.getSlot("Slot"));

// Code final poussé dans Figma Code Connect
const codeExample = figma.code`<dsfr-accordion
  id="accordion-1"
  label="${label}"
  ${isExpanded ? "is-expanded" : ""}
  content="Contenu de l'accordéon"
></dsfr-accordion>`;

export default {
  example: codeExample,
  id: slugify(figma.batch.name),
  metadata: {
    nestable: true,
  },
};
