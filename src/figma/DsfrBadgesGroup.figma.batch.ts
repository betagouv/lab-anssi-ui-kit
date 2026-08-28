import figma from "figma";
import {
  BOOLEAN_ENUM,
  COLOR_MAP,
  STATUS_MAP,
  TYPE_ENUM,
  findInstanceLayers,
  safeGet,
  slugify,
} from "./helpers/index.ts";

// Instance principale du composant
const instance = figma.selectedInstance;

// Propriétés de l'instance principale
const hasBadge3 = safeGet(() => instance.getBoolean("Badge 3"), true);
const hasBadge4 = safeGet(() => instance.getBoolean("Badge 4"), true);

// Récupération dynamique de l'intégralité des sous-instances/couches Badge
const badgeLayers = findInstanceLayers(instance, "Badge");

// Construction du tableau de badges
const badges: Record<string, unknown>[] = [];

for (const layer of badgeLayers) {
  if (layer.type !== "INSTANCE") continue;
  if (layer.name === "Badge 3" && !hasBadge3) continue;
  if (layer.name === "Badge 4" && !hasBadge4) continue;

  // VARIANT — Type du badge imbriqué
  const typeValue = safeGet(() => layer.getEnum("Type", TYPE_ENUM));

  // Sous-instance correspondant au type sélectionné
  const subInstance = typeValue
    ? safeGet(() => layer.findInstance(typeValue, { traverseInstances: true }))
    : null;

  const badgeInstance = subInstance ?? layer;

  // TEXT — Libellé
  const label = safeGet(() => badgeInstance.getString("Libellé"), layer.name);

  // Propriétés dérivés
  const badgeType = typeValue === "Personnalisable" ? "accent" : typeValue ? "status" : undefined;
  const status = typeValue && typeValue !== "Personnalisable" ? STATUS_MAP[typeValue] : undefined;

  const accent =
    badgeType === "accent" ? safeGet(() => badgeInstance.getEnum("Couleur", COLOR_MAP)) : undefined;

  const hasIcon = safeGet(() => badgeInstance.getEnum("Icône", BOOLEAN_ENUM), null);
  const hasNoIcon = badgeType === "status" && hasIcon === false ? true : undefined;

  const badge: Record<string, unknown> = { label };

  if (badgeType) badge.type = badgeType;
  if (status) badge.status = status;
  if (accent) badge.accent = accent;
  if (hasNoIcon) badge.hasNoIcon = true;

  badges.push(badge);
}

// Code final poussé dans Figma Code Connect
const codeExample = figma.code`<dsfr-badges-group
  badges='${JSON.stringify(badges)}'
  size="${figma.batch.size}"
></dsfr-badges-group>`;

export default {
  example: codeExample,
  id: slugify(figma.batch.name),
  metadata: {
    nestable: true,
  },
};
