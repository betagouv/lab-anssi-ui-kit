import figma from "figma";
import { BOOLEAN_ENUM, isInstance, slugify } from "./helpers/index.ts";

// Instance principale du composant
const instance = figma.selectedInstance;

// Propriétés de l'instance principale
const size = instance.getEnum("Taille", {
  MD: "md",
  SM: "sm",
});

const checked = instance.getEnum("Coché", BOOLEAN_ENUM);
const disabled = instance.getEnum("Désactivé", BOOLEAN_ENUM);

const validation = instance.getEnum("Validation", {
  Aucune: "default",
  Valide: "valid",
  Erreur: "error",
});

// Instance imbriquée : "Case à cocher"
const checkboxInstance = instance.findInstance("⚙️ Varier les propriétés - Case à cocher", {
  traverseInstances: true,
});

const level = isInstance(checkboxInstance)
  ? (checkboxInstance.getEnum("Niveau", {
      Défaut: "default",
      Indéterminé: "indeterminate",
    }) ?? "")
  : "";

// Instance imbriquée : "Libellé"
const labelInstance = instance.findInstance("⚙️ Varier les propriétés - Libellé", {
  traverseInstances: true,
});

let label = "";
let hint = "";
let showHint = false;
let required = false;

if (isInstance(labelInstance)) {
  label = labelInstance.getString("Libellé") || "";
  hint = labelInstance.getString("Texte de description additionnel") || "";
  showHint = labelInstance.getBoolean("Description additionnel");
  required = labelInstance.getBoolean("Obligatoire");
}

// Instance imbriquée : "Message de formulaire"
const messageInstance = instance.findInstance("⚙️ Varier les propriétés - Message de formulaire", {
  traverseInstances: true,
});

const message = isInstance(messageInstance) ? messageInstance.getString("Message") || "" : "";

// Propriétés calculées
const isError = validation === "error";
const isValid = validation === "valid";

// Code final poussé dans Figma Code Connect
const codeExample = figma.code`<dsfr-checkbox
  label="${label}"
  size="${size}"
  ${showHint && hint ? `hint="${hint}"` : ""}
  ${disabled ? "disabled" : ""}
  ${checked ? "checked" : ""}
  ${isError ? `status="error"\n  error-message="${message}"` : ""}
  ${isValid ? `status="valid"\n  valid-message="${message}"` : ""}
  ${required ? "required" : ""}
  ${level === "indeterminate" ? "indeterminate" : ""}
></dsfr-checkbox>`;

export default {
  example: codeExample,
  id: slugify(figma.batch.name),
  metadata: {
    nestable: true,
  },
};
