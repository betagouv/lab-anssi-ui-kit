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
    ],
    marelle: {
      etapes: [
        { titre: 'Première étape', description: 'Description', illustration: { lien: genereImageDePlaceholder(600, 400), alt: '' }},
        { titre: 'Seconde étape', description: 'Description2', lien: { href: 'https://monaide.cyber.gouv.fr/realiser-des-diagnostics-anssi', texte: 'Consultez la charte de l‘Aidant cyber', target: '_blank' }, illustration: { lien: genereImageDePlaceholder(600, 400), alt: '' }}
      ]
    }
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
    partenaires: [],
    marelle: {
      etapes: [
        {
          titre: 'Vérifier votre égibilité',
          description: 'Vous êtes éligible si vous travaillez au sein d’une entité publique ou êtes membre d’une association oeuvrant pour la confiance numérique et si votre démarche est non lucrative.',
          illustration: { lien: genereImageDePlaceholder(600, 400), alt: '' }
        },
        {
          titre: 'Devenir Aidant cyber',
          description: 'Participer à la formation gratuite "Devenir Aidant cyber" d’une demi-journée et accepter la Charte de l’Aidant.',
          illustration: { lien: genereImageDePlaceholder(600, 400), alt: '' },
          lien: { href: 'https://monaide.cyber.gouv.fr/realiser-des-diagnostics-anssi', texte: 'Consulter la Charte de l‘Aidant cyber', target: '_blank' },
        },
        {
          titre: 'Rejoindre la communauté des Aidants cyber',
          description: 'Echangez avec tous les les Aidants cyber sur Tchap !',
          illustration: { lien: genereImageDePlaceholder(600, 400), alt: '' },
          lien: { href: 'https://monaide.cyber.gouv.fr/realiser-des-diagnostics-anssi', texte: 'Rejoindre le communauté', target: '_blank' },
        },
        {
          titre: 'Réaliser des diagnostics cyber !',
          description: 'Répondez aux sollicitations de demandes de diagnostics cyber et faîtes la promotion du dispositif autour de vous !',
          illustration: { lien: genereImageDePlaceholder(600, 400), alt: '' },
          lien: { href: 'https://monaide.cyber.gouv.fr/kit-de-communication', texte: 'Accéder au kit de communication', target: '_blank' },
        }
      ]
    }
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
    partenaires: [],
    marelle: {
      etapes: [
        { titre: 'Première étape', description: 'Description', lien: { href: '#', texte: 'https://monaide.cyber.gouv.fr/realiser-des-diagnostics-anssi', target: '_blank' }, illustration: { lien: genereImageDePlaceholder(600, 400), alt: '' }},
        { titre: 'Seconde étape', description: 'Description2', illustration: { lien: genereImageDePlaceholder(600, 400), alt: '' }}
      ]
    }
  },
}