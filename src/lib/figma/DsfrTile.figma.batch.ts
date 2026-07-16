// url=https://www.figma.com/design/6zxupO1ivYTw5qxzAyB0XZ/DSFR---Composants---LAB?node-id=19187-356872
// source=src/lib/dsfr/DsfrTile.svelte
// component=DsfrTile
import figma from "figma";

const instance = figma.selectedInstance;

const orientation = instance.getEnum("Orientation", {
  Horizontale: "horizontal",
  Verticale: "vertical",
});

const size = instance.getEnum("Taille", {
  SM: "sm",
  MD: "md",
  "LG (lab)": "lg",
});

const fixedHeight = instance.getEnum("Hauteur fixe", {
  True: true,
  False: false,
});

// const state = instance.getEnum("État", {
//   Default: "default",
//   Survol: "hover",
//   Cliqué: "active",
// });

const disabled = instance.getEnum("Désactivé", {
  True: true,
  False: false,
});

const clickable = instance.getEnum("Cliquable", {
  True: true,
  False: false,
});

const bottomBorder = instance.getBoolean("Bordure basse");
const shadow = instance.getBoolean("Ombre");
const showPictogram = instance.getBoolean("Voir Picto");

// Instance : Pictogramme
const pictogramInstance = instance.getInstanceSwap("Pictogramme");
let pictogramName: string | null = null;
if (pictogramInstance && pictogramInstance.type === "INSTANCE") {
  pictogramName = pictogramInstance.name;
}

// Instance : "Contenu imbriqué"
const contenu = instance.findInstance("⚙️ Varier les propriétés - Contenu", {
  traverseInstances: true,
});
let showPrecisionZone = false;
let showActionZone = false;
if (contenu && contenu.type === "INSTANCE") {
  showPrecisionZone = contenu.getBoolean("Voir Zone de précision");
  showActionZone = contenu.getBoolean("Voir Zone d'action");
}

// Instance : "Badge ou tag" (zone de précision)
const badgeOrTag = instance.findInstance("⚙️ Badge ou tag", {
  traverseInstances: true,
});
let badgeOrTagType = "Badge";
if (badgeOrTag && badgeOrTag.type === "INSTANCE") {
  badgeOrTagType = badgeOrTag.getEnum("Type", { Badge: "badge", Tag: "tag" }) || "badge";
}

const badgeInstance = instance.findInstance("⚙️ Varier les propriétés - Badge 1", {
  traverseInstances: true,
});
let badgeLabel = "";
let badgeAccent = "";
if (badgeInstance && badgeInstance.type === "INSTANCE") {
  badgeLabel = badgeInstance.getString("Libellé") || "";
  badgeAccent = badgeInstance.getEnum("Couleur", { "Purple Glycine": "purple-glycine" }) || "";
}

// Instance : "Zone d'action"
const zoneAction = instance.findInstance("⚙️ Zone d'action", {
  traverseInstances: true,
});
let details = "";
let hasDetails = false;
let showActionIcon = false;
let actionIconName: string | null = null;
if (zoneAction && zoneAction.type === "INSTANCE") {
  details = zoneAction.getString("Détails") || "";
  hasDetails = showActionZone && zoneAction.getBoolean("Voir Détails");
  showActionIcon = zoneAction.getBoolean("Voir Icône");

  const actionIcon = zoneAction.getInstanceSwap("Icône");
  if (actionIcon && actionIcon.type === "INSTANCE") {
    actionIconName = actionIcon.name;
  }
}

// Instance : "Corps"
const corps = instance.findInstance("⚙️ Corps", { traverseInstances: true });

let title = "Titre de la tuile";
let description = "";
let hasDescription = false;

if (corps && corps.type === "INSTANCE") {
  title = corps.getString("Titre") || title;
  description = corps.getString("Description") || "";
  hasDescription = corps.getBoolean("Voir Description");
}

const isHorizontal = orientation === "horizontal";
const isDisabled = disabled === true;
const hasBadge = showPrecisionZone && badgeOrTagType === "badge";
const hasTag = showPrecisionZone && badgeOrTagType === "tag";
const noLink = clickable === false;
const variations = shadow ? "shadow" : "none";

export default {
  example: figma.code`<dsfr-tile
  title="${title}"
  ${hasDescription ? `has-description\n description="${description}"` : ""}
  ${hasDetails ? `has-details\n  details="${details}"` : ""}
  ${showPictogram && pictogramName ? `pictogram-name="${pictogramName}"` : ""}
  ${hasBadge ? `has-badge` : ""}
  ${hasTag ? `has-tag` : ""}
  ${noLink ? "no-link" : ""}
  ${isDisabled ? "disabled" : ""}
  size="${size}"
  ${isHorizontal ? "horizontal" : ""}>
    ${hasBadge ? `<dsfr-badge slot="badge" label="${badgeLabel}" type="accent" accent="${badgeAccent}"></dsfr-badge>` : ""}
    ${showPictogram && pictogramName ? `<slot name="pictogram"><!-- Insérer ici le pictogramme --></slot>` : ""}
  </dsfr-tile>`,
  id: "dsfr-tile",
  metadata: {
    nestable: true,
  },
};

// ${variations !== "none" ? `variations="${variations}"` : ""}
