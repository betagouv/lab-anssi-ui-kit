<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import BriqueHero from "../../src/lib/lab/vitrines-produits/briques/BriqueHero.svelte";
  import OutilSelecteurTheme from "../OutilSelecteurTheme.svelte";
  import type { Action, Image, Tuiles } from "$lib/types";
  import CarrouselTuiles from "../../src/lib/lab/vitrines-produits/briques/CarrouselTuiles.svelte";
  import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";
  import { BriqueTitreMultimedia } from "$lib";
  import Marelle from "$lib/lab/vitrines-produits/briques/marelle/Marelle.svelte";
  import Temoignages from "$lib/lab/vitrines-produits/briques/temoignages/Temoignages.svelte";
  import BriqueContenuADeuxColonnes from "$lib/lab/vitrines-produits/briques/BriqueContenuADeuxColonnes.svelte";
  import RejoindreLaCommunaute from "$lib/lab/vitrines-produits/briques/RejoindreLaCommunaute.svelte";

  export let Hst: Hst;

  const imageAffichee: Image = {
    lien: genereImageDePlaceholder(600, 400, "Illustration de couverture"),
    alt: ""
  }

  const tuiles: Tuiles = [
    {
      titre: 'Un dispositif étatique',
      contenu: "Pourquoi, quoi, quand, qui, comment ? L'homologation de sécurité a été pensée pour être accessible à tous.",
      illustration: {
          lien: genereImageDePlaceholder(96, 97),
          alt: ''
        }
    },
    {
      titre: 'Proportionnée',
      contenu: `D'une démarche "simplifiée" à une démarche "renforcée", l'homologation doit être adaptée à la criticité d'un système et à son exposition au risque.`,
      illustration: {
          lien: genereImageDePlaceholder(96, 97),
          alt: ''
        }
    },
    {
      titre: 'Adaptée à vos usages',
      contenu: "Une homologation simplifiée pensée pour répondre à la diversité des contextes de mise en oeuvre de l'homologation de sécurité de vos systèmes d'homologation.",
      illustration: {
          lien: genereImageDePlaceholder(96, 97),
          alt: ''
        }
    }];

  const etapesmarelle = [
    {
      description: "Description",
      illustration: {
        lien: genereImageDePlaceholder(600, 400, "Illustration première étape"),
        alt: ''
      },
      lien: { href: "#", target: "_blank", texte: "Lien vers ressource externe" },
      titre: "Première étape"
    },
    {
      description: "Description étape 2",
      illustration: {
        lien: genereImageDePlaceholder(600, 400, "Illustration deuxième étape"),
        alt: ''
      },
      lien: { href: "#", target: "_blank", texte: "Lien vers ressource externe" },
      titre: "Deuxième étape"
    },
  ]
</script>

<Hst.Story title="Exemples d'intégration/Landing MonAideCyber" icon="uis:web-grid-alt">
  <OutilSelecteurTheme themeSelectionne="MonAideCyber" />
  <BriqueHero titre="Mon​Aide​Cyber"
              soustitre="Des Aidants cyber mobilisés pour aider les entités publiques et privées à prendre leur cyberdépart !"
              illustration={imageAffichee}
              actiongauche={{
                titre: 'Devenir Aidant cyber',
                lien: "https://monaide.cyber.gouv.fr/realiser-des-diagnostics-anssi",
              }}
              actiondroite={{
                titre: "Bénéficier d'un diagnostic cyber",
                lien: "https://messervices.cyber.gouv.fr/cyberdepart",
              }}
  />
  <CarrouselTuiles {tuiles} />
  <BriqueTitreMultimedia titre="Découvrez MonAideCyber en vidéo"
                         multimedia={{
                           source: 'https://monservicesecurise-ressources.cellar-c2.services.clever-cloud.com/Video_MonServiceSecurise_Thumbnail.mp4',
                           sourcesoustitres: 'https://monservicesecurise-ressources.cellar-c2.services.clever-cloud.com/Nouvelle_doctrine_homologation.vtt',
                           imagedecouverture: genereImageDePlaceholder(792, 446, "Vidéo d'exemple")
                         }}
  />
  <Marelle titre="Titre"
           {etapesmarelle}
           action={{
             titre: 'Action',
             lien: '#'
           }} />
  <Temoignages titre="Les témoignages de nos Aidants cyber"
    temoignages={[
      {
        citation: "Encore merci pour cet outil qui, une fois la communauté d’aidants réunionnaise structurée et formée, nous aidera grandement dans le passage à l’échelle.",
        auteur: "Matthieu D.",
        source: 'Un utilisateur de La Réunion (974)'
      },
            {
        citation: "MonAideCyber remplit très bien sa mission, et le fait de pouvoir tout de suite donner un rapport aux interlocuteurs est un réel atout.",
        auteur: "Didier L.",
        source: 'Un Aidant cyber, réserviste de la Police, dans le Rhône (69)'
      }
    ]}/>
  <BriqueContenuADeuxColonnes titre="Rejoignez la communauté des Aidants cyber !"
                              paragraphe="En tant que membre de la communauté, vous pourrez : <br /> - Echanger directement avec les autres Aidants cyber <br /> - Participer activement au développement du diagnostic cyber en nous partageant vos besoins et suggestions d'amélioration."
                              action={{ titre: 'Rejoindre la communauté', lien: '#', }}
                              ordre="texte-droite"
                              illustration={{ lien: genereImageDePlaceholder(600, 400, "Image de substitution"), alt: ''}}
  ></BriqueContenuADeuxColonnes>
  <RejoindreLaCommunaute titre="Rejoignez la communauté des Aidants cyber !"
                         raisons={['Echanger directement avec les autres Aidants cyber', 'Participer activement au développement du diagnostic cyber en nous partageant vos besoins et suggestions d\'amélioration']}
                         action={{ titre: 'Rejoindre la communauté', lien: '#', }}
                         illustration={{ lien: genereImageDePlaceholder(600, 400, "Image de substitution"), alt: ''}}
  />
</Hst.Story>
