<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import CarrouselTuiles from "$lib/lab/vitrines-produits/briques/CarrouselTuiles.svelte";

  export let Hst: Hst;
</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Briques/Carrousel de tuiles" icon="material-symbols:brick-outline">
  <CarrouselTuiles />
</Hst.Story>