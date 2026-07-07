import figma from "figma";

const instance = figma.selectedInstance;

let iconPlace;
switch (instance.getString("Icône")) {
  case "Droite":
    iconPlace = "right";
    break;
  case "Gauche":
    iconPlace = "left";
    break;
  case "Seule":
    iconPlace = "only";
    break;
  default:
    break;
}

const disabled = instance.getBoolean("Désactivé");

let iconName: string | null = null;
let iconVersion = "line-tii";

const iconInstance = instance.getInstanceSwap("🔄 Icône");
if (iconInstance && iconInstance.type === "INSTANCE") {
  iconName = iconInstance.name;

  const version = iconInstance.getEnum("Version", {
    Contour: "line",
    Pleine: "fill",
  });

  if (version) {
    iconVersion = version;
  }
}

const hasIcon = !!iconInstance;
const computedIconName = iconName ? `${iconName}-${iconVersion}` : null;
const label = instance.getString("Libellé");

const codeExample = figma.code`<dsfr-button
  label="${label}"
  kind="${figma.batch.kind}"
  size="${figma.batch.size}"
  ${disabled ? "disabled" : ""}
  ${hasIcon ? "has-icon" : ""}
  ${hasIcon ? `icon="${computedIconName}"` : ""}
  ${hasIcon && iconPlace ? `icon-place="${iconPlace}"` : ""}
></dsfr-button>`;

export default {
  example: codeExample,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
