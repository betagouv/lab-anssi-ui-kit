<script lang="ts">
  import Tag from "$lib/lab/Tag.svelte";
  import type { Hst } from "@histoire/plugin-svelte";

  export let Hst: Hst;

  let label: string = "libellé";
  let couleurTexte: string = "#FFF";
  let couleurFond: string = "#000";
</script>

<Hst.Story title="Composants/Lab/Tag">
  <div style="background-color:white; padding:48px;">
    <h3>Tag</h3>
    <Tag {label} {couleurTexte} {couleurFond} />
  </div>

  <svelte:fragment slot="controls">
    <Hst.ColorSelect title="Couleur Texte" bind:value={couleurTexte} />
    <Hst.ColorSelect title="Couleur Fond" bind:value={couleurFond} />
    <Hst.Text title="Libellé" bind:value={label} />
  </svelte:fragment>
</Hst.Story>
