import figma from "figma";

const instance = figma.selectedInstance;

const state = instance.getEnum("État", {
  Défaut: "default",
  Erreur: "error",
  Rempli: "filled",
  Valide: "valid",
});

const disabled = instance.getEnum("Désactivé", {
  False: "false",
  True: "true",
});

const showMessage = instance.getBoolean("Message d'information");
const showLabel = instance.getBoolean("Libellé");

// Instance : "Libellé"
const labelInstance = instance.findInstance(" ⚙️ Varier les propriétés - Libellé", {
  traverseInstances: true,
});

let label = "";
let hint = "";
let showHint = false;
let required = false;

if (labelInstance && labelInstance.type === "INSTANCE") {
  required = labelInstance.getBoolean("Obligatoire");
  label = labelInstance.getString("Libellé") || "";
  showHint = labelInstance.getBoolean("Description additionnel");
  hint = labelInstance.getString("Texte de description additionnel") || "";
}

// Instance : "Champ de saisie"
const inputInstance = instance.findInstance("Champ de saisie", {
  traverseInstances: true,
});

let hasPlaceholder = false;
let placeholder = "";
let showIcon = false;
let iconName: string | null = null;
let value = "";
let inputStatus = "";

if (inputInstance && inputInstance.type === "INSTANCE") {
  hasPlaceholder = inputInstance.getBoolean("Avec Placeholder");
  placeholder = inputInstance.getString("Placeholder") || "";
  showIcon = inputInstance.getBoolean("Icône");
  value = inputInstance.getString("Texte saisi") || "";
  inputStatus =
    inputInstance.getEnum("Statut", {
      Défaut: "default",
      Erreur: "error",
      Valide: "valid",
    }) || "";

  const iconInstance = inputInstance.getInstanceSwap("Instance icône");
  if (iconInstance && iconInstance.type === "INSTANCE") {
    iconName = iconInstance.name;
  }
}

// Instance : "Message de formulaire"
const messageInstance = instance.findInstance("Message de formulaire", {
  traverseInstances: true,
});

let message = "";
if (messageInstance && messageInstance.type === "INSTANCE") {
  message = messageInstance.getString("Message") || "";
}

const isDisabled = disabled === "true";
const isError = inputStatus === "error";
const isValid = inputStatus === "valid";

export default {
  example: figma.code`<dsfr-input
  label="${label}"
  ${showLabel ? "" : "hide-label"}
  ${showHint && hint ? `hint="${hint}"` : ""}
  ${showIcon && iconName ? `icon="${iconName}"` : ""}
  ${value ? `value="${value}"` : ""}
  ${hasPlaceholder && placeholder ? `placeholder="${placeholder}"` : ""}
  ${isDisabled ? "disabled" : ""}
  ${isError ? `status="error"\n error-message="${message}"` : ""}
  ${isValid ? `status="valid"\n valid-message="${message}"` : ""}
  ${showMessage ? `status="info"\n info-message="${message}"` : ""}
  ${required ? "required" : ""}
></dsfr-input>`,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
