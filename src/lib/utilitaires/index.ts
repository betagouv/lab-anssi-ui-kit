/**
 * Génère une classe d'icône FR avec validation
 * @param {string} icon - Le nom de l'icône
 * @returns {string} La classe CSS complète ou une classe par défaut
 */
export function setIconClass(icon: string): string | undefined {
  if (!icon || typeof icon !== "string") {
    console.warn("iconClass: La prop `icon` doit être une chaîne de caractères");
    return;
  }

  return `fr-icon-${icon}`;
}
