import type { FigmaNode } from "./find-instance-layers";

/**
 * Vérifie qu'un nœud Figma est une instance (`type === "INSTANCE"`).
 *
 * @param node - Nœud à tester.
 * @returns `true` si le nœud est une instance, sinon `false`.
 */
function isInstance(node: unknown): node is FigmaNode {
  return node != null && (node as FigmaNode).type === "INSTANCE";
}

export default isInstance;
