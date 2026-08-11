import figma from "figma";

const instance = figma.selectedInstance;
const calloutInstance = instance.findInstance("Mise en avant", { traverseInstances: true });
const currentInstance =
  calloutInstance && calloutInstance.type === "INSTANCE" ? calloutInstance : instance;

const showIcon = currentInstance.getEnum("Icône", {
  False: "false",
  True: "true",
});

const showButton = currentInstance.getEnum("Bouton", {
  False: "false",
  True: "true",
});

// Instance : "Contenant technique"
const containerInstance = instance.findInstance("📁 Contenant technique", {
  traverseInstances: true,
});

let hasTitle = false;
let title = "";
let description = "";
if (containerInstance && containerInstance.type === "INSTANCE") {
  hasTitle = containerInstance.getBoolean("Voir Titre");
  title = containerInstance.getString("Titre") || "";
  description = containerInstance.getString("Description") || "";
}

// Instance : "Icône"
const iconInstance = instance.findInstance("Icône", { traverseInstances: true });

let iconName = "";
if (iconInstance && iconInstance.type === "INSTANCE") {
  iconName = iconInstance.name || "";
}

// Instance : "Bouton"
const buttonInstance = instance.findInstance("Thème clair / Primaire / MD", {
  traverseInstances: true,
});
let buttonLabel = "";
if (buttonInstance && buttonInstance.type === "INSTANCE") {
  buttonLabel = buttonInstance.getString("Libellé") || "";
}

const accent = instance.getEnum("Accentuation", {
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
});

const hasIcon = showIcon === "true";
const hasButton = showButton === "true";

export default {
  example: figma.code`<dsfr-callout
  ${hasTitle ? `has-title\n title="${title}"` : ""}
  text="${description}"
  ${hasIcon ? `has-icon\n icon="${iconName}"` : ""}
  ${hasButton ? `has-button\n button-label="${buttonLabel}"` : ""}
  ${accent && typeof accent === "string" ? `accent="${accent}"` : ""}
></dsfr-callout>`,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
