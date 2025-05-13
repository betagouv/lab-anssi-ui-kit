<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import BriqueHero from "$lib/lab/vitrines-produits/briques/BriqueHero.svelte";
  import OutilSelecteurTheme from "../../OutilSelecteurTheme.svelte";
  import type { Actions, Image } from "$lib/types";
  import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";

  export let Hst: Hst;

  const actionsDisponibles: Actions = [
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
  ]

  const partenaires: Image[] = [
    {
      lien: 'src/lib/assets/illustrations/cnil.svg',
      alt: "Logo de la CNIL"
    },
  ];

  const imageAffichee: Image = {
    lien: genereImageDePlaceholder(600, 400),
    alt: ""
  }


</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Landing MonServiceSécurisé" icon="uis:web-grid-alt">
  <OutilSelecteurTheme themeSelectionne="MonServiceSécurisé" />
  <BriqueHero titre="Mon​Service​Sécurisé"
              soustitre="L'outil pour piloter en équipe la sécurité de tous vos services numériques et les homologuer rapidement"
              illustration={imageAffichee}
              actions={actionsDisponibles}
              badge
              {partenaires}
  />
</Hst.Story>
