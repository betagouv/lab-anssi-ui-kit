import figma from "figma";

const instance = figma.selectedInstance;

const isExpanded = instance.getEnum("Ouvert", {
  True: true,
  False: false,
});

const hautItem = instance.findInstance("Haut", { traverseInstances: true });
const label = hautItem
  ? hautItem.getString("Intitulé accordéon")
  : instance.getString("Intitulé accordéon");

const etat = hautItem?.getEnum("État", {
  Défaut: "default",
  Survol: "hover",
  Cliqué: "clicked",
});

const courant = hautItem?.getEnum("Courant", {
  True: "true",
  False: "false",
});

const type = hautItem?.getEnum("Type", {
  Défaut: "default",
});

const codeExample = figma.code`<dsfr-accordion
${isExpanded ? "is-expanded" : ""}
  label="${label}"
  content="Contenu de l'accordéon"
></dsfr-accordion>`;

export default {
  example: codeExample,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
