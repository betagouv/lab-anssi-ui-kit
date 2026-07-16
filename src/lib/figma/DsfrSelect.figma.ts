// url=https://www.figma.com/design/6zxupO1ivYTw5qxzAyB0XZ/DSFR---Composants---LAB?node-id=12158-38114
// source=src/lib/dsfr/DsfrSelect.svelte
// component=DsfrSelect
import figma from "figma";

const instance = figma.selectedInstance;

// Instance : "Liste déroulante - Item"
const itemInstance = instance.findInstance("Thème clair / Liste déroulante - Item", {
  traverseInstances: true,
});
let showmessage = false;
let showLabel = false;
let itemState = "";
let itemDisabled = "";
if (itemInstance && itemInstance.type === "INSTANCE") {
  showmessage = itemInstance.getBoolean("Message d'information");
  showLabel = itemInstance.getBoolean("Libellé");
  itemState =
    itemInstance.getEnum("État", {
      Défaut: "default",
      Erreur: "error",
      Succès: "valid",
    }) || "";
  itemDisabled =
    itemInstance.getEnum("Désactivé", {
      False: "false",
      True: "true",
    }) || "";
}

// Instance : "Label"
const labelInstance = instance.findInstance("⚙️ Varier les propriétés - Label", {
  traverseInstances: true,
});
let label = "";
let hint = "";
let showHint = false;
let isRequired = false;

if (labelInstance && labelInstance.type === "INSTANCE") {
  label = labelInstance.getString("Libellé") || "";
  hint = labelInstance.getString("Texte de description additionnel") || "";
  showHint = labelInstance.getBoolean("Description additionnel");
  isRequired = labelInstance.getBoolean("Obligatoire");
}

// Instance : "Champ de saisie"
const inputInstance = instance.findInstance("Thème clair / Éléments / Champ de saisie", {
  traverseInstances: true,
});
let hasPlaceholder = false;
let placeholder = "";
let inputDisabled = "";
if (inputInstance && inputInstance.type === "INSTANCE") {
  hasPlaceholder = inputInstance.getBoolean("Avec Placeholder");
  placeholder = inputInstance.getString("Placeholder") || "";
  inputDisabled =
    inputInstance.getEnum("Désactivé", {
      False: "false",
      True: "true",
    }) || "";

  const iconSwap = inputInstance.getInstanceSwap("Instance icône");
  if (iconSwap && iconSwap.type === "INSTANCE") {
    // unmapped
  }
}

// Instance : "Message de formulaire"
const messageInstance = instance.findInstance("⚙️ Varier les propriétés - Message de formulaire", {
  traverseInstances: true,
});
let message = "";
if (messageInstance && messageInstance.type === "INSTANCE") {
  message = messageInstance.getString("Message") || "";
}

const hideLabel = showLabel === false;
const isDisabled = itemDisabled === "true" || inputDisabled === "true";

export default {
  example: figma.code`<dsfr-select
  label="${label}"
  ${hideLabel ? "hide-label" : ""}
  options="[]"
  ${showHint && hint ? `hint="${hint}"` : ""}
  ${hasPlaceholder && placeholder ? `placeholder="${placeholder}"` : ""}
  ${isDisabled ? "disabled" : ""}
  ${itemState === "error" ? `status="error"\n error-message="${message}"` : ""}
  ${itemState === "valid" ? `status="valid"` : ""}
  ${itemState === "valid" && showmessage ? `valid-message="${message}"` : ""}
  ${showmessage && message ? `status="info"\n info-message="${message}"` : ""}
  ${isRequired ? "required" : ""}
></dsfr-select>`,
  id: "dsfr-select",
  metadata: {
    nestable: true,
  },
};
