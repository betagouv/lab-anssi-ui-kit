<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import BriqueHero from "$lib/lab/vitrines-produits/briques/BriqueHero.svelte";
  import OutilSelecteurTheme from "../../../OutilSelecteurTheme.svelte";
  import type { Actions, Image } from "$lib/types";
  import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";

  export let Hst: Hst;

  const actionsDisponibles: Actions = [
    {
      titre: 'Libellé primaire',
      lien: "",
      variation: 'primaire-inverse'
    },
    {
      titre: 'Libellé secondaire',
      lien: "",
      variation: 'secondaire'
    }
  ]

  const imageAffichee: Image = {
    lien: genereImageDePlaceholder(600, 400),
    alt: "Logo ordinateur"
  }

  const partenaires: Image[] = [
    {
      lien: 'src/lib/assets/illustrations/cnil.svg',
      alt: "Logo de la CNIL"
    },
  ]
</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Brique Hero" icon="material-symbols:brick-outline">
  <OutilSelecteurTheme />
  <BriqueHero titre="Mon​Nom​De​Service"
              badge
              sousTitre="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id sodales sapien, sit amet ultrices est."
              illustration={JSON.stringify(imageAffichee)}
              actions={JSON.stringify(actionsDisponibles)}
              partenaires={JSON.stringify(partenaires)}
  />
</Hst.Story>
