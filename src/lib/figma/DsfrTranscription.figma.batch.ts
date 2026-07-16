import figma from "figma";

const instance = figma.selectedInstance;

const isExpanded = instance.getEnum("Ouvert", {
  True: true,
  False: false,
});

const title = instance.findText("Transcription");
const titleText = title && title.type === "TEXT" ? title.textContent : "Transcription";

export default {
  example: figma.code`<dsfr-transcription
  id="transcription"
  title="${titleText}"
  ${isExpanded ? "is-expanded" : ""}
>
  <!-- Contenu de la transcription -->
</dsfr-transcription>`,
  id: "dsfr-transcription",
  metadata: {
    nestable: true,
  },
};
