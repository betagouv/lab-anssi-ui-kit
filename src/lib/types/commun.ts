/**
 * Le fichier `commun.ts` contient des types communs partagés entre plusieurs composants d'un même "scope".
 * Ces `types` peuvent être utilisés pour assurer la cohérence et la réutilisabilité au sein de ce scope.
 */
import type { Image } from "./global";

export type Action = {
  titre: string;
  lien: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
};

export type Tuiles = {
  titre: string;
  illustration: Image;
  contenu: string;
}[];

export type EtapeMarelle = {
  titre: string;
  description: string;
  lien?: {
    href: string;
    texte: string;
    target: "_self" | "_blank" | "_parent" | "_top";
  };
  illustration: Image;
};

export type Temoignage = {
  auteur: string;
  citation: string;
  source: string;
};

export type Lien = {
  label: string;
  href: string;
};

type Feuille = { label: string };

export type NoeudFilAriane = Lien | Feuille;

export type InfosTag = {
  label: string;
  couleurTexte: string;
  couleurFond: string;
};

export type TableDesMatieres = {
  profondeur: number;
  texte: string;
  id: string;
}[];

export type ResumeArticle = {
  idCategorie: string;
  titre: string;
  href: string;
};

export type CategoriesArticle = Record<string, InfosTag>;

export type Kind =
  | "primary"
  | "secondary"
  | "tertiary"
  | "tertiary-no-outline"
  | "inverted-primary"
  | "inverted-secondary";

export type TranslateLanguage = {
  active: boolean;
  id: string;
  name: string;
  locale: string;
  href: string;
};
