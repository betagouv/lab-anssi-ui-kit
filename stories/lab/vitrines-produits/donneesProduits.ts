import { genereImageDePlaceholder } from "../../../src/lib/generateurImagesPlaceholders.js";

export const proprietesDeVariantsHero = {
  'mss': {
    titre: 'Mon​Service​Sécurisé',
    soustitre: 'L\'outil pour piloter en équipe la sécurité de tous vos services numériques et les homologuer rapidement',
    badge: true,
    illustration: {
      lien: genereImageDePlaceholder(600, 400),
      alt: "Logo placeholder"
    },
    actionGauche: {
      titre: 'Commencer à sécuriser',
      lien: "",
    },
    actionDroite: {
      titre: "Être accompagné",
      lien: "",
    },
    partenaires: [
      {
        lien: 'src/lib/assets/illustrations/cnil.svg',
        alt: "Logo de la CNIL"
      },
    ]
  },
  'mac': {
    titre: 'Mon​Aide​Cyber',
    soustitre: 'Des Aidants cyber mobilisés pour aider les entités publiques et privées à prendre leur cyberdépart !',
    badge: false,
    illustration: {
      lien: genereImageDePlaceholder(600, 400),
      alt: "Logo placeholder"
    },
    actionGauche: {
      titre: 'Devenir Aidant cyber',
        lien: "",
    },
    actionDroite: {
      titre: "Bénéficier d'un diagnostic cyber",
        lien: "",
    },
    partenaires: []
  },
  'msc': {
    titre: 'Mes​Services​Cyber',
    soustitre: 'Accédez aux services et ressources cyber proposés par l\'Agence nationale de la sécurité des systèmes d\'information et ses partenaires.',
    badge: false,
    illustration: {
      lien: genereImageDePlaceholder(600, 400),
      alt: "Logo placeholder"
    },
    actionGauche: {
      titre: 'Découvrir les services adaptés à NIS2',
      lien: "",
    },
    actionDroite: {
      titre: "Découvrir le catalogue complet",
      lien: "",
    },
    partenaires: []
  },
}