// source=src/lib/dsfr/DsfrCard.svelte
// component=DsfrCard
import figma from "figma";
import {
  BOOLEAN_ENUM,
  COLOR_MAP,
  getIconName,
  isInstance,
  safeGet,
  slugify,
} from "./helpers/index.ts";

// Instance principale du composant
const instance = figma.selectedInstance;

// Propriétés de l'instance principale
const disabled = instance.getEnum("Désactivé", BOOLEAN_ENUM);
const clickable = instance.getEnum("Cliquable", BOOLEAN_ENUM);
const showMedia = safeGet(() => instance.getBoolean("Voir Média"));
const hasBorder = safeGet(() => instance.getBoolean("Bordure"));

// Proportions (variantes horizontales uniquement)
const rawProportion = safeGet(() =>
  instance.getEnum("Proportions", {
    "33-66": "tier",
    "40-60": "default",
    "50-50": "half",
  }),
);
const horizontalProportion = typeof rawProportion === "string" ? rawProportion : null;

// Instance imbriquée : "⚙️ Média"
const mediaInstance = safeGet(() => instance.findInstance("⚙️ Média", { traverseInstances: true }));

let mediaSwapName: string | null = null;
let hasHeaderBadge = false;
let headerBadgeLabel = "";
let headerBadgeColor = "";

if (isInstance(mediaInstance)) {
  const mediaSwap = safeGet(() => (mediaInstance as any).getInstanceSwap("Instance"));

  if (mediaSwap && mediaSwap.type === "INSTANCE") {
    mediaSwapName = mediaSwap.name;
  }

  hasHeaderBadge = safeGet(() => mediaInstance.getBoolean("Badge ou tag")) ?? false;

  if (hasHeaderBadge) {
    const headerBadgeOrTagInstance = safeGet(() =>
      mediaInstance.findInstance("Badge ou Tag", { traverseInstances: true }),
    );

    if (isInstance(headerBadgeOrTagInstance)) {
      const badge1 = safeGet(() =>
        headerBadgeOrTagInstance.findInstance("⚙️ Badge 1", { traverseInstances: true }),
      );

      if (isInstance(badge1)) {
        const customBadge = safeGet(() =>
          badge1.findInstance("Personnalisable", { traverseInstances: true }),
        );

        if (isInstance(customBadge)) {
          headerBadgeLabel = customBadge.getString("Libellé") || "";
          headerBadgeColor =
            (safeGet(() => customBadge.getEnum("Couleur", COLOR_MAP)) as string) || "";
        }
      }
    }
  }
}

// ─── Instance imbriquée : "⚙️ Contenu" ─────────────────────────────────────

const contentInstance = safeGet(() =>
  instance.findInstance("⚙️ Contenu", { traverseInstances: true }),
);

let showCustomZone = false;
let showActionZone = false;
let showPrecisionZone = false;
let contentAction: boolean | null = null;

// Corps
let title = "";
let description = "";
let hasDescription = false;
let maxHeight: boolean | null = null;

// Zone de précision (Detail Start)
let showBadgeOrTag = false;
let showDetail = false;
let badgeOrTagType = "";
let detailStartText = "";
let hasDetailStartIcon = false;
let detailStartIconName: string | null = null;

// Tags (zone de précision)
let tag1Label = "";
let tag1ShowIcon = false;
let tag1IconName: string | null = null;
let showTag2 = false;
let tag2Label = "";
let tag2ShowIcon = false;
let tag2IconName: string | null = null;
let showTag3 = false;
let tag3Label = "";
let tag3ShowIcon = false;
let tag3IconName: string | null = null;
let showTag4 = false;
let tag4Label = "";
let tag4ShowIcon = false;
let tag4IconName: string | null = null;
let showTag5 = false;
let tag5Label = "";
let tag5ShowIcon = false;
let tag5IconName: string | null = null;

// Zone d'action (Detail End)
let actionZoneContent = "";
let detailEndText = "";
let hasDetailEndIcon = false;
let detailEndIconName: string | null = null;
let actionIconName: string | null = null;
let actionIconDirection = "";

if (isInstance(contentInstance)) {
  showCustomZone = safeGet(() => contentInstance.getBoolean("Zone personnalisable")) ?? false;
  showActionZone = safeGet(() => contentInstance.getBoolean("Zone d'action")) ?? false;
  showPrecisionZone = safeGet(() => contentInstance.getBoolean("Zone de précision")) ?? false;
  contentAction = safeGet(() => contentInstance.getEnum("Action", BOOLEAN_ENUM));

  // ── Corps ──
  const bodyInstance = safeGet(() =>
    contentInstance.findInstance("⚙️ Corps", { traverseInstances: true }),
  );

  if (isInstance(bodyInstance)) {
    title = bodyInstance.getString("Titre") || "";
    description = bodyInstance.getString("Texte") || "";
    hasDescription = safeGet(() => bodyInstance.getBoolean("Voir Description")) ?? false;
    maxHeight = safeGet(() => bodyInstance.getEnum("Hauteur max (5 lignes)", BOOLEAN_ENUM));
  }

  // ── Zone de précision ──
  const precisionZone = safeGet(() =>
    contentInstance.findInstance("⚙️ Zone de précision", { traverseInstances: true }),
  );

  if (isInstance(precisionZone)) {
    showBadgeOrTag = safeGet(() => precisionZone.getBoolean("Badge ou tag")) ?? false;
    showDetail = safeGet(() => precisionZone.getBoolean("Détail")) ?? false;

    // Badge ou tag
    const badgeOrTagContainer = safeGet(() =>
      precisionZone.findInstance("⚙️ Badge ou tag", { traverseInstances: true }),
    );

    if (isInstance(badgeOrTagContainer)) {
      badgeOrTagType =
        (safeGet(() =>
          badgeOrTagContainer.getEnum("Type", { Badges: "badges", Tags: "tags" }),
        ) as string) || "";

      showTag2 = safeGet(() => badgeOrTagContainer.getBoolean("Item 2")) ?? false;
      showTag3 = safeGet(() => badgeOrTagContainer.getBoolean("Item 3")) ?? false;
      showTag4 = safeGet(() => badgeOrTagContainer.getBoolean("Item 4")) ?? false;
      showTag5 = safeGet(() => badgeOrTagContainer.getBoolean("Item 5")) ?? false;

      // Tag 1
      const tag1 = safeGet(() =>
        badgeOrTagContainer.findInstance("⚙️ Tag 1", { traverseInstances: true }),
      );
      if (isInstance(tag1)) {
        tag1Label = tag1.getString("Libellé") || "";
        tag1ShowIcon = safeGet(() => tag1.getBoolean("Voir icône")) ?? false;
        tag1IconName = getIconName(safeGet(() => (tag1 as any).getInstanceSwap("Icône")));
      }

      // Tag 2
      const tag2 = safeGet(() =>
        badgeOrTagContainer.findInstance("⚙️ Tag 2", { traverseInstances: true }),
      );
      if (isInstance(tag2)) {
        tag2Label = tag2.getString("Libellé") || "";
        tag2ShowIcon = safeGet(() => tag2.getBoolean("Voir icône")) ?? false;
        tag2IconName = getIconName(safeGet(() => (tag2 as any).getInstanceSwap("Icône")));
      }

      // Tag 3
      const tag3 = safeGet(() =>
        badgeOrTagContainer.findInstance("⚙️ Tag 3", { traverseInstances: true }),
      );
      if (isInstance(tag3)) {
        tag3Label = tag3.getString("Libellé") || "";
        tag3ShowIcon = safeGet(() => tag3.getBoolean("Voir icône")) ?? false;
        tag3IconName = getIconName(safeGet(() => (tag3 as any).getInstanceSwap("Icône")));
      }

      // Tag 4
      const tag4 = safeGet(() =>
        badgeOrTagContainer.findInstance("⚙️ Tag 4", { traverseInstances: true }),
      );
      if (isInstance(tag4)) {
        tag4Label = tag4.getString("Libellé") || "";
        tag4ShowIcon = safeGet(() => tag4.getBoolean("Voir icône")) ?? false;
        tag4IconName = getIconName(safeGet(() => (tag4 as any).getInstanceSwap("Icône")));
      }

      // Tag 5
      const tag5 = safeGet(() =>
        badgeOrTagContainer.findInstance("⚙️ Tag 5", { traverseInstances: true }),
      );
      if (isInstance(tag5)) {
        tag5Label = tag5.getString("Libellé") || "";
        tag5ShowIcon = safeGet(() => tag5.getBoolean("Voir icône")) ?? false;
        tag5IconName = getIconName(safeGet(() => (tag5 as any).getInstanceSwap("Icône")));
      }
    }

    // Détail (zone de précision)
    const detailStartInstance = safeGet(() =>
      precisionZone.findInstance("⚙️ Détail", { traverseInstances: true }),
    );

    if (isInstance(detailStartInstance)) {
      detailStartText = detailStartInstance.getString("Texte") || "";
      hasDetailStartIcon = safeGet(() => detailStartInstance.getBoolean("Icône")) ?? false;
      detailStartIconName = getIconName(
        safeGet(() => (detailStartInstance as any).getInstanceSwap("🔄 Icône")),
      );
    }
  }

  // ── Zone d'action ──
  const actionZone = safeGet(() =>
    contentInstance.findInstance("⚙️ Zone d'action", { traverseInstances: true }),
  );

  if (isInstance(actionZone)) {
    actionZoneContent =
      (safeGet(() =>
        actionZone.getEnum("Contenu", {
          Détail: "detail",
          "Détail + Icône": "detail-icon",
        }),
      ) as string) || "";

    actionIconName = getIconName(safeGet(() => (actionZone as any).getInstanceSwap("Icône")));

    const actionIconInstance = safeGet(() =>
      actionZone.findInstance("⚙️ Icône", { traverseInstances: true }),
    );
    if (isInstance(actionIconInstance)) {
      actionIconDirection =
        (safeGet(() =>
          actionIconInstance.getEnum("Direction", {
            Haut: "up",
            Bas: "down",
            Gauche: "left",
            Droite: "right",
          }),
        ) as string) || "";
    }

    // Détail (zone d'action)
    const detailEndInstance = safeGet(() =>
      actionZone.findInstance("⚙️ Détail", { traverseInstances: true }),
    );

    if (isInstance(detailEndInstance)) {
      detailEndText = detailEndInstance.getString("Texte") || "";
      hasDetailEndIcon = safeGet(() => detailEndInstance.getBoolean("Icône")) ?? false;
      detailEndIconName = getIconName(
        safeGet(() => (detailEndInstance as any).getInstanceSwap("🔄 Icône")),
      );
    }
  }
}

// ─── Propriétés calculées ───────────────────────────────────────────────────

const isDisabled = disabled === true;
const isClickable = clickable === true;
const noLink = !isClickable;
const isTag = badgeOrTagType === "tags";
const isBadge = badgeOrTagType === "badges";
const noBorder = hasBorder === false;

// ─── Code final ─────────────────────────────────────────────────────────────

const codeExample = figma.code`<dsfr-card
  title="${title}"
  ${hasDescription ? `has-description\n  description="${description}"` : ""}
  ${showPrecisionZone && showDetail ? `has-detail-start\n  detail-start="${detailStartText}"` : ""}
  ${showPrecisionZone && showDetail && hasDetailStartIcon && detailStartIconName ? `has-detail-start-icon\n  detail-start-icon="${detailStartIconName}"` : ""}
  ${showActionZone ? `has-detail-end\n  detail-end="${detailEndText}"` : ""}
  ${showActionZone && hasDetailEndIcon && detailEndIconName ? `has-detail-end-icon\n  detail-end-icon="${detailEndIconName}"` : ""}
  ${showPrecisionZone && showBadgeOrTag && isBadge ? "has-badge" : ""}
  ${showPrecisionZone && showBadgeOrTag && isTag ? "has-tag" : ""}
  ${hasHeaderBadge ? "has-header-badge" : ""}
  ${noLink ? "no-link" : ""}
  ${isDisabled ? "disabled" : ""}
  ${noBorder ? `variations="no-border"` : ""}
  size="${figma.batch.size}"
  ${figma.batch.horizontal ? "horizontal" : ""}
  ${figma.batch.horizontal && horizontalProportion && horizontalProportion !== "default" ? `horizontal-proportion="${horizontalProportion}"` : ""}
>
${hasHeaderBadge ? '<!-- Insérer ici un composant associé au slot="headerbadges" -->' : ""}
</dsfr-card>`;

export default {
  example: codeExample,
  id: slugify(figma.batch.name),
  metadata: {
    nestable: true,
  },
};
