// url=https://www.figma.com/design/6zxupO1ivYTw5qxzAyB0XZ/DSFR---Composants---LAB?node-id=311-24508
// source=src/lib/dsfr/DsfrRadio.svelte
// component=DsfrRadio
import figma from "figma";
import { BOOLEAN_ENUM, isInstance, safeGet } from "./helpers/index.ts";

// Instance principale du composant
const instance = figma.selectedInstance;

// Propriétés de l'instance principale
const size = instance.getEnum("Taille", {
  SM: "sm",
  MD: "md",
});

const disabled = instance.getEnum("Désactivé", BOOLEAN_ENUM);

// Instance imbriquée : "⚙️ Varier les propriétés - Libellé"
const labelInstance = safeGet(() =>
  instance.findInstance("⚙️ Varier les propriétés - Libellé", {
    traverseInstances: true,
  }),
);

let label = "";
let hint = "";
let hasHint = false;
let required = false;

if (isInstance(labelInstance)) {
  label = labelInstance.getString("Libellé") || "";
  hint = labelInstance.getString("Texte de description additionnel") || "";
  hasHint = labelInstance.getBoolean("Description additionnel");
  required = labelInstance.getBoolean("Obligatoire");
}

// Propriétés calculées
const isDisabled = disabled === true;

// Code final poussé dans Figma Code Connect
const codeExample = figma.code`<dsfr-radio
  label="${label}"
  size="${size}"
  ${hasHint && hint ? `hint="${hint}"` : ""}
  ${isDisabled ? "disabled" : ""}
  ${required ? "required" : ""}
></dsfr-radio>`;

export default {
  example: codeExample,
  id: "dsfr-radio",
  metadata: {
    nestable: true,
  },
};
