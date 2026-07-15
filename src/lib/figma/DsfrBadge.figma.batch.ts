import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("Libellé");

const hasIcon = instance.getEnum("Icône", {
  True: true,
  False: false,
});

const showIcon = hasIcon === true;

const codeExample = figma.code`<dsfr-badge
  label="${label}"
  type="${figma.batch.type}"
  ${figma.batch.status ? `status="${figma.batch.status}"` : ""}
  ${figma.batch.accent ? `accent="${figma.batch.accent}"` : ""}
  size="${figma.batch.size}"
  ${showIcon ? "has-icon" : ""}
></dsfr-badge>`;

export default {
  example: codeExample,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
