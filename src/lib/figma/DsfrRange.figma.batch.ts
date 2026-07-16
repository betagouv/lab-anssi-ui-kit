import figma from "figma";

const instance = figma.selectedInstance;

const showMessage = instance.getBoolean("Voir message");

const state = instance.getEnum("État", {
  Défault: "default",
  Erreur: "error",
  Valide: "valid",
  désactivé: "disabled",
});

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

// Instance : "Piste"
const trackInstance = instance.findInstance("Piste", {
  traverseInstances: true,
});

let showMinMax = false;
let trackSize = "";
let trackSelection = "";

if (trackInstance && trackInstance.type === "INSTANCE") {
  showMinMax = trackInstance.getBoolean("Min-max");
  trackSize = trackInstance.getEnum("Taille", { MD: "md", SM: "sm" }) || "";
  trackSelection =
    trackInstance.getEnum("Sélection", {
      "0%": "0",
      "25%": "25",
      "50%": "50",
      "75%": "75",
      "100%": "100",
    }) || "";

  // Instance : "Valeur min-max"
  const minMaxInstance = trackInstance.findInstance("Valeur min-max", {
    traverseInstances: true,
  });

  let minMaxSize = "";
  if (minMaxInstance && minMaxInstance.type === "INSTANCE") {
    minMaxSize = minMaxInstance.getEnum("Taille", { MD: "md" }) || "";
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

// Instance : "Textes statiques du message"
const textErreur = instance.findText("Texte d'erreur obligatoire");
const textValidation = instance.findText("Texte de validation optionnel");
const textInformation = instance.findText("Texte d'information");

const isDisabled = state === "disabled";
const isError = state === "error";

export default {
  example: figma.code`<dsfr-range
  label="${label}"
  ${!label ? `hide-label` : ""}
  ${showHint && hint ? `hint="${hint}"` : ""}
  size="${trackSize}"
  min="0"
  max="100"
  value="${trackSelection}"
  step="25"
  ${isDisabled ? "disabled" : ""}
  ${figma.batch.double ? `is-double` : ""}
  value2={args.value2}
  ${figma.batch.double ? `min-value-label="Valeur minimale"` : ""}
  ${figma.batch.double ? `max-value-label="Valeur maximale"` : ""}
  ${figma.batch.step ? `is-step` : ""}
  ${showMinMax ? "indicators" : ""}
  ${isError ? `status="error"\n` : ""}
  ${isError && showMessage ? `error-message="${textErreur}"` : ""}
></dsfr-range>`,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
