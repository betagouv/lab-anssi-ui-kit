export type Image = {
  lien: string;
  alt: string;
};

export type Video = {
  source: string;
  sourcesoustitres?: string;
  imagedecouverture?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Action = { titre: string; lien: string };

export type Tuiles = {
  titre: string;
  illustration: Image;
  contenu: string;
}[];

export type EtapeMarelle = {
  titre: string;
  description: string;
  lien?: { href: string; texte: string; target: string };
  illustration: Image;
};

export type Temoignage = {
  auteur: string;
  citation: string;
  source: string;
};
