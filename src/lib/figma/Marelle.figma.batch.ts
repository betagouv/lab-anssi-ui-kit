import figma from "figma";

const instance = figma.selectedInstance;

// Instance : "Marelle"
const marelle = instance.findInstance("Marelle", { traverseInstances: true }) || instance;
const titre = marelle?.getString("Titre");
const item4Visible = marelle?.getBoolean("Item 4");
const zoneAction = marelle?.getBoolean("Zone d'action");

// --- Item 1 (Thème clair / Marelle / Desktop / ⚙️ Contenu) ---
const item1 = instance.findInstance("Item 1", { traverseInstances: true });
const item1Texte = item1?.getEnum("Texte", {
  Droite: "droite",
  Gauche: "gauche",
});

const item1Contenu = item1?.findInstance("⚙️ Contenu", { traverseInstances: true });
const item1Titre = item1Contenu?.getString("Titre");
const item1Description = item1Contenu?.getString("Description");
const item1Lien = item1Contenu?.getBoolean("Lien");
const item1VoirDescription = item1Contenu?.getBoolean("Voir descroption");

const item1LienInstance = item1Contenu?.findInstance("Lien", { traverseInstances: true });
const item1LienTaille = item1LienInstance?.getEnum("Taille", { MD: "md" });
const item1LienTheme = item1LienInstance?.getEnum("Thème", { Clair: "clair" });
const item1LienIcone = item1LienInstance?.getEnum("Icône", { Sans: "sans" });
const item1LienEtat = item1LienInstance?.getEnum("État", {
  Défaut: "default",
  Survol: "hover",
  Cliqué: "clicked",
});
const item1LienFocus = item1LienInstance?.getEnum("Focus", {
  True: "true",
  False: "false",
});

const item1LienContenant = item1LienInstance?.findInstance("📁 Contenant technique", {
  traverseInstances: true,
});
const item1LienLabel = item1LienContenant?.getString("Libellé lien");

const item1ArrowLine = item1Contenu?.findInstance("arrow-line", { traverseInstances: true });
const item1ArrowDirection = item1ArrowLine?.getEnum("Direction", {
  Haut: "haut",
  Bas: "bas",
  Gauche: "gauche",
  Droite: "droite",
});

const item1Indicateur = item1?.findInstance(
  "Thème clair / Mobile, Desktop / Étapier / Élément / Indicateur",
  { traverseInstances: true },
);
const item1Numero = item1Indicateur?.getString("Numéro");

// --- Item 2 ---
const item2 = instance.findInstance("Item 2", { traverseInstances: true });
const item2Texte = item2?.getEnum("Texte", {
  Droite: "droite",
  Gauche: "gauche",
});

const item2Contenu = item2?.findInstance("⚙️ Contenu", { traverseInstances: true });
const item2Titre = item2Contenu?.getString("Titre");
const item2Description = item2Contenu?.getString("Description");
const item2Lien = item2Contenu?.getBoolean("Lien");
const item2VoirDescription = item2Contenu?.getBoolean("Voir descroption");

const item2LienInstance = item2Contenu?.findInstance("Lien", { traverseInstances: true });
const item2LienEtat = item2LienInstance?.getEnum("État", {
  Défaut: "default",
  Survol: "hover",
  Cliqué: "clicked",
});

const item2LienContenant = item2LienInstance?.findInstance("📁 Contenant technique", {
  traverseInstances: true,
});
const item2LienLabel = item2LienContenant?.getString("Libellé lien");

const item2Indicateur = item2?.findInstance(
  "Thème clair / Mobile, Desktop / Étapier / Élément / Indicateur",
  { traverseInstances: true },
);
const item2Numero = item2Indicateur?.getString("Numéro");

// --- Item 3 ---
const item3 = instance.findInstance("Item 3", { traverseInstances: true });
const item3Texte = item3?.getEnum("Texte", {
  Droite: "droite",
  Gauche: "gauche",
});

const item3Contenu = item3?.findInstance("⚙️ Contenu", { traverseInstances: true });
const item3Titre = item3Contenu?.getString("Titre");
const item3Description = item3Contenu?.getString("Description");
const item3Lien = item3Contenu?.getBoolean("Lien");
const item3VoirDescription = item3Contenu?.getBoolean("Voir descroption");

const item3LienInstance = item3Contenu?.findInstance("Lien", { traverseInstances: true });
const item3LienEtat = item3LienInstance?.getEnum("État", {
  Défaut: "default",
  Survol: "hover",
  Cliqué: "clicked",
});

const item3LienContenant = item3LienInstance?.findInstance("📁 Contenant technique", {
  traverseInstances: true,
});
const item3LienLabel = item3LienContenant?.getString("Libellé lien");

const item3Indicateur = item3?.findInstance(
  "Thème clair / Mobile, Desktop / Étapier / Élément / Indicateur",
  { traverseInstances: true },
);
const item3Numero = item3Indicateur?.getString("Numéro");

// Instance : "Bouton"
const instanceBouton = zoneAction && instance.findInstance("Bouton", { traverseInstances: true });
const libelleBouton = zoneAction && instanceBouton?.getString("Libellé");

const codeExample = figma.code`<lab-anssi-marelle
  titre="${titre}"
  etapesmarelle='${JSON.stringify([
    {
      titre: item1Titre,
      description: item1Description,
      lien: item1Lien && item1LienLabel ? { href: "#", texte: item1LienLabel } : undefined,
    },
    {
      titre: item2Titre,
      description: item2Description,
      lien: item2Lien && item2LienLabel ? { href: "#", texte: item2LienLabel } : undefined,
    },
    {
      titre: item3Titre,
      description: item3Description,
      lien: item3Lien && item3LienLabel ? { href: "#", texte: item3LienLabel } : undefined,
    },
  ])}'
    ${
      zoneAction
        ? `action='${JSON.stringify({
            titre: libelleBouton,
            lien: "#",
          })}'`
        : ""
    }
></lab-anssi-marelle>`;

export default {
  example: codeExample,
  id: figma.batch.id,
  metadata: {
    nestable: true,
  },
};
