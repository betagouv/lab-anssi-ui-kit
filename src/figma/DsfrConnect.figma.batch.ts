import figma from "figma";
import { BOOLEAN_ENUM, safeGet, slugify } from "./helpers/index.ts";

// Instance principale du composant
const instance = figma.selectedInstance;

// Propriétés de l'instance principale
const state = instance.getEnum("État", {
  Défaut: "default",
  Survol: "hover",
  Cliqué: "active",
  Désactivé: "disabled",
  Focus: "focus",
});

const plus = safeGet(() => instance.getEnum("Plus", BOOLEAN_ENUM));

// Propriétés calculées
const isPlus = plus === true;
const isDisabled = state === "disabled";
const variant = figma.batch.type === "FranceConnect" ? (isPlus ? "plus" : "default") : "pro";

// Code final poussé dans Figma Code Connect
const codeExample = figma.code`<dsfr-connect
  variant="${variant}"
  ${isDisabled ? "disabled" : ""}
></dsfr-connect>`;

export default {
  example: codeExample,
  id: slugify(figma.batch.name),
  metadata: {
    nestable: true,
  },
};
