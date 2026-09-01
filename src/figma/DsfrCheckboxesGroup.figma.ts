// url=https://www.figma.com/design/6zxupO1ivYTw5qxzAyB0XZ/DSFR---Composants---LAB?node-id=338-984
// source=src/lib/dsfr/DsfrCheckboxesGroup.svelte
// component=DsfrCheckboxesGroup
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

const description = instance.getEnum("Description", BOOLEAN_ENUM);

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

// Instances imbriquées : Checkbox items (récupération dynamique par préfixe)
const checkboxLayers = findInstanceLayers(
  instance,
  " ⚙️ Varier les propriétés - Case à cocher - Item",
);

const checkboxes: {
  label: string;
  hint: string;
  hasHint: boolean;
  required: boolean;
  checked: boolean;
  disabled: boolean;
  size: string;
  validation: string;
  level: string;
}[] = [];

for (const checkboxInstance of checkboxLayers) {
  // Propriétés du checkbox item
  const checkboxSize = safeGet(() => checkboxInstance.getEnum("Taille", { SM: "sm", MD: "md" }));
  const checkboxChecked = safeGet(() => checkboxInstance.getEnum("Coché", BOOLEAN_ENUM));
  const checkboxDisabled = safeGet(() => checkboxInstance.getEnum("Désactivé", BOOLEAN_ENUM));
  const checkboxValidation = safeGet(() =>
    checkboxInstance.getEnum("Validation", {
      Aucune: "none",
      Valide: "valid",
      Erreur: "error",
    }),
  );

  // Instance imbriquée dans le checkbox : "⚙️ Varier les propriétés - Case à cocher"
  const cbInstance = safeGet(() =>
    checkboxInstance.findInstance("⚙️ Varier les propriétés - Case à cocher", {
      traverseInstances: true,
    }),
  );

  let checkboxState = "default";
  if (isInstance(cbInstance)) {
    checkboxState =
      (safeGet(() =>
        cbInstance.getEnum("Niveau", {
          Défaut: "default",
          Indéterminé: "indeterminate",
        }),
      ) as string) || "default";
  }

  // Instance imbriquée dans le checkbox : "⚙️ Varier les propriétés - Libellé"
  const labelInstance = safeGet(() =>
    checkboxInstance.findInstance("⚙️ Varier les propriétés - Libellé", {
      traverseInstances: true,
    }),
  );

  let checkboxLabel = "";
  let checkboxHint = "";
  let checkboxHasHint = false;
  let checkboxRequired = false;

  if (isInstance(labelInstance)) {
    checkboxLabel = labelInstance.getString("Libellé") || "";
    checkboxHint = labelInstance.getString("Texte de description additionnel") || "";
    checkboxHasHint = labelInstance.getBoolean("Description additionnel");
    checkboxRequired = labelInstance.getBoolean("Obligatoire");
  }

  checkboxes.push({
    label: checkboxLabel,
    hint: checkboxHint,
    hasHint: checkboxHasHint,
    required: checkboxRequired,
    checked: checkboxChecked === true,
    disabled: checkboxDisabled === true,
    size: (checkboxSize as string) || "md",
    validation: (checkboxValidation as string) || "none",
    level: checkboxState,
  });
}

// Instance imbriquée : Message de formulaire
// Le nom de l'instance peut différer entre variantes (espace simple/double)
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
const hasDescription = description === true;

// Construction du JSON checkboxes pour l'attribut du web component
const checkboxesJson = checkboxes.map((c, i) => ({
  id: `checkbox-${i + 1}`,
  label: c.label,
  value: `checkbox-${i + 1}`,
  ...(c.hasHint && c.hint ? { hint: c.hint } : {}),
  ...(c.disabled ? { disabled: true } : {}),
  ...(c.required ? { required: true } : {}),
}));

// Code final poussé dans Figma Code Connect
const codeExample = figma.code`<dsfr-checkboxes-group
  id="dsfr-checkboxes-group"
  legend="${legend}"
  ${hasLegendHint && legendHint ? `hint="${legendHint}"` : ""}
  ${status !== "default" ? `status="${status}"` : ""}
  ${status === "error" && errorMessage ? `error-message="${errorMessage}"` : ""}
  ${status === "valid" && hasMessage && validMessage ? `valid-message="${validMessage}"` : ""}
  ${isInline ? "inline" : ""}
  ${isDisabled ? "disabled" : ""}
  ${required ? "required" : ""}
  checkboxes='${JSON.stringify(checkboxesJson)}'
></dsfr-checkboxes-group>`;

export default {
  example: codeExample,
  id: "dsfr-checkboxes-group",
  metadata: {
    nestable: true,
  },
};
