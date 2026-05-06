export { getIconsStyleSheet, withIconsStyleSheet } from "./icons-stylesheet";

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
 * @param {boolean} [active=true] - Indique si le thème est actif ou non
 */

export function setThemeable(host: HTMLElement | undefined, active: boolean = true): void {
  if (!host) return;

  if (host.hasAttribute("data-themeable") && host.getAttribute("data-themeable") === "false")
    return;

  host.setAttribute("data-themeable", active ? "true" : "false");
}
