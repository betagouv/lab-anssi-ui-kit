// url=https://www.figma.com/design/6zxupO1ivYTw5qxzAyB0XZ/DSFR---Composants---LAB?node-id=3539-147529
// source=src/lib/dsfr/DsfrQuote.svelte
// component=DsfrQuote
import figma from "figma";

const instance = figma.selectedInstance;

const hasIllustration = instance.getEnum("Illustration", {
  False: "false",
  True: "true",
});

const hasAuthor = instance.getEnum("Auteur", {
  False: "false",
  True: "true",
});

const hasDetail = instance.getEnum("Détail", {
  False: "false",
  True: "true",
});

// Instance : "Contenant technique"
const container = instance.findInstance("📁 Contenant technique", {
  traverseInstances: true,
});

let quoteAuthor = "";
let quoteText = "";

if (container && container.type === "INSTANCE") {
  quoteAuthor = container.getString("Auteur") || "";
  quoteText = container.getString("Témoignage") || "";
}

// Instance : "Illustration"
const illustration = instance.findInstance("🔄 Contenu en symbole - 1:1", {
  traverseInstances: true,
});
let illustrationTheme = "";
if (illustration && illustration.type === "INSTANCE") {
  illustrationTheme = illustration.getEnum("Thème", { Clair: "light" }) || "";
}

// Instance : "Détail"
const detailInstance = instance.findInstance("👁️ Masquer si besoin - Détail", {
  traverseInstances: true,
});
let detailText = "";
if (detailInstance && detailInstance.type === "INSTANCE") {
  detailText = detailInstance.getString("Détail") || "";
}

const showAuthor = hasAuthor === "true";
const showImage = hasIllustration === "true";
const showDetails = hasDetail === "true";

export default {
  example: figma.code`<dsfr-quote
  text="${quoteText}"
  ${showAuthor ? `has-author\n author="${quoteAuthor}"` : ""}
  ${showDetails ? "has-details" : ""}
  ${detailText ? `sources="${detailText}"` : ""}
  ${showImage ? "has-image" : ""}
></dsfr-quote>`,
  id: "dsfr-quote",
  metadata: {
    nestable: true,
  },
};
