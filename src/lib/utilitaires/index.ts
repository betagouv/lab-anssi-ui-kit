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

/**
 * Marque un Web Component comme thématisable via l'attribut data-themeable
 * Permet d'appliquer des styles conditionnels basés sur cet attribut
 * @param {HTMLElement | undefined} host - L'élément host du Web Component ($host)
 */
export function setThemeable(host: HTMLElement | undefined): void {
  host?.setAttribute("data-themeable", "true");
}
