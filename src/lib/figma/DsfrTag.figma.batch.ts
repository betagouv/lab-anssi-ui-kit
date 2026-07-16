import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("Libellé");
const showIcon = instance.getBoolean("Voir icône");

const selected = instance.getEnum("Sélectionné", {
  False: "false",
  True: "true",
});

const dismissible = instance.getEnum("Supprimable", {
  False: "false",
  True: "true",
});

const accent = instance.getEnum("Couleur", {
  "Beige Gris Galet": "beige-gris-galet",
  "Brown Café Crème": "brown-cafe-creme",
  "Brown Caramel": "brown-caramel",
  "Brown Opera": "brown-opera",
  "Blue Cumulus": "blue-cumulus",
  "Blue Ecume": "blue-ecume",
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
});

const disabled = instance.getEnum("Désactivé", {
  False: "false",
  True: "true",
});

// Instance : Icône
const iconInstance = instance.getInstanceSwap("Icône");

let iconName: string | null = null;
if (iconInstance && iconInstance.type === "INSTANCE") {
  iconName = iconInstance.name;
}

const isDisabled = disabled === "true";
const hasIcon = showIcon && iconName;
const isClickable = figma.batch.type === "clickable";
const isPressable = figma.batch.type === "pressable";
const isPressed = selected === "true";
const isDismissible = dismissible === "true";
const type = isClickable
  ? "clickable"
  : isPressable
    ? "pressable"
    : isDismissible
      ? "dismissible"
      : "default";

export default {
  example: figma.code`<dsfr-tag
  label="${label}"
  type="${type}"
  size="${figma.batch.size}"
  ${isClickable ? `href="#"` : ""}
  ${isPressable && isPressed ? `pressed` : ""}
  ${isDisabled ? "disabled" : ""}
  ${hasIcon ? `has-icon\n icon="${iconName}"` : ""}
  ${isClickable && accent && typeof accent === "string" ? `accent="${accent}"` : ""}
></dsfr-tag>`,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
