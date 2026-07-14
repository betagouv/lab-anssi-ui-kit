// url=https://www.figma.com/design/6zxupO1ivYTw5qxzAyB0XZ/DSFR---Composants---LAB?node-id=1935-224
// source=src/lib/dsfr/DsfrAlert.svelte
// component=DsfrAlert
import figma from "figma";

// Instance principale du composant
const instance = figma.selectedInstance;

// Mapping des propriétés entre le code et Figma
const hasTitle = instance.getBoolean("Voir Titre");
const title = instance.getString("Titre");
const hasDescription = instance.getBoolean("Voir Description");
const description = instance.getString("Description");

const size = instance.getEnum("Taille", {
  MD: "md",
  SM: "sm",
});

const state = instance.getEnum("État", {
  Succès: "success",
  Erreur: "error",
  Information: "info",
  Avertissement: "warning",
  Défaut: "default",
});

const closeable = instance.getEnum("Fermeture", {
  True: true,
  False: false,
});

// Propriétés calculées
const isDismissible = closeable === true;

// Code final poussé dans Figma Code Connect
const codeExample = figma.code`<dsfr-alert
  ${hasTitle ? `has-title\n title="${title}"` : ""}
  ${hasDescription ? `has-description\n text="${description}"` : ""}
  type="${state}"
  size="${size}"
  ${isDismissible ? "dismissible" : ""}
></dsfr-alert>`;

export default {
  example: codeExample,
  id: "dsfr-alert",
  metadata: {
    nestable: true,
  },
};
