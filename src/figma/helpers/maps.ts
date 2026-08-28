const BOOLEAN_ENUM: Record<string, boolean> = {
  True: true,
  False: false,
};

const COLOR_MAP: Record<string, string> = {
  "Purple Glycine": "purple-glycine",
  "Beige Gris Galet": "beige-gris-galet",
  "Blue Cumulus": "blue-cumulus",
  "Blue Ecume": "blue-ecume",
  "Brown Cafe creme": "brown-cafe-creme",
  "Brown Caramel": "brown-caramel",
  "Brown Opera": "brown-opera",
  "Green Archipel": "green-archipel",
  "Green Menthe": "green-menthe",
  "Green Emeraude": "green-emeraude",
  "Green Bourgeon": "green-bourgeon",
  "Green Tilleul": "green-tilleul-verveine",
  "Orange Terre Battue": "orange-terre-battue",
  "Pink Macaron": "pink-macaron",
  "Pink Tuile": "pink-tuile",
  "Yellow Moutarde": "yellow-moutarde",
  "Yellow Tournesol": "yellow-tournesol",
};

const STATUS_MAP: Record<string, string> = {
  Succès: "success",
  Information: "info",
  Erreur: "error",
  Avertissement: "warning",
  Nouveau: "new",
};

const TYPE_ENUM: Record<string, string> = {
  Personnalisable: "Personnalisable",
  Succès: "Succès",
  Information: "Information",
  Erreur: "Erreur",
  Avertissement: "Avertissement",
  Nouveau: "Nouveau",
};

export { BOOLEAN_ENUM, COLOR_MAP, STATUS_MAP, TYPE_ENUM };
