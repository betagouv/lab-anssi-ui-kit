/**
 * Génère une classe d'icône FR avec validation
 * @param {string} icon - Le nom de l'icône
 * @returns {string} La classe CSS complète ou une classe par défaut
 */
export function setIconClass(
  icon: string,
  { optional }: { optional: boolean },
): string | undefined {
  if (!optional && (!icon || typeof icon !== "string")) {
    console.warn("iconClass: La prop `icon` doit être une chaîne de caractères");
    return;
  }

  if (optional && icon === undefined) {
    return undefined;
  }

  return `fr-icon-${icon}`;
}
