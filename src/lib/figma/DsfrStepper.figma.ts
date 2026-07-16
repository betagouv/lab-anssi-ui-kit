// url=https://www.figma.com/design/6zxupO1ivYTw5qxzAyB0XZ/DSFR---Composants---LAB?node-id=12356-77678
// source=src/lib/dsfr/DsfrStepper.svelte
// component=DsfrStepper
import figma from "figma";

const instance = figma.selectedInstance;

const showNextStep = instance.getBoolean("Étape suivante");
const title = instance.getString("Titre");
const nextStepTitle = instance.getString("Pochaine étape");
const hideDetails = !showNextStep;

const stepCount = instance.getEnum("Étapes", {
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
});

export default {
  example: figma.code`<dsfr-stepper
  title="${title}"
  ${!hideDetails && nextStepTitle ? `next-step="${nextStepTitle}"` : ""}
  current-step="1"
  step-count="${stepCount}"
  ${hideDetails ? "hide-details" : ""}
></dsfr-stepper>`,
  id: "dsfr-stepper",
  metadata: {
    nestable: true,
  },
};
