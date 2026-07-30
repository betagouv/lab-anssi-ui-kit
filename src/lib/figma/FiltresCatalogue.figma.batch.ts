import figma from "figma";

const instance = figma.selectedInstance;

const horizontal = figma.batch.horizontal;
let filtres: { icone: string; libelle: string | undefined; valeur: string }[] = [];
let filtreActif: boolean | string | undefined;

if (!horizontal) {
  const item4Visible = instance.getBoolean("Item 4");
  const item5Visible = instance.getBoolean("Item 5");

  // Instance : "Item 1 (Bandeau filtres / Élément / Verticale)"
  const filtre1 = instance.findInstance("Item 1", { traverseInstances: true });
  const filtre1Libelle = filtre1?.getString("Libellé");
  const filtre1Courant = filtre1?.getEnum("Courant", {
    True: "true",
    False: "false",
  });

  // Instance : "Item 2"
  const filtre2 = instance.findInstance("Item 2", { traverseInstances: true });
  const filtre2Libelle = filtre2?.getString("Libellé");
  const filtre2Courant = filtre2?.getEnum("Courant", {
    True: "true",
    False: "false",
  });

  // Instance : "Item 3"
  const item3 = instance.findInstance("Item 3", { traverseInstances: true });
  const filtre3Libelle = item3?.getString("Libellé");
  const filtre3Courant = item3?.getEnum("Courant", {
    True: "true",
    False: "false",
  });

  // Instance : "Item 4"
  const filtre4 = item4Visible && instance.findInstance("Item 4", { traverseInstances: true });
  const filtre4Libelle = item4Visible && filtre4?.getString("Libellé");
  const filtre4Courant =
    item4Visible &&
    filtre4?.getEnum("Courant", {
      True: "true",
      False: "false",
    });

  // Instance : "Item 5"
  const filtre5 = item5Visible && instance.findInstance("Item 5", { traverseInstances: true });
  const filtre5Libelle = item5Visible && filtre5?.getString("Libellé");
  const filtre5Courant =
    item5Visible &&
    filtre5?.getEnum("Courant", {
      True: "true",
      False: "false",
    });
  const valeursCourantes = [filtre1Courant, filtre2Courant, filtre3Courant];
  filtreActif =
    valeursCourantes.find((valeur) => valeur === "true") &&
    `filtre-${valeursCourantes.indexOf("true") + 1}`;

  filtres = [
    { icone: "<!-- SVG icône -->", libelle: filtre1Libelle, valeur: "filtre-1" },
    { icone: "<!-- SVG icône -->", libelle: filtre2Libelle, valeur: "filtre-2" },
    { icone: "<!-- SVG icône -->", libelle: filtre3Libelle, valeur: "filtre-3" },
    ...(item4Visible
      ? [{ icone: "<!-- SVG icône -->", libelle: filtre4Libelle, valeur: "filtre-4" }]
      : []),
    ...(item5Visible
      ? [{ icone: "<!-- SVG icône -->", libelle: filtre5Libelle, valeur: "filtre-5" }]
      : []),
  ];
} else {
  const avecItem5 = instance.getBoolean("Item 5");

  for (let i = 1; i <= (avecItem5 ? 5 : 4); i++) {
    const filtre = instance.findInstance("Thème clair / Bandeau filtres / Élément / Horizontale", {
      traverseInstances: true,
    });
    const filtreLibelle = filtre?.getString("Libellé");
    const filtreCourant = filtre?.getEnum("Courant", {
      True: "true",
      False: "false",
    });

    filtreActif = filtreCourant === "true" && `filtre-${i}`;

    filtres.push({
      icone: "<!-- SVG icône -->",
      libelle: filtreLibelle,
      valeur: `filtre-${i}`,
    });
  }
}

const codeExample = figma.code`<lab-anssi-filtres
  filtres='${JSON.stringify(filtres)}'
  ${figma.batch.horizontal ? "horizontal" : ""}
  ${filtreActif ? `valeur="${filtreActif}"` : ""}
></lab-anssi-filtres>`;

export default {
  example: codeExample,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
