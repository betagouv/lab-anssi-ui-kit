import figma from "figma";

const instance = figma.selectedInstance;

const showMedia = instance.getBoolean("Voir Média");

const disabled = instance.getEnum("Désactivé", {
  False: "false",
  True: "true",
});

const clickable = instance.getEnum("Cliquable", {
  False: "false",
  True: "true",
});

// Instance : "Média"
// const mediaInstance = instance.findInstance("⚙️ Média", {
//   traverseInstances: true,
// });
// let mediaSwapName: string | null = null;
// let mediaBadgeOrTag = false;
// let mediaBadgeType = "";
// let mediaBadgeLabel = "";
// let mediaBadgeColor = "";

// if (mediaInstance && mediaInstance.type === "INSTANCE") {
//   const mediaSwap = mediaInstance.getInstanceSwap("Instance");
//   if (mediaSwap && mediaSwap.type === "INSTANCE") {
//     mediaSwapName = mediaSwap.name;
//   }
//   mediaBadgeOrTag = mediaInstance.getBoolean("Badge ou tag");

//   const badgeOrTagInstance = mediaInstance.findInstance("Badge ou Tag", {
//     traverseInstances: true,
//   });
//   if (badgeOrTagInstance && badgeOrTagInstance.type === "INSTANCE") {
//     mediaBadgeType = badgeOrTagInstance.getEnum("Type", { Badge: "badge" }) || "";

//     const badge1 = badgeOrTagInstance.findInstance("⚙️ Badge 1", {
//       traverseInstances: true,
//     });
//     if (badge1 && badge1.type === "INSTANCE") {
//       const customBadge = badge1.findInstance("Personnalisable", {
//         traverseInstances: true,
//       });
//       if (customBadge && customBadge.type === "INSTANCE") {
//         mediaBadgeLabel = customBadge.getString("Libellé") || "";
//         mediaBadgeColor =
//           customBadge.getEnum("Couleur", {
//             "Purple Glycine": "purple-glycine",
//           }) || "";
//       }
//     }
//   }
// }

// Instance : "Contenu"
const contentInstance = instance.findInstance("⚙️ Contenu", {
  traverseInstances: true,
});
// let showCustomZone = false;
let showActionZone = false;
let showPrecisionZone = false;
let contentAction = "";

// Corps
let title = "";
let description = "";
let hasDescription = false;

// Zone de précision (Detail Start)
let showBadgeOrTag = false;
let showDetail = false;
let badgeOrTagType = "";
// let tag1Label = "";
// let tag1ShowIcon = false;
// let tag1IconName: string | null = null;
// let tag2Label = "";
// let tag3Label = "";
// let tag4Label = "";
// let tag5Label = "";
// let showTag2 = false;
// let showTag3 = false;
// let showTag4 = false;
// let showTag5 = false;
let detailStartText = "";
let hasDetailStartIcon = false;
let detailStartIconName: string | null = null;

// Zone d'action (Detail End)
// let actionContent = "";
// let actionIconSwapName: string | null = null;
// let actionIconDirection = "";
let detailEndText = "";
let hasDetailEndIcon = false;
let detailEndIconName: string | null = null;

if (contentInstance && contentInstance.type === "INSTANCE") {
  // showCustomZone = contentInstance.getBoolean("Zone personnalisable");
  showActionZone = contentInstance.getBoolean("Zone d'action");
  showPrecisionZone = contentInstance.getBoolean("Zone de précision");
  contentAction = contentInstance.getEnum("Action", { False: "false", True: "true" }) || "";

  // Instance : "Corps"
  const bodyInstance = contentInstance.findInstance("⚙️ Corps", {
    traverseInstances: true,
  });
  if (bodyInstance && bodyInstance.type === "INSTANCE") {
    title = bodyInstance.getString("Titre") || "";
    description = bodyInstance.getString("Texte") || "";
    hasDescription = bodyInstance.getBoolean("Voir Description");
  }

  // Instance : "Zone de précision"
  const precisionZone = contentInstance.findInstance("⚙️ Zone de précision", {
    traverseInstances: true,
  });
  if (precisionZone && precisionZone.type === "INSTANCE") {
    showBadgeOrTag = precisionZone.getBoolean("Badge ou tag");
    showDetail = precisionZone.getBoolean("Détail");

    // Badge ou tag (zone de précision)
    const badgeOrTagContainer = precisionZone.findInstance("⚙️ Badge ou tag", {
      traverseInstances: true,
    });
    if (badgeOrTagContainer && badgeOrTagContainer.type === "INSTANCE") {
      badgeOrTagType =
        badgeOrTagContainer.getEnum("Type", { Badges: "badges", Tags: "tags" }) || "";

      // showTag2 = badgeOrTagContainer.getBoolean("Item 2");
      // showTag3 = badgeOrTagContainer.getBoolean("Item 3");
      // showTag4 = badgeOrTagContainer.getBoolean("Item 4");
      // showTag5 = badgeOrTagContainer.getBoolean("Item 5");

      // const tag1 = badgeOrTagContainer.findInstance("⚙️ Tag 1", {
      //   traverseInstances: true,
      // });
      // if (tag1 && tag1.type === "INSTANCE") {
      //   tag1Label = tag1.getString("Libellé") || "";
      //   tag1ShowIcon = tag1.getBoolean("Voir icône");
      //   const tag1Icon = tag1.getInstanceSwap("Icône");
      //   if (tag1Icon && tag1Icon.type === "INSTANCE") {
      //     tag1IconName = tag1Icon.name;
      //   }
      // }
      // const tag2 = badgeOrTagContainer.findInstance("⚙️ Tag 2", {
      //   traverseInstances: true,
      // });
      // if (tag2 && tag2.type === "INSTANCE") {
      //   tag2Label = tag2.getString("Libellé") || "";
      // }
      // const tag3 = badgeOrTagContainer.findInstance("⚙️ Tag 3", {
      //   traverseInstances: true,
      // });
      // if (tag3 && tag3.type === "INSTANCE") {
      //   tag3Label = tag3.getString("Libellé") || "";
      // }
      // const tag4 = badgeOrTagContainer.findInstance("⚙️ Tag 4", {
      //   traverseInstances: true,
      // });
      // if (tag4 && tag4.type === "INSTANCE") {
      //   tag4Label = tag4.getString("Libellé") || "";
      // }
      // const tag5 = badgeOrTagContainer.findInstance("⚙️ Tag 5", {
      //   traverseInstances: true,
      // });
      // if (tag5 && tag5.type === "INSTANCE") {
      //   tag5Label = tag5.getString("Libellé") || "";
      // }
    }

    // Détail (zone de précision)
    const detailStartInstance = precisionZone.findInstance("⚙️ Détail", {
      traverseInstances: true,
    });

    if (detailStartInstance && detailStartInstance.type === "INSTANCE") {
      detailStartText = detailStartInstance.getString("Texte") || "";
      hasDetailStartIcon = detailStartInstance.getBoolean("Icône");

      const detailStartIconSwap = detailStartInstance.getInstanceSwap("🔄 Icône");

      if (detailStartIconSwap && detailStartIconSwap.type === "INSTANCE") {
        detailStartIconName = detailStartIconSwap.name;
      }
    }
  }

  // Instance : Zone d'action
  const actionZone = contentInstance.findInstance("⚙️ Zone d'action", {
    traverseInstances: true,
  });
  if (actionZone && actionZone.type === "INSTANCE") {
    //   actionContent =
    //     actionZone.getEnum("Contenu", {
    //       "Détail + Icône": "detail-icon",
    //     }) || "";
    //   const actionIconSwap = actionZone.getInstanceSwap("Icône");
    //   if (actionIconSwap && actionIconSwap.type === "INSTANCE") {
    //     actionIconSwapName = actionIconSwap.name;
    //     const actionIcon = actionZone.findInstance("⚙️ Icône", {
    //       traverseInstances: true,
    //     });
    //     if (actionIcon && actionIcon.type === "INSTANCE") {
    //       actionIconDirection =
    //         actionIcon.getEnum("Direction", {
    //           Haut: "up",
    //           Bas: "down",
    //           Gauche: "left",
    //           Droite: "right",
    //         }) || "";
    //     }
    //   }

    const detailEndInstance = actionZone.findInstance("⚙️ Détail", {
      traverseInstances: true,
    });
    if (detailEndInstance && detailEndInstance.type === "INSTANCE") {
      detailEndText = detailEndInstance.getString("Texte") || "";
      hasDetailEndIcon = detailEndInstance.getBoolean("Icône");

      const detailEndIconSwap = detailEndInstance.getInstanceSwap("🔄 Icône");

      if (detailEndIconSwap && detailEndIconSwap.type === "INSTANCE") {
        detailEndIconName = detailEndIconSwap.name;
      }
    }
  }
}

const isDisabled = disabled === "true";
const isClickable = clickable === "true";
const isTag = badgeOrTagType === "tags";
const noLink = !isClickable;

export default {
  example: figma.code`<dsfr-card
  title="${title}"
  ${hasDescription ? `has-description\n description="${description}"` : ""}
  ${showPrecisionZone && showDetail ? `has-detail-start\n detail-start="${detailStartText}"` : ""}
  ${showPrecisionZone && showDetail && hasDetailStartIcon ? `has-detail-start-icon\n detail-start-icon="${detailStartIconName}"` : ""}
  ${showActionZone ? `has-detail-end\n detail-end="${detailEndText}"` : ""}
  // ${showActionZone && hasDetailEndIcon ? `has-detail-end-icon\n  detail-end-icon="${detailEndIconName}"` : ""}
  ${showPrecisionZone && showBadgeOrTag && !isTag ? "has-badge" : ""}
  ${showPrecisionZone && showBadgeOrTag && isTag ? "has-tag" : ""}
  ${isDisabled ? "disabled" : ""}
  size="${figma.batch.size}"
  ${figma.batch.horizontal ? "horizontal" : ""}
  ></dsfr-card>`,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
