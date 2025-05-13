<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import BriqueHero from "$lib/lab/vitrines-produits/briques/BriqueHero.svelte";
  import OutilSelecteurTheme from "../../OutilSelecteurTheme.svelte";
  import type { Actions, Image, Tuiles } from "$lib/types";
  import CarrouselTuiles from "$lib/lab/vitrines-produits/briques/CarrouselTuiles.svelte";
  import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";

  export let Hst: Hst;

  const actionsDisponibles: Actions = [
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
  ]

  const imageAffichee: Image = {
    lien: genereImageDePlaceholder(600, 400),
    alt: ""
  }

  const tuiles: Tuiles = [
    {
      titre: 'Un dispositif étatique',
      contenu: "Pourquoi, quoi, quand, qui, comment ? L'homologation de sécurité a été pensée pour être accessible à tous.",
      lienIllustration: 'src/lib/assets/illustrations/mon-aide-cyber/environment.svg'
    },
    {
      titre: 'Proportionnée',
      contenu: `D'une démarche "simplifiée" à une démarche "renforcée", l'homologation doit être adaptée à la criticité d'un système et à son exposition au risque.`,
      lienIllustration: 'src/lib/assets/illustrations/mon-aide-cyber/environment.svg'
    },
    {
      titre: 'Adaptée à vos usages',
      contenu: "Une homologation simplifiée pensée pour répondre à la diversité des contextes de mise en oeuvre de l'homologation de sécurité de vos systèmes d'homologation.",
      lienIllustration: 'src/lib/assets/illustrations/mon-aide-cyber/environment.svg'
    }]

</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Landing MonAideCyber" icon="uis:web-grid-alt">
  <OutilSelecteurTheme themeSelectionne="MonAideCyber" />
  <BriqueHero titre="Mon​Aide​Cyber"
              soustitre="Des Aidants cyber mobilisés pour aider les entités publiques et privées à prendre leur cyberdépart !"
              illustration={imageAffichee}
              actions={actionsDisponibles}
  />
  <CarrouselTuiles {tuiles} />
</Hst.Story>
