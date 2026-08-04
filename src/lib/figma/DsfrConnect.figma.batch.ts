import figma from "figma";

const instance = figma.selectedInstance;

const plus = instance.getEnum("Plus", {
  False: "false",
  True: "true",
});

const state = instance.getEnum("État", {
  Défaut: "default",
  Survol: "hover",
  Cliqué: "active",
  Désactivé: "disabled",
  Focus: "focus",
});

const isPlus = plus === "true";
const isDisabled = state === "disabled";
const variant = figma.batch.type === "FranceConnect" ? (isPlus ? "plus" : "default") : "pro";

export default {
  example: figma.code`<dsfr-connect
  variant="${variant}"
  ${isDisabled ? "disabled" : ""}
></dsfr-connect>`,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
