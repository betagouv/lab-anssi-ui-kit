/**
 * Le fichier `global.ts` contient les `types` globaux utilisés dans l'application.
 * Il regroupe les `types` pouvant être utilisés par l'ensemble des éléments de l'application (DSFR & LAB).
 * Ces `types` peuvent être étendus, modifiés ou être combinés pour créer des `types` plus complexes selon les besoins de l'application.
 *
 * > [!NOTE] : Les `types` définis ici respectent les conventions de nommage propre au contexte qui ont engendrés leurs créations.
 * > Cela signifie que les `types` en provenance du DSFR sont nommés selon les conventions du DSFR et il est en de même pour les `types` en provenance du LAB.
 */

export type Accent =
  | "défaut"
  | "green-tilleul-verveine"
  | "green-bourgeon"
  | "green-emeraude"
  | "green-menthe"
  | "green-archipel"
  | "blue-ecume"
  | "blue-cumulus"
  | "purple-glycine"
  | "pink-macaron"
  | "pink-tuile"
  | "yellow-tournesol"
  | "yellow-moutarde"
  | "orange-terre-battue"
  | "brown-cafe-creme"
  | "brown-caramel"
  | "brown-opera"
  | "beige-gris-galet";
export type iconPlace = "only" | "left" | "right";
export type Size = "sm" | "md" | "lg" | "xl";
export type Status = "success" | "warning" | "error" | "info" | "new";
export type Target = "self" | "blank";
