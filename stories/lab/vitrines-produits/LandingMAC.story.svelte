<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import BriqueHero from "$lib/lab/vitrines-produits/briques/BriqueHero.svelte";
  import OutilSelecteurTheme from "../../OutilSelecteurTheme.svelte";
  import type { Actions, Image } from "$lib/types";
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


</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Landing MonAideCyber" icon="uis:web-grid-alt">
  <OutilSelecteurTheme themeSelectionne="MonAideCyber" />
  <BriqueHero titre="Mon​Aide​Cyber"
              soustitre="Des Aidants cyber mobilisés pour aider les entités publiques et privées à prendre leur cyberdépart !"
              illustration={imageAffichee}
              actions={actionsDisponibles}
  />
</Hst.Story>
