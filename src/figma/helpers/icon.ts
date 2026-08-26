import type { InstanceHandle, ErrorHandle } from "figma";

/**
 * Résout le nom d'une icône Figma à partir d'une instance et de sa variante.
 *
 * @param iconInstance - L'instance Figma à analyser, ou une erreur si elle n'est pas valide.
 *
 * @returns Le nom complet de l'icône au format "nom-version", ou null si l'instance n'est pas exploitable.
 */
function getIconName(iconInstance: InstanceHandle | ErrorHandle | undefined): string | null {
  if (!iconInstance || iconInstance.type !== "INSTANCE") return null;

  const name = iconInstance.name;
  const version = iconInstance.getEnum("Version", {
    Contour: "line",
    Pleine: "fill",
  });

  return `${name}-${version || "line"}`;
}

export default getIconName;
