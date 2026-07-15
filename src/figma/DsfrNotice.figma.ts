// url=https://www.figma.com/design/6zxupO1ivYTw5qxzAyB0XZ/DSFR---Composants---LAB?node-id=11706-73752
// source=src/lib/dsfr/DsfrNotice.svelte
// component=DsfrNotice
import figma from "figma";
import { isInstance, safeGet } from "./helpers/index.ts";

// Instance principale du composant
const instance = figma.selectedInstance;

// Propriétés de l'instance principale
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

// Instance imbriquée : "Lien"
const linkInstance = safeGet(() => instance.findInstance("Lien", { traverseInstances: true }));

const linkContent = isInstance(linkInstance)
  ? safeGet(() => linkInstance.findInstance("📁 Contenant technique", { traverseInstances: true }))
  : null;

const linkLabel = isInstance(linkContent) ? linkContent.getString("Libellé lien") || "" : "";

// Instance imbriquée : "Bouton Fermer"
const closeButton = safeGet(() =>
  instance.findInstance("🚫 Ne pas changer - Fermer", { traverseInstances: true }),
);

const closeLabel = isInstance(closeButton) ? closeButton.getString("Libellé") || "" : "";

// Code final poussé dans Figma Code Connect
const codeExample = figma.code`<dsfr-notice
  title="${title}"
  ${hasDescription ? `has-description\n  desc="${description}"` : ""}
  ${hasIcon ? "has-icon" : ""}
  type="${alertLevel}"
  ${closeable ? "dismissible" : ""}
  ${closeable && closeLabel ? `button-label="${closeLabel}"` : ""}
  ${hasLink ? `has-link\n  link-label="${linkLabel}"` : ""}
></dsfr-notice>`;

export default {
  example: codeExample,
  id: "dsfr-notice",
  metadata: {
    nestable: true,
  },
};
