import figma from "figma";
import { BOOLEAN_ENUM, getIconName, safeGet, slugify } from "./helpers/index.ts";

const ACCENT_MAP: Record<string, string> = {
  "Beige Gris Galet": "beige-gris-galet",
  "Blue Cumulus": "blue-cumulus",
  "Blue Ecume": "blue-ecume",
  "Brown Caramel": "brown-caramel",
  "Brown Café Crème": "brown-cafe-creme",
  "Brown Opera": "brown-opera",
  "Green Archipel": "green-archipel",
  "Green Bourgeon": "green-bourgeon",
  "Green Emeraude": "green-emeraude",
  "Green Menthe": "green-menthe",
  "Green Tilleul Verveine": "green-tilleul-verveine",
  "Orange Terre Battue": "orange-terre-battue",
  "Pink Macaron": "pink-macaron",
  "Pink Tuile": "pink-tuile",
  "Purple Glycine": "purple-glycine",
  "Yellow Moutarde": "yellow-moutarde",
  "Yellow Tournesol": "yellow-tournesol",
};

// Instance principale du composant
const instance = figma.selectedInstance;

// Instance imbriquée "Mise en avant" (cas du "Component set" Accentuation)
const calloutInstance = safeGet(() =>
  instance.findInstance("Mise en avant", { traverseInstances: true }),
);

const currentInstance =
  calloutInstance && calloutInstance.type === "INSTANCE" ? calloutInstance : instance;

// Mapping des propriétés entre le code et Figma
const showIcon = currentInstance.getEnum("Icône", BOOLEAN_ENUM);
const showButton = currentInstance.getEnum("Bouton", BOOLEAN_ENUM);

// Instance imbriquée : "📁 Contenant technique"
const containerInstance = currentInstance.findInstance("📁 Contenant technique", {
  traverseInstances: true,
});

// Propriétés calculées
let hasTitle = false;
let title = "";
let description = "";

if (containerInstance && containerInstance.type === "INSTANCE") {
  hasTitle = containerInstance.getBoolean("Voir Titre");
  title = containerInstance.getString("Titre") || "";
  description = containerInstance.getString("Description") || "";
}

// --- Props "Icône" (descendant dans le container) ---
let iconName: string | null = null;
if (containerInstance && containerInstance.type === "INSTANCE") {
  const iconChild = containerInstance.findInstance("Icône");
  iconName = getIconName(iconChild);
}

// --- Props du bouton (descendant dans le container) ---
let buttonLabel = "";

if (containerInstance && containerInstance.type === "INSTANCE") {
  const lightButton = safeGet(() => containerInstance.findInstance("Thème clair / Primaire / MD"));
  const darkButton = safeGet(() => containerInstance.findInstance("Thème sombre / Primaire / MD"));
  const buttonInstance =
    (lightButton && lightButton.type === "INSTANCE" ? lightButton : null) ??
    (darkButton && darkButton.type === "INSTANCE" ? darkButton : null);

  if (buttonInstance) {
    buttonLabel = buttonInstance.getString("Libellé") || "";
  }
}

// --- Prop "Accentuation" (uniquement sur le wrapper "Mise en avant - Accentuation") ---
const accent = safeGet(() => instance.getEnum("Accentuation", ACCENT_MAP));

// Propriétés calculées
const hasIcon = showIcon === true;
const hasButton = showButton === true;

// Code final poussé dans Figma Code Connect
const codeExample = figma.code`<dsfr-callout
  ${hasTitle ? `has-title\n  title="${title}"` : ""}
  text="${description}"
  ${hasIcon && iconName ? `has-icon\n icon="${iconName}"` : ""}
  ${hasButton && buttonLabel ? `has-button\n   button-label="${buttonLabel}"` : ""}
  ${accent && typeof accent === "string" ? `accent="${accent}"` : ""}
></dsfr-callout>`;

export default {
  example: codeExample,
  id: slugify(figma.batch.name),
  metadata: {
    nestable: true,
  },
};
