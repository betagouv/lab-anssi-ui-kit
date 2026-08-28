// url=https://www.figma.com/design/6zxupO1ivYTw5qxzAyB0XZ/DSFR---Composants---LAB?node-id=314-25444
// source=src/lib/dsfr/DsfrRadiosGroup.svelte
// component=DsfrRadiosGroup
import figma from "figma";
import { BOOLEAN_ENUM, findInstanceLayers, isInstance, safeGet } from "./helpers/index.ts";

// Instance principale du composant
const instance = figma.selectedInstance;

// Propriétés de l'instance principale
const orientation = instance.getEnum("Orientation", {
  Horizontal: "horizontal",
  Vertical: "vertical",
});

const state = instance.getEnum("État", {
  Défaut: "default",
  Erreur: "error",
  Valide: "valid",
});

const disabled = instance.getEnum("Désactivé", BOOLEAN_ENUM);

const messageInfo = instance.getBoolean("Message d'information");

// Instance imbriquée : "⚙️ Varier les propriétés - Légende"
const legendInstance = safeGet(() =>
  instance.findInstance("⚙️ Varier les propriétés - Légende", {
    traverseInstances: true,
  }),
);

let legend = "";
let legendHint = "";
let hasLegendHint = false;
let required = false;

if (isInstance(legendInstance)) {
  legend = legendInstance.getString("Légende") || "";
  legendHint = legendInstance.getString("Texte de description additionnel") || "";
  hasLegendHint = legendInstance.getBoolean("Description additionnel");
  required = legendInstance.getBoolean("Obligatoire");
}

// Instances imbriquées : Radio items (récupération dynamique par préfixe)
const radioLayers = findInstanceLayers(instance, "⚙️ Varier les propriétés - Radio");

const radios: {
  label: string;
  hint: string;
  hasHint: boolean;
  required: boolean;
  checked: boolean;
  disabled: boolean;
  size: string;
  validation: string;
}[] = [];

for (const radioInstance of radioLayers) {
  // Propriétés du radio item
  const radioSize = safeGet(() => radioInstance.getEnum("Taille", { SM: "sm", MD: "md" }));
  const radioChecked = safeGet(() => radioInstance.getEnum("Coché", BOOLEAN_ENUM));
  const radioDisabled = safeGet(() => radioInstance.getEnum("Désactivé", BOOLEAN_ENUM));
  const radioValidation = safeGet(() =>
    radioInstance.getEnum("Validation", {
      Aucune: "none",
      Valide: "valid",
      Erreur: "error",
    }),
  );

  // Instance imbriquée dans le radio : "⚙️ Varier les propriétés - Libellé"
  const labelInstance = safeGet(() =>
    radioInstance.findInstance("⚙️ Varier les propriétés - Libellé", {
      traverseInstances: true,
    }),
  );

  let radioLabel = "";
  let radioHint = "";
  let radioHasHint = false;
  let radioRequired = false;

  if (isInstance(labelInstance)) {
    radioLabel = labelInstance.getString("Libellé") || "";
    radioHint = labelInstance.getString("Texte de description additionnel") || "";
    radioHasHint = labelInstance.getBoolean("Description additionnel");
    radioRequired = labelInstance.getBoolean("Obligatoire");
  }

  radios.push({
    label: radioLabel,
    hint: radioHint,
    hasHint: radioHasHint,
    required: radioRequired,
    checked: radioChecked === true,
    disabled: radioDisabled === true,
    size: (radioSize as string) || "md",
    validation: (radioValidation as string) || "none",
  });
}

// Instance imbriquée : Message de formulaire
// Le nom de l'instance diffère entre variantes verticales et horizontales
const messageInstanceV = safeGet(() =>
  instance.findInstance("⚙️ Varier les propriétés - Message de formulaire", {
    traverseInstances: true,
  }),
);

const messageInstanceH = safeGet(() =>
  instance.findInstance("⚙️ Varier les propriétés -  Message de formulaire", {
    traverseInstances: true,
  }),
);

const messageInstance = isInstance(messageInstanceV) ? messageInstanceV : messageInstanceH;

let errorMessage = "";
let validMessage = "";

if (isInstance(messageInstance)) {
  const message = messageInstance.getString("Message") || "";

  if (state === "error") {
    errorMessage = message;
  } else if (state === "valid") {
    validMessage = message;
  }
}

// Propriétés calculées
const isDisabled = disabled === true;
const isInline = orientation === "horizontal";
const status = state || "default";
const hasMessage = messageInfo === true;

// Construction du JSON radios pour l'attribut du web component
const radiosJson = radios.map((r, i) => ({
  id: `radio-${i + 1}`,
  label: r.label,
  ...(r.hasHint && r.hint ? { hint: r.hint } : {}),
  ...(r.disabled ? { disabled: true } : {}),
  ...(r.required ? { required: true } : {}),
}));

// Code final poussé dans Figma Code Connect
const codeExample = figma.code`<dsfr-radios-group
  legend="${legend}"
  ${hasLegendHint && legendHint ? `hint="${legendHint}"` : ""}
  ${status !== "default" ? `status="${status}"` : ""}
  ${status === "error" && errorMessage ? `error-message="${errorMessage}"` : ""}
  ${status === "valid" && hasMessage && validMessage ? `valid-message="${validMessage}"` : ""}
  ${isInline ? "inline" : ""}
  ${isDisabled ? "disabled" : ""}
  ${required ? "required" : ""}
  radios='${JSON.stringify(radiosJson)}'
></dsfr-radios-group>`;

export default {
  example: codeExample,
  id: "dsfr-radios-group",
  metadata: {
    nestable: true,
  },
};
