// url=https://www.figma.com/design/6zxupO1ivYTw5qxzAyB0XZ/DSFR---Composants---LAB?node-id=11706-73752
// source=src/lib/dsfr/DsfrNotice.svelte
// component=DsfrNotice
import figma from "figma";

const instance = figma.selectedInstance;

const title = instance.getString("Titre");
const description = instance.getString("Description");
const hasDescription = instance.getBoolean("Voir description");
const hasLink = instance.getBoolean("Voir le lien");
const hasIcon = instance.getBoolean("Voir icône");
const closeable = instance.getBoolean("Fermeture");

const alertLevel = instance.getEnum("Niveau d'alerte", {
  Information: "info",
  Alerte: "alert",
  Avertissement: "warning",
  "Vigilance orange": "weather-orange",
  "Vigilance rouge": "weather-red",
  "Vigilance violette": "weather-purple",
  "Appel à témoins": "witness",
  "Alerte technologique": "cyberattack",
  "Alerte attentat": "attack",
});

// Instance : "Lien"
const linkInstance = instance.findInstance("Lien", {
  traverseInstances: true,
});

let linkLabel = "";
if (linkInstance && linkInstance.type === "INSTANCE") {
  const linkContent = linkInstance.findInstance("📁 Contenant technique", {
    traverseInstances: true,
  });
  if (linkContent && linkContent.type === "INSTANCE") {
    linkLabel = linkContent.getString("Libellé lien") || "";
  }
}

// Instance : "Bouton Fermer"
const closeButton = instance.findInstance("🚫 Ne pas changer - Fermer", {
  traverseInstances: true,
});
let closeLabel = "";
if (closeButton && closeButton.type === "INSTANCE") {
  closeLabel = closeButton.getString("Libellé") || "";
}

export default {
  example: figma.code`<dsfr-notice
  title="${title}"
  ${hasDescription ? `has-description\n  desc="${description}"` : ""}
  ${hasIcon ? "has-icon" : ""}
  type="${alertLevel}"
  ${closeable ? "dismissible" : ""}
  ${closeable && closeLabel ? `button-label="${closeLabel}"` : ""}
  ${hasLink ? `has-link\n  link-label="${linkLabel}"` : ""}
></dsfr-notice>`,
  id: "dsfr-notice",
  metadata: {
    nestable: true,
  },
};
