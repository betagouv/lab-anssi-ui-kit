<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import BriqueHero from "$lib/lab/vitrines-produits/briques/BriqueHero.svelte";
  import OutilSelecteurTheme from "../../OutilSelecteurTheme.svelte";
  import type { Action, Image, Tuiles } from "$lib/types";
  import CarrouselTuiles from "$lib/lab/vitrines-produits/briques/CarrouselTuiles.svelte";
  import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";
  import { BriqueTitreMultimedia } from "$lib";

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
    }]
</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Landing MonAideCyber" icon="uis:web-grid-alt">
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
</Hst.Story>
