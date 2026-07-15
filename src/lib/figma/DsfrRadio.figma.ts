// url=https://www.figma.com/design/6zxupO1ivYTw5qxzAyB0XZ/DSFR---Composants---LAB?node-id=311-24508
// source=src/lib/dsfr/DsfrRadio.svelte
// component=DsfrRadio
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Taille", {
  SM: "sm",
  MD: "md",
});

const disabled = instance.getEnum("Désactivé", {
  True: true,
  False: false,
});

const libelleInstance = instance.findInstance("⚙️ Varier les propriétés - Libellé", {
  traverseInstances: true,
});
const label = libelleInstance?.getString("Libellé");
const hint = libelleInstance?.getString("Texte de description additionnel");
const hasHint = libelleInstance?.getBoolean("Description additionnel");
const required = libelleInstance?.getBoolean("Obligatoire");

const codeExample = figma.code`<dsfr-radio
  label="${label}"
  size="${size}"
  ${hasHint && hint ? `hint="${hint}"` : ""}
  ${disabled ? "disabled" : ""}
  ${required ? "required" : ""}
></dsfr-radio>`;

export default {
  example: codeExample,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
