import figma from "figma";

const instance = figma.selectedInstance;

function safeInstance(node: unknown) {
  return node && typeof (node as any).getString === "function" ? (node as any) : undefined;
}

const orientationMedia = instance.getEnum("Orientation media", {
  "Media droite": "droite",
  Droite: "droite",
  gauche: "gauche",
});
// const fond = instance.getBoolean("Fond");
const controleSegmente = instance.getBoolean("Contrôle segmenté");
const cta = instance.getBoolean("CTA");

// const media = instance.getSlot("Média");

// Instance : "⚙️ Couleur de fond" (visible via Fond)
// const couleurDeFond = instance.findInstance("⚙️ Couleur de fond", { traverseInstances: true });
// const couleurDeFondCouleur = couleurDeFond?.getEnum("Couleur", {
//   Default: "default",
// });

// Instance : "Entête" (Fonctionnalités / Élément / Entête)
const entete = safeInstance(
  instance.findInstance("Thème clair / Fonctionnalités / Élément / Entête", {
    traverseInstances: true,
  }),
);
const titre = entete?.getString("Titre");
const description = entete?.getString("Description");
const voirDescription = entete?.getBoolean("Voir description");
const enteteAvecBadge = entete?.getBoolean("Badge");
// const enteteInstance = entete?.getInstanceSwap("Instance");

// Instance : "Badges" (Groupe / Non-cliquable / MD) — visible via Badge de l'entête
// const badgesGroupe = instance.findInstance("Badges", { traverseInstances: true });
// const voirTag2 = badgesGroupe?.getBoolean("Voir tag 2");
// const voirTag3 = badgesGroupe?.getBoolean("Voir tag 3");
// const voirTag4 = badgesGroupe?.getBoolean("Voir tag 4");
// const voirTag5 = badgesGroupe?.getBoolean("Voir tag 5");
// const voirTag6 = badgesGroupe?.getBoolean("Voir tag 6");
// const voirTag7 = badgesGroupe?.getBoolean("Voir tag 7");
// const voirTag8 = badgesGroupe?.getBoolean("Voir tag 8");

// Tags (×8, chacun "Non-cliquable / MD") :
// - Libellé (TEXT)
// - Voir icône (BOOLEAN)
// - Icône (INSTANCE_SWAP)

// Instance : "Liste" (Fonctionnalités / Élément / Items - groupe)
const liste = safeInstance(instance.findInstance("Liste", { traverseInstances: true }));
const listeCliquable = liste?.getEnum("Cliquable", {
  False: "false",
});
// const listeSupport = liste?.getEnum("Support", {
//   Desktop: "desktop",
//   Mobile: "mobile",
// });

// Instance : "Item 01" (Fonctionnalités / Élément / Item)
const item01 = safeInstance(instance.findInstance("Item 01", { traverseInstances: true }));
// const item01Etat = item01?.getEnum("État", { Défaut: "default" });
// const item01Active = item01?.getEnum("Active", { False: "false" });

// Instance : Item 01 → Composant technique
const item01Tech = safeInstance(
  item01?.findInstance(
    "Thème clair/ Fonctionnalités / Composant technique / Item complet - Desktop",
    { traverseInstances: true },
  ),
);
const item01Titre = item01Tech?.getString("Titre");
const item01Description = item01Tech?.getString("Description");
const item01VoirDescription = item01Tech?.getBoolean("Voir description");
const item01Lien = item01Tech?.getBoolean("Lien");
// const item01Icone = item01Tech?.getInstanceSwap("Icône");
// const item01IconeTitre = item01Tech?.getBoolean("Icône titre");
const item01AvecBadge = item01Tech?.getBoolean("Badge");

// Item 01 → Badge (SM)
// const item01Badge = item01?.findInstance("Thème clair / Personnalisable / SM", { traverseInstances: true });
// const item01BadgeLibelle = item01Badge?.getString("Libellé");
// const item01BadgeCouleur = item01Badge?.getEnum("Couleur", {
//   "Green Bourgeon": "green-bourgeon",
// });

// Item 01 → Lien
// const item01LienInstance = item01?.findInstance("Lien", { traverseInstances: true });
// const item01LienTaille = item01LienInstance?.getEnum("Taille", { MD: "md" });
// const item01LienEtat = item01LienInstance?.getEnum("État", {
//   Défaut: "default",
//   Survol: "hover",
//   Cliqué: "clicked",
// });
// const item01LienContenant = item01LienInstance?.findInstance("📁 Contenant technique", { traverseInstances: true });
// const item01LienLabel = item01LienContenant?.getString("Libellé lien");

// Instance : "Item 02"
const item02 = safeInstance(instance.findInstance("Item 02", { traverseInstances: true }));
// const item02Etat = item02?.getEnum("État", { Défaut: "default" });
// const item02Active = item02?.getEnum("Active", { False: "false" });
const item02Tech = safeInstance(
  item02?.findInstance(
    "Thème clair/ Fonctionnalités / Composant technique / Item complet - Desktop",
    { traverseInstances: true },
  ),
);
const item02Titre = item02Tech?.getString("Titre");
const item02Description = item02Tech?.getString("Description");
const item02VoirDescription = item02Tech?.getBoolean("Voir description");
const item02Lien = item02Tech?.getBoolean("Lien");
const item02AvecBadge = item02Tech?.getBoolean("Badge");

// Instance : "Item 03"
const item03 = safeInstance(instance.findInstance("Item 03", { traverseInstances: true }));
// const item03Etat = item03?.getEnum("État", { Défaut: "default" });
// const item03Active = item03?.getEnum("Active", { False: "false" });
const item03Tech = safeInstance(
  item03?.findInstance(
    "Thème clair/ Fonctionnalités / Composant technique / Item complet - Desktop",
    { traverseInstances: true },
  ),
);
const item03Titre = item03Tech?.getString("Titre");
const item03Description = item03Tech?.getString("Description");
const item03VoirDescription = item03Tech?.getBoolean("Voir description");
const item03Lien = item03Tech?.getBoolean("Lien");
const item03AvecBadge = item03Tech?.getBoolean("Badge");

// Instance : "Item 04"
const item04 = safeInstance(instance.findInstance("Item 04", { traverseInstances: true }));
// const item04Etat = item04?.getEnum("État", { Défaut: "default" });
// const item04Active = item04?.getEnum("Active", { False: "false" });
const item04Tech = safeInstance(
  item04?.findInstance(
    "Thème clair/ Fonctionnalités / Composant technique / Item complet - Desktop",
    { traverseInstances: true },
  ),
);
const item04Titre = item04Tech?.getString("Titre");
const item04Description = item04Tech?.getString("Description");
const item04VoirDescription = item04Tech?.getBoolean("Voir description");
const item04Lien = item04Tech?.getBoolean("Lien");
const item04AvecBadge = item04Tech?.getBoolean("Badge");

// Instance : "Bouton" (Primaire / LG) — visible via CTA
const bouton = cta && safeInstance(instance.findInstance("Bouton", { traverseInstances: true }));
const boutonLibelle = cta && bouton?.getString("Libellé");
// const boutonFocus = cta && bouton?.getBoolean("Focus");
// const boutonIcone = cta && bouton?.getEnum("Icône", { Sans: "sans" });
// const boutonEtat = cta && bouton?.getEnum("État", {
//   Défaut: "default",
//   Survol: "hover",
//   Cliqué: "clicked",
// });
// const boutonDesactive = cta && bouton?.getEnum("Désactivé", { False: "false" });

// Instance : "Contrôle segmenté cas max" — visible via Contrôle segmenté
// const controleSegmenteInstance = controleSegmente && instance.findInstance("Thème clair / Mobile / Contrôle segmenté cas max", { traverseInstances: true });
// const voirLegende = controleSegmenteInstance?.getBoolean("Voir Légende");

// Légende (Éléments / Légende / Default) :
// - Légende (TEXT)
// - Obligatoire (BOOLEAN)
// - Texte de description additionnel (TEXT)
// - Description additionnel (BOOLEAN)
// - Taille (VARIANT : Défaut)

// Contrôle segmenté (Mobile cas max) :
// - Item 3, Item 4, Item 5 (BOOLEAN — visibilité)
// - Taille (VARIANT : MD | SM)

// Segments (×5, chacun "Élément / MD") :
// - Libellé (TEXT)
// - Icône (INSTANCE_SWAP)
// - Focus (BOOLEAN)
// - État (VARIANT : Défaut - sélectionné | Défaut | Survol | Cliqué)
// - Icône (VARIANT : sans)

const cliquable = listeCliquable !== "false";

const fonctionnalites = [
  {
    titre: item01Titre,
    description: item01VoirDescription ? item01Description : undefined,
  },
  {
    titre: item02Titre,
    description: item02VoirDescription ? item02Description : undefined,
  },
  {
    titre: item03Titre,
    description: item03VoirDescription ? item03Description : undefined,
  },
  {
    titre: item04Titre,
    description: item04VoirDescription ? item04Description : undefined,
  },
];

const codeExample = figma.code`<lab-anssi-fonctionnalites
  titre="${titre}"
  ${voirDescription && description ? `description="${description}"` : ""}
  fonctionnalites='${JSON.stringify(fonctionnalites)}'
  ${orientationMedia === "gauche" ? `orientation-media="gauche"` : ""}
  ${cliquable ? "cliquable" : ""}
  ${controleSegmente ? "avec-controle-segmente" : ""}
  ${cta ? "avec-cta" : ""}
></lab-anssi-fonctionnalites>`;

export default {
  example: codeExample,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
