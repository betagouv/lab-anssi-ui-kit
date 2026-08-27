import figma from "figma";
import { COLOR_MAP, STATUS_MAP, TYPE_ENUM, safeGet, slugify } from "./helpers/index.ts";

// Instance principale du composant
const instance = figma.selectedInstance;

// Instance imbriquée : Type
const typeInstance = figma.batch.type ? null : safeGet(() => instance.getEnum("Type", TYPE_ENUM));

const computedInstance = typeInstance
  ? (safeGet(() => instance.findInstance(`${typeInstance}`, { traverseInstances: true })) ??
    instance)
  : instance;

// Mapping des propriétés entre le code et Figma
const label = computedInstance.getString("Libellé");

const hasIcon = safeGet(
  () =>
    computedInstance.getEnum("Icône", {
      True: true,
      False: false,
    }),
  null,
);

const accent = safeGet(() => computedInstance.getEnum("Couleur", COLOR_MAP));

// Propriétés calculées
const type =
  figma.batch.type ??
  (typeInstance === "Personnalisable" ? "accent" : typeInstance ? "status" : undefined);

const showNoIcon = type === "status" && hasIcon === false;

const status = figma.batch.status ?? (typeInstance ? STATUS_MAP[typeInstance] : undefined);

// Code final poussé dans Figma Code Connect
const codeExample = figma.code`<dsfr-badge
  label="${label}"
  ${type ? `type="${type}"` : ""}
  ${status ? `status="${status}"` : ""}
  ${type === "accent" && accent ? `accent="${accent}"` : ""}
  size="${figma.batch.size}"
  ${showNoIcon ? "has-no-icon" : ""}
></dsfr-badge>`;

export default {
  example: codeExample,
  id: slugify(figma.batch.name),
  metadata: {
    nestable: true,
    props: {
      label,
      type: type ?? "",
      status: status ?? "",
      accent: type === "accent" && accent ? accent : "",
      hasNoIcon: showNoIcon ? "true" : "",
    },
  },
};
