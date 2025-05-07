<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import BriqueHero from "$lib/lab/vitrines-produits/briques/BriqueHero.svelte";
  import OutilSelecteurTheme from "../../OutilSelecteurTheme.svelte";
  import type { Actions, Image } from "$lib/types";

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
    lien: 'src/lib/assets/illustrations/aidant-aidee.svg',
    alt: "Un Aidant en train de converser avec une entité souhaitant bénéficier d'un diagnostic cyber"
  }


</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Landing MonAideCyber" icon="uis:web-grid-alt">
  <OutilSelecteurTheme themeSelectionne="MonAideCyber" />
  <BriqueHero titre="Mon​Aide​Cyber"
              sousTitre="Des Aidants cyber mobilisés pour aider les entités publiques et privées à prendre leur cyberdépart !"
              illustration={JSON.stringify(imageAffichee)}
              actions={JSON.stringify(actionsDisponibles)}
  />
</Hst.Story>
