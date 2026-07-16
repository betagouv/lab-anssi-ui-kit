// url=https://www.figma.com/design/6zxupO1ivYTw5qxzAyB0XZ/DSFR---Composants---LAB?node-id=120-4789
// source=src/lib/dsfr/DsfrLink.svelte
// component=DsfrLink
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Taille", {
  SM: "sm",
  MD: "md",
  LG: "lg",
});

const iconPosition = instance.getEnum("Icône", {
  Sans: "none",
  Gauche: "left",
  Droite: "right",
});

const state = instance.getEnum("État", {
  Défaut: "default",
  Survol: "hover",
  Cliqué: "active",
  Désactivé: "disabled",
});

// Instance : "Contenant technique"
const containerInstance = instance.findInstance("📁 Contenant technique", {
  traverseInstances: true,
});
let label = "";
let iconLeftName: string | null = null;
let iconRightName: string | null = null;

if (containerInstance && containerInstance.type === "INSTANCE") {
  label = containerInstance.getString("Libellé lien") || "";

  const instanceIconLeft = containerInstance.getInstanceSwap("Icône gauche");
  if (instanceIconLeft && instanceIconLeft.type === "INSTANCE") {
    iconLeftName = instanceIconLeft.name;
  }

  const instanceIconRight = containerInstance.getInstanceSwap("Icône droite");
  if (instanceIconRight && instanceIconRight.type === "INSTANCE") {
    iconRightName = instanceIconRight.name;
  }
}

const hasIcon = iconPosition !== "none";
const iconPlace = iconPosition === "none" ? "" : iconPosition;
const isDisabled = state === "disabled";
const iconName =
  iconPosition === "left" ? iconLeftName : iconPosition === "right" ? iconRightName : null;

export default {
  example: figma.code`<dsfr-link
  label="${label}"
  size="${size}"
  ${isDisabled ? "disabled" : ""}
  href="#"
  ${hasIcon ? `has-icon\n icon="${iconName}"\n icon-place="${iconPlace}"` : ""}
></dsfr-link>`,
  id: "dsfr-link",
  metadata: {
    nestable: true,
  },
};
