import figma from "figma";
import { getIconName, safeGet, slugify } from "./helpers/index.ts";

// Instance principale du composant
const instance = figma.selectedInstance;

// Mapping des propriétés entre le code et Figma
const iconPlace = instance.getEnum("Icône", {
  Sans: null,
  Droite: "right",
  Gauche: "left",
  Seule: "only",
});

const disabled = instance.getEnum("Désactivé", {
  False: false,
  True: true,
});

const label = instance.getString("Libellé");

const bordure = safeGet(() => instance.getBoolean("Bordure"));

// Instance imbriquée : Icône
const iconInstance = instance.getInstanceSwap("🔄 Icône");

// Propriétés calculées
const iconName = getIconName(iconInstance);
const hasIcon = iconPlace !== null && iconName !== null;
const kind =
  (figma.batch.kind === "tertiary" || figma.batch.kind === "inverted-tertiary") && bordure === false
    ? `${figma.batch.kind}-no-outline`
    : figma.batch.kind;

// Code final poussé dans Figma Code Connect
const codeExample = figma.code`<dsfr-button
  label="${label}"
  kind="${kind}"
  size="${figma.batch.size}"
  ${disabled ? "disabled" : ""}
  ${hasIcon ? "has-icon" : ""}
  ${hasIcon && iconName ? `icon="${iconName}"` : ""}
  ${hasIcon && iconPlace ? `icon-place="${iconPlace}"` : ""}
></dsfr-button>`;

export default {
  example: codeExample,
  id: slugify(figma.batch.name),
  metadata: {
    nestable: true,
  },
};
