<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import CarrouselTuiles from "$lib/lab/vitrines-produits/briques/CarrouselTuiles.svelte";
  import type { Tuiles } from "$lib/types";
  import OutilSelecteurTheme from "../../../OutilSelecteurTheme.svelte";
  import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";

  export let Hst: Hst;

  let tuiles: Tuiles = [
    {
      titre: "Un dispositif étatique",
      contenu: "MonAideCyber est proposé par l’Agence nationale de la sécurité des systèmes d’information.",
      illustration: {
        lien: genereImageDePlaceholder(96, 97),
        alt: ""
      }
    },
    {
      titre: "Une communauté de confiance",
      contenu: "Les Aidants cyber sont issus de la sphère publique ou sont membres d’associations œuvrant pour un numérique de confiance.",
      illustration: {
        lien: genereImageDePlaceholder(96, 97),
        alt: ""
      }
    },
    {
      titre: "Au service de l’intérêt général",
      contenu: "Le diagnostic MonAideCyber aide les entités qui souhaitent se protéger contre les cyberattaques et passer à l’action.",
      illustration: {
        lien: genereImageDePlaceholder(96, 97),
        alt: ""
      }
    }
  ];
</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Carrousel de tuiles" icon="material-symbols:brick-outline">
  <OutilSelecteurTheme themeSelectionne="MonAideCyber" />
  <CarrouselTuiles {tuiles} />

  <svelte:fragment slot="controls">
    <Hst.Json title="Tuiles" bind:value={tuiles} />
  </svelte:fragment>
</Hst.Story>