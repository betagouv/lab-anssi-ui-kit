export type Image = {
  lien: string;
  alt: string;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Action = { titre: string; lien: string; };

export type Tuiles = {
  titre: string;
  illustration: Image;
  contenu: string;
}[];