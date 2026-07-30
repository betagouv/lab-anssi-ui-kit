import figma from "figma";

const instance = figma.selectedInstance;

// Instance : "Ancres" (Ancres - Groupe)
// const ancres = instance.findInstance("Ancres", { traverseInstances: true });

const segment2Visible = instance.getBoolean("Segment 2");
const segment3Visible = instance.getBoolean("Segment 3");
const segment4Visible = instance.getBoolean("Segment 4");
const segment5Visible = instance.getBoolean("Segment 5");

// Instance : "Segment 1 - Premier" (Éléments / Ancres)
const segment1 = instance.findInstance("Segment 1 - Premier", { traverseInstances: true });
const segment1Text = segment1?.getString("Text");
const segment1Active = segment1?.getEnum("Active", {
  True: "true",
  False: "false",
});

// Instance : "Segment 2"
const segment2 = segment2Visible && instance.findInstance("Segment 2", { traverseInstances: true });
const segment2Text = segment2 && segment2?.getString("Text");
const segment2Active =
  segment2 &&
  segment2?.getEnum("Active", {
    True: "true",
    False: "false",
  });

// Instance : "Segment 3"
const segment3 = segment3Visible && instance.findInstance("Segment 3", { traverseInstances: true });
const segment3Text = segment3 && segment3?.getString("Text");
const segment3Active =
  segment3 &&
  segment3?.getEnum("Active", {
    True: "true",
    False: "false",
  });

// Instance : "Segment 4"
// const segment4 = segment4Visible && instance.findInstance("Segment 4", { traverseInstances: true });
// const segment4Text = segment4Visible && segment4?.getString("Text");
// const segment4Active =
//   segment4Visible &&
//   segment4?.getEnum("Active", {
//     True: "true",
//     False: "false",
//   });

// Instance : "Segment 5"
// const segment5 = segment5Visible && instance.findInstance("Segment 5", { traverseInstances: true });
// const segment5Text = segment5Visible && segment5?.getString("Text");
// const segment5Active =
//   segment5Visible &&
//   segment5?.getEnum("Active", {
//     True: "true",
//     False: "false",
//   });

// Instance : "Segment 6 - Dernier"
// const segment6 = instance.findInstance("Segment 6 - Dernier", { traverseInstances: true });
// const segment6Text = segment6?.getString("Text");
// const segment6Active = segment6?.getEnum("Active", {
//   True: "true",
//   False: "false",
// });

// Descendant : "Surcouche scroll mobile" (×2)
// - Lié à "Surcouche scroll droit" (visibilité)
// - Lié à "Surcouche scroll gauche" (visibilité)
// Chaque surcouche possède : Thème (VARIANT : Clair)

const allSegments = [
  { text: segment1Text, active: segment1Active },
  ...(segment2Visible ? [{ text: segment2Text, active: segment2Active }] : []),
  ...(segment3Visible ? [{ text: segment3Text, active: segment3Active }] : []),
  // ...(segment4Visible ? [{ text: segment4Text, active: segment4Active }] : []),
  // ...(segment5Visible ? [{ text: segment5Text, active: segment5Active }] : []),
  // { text: segment6Text, active: segment6Active },
];

const indexActif = allSegments.findIndex((s) => s.active === "true");
const ancresData = allSegments.map((s, i) => ({
  label: s.text,
  cible: `#section-${i + 1}`,
}));

const codeExample = figma.code`<lab-anssi-ancres
  ancres='${JSON.stringify(ancresData)}'
  ${indexActif > 0 ? `index-actif="${indexActif}"` : ""}
></lab-anssi-ancres>`;

export default {
  example: codeExample,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
