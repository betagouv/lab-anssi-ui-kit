<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import CarrouselTuiles from "$lib/lab/vitrines-produits/briques/CarrouselTuiles.svelte";
  import type { Tuiles } from "$lib/types";
  import OutilSelecteurTheme from "../../../OutilSelecteurTheme.svelte";

  export let Hst: Hst;

  const tuiles: Tuiles = [{
    titre: 'Tuile 1',
    contenu: 'Description de la tuile',
    lienIllustration: 'src/lib/assets/illustrations/mon-aide-cyber/environment.svg'
  },
    {
      titre: 'Tuile 2',
      contenu: 'Description de la tuile2',
      lienIllustration: 'src/lib/assets/illustrations/mon-aide-cyber/environment.svg'
    },
        {
          titre: 'Tuile 3',
          contenu: 'Description de la tuile3',
          lienIllustration: 'src/lib/assets/illustrations/mon-aide-cyber/environment.svg'
        }]
</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Briques/Carrousel de tuiles" icon="material-symbols:brick-outline">
  <OutilSelecteurTheme />
  <CarrouselTuiles tuiles={JSON.stringify(tuiles)} />
</Hst.Story>