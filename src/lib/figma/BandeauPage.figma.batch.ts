import figma from "figma";

const instance = figma.selectedInstance;

const theme = instance.getEnum("Thème", {
  Clair: "clair",
  Inversé: "inverse",
});
const inverse = theme === "inverse";

const voirMedia = instance.getBoolean("Voir média");
const sansImage = !voirMedia;

const fondPersonnalisable = instance.getBoolean("Fond personnalisable");

const fondImage = instance.getBoolean("Fond image");
const voirFildAriane = instance.getEnum("Fil d'Ariane", {
  True: "true",
  False: "false",
});

// Instance : "⚙️ Contenu LG"
const contenuLG = instance.findInstance("⚙️ Contenu LG", { traverseInstances: true });
const contenuMD = instance.findInstance("⚙️ Contenu MD", { traverseInstances: true });
const contenu = contenuLG || contenuMD;
const titre = contenu?.getString("Titre");
const description = contenu?.getString("Description");
const voirDescription = contenu?.getBoolean("Voir Description");
const badgeOuTag = contenu?.getBoolean("Badge ou Tag");
const boutons = contenu?.getBoolean("Boutons");
const mentionPartenaires = contenu?.getBoolean("Mention / Partenaires");

// --- Descendant "⚙️ Badge ou tag MD" (via Contenu LG) ---
// const badgeInstance = instance.findInstance("⚙️ Badge ou tag MD", { traverseInstances: true });
// const badgeType = badgeInstance?.getEnum("Type", {
//   Badges: "badges",
// });
// const badgeItem2 = badgeInstance?.getBoolean("Item 2");
// const badgeItem3 = badgeInstance?.getBoolean("Item 3");
// const badgeItem4 = badgeInstance?.getBoolean("Item 4");
// const badgeItem5 = badgeInstance?.getBoolean("Item 5");

// const badge1 = instance.findInstance("⚙️ Badge 1", { traverseInstances: true });
// const badge1Label = badge1?.getString("Libellé");
// const badge1Couleur = badge1?.getEnum("Couleur", {
//   "Purple Glycine": "purple-glycine",
// });

// const badge2 = instance.findInstance("⚙️ Badge 2", { traverseInstances: true });
// const badge2Label = badge2?.getString("Libellé");

// const badge3 = instance.findInstance("⚙️ Badge 3", { traverseInstances: true });
// const badge3Label = badge3?.getString("Libellé");

// const badge4 = instance.findInstance("⚙️ Badge 4", { traverseInstances: true });
// const badge4Label = badge4?.getString("Libellé");

// const badge5 = instance.findInstance("⚙️ Badge 5", { traverseInstances: true });
// const badge5Label = badge5?.getString("Libellé");

// --- Descendant "⚙️ Buttons" (via Contenu LG) ---
// const buttonsInstance = instance.findInstance("⚙️ Buttons", { traverseInstances: true });
// const boutonSecondaire = buttonsInstance?.getBoolean("Bouton Secondaire");
// const boutonTertiaire = buttonsInstance?.getBoolean("Bouton Tertiaire");
// const buttonsTheme = buttonsInstance?.getEnum("Thème", {
//   Clair: "clair",
//   Inversé: "inverse",
// });
// const buttonsOrientation = buttonsInstance?.getEnum("Orientation", {
//   Horizontal: "horizontal",
// });
// const buttonsTaille = buttonsInstance?.getEnum("Taille", {
//   MD: "md",
// });
// const buttonsIcone = buttonsInstance?.getEnum("Icône", {
//   Sans: "sans",
// });

// Bouton Primaire
// const btnPrimaire = instance.findInstance("Thème clair / Primaire / MD", {
//   traverseInstances: true,
// });
// const btnPrimaireLabel = btnPrimaire?.getString("Libellé");
// const btnPrimaireEtat = btnPrimaire?.getEnum("État", {
//   Défaut: "default",
//   Survol: "hover",
//   Cliqué: "clicked",
// });
// const btnPrimaireDisabled = btnPrimaire?.getEnum("Désactivé", {
//   True: "true",
//   False: "false",
// });
// const btnPrimaireFocus = btnPrimaire?.getBoolean("Focus");

// Bouton Secondaire
// const btnSecondaire = instance.findInstance("Thème clair / Secondaire / MD", {
//   traverseInstances: true,
// });
// const btnSecondaireLabel = btnSecondaire?.getString("Libellé");
// const btnSecondaireEtat = btnSecondaire?.getEnum("État", {
//   Défaut: "default",
//   Survol: "hover",
//   Cliqué: "clicked",
// });
// const btnSecondaireDisabled = btnSecondaire?.getEnum("Désactivé", {
//   True: "true",
//   False: "false",
// });
// const btnSecondaireFocus = btnSecondaire?.getBoolean("Focus");

// Bouton Tertiaire
// const btnTertiaire = instance.findInstance("Thème clair / Tertiaire / MD", {
//   traverseInstances: true,
// });
// const btnTertiaireLabel = btnTertiaire?.getString("Libellé");
// const btnTertiaireEtat = btnTertiaire?.getEnum("État", {
//   Défaut: "default",
//   Survol: "hover",
//   Cliqué: "clicked",
// });
// const btnTertiaireDisabled = btnTertiaire?.getEnum("Désactivé", {
//   True: "true",
//   False: "false",
// });
// const btnTertiaireFocus = btnTertiaire?.getBoolean("Focus");
// const btnTertiaireBordure = btnTertiaire?.getBoolean("Bordure");

// Bouton Primaire Inversé
// const btnPrimaireInv = instance.findInstance("Thème clair inversé / Primaire / MD", {
//   traverseInstances: true,
// });
// const btnPrimaireInvLabel = btnPrimaireInv?.getString("Libellé");
// const btnPrimaireInvEtat = btnPrimaireInv?.getEnum("État", {
//   Défaut: "default",
//   Survol: "hover",
//   Cliqué: "clicked",
// });
// const btnPrimaireInvDisabled = btnPrimaireInv?.getEnum("Désactivé", {
//   True: "true",
//   False: "false",
// });
// const btnPrimaireInvFocus = btnPrimaireInv?.getBoolean("Focus");

// Bouton Secondaire Inversé
// const btnSecondaireInv = instance.findInstance("Thème clair inversé / Secondaire / MD", {
//   traverseInstances: true,
// });
// const btnSecondaireInvLabel = btnSecondaireInv?.getString("Libellé");
// const btnSecondaireInvEtat = btnSecondaireInv?.getEnum("État", {
//   Défaut: "default",
//   Survol: "hover",
//   Cliqué: "clicked",
// });
// const btnSecondaireInvDisabled = btnSecondaireInv?.getEnum("Désactivé", {
//   True: "true",
//   False: "false",
// });
// const btnSecondaireInvFocus = btnSecondaireInv?.getBoolean("Focus");

// // Bouton Tertiaire Inversé
// const btnTertiaireInv = instance.findInstance("Thème clair inversé / Tertiaire / MD", {
//   traverseInstances: true,
// });
// const btnTertiaireInvLabel = btnTertiaireInv?.getString("Libellé");
// const btnTertiaireInvEtat = btnTertiaireInv?.getEnum("État", {
//   Défaut: "default",
//   Survol: "hover",
//   Cliqué: "clicked",
// });
// const btnTertiaireInvDisabled = btnTertiaireInv?.getEnum("Désactivé", {
//   True: "true",
//   False: "false",
// });
// const btnTertiaireInvFocus = btnTertiaireInv?.getBoolean("Focus");
// const btnTertiaireInvBordure = btnTertiaireInv?.getBoolean("Bordure");

// --- Descendant "⚙️ Partenaire" (via Contenu LG) ---
// const partenaire = contenu.findInstance("⚙️ Partenaire", { traverseInstances: true });
// const mention = partenaire?.getString("Mention");
// const partenaireLogoVisible = partenaire?.getBoolean("Logo");

const avecFildAriane = voirFildAriane === "true" || figma.batch.breadcrumb;

const codeExample = figma.code`<lab-anssi-bandeau-page
  titre="${titre}"
  ${voirDescription && description ? `description="${description}"` : ""}
  ${inverse ? "inverse" : ""}
  ${sansImage ? "sans-image" : ""}
  ${avecFildAriane ? "avec-fil-ariane" : ""}
  ${figma.batch.simple ? "simple" : ""}
>
  ${boutons ? `<!-- Insérer le composant DsfrButtonsGroup et les props associées -->\n<dsfr-buttons-group slot="buttonsgroup"></dsfr-buttons-group>` : ""}
</lab-anssi-bandeau-page>`;

export default {
  example: codeExample,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
