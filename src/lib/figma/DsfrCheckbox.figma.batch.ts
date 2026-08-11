import figma from "figma";

const instance = figma.selectedInstance;

const showMessage = instance.getBoolean("Message d'information");
const size = instance.getEnum("Taille", {
  MD: "md",
  SM: "sm",
});

const checked = instance.getEnum("Coché", {
  False: "false",
  True: "true",
});

const disabled = instance.getEnum("Désactivé", {
  False: "false",
  True: "true",
});

const validation = instance.getEnum("Validation", {
  Aucune: "default",
  Valide: "valid",
  Erreur: "error",
});

// Instance : "Case à cocher"
const checkbox = instance.findInstance("⚙️ Varier les propriétés - Case à cocher", {
  traverseInstances: true,
});
let checkboxState = "";
let checkboxDisabled = "";
if (checkbox && checkbox.type === "INSTANCE") {
  checkboxState =
    checkbox.getEnum("Niveau", {
      Défaut: "default",
      Indéterminé: "indeterminate",
    }) || "";
  checkboxDisabled = checkbox.getEnum("Désactivé", { False: "false", True: "true" }) || "";
}

// Instance : "Libellé"
const labelInstance = instance.findInstance("⚙️ Varier les propriétés - Libellé", {
  traverseInstances: true,
});
let label = "";
let hint = "";
let showHint = false;
let required = false;
if (labelInstance && labelInstance.type === "INSTANCE") {
  label = labelInstance.getString("Libellé") || "";
  hint = labelInstance.getString("Texte de description additionnel") || "";
  showHint = labelInstance.getBoolean("Description additionnel");
  required = labelInstance.getBoolean("Obligatoire");
}

// Instance : "Message de formulaire"
const messageInstance = instance.findInstance("⚙️ Varier les propriétés - Message de formulaire", {
  traverseInstances: true,
});
let message = "";
if (messageInstance && messageInstance.type === "INSTANCE") {
  message = messageInstance.getString("Message") || "";
}

const isChecked = checked === "true";
const isDisabled = disabled === "true";
const isError = validation === "error";
const isValid = validation === "valid";

export default {
  example: figma.code`<dsfr-checkbox
  label="${label}"
  size="${size}"
  ${showHint && hint ? `hint="${hint}"` : ""}
  ${isDisabled ? "disabled" : ""}
  ${isChecked ? "checked" : ""}
  ${isError ? `status="error"\n error-message="${message}"` : ""}
  ${isValid ? `status="valid"\n valid-message="${message}"` : ""}
  ${required ? "required" : ""}
  ${checkboxState === "indeterminate" ? "indeterminate" : ""}
></dsfr-checkbox>`,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
