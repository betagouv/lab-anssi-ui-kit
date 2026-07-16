// url=https://www.figma.com/design/6zxupO1ivYTw5qxzAyB0XZ/DSFR---Composants---LAB?node-id=536-45814
// source=src/lib/dsfr/DsfrToggle.svelte
// component=DsfrToggle
import figma from "figma";

const instance = figma.selectedInstance;

const hasSeparator = instance.getBoolean("Séparateur");
const showStatus = instance.getBoolean("Statut");
const showHint = instance.getBoolean("Voir Texte d'aide");
const showMessage = instance.getBoolean("Voir message");

const label = instance.getString("Libellé");
const hint = instance.getString("Texte d'aide");

const alignment = instance.getEnum("Alignement", {
  Droite: "right",
  Gauche: "left",
});

const checked = instance.getEnum("Coché", {
  False: "false",
  True: "true",
});

const state = instance.getEnum("État", {
  Default: "default",
  Erreur: "error",
  Valide: "valid",
});

const disabled = instance.getEnum("Désactivé", {
  False: "false",
  True: "true",
});

// Instance : "Message de formulaire / Information"
const infoMessageInstance = instance.findInstance(
  "Thème clair / Éléments / Message de formulaire / Information",
  { traverseInstances: true },
);
let infoMessage = "";
if (infoMessageInstance && infoMessageInstance.type === "INSTANCE") {
  infoMessage = infoMessageInstance.getString("Message") || "";
}

// Instance : "Message de formulaire / Erreur"
const errorMessageInstance = instance.findInstance(
  "Thème clair / Éléments / Message de formulaire / Erreur",
  { traverseInstances: true },
);
let errorMessage = "";
if (errorMessageInstance && errorMessageInstance.type === "INSTANCE") {
  errorMessage = errorMessageInstance.getString("Message") || "";
}

// Instance : "Message de formulaire / Valide"
const validMessageInstance = instance.findInstance(
  "Thème clair / Éléments /  Message de formulaire / Valide",
  { traverseInstances: true },
);
let validMessage = "";
if (validMessageInstance && validMessageInstance.type === "INSTANCE") {
  validMessage = validMessageInstance.getString("Message") || "";
}

const isChecked = checked === "true";
const isDisabled = disabled === "true";
const isError = state === "error";
const isValid = state === "valid";
const isLabelLeft = alignment === "right";

export default {
  example: figma.code`<dsfr-toggle
  id="toggle-1"
  label="${label}"
  ${showHint && hint ? `hint="${hint}"` : ""}
  hint-id="toggle-1-hint"
  ${isDisabled ? "disabled" : ""}
  ${isChecked ? "checked" : ""}
  ${hasSeparator ? "border" : ""}
  ${isLabelLeft ? "left" : ""}
  ${showStatus ? "state" : ""}
  ${isError ? `status="error"\n error-message="${errorMessage}"` : ""}
  ${isValid ? `status="valid"` : ""}
  ${isValid && showMessage ? `valid-message="${validMessage}"` : ""}
></dsfr-toggle>`,
  id: "dsfr-toggle",
  metadata: {
    nestable: true,
  },
};
