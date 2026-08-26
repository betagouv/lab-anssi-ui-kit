/**
 * Exécute un accès à une propriété Figma et retourne un fallback si la propriété n'existe pas.
 *
 * Utile pour les propriétés qui n'existent que sur certaines variantes d'un composant
 * (ex: "Bordure" n'existe que sur les variantes Tertiaire du DsfrButton).
 *
 * @param fn - Fonction qui accède à la propriété Figma.
 * @param fallback - Valeur de retour si la propriété n'existe pas.
 *
 * @returns La valeur de la propriété, ou le fallback.
 */
function safeGet<T>(fn: () => T, fallback: T | null = null): T | null {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

export default safeGet;
