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
    actions: [
      {
        titre: 'Commencer à sécuriser',
        lien: "",
        variation: 'primaire-inverse'
      },
      {
        titre: "Être accompagné",
        lien: "",
        variation: 'secondaire'
      }
    ],
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
    actions: [
      {
        titre: 'Devenir Aidant cyber',
        lien: "",
        variation: 'primaire-inverse'
      },
      {
        titre: "Bénéficier d'un diagnostic cyber",
        lien: "",
        variation: 'secondaire'
      }
    ],
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
    actions: [
      {
        titre: 'Découvrir les services adaptés à NIS2',
        lien: "",
        variation: 'primaire'
      },
      {
        titre: "Découvrir le catalogue complet",
        lien: "",
        variation: 'secondaire'
      }
    ],
    partenaires: []
  },
}