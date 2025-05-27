<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import OutilSelecteurTheme from "../../../OutilSelecteurTheme.svelte";
  import Temoignages from "$lib/lab/vitrines-produits/briques/temoignages/Temoignages.svelte";

  export let Hst: Hst;
  let titre = "Titre";
  let temoignages = [
    {
      citation:
        "A Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis, risus id egestas semper, dui mauris semper nulla, sed egestas elit lectus sit amet mi.",
      source: "IMT",
      auteur: "Mme. A",
    },
    {
      citation:
        "B Consectetur adipiscing elit. Nam mollis, risus id egestas semper, dui mauris semper nulla, sed egestas elit lectus sit amet mi. Morbi id leo aliquet, consectetur sem et, molestie libero.",
      source: "IMT",
      auteur: "M. B",
    },
  ];
</script>

<Hst.Story
  title="Composants/Lab/Sites vitrines/Briques/Témoignages"
  icon="material-symbols:brick-outline"
>
  <OutilSelecteurTheme themeSelectionne="MonServiceSécurisé" />
  <Temoignages {titre} {temoignages} />

  <svelte:fragment slot="controls">
    <Hst.Text title="Titre" bind:value={titre} />
    <Hst.Json title="Témoignages" bind:value={temoignages} />
  </svelte:fragment>
</Hst.Story>
