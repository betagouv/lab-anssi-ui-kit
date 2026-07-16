// url=https://www.figma.com/design/6zxupO1ivYTw5qxzAyB0XZ/DSFR---Composants---LAB?node-id=509-157
// source=src/lib/dsfr/DsfrSkipLink.svelte
// component=DsfrSkipLink
import figma from "figma";

const instance = figma.selectedInstance;

function getLinkLabel(index: number): string {
  const linkInstance = instance.findInstance(`⚙️ Varier les propriétés - Lien ${index}`, {
    traverseInstances: true,
  });
  if (linkInstance?.type === "INSTANCE") {
    const container = linkInstance.findInstance("📁 Contenant technique", {
      traverseInstances: true,
    });
    if (container?.type === "INSTANCE") {
      return container.getString("Libellé lien") || "";
    }
  }
  return "";
}

const link1Label = getLinkLabel(1) || "Contenu";
const link2Label = getLinkLabel(2) || "Menu";
const link3Label = getLinkLabel(3) || "Recherche";
const link4Label = getLinkLabel(4) || "Pied de page";

const toSlug = (label: string) => label.toLowerCase().replace(/\s+/g, "-");

const link1Href = `#${toSlug(link1Label)}`;
const link2Href = `#${toSlug(link2Label)}`;
const link3Href = `#${toSlug(link3Label)}`;
const link4Href = `#${toSlug(link4Label)}`;

export default {
  example: figma.code`<dsfr-skiplink
  aria-label="Accès rapide"
  items='[{"label":"${link1Label}","href":"${link1Href}"},{"label":"${link2Label}","href":"${link2Href}"},{"label":"${link3Label}","href":"${link3Href}"},{"label":"${link4Label}","href":"${link4Href}"}]'
></dsfr-skiplink>`,
  id: "dsfr-skiplink",
  metadata: {
    nestable: true,
  },
};
