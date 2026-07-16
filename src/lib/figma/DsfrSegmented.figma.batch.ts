import figma from "figma";

const instance = figma.selectedInstance;

const showLegend = instance.getBoolean("Voir Légende");

const legendPosition = instance.getEnum("Légende", {
  Horizontale: "inline",
  "Au dessus": "above",
});

// Instance : "Label / Légende"
const legendInstance = instance.findInstance(" ⚙️ Varier les propriétés - Label", {
  traverseInstances: true,
});
let legend = "";
let hint = "";
let showHint = false;
let required = false;

if (legendInstance && legendInstance.type === "INSTANCE") {
  legend = legendInstance.getString("Légende") || "";
  hint = legendInstance.getString("Texte de description additionnel") || "";
  showHint = legendInstance.getBoolean("Description additionnel");
  required = legendInstance.getBoolean("Obligatoire");
}

// Instance : "Contrôle segmenté"
const controlInstance = instance.findInstance("Contrôle segmenté", {
  traverseInstances: true,
});
let showItem3 = false;
let showItem4 = false;
let showItem5 = false;
let size = "";

// Segments
let segment1Label = "";
let segment1IconName: string | null = null;
let segment1IconVariant = "";
let segment1State = "";

let segment2Label = "";
let segment2IconName: string | null = null;
let segment2IconVariant = "";
let segment2State = "";

let segment3Label = "";
let segment3IconName: string | null = null;
let segment3IconVariant = "";
let segment3State = "";

let segment4Label = "";
let segment4IconName: string | null = null;
let segment4IconVariant = "";
let segment4State = "";

let segment5Label = "";
let segment5IconName: string | null = null;
let segment5IconVariant = "";
let segment5State = "";

if (controlInstance && controlInstance.type === "INSTANCE") {
  showItem3 = controlInstance.getBoolean("Item 3");
  showItem4 = controlInstance.getBoolean("Item 4");
  showItem5 = controlInstance.getBoolean("Item 5");
  size = controlInstance.getEnum("Taille", { SM: "sm", MD: "md" }) || "";

  // Instance : Segment 1
  const seg1 = controlInstance.findInstance("Segment 1", {
    traverseInstances: true,
  });
  if (seg1 && seg1.type === "INSTANCE") {
    segment1Label = seg1.getString("Libellé") || "";
    segment1State =
      seg1.getEnum("État", {
        "Défaut - sélectionné": "selected",
        Défaut: "default",
        Survol: "hover",
        Cliqué: "active",
      }) || "";
    segment1IconVariant = seg1.getEnum("Icône", { sans: "none" }) || "";

    const seg1Icon = seg1.getInstanceSwap("🔄 Icône");
    if (seg1Icon && seg1Icon.type === "INSTANCE") {
      segment1IconName = seg1Icon.name;
    }
  }

  // Instance : Segment 2
  const seg2 = controlInstance.findInstance("Segment 2", {
    traverseInstances: true,
  });
  if (seg2 && seg2.type === "INSTANCE") {
    segment2Label = seg2.getString("Libellé") || "";
    segment2State =
      seg2.getEnum("État", {
        "Défaut - sélectionné": "selected",
        Défaut: "default",
        Survol: "hover",
        Cliqué: "active",
      }) || "";
    segment2IconVariant = seg2.getEnum("Icône", { sans: "none" }) || "";

    const seg2Icon = seg2.getInstanceSwap("🔄 Icône");
    if (seg2Icon && seg2Icon.type === "INSTANCE") {
      segment2IconName = seg2Icon.name;
    }
  }

  // Instance : Segment 3
  const seg3 = controlInstance.findInstance("Segment 3", {
    traverseInstances: true,
  });
  if (seg3 && seg3.type === "INSTANCE") {
    segment3Label = seg3.getString("Libellé") || "";
    segment3State =
      seg3.getEnum("État", {
        "Défaut - sélectionné": "selected",
        Défaut: "default",
        Survol: "hover",
        Cliqué: "active",
      }) || "";
    segment3IconVariant = seg3.getEnum("Icône", { sans: "none" }) || "";

    const seg3Icon = seg3.getInstanceSwap("🔄 Icône");
    if (seg3Icon && seg3Icon.type === "INSTANCE") {
      segment3IconName = seg3Icon.name;
    }
  }

  // Instance : Segment 4
  const seg4 = controlInstance.findInstance("Segment 4", {
    traverseInstances: true,
  });
  if (seg4 && seg4.type === "INSTANCE") {
    segment4Label = seg4.getString("Libellé") || "";
    segment4State =
      seg4.getEnum("État", {
        "Défaut - sélectionné": "selected",
        Défaut: "default",
        Survol: "hover",
        Cliqué: "active",
      }) || "";
    segment4IconVariant = seg4.getEnum("Icône", { sans: "none" }) || "";

    const seg4Icon = seg4.getInstanceSwap("🔄 Icône");
    if (seg4Icon && seg4Icon.type === "INSTANCE") {
      segment4IconName = seg4Icon.name;
    }
  }

  // Instance : Segment 5
  const seg5 = controlInstance.findInstance("Segment 5", {
    traverseInstances: true,
  });
  if (seg5 && seg5.type === "INSTANCE") {
    segment5Label = seg5.getString("Libellé") || "";
    segment5State =
      seg5.getEnum("État", {
        "Défaut - sélectionné": "selected",
        Défaut: "default",
        Survol: "hover",
        Cliqué: "active",
      }) || "";
    segment5IconVariant = seg5.getEnum("Icône", { sans: "none" }) || "";

    const seg5Icon = seg5.getInstanceSwap("🔄 Icône");
    if (seg5Icon && seg5Icon.type === "INSTANCE") {
      segment5IconName = seg5Icon.name;
    }
  }
}

const isInline = legendPosition === "inline";
const noLegend = !showLegend;
const hasIcon = segment1IconVariant !== "none";

export default {
  example: figma.code`<dsfr-segmented
  size="${size}"
  legend="${legend}"
  ${isInline ? "legend-inline" : ""}
  ${noLegend ? "no-legend" : ""}
  ${showHint && hint ? `hint="${hint}"` : ""}
  ${hasIcon ? "has-icon" : ""}
  elements='[{"id":"seg-1","label":"${segment1Label}","name":"segments","value":"1"${segment1State === "selected" ? ',"checked":true' : ""}},{"id":"seg-2","label":"${segment2Label}","name":"segments","value":"2"${segment2State === "selected" ? ',"checked":true' : ""}}${showItem3 ? `,{"id":"seg-3","label":"${segment3Label}","name":"segments","value":"3"${segment3State === "selected" ? ',"checked":true' : ""}}` : ""}${showItem4 ? `,{"id":"seg-4","label":"${segment4Label}","name":"segments","value":"4"${segment4State === "selected" ? ',"checked":true' : ""}}` : ""}${showItem5 ? `,{"id":"seg-5","label":"${segment5Label}","name":"segments","value":"5"${segment5State === "selected" ? ',"checked":true' : ""}}` : ""}]'
></dsfr-segmented>`,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
