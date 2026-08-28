// Figma Code Connect ne fournit pas de types pour les noeuds manipulés dans les templates .figma.batch.ts.
// Cette interface décrit les méthodes disponibles à l'exécution, à maintenir manuellement si besoin.
interface FigmaNode {
  name: string;
  type: string;
  getEnum: <T = string>(propName: string, mapping: Record<string, T>) => T | null;
  getString: (propName: string) => string;
  getBoolean: (propName: string) => boolean;
  findInstance: (layerName: string, opts?: Record<string, unknown>) => FigmaNode | null;
}

/**
 * Trouve tous les nœuds d'instance Figma qui correspondent au préfixe donné.
 *
 * @param instance - L'objet contenant la méthode findLayers pour rechercher les couches
 * @param prefix - Le préfixe du nom des couches à rechercher
 *
 * @returns Un tableau des nœuds d'instance trouvés correspondant au préfixe
 */
function findInstanceLayers(
  instance: { findLayers: (selector: (node: FigmaNode) => boolean) => FigmaNode[] },
  prefix: string,
): FigmaNode[] {
  return instance.findLayers(
    (node: FigmaNode) => node.type === "INSTANCE" && node.name.startsWith(prefix),
  );
}

export default findInstanceLayers;
export type { FigmaNode };
