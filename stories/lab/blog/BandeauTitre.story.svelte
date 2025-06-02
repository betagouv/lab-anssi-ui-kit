<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import BandeauTitre from "$lib/lab/blog/BandeauTitre.svelte";
  import OutilSelecteurTheme from "../../OutilSelecteurTheme.svelte";

  export let Hst: Hst;

  let titre = "Titre de la page";
  let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
</script>

<Hst.Story
  title="Composants/Lab/Blog/Bandeau entête"
  icon="material-symbols:page-header-outline-sharp"
>
  <OutilSelecteurTheme />
  <BandeauTitre {titre} {description} />

  <svelte:fragment slot="controls">
    <Hst.Text title="Titre" bind:value={titre} />
    <Hst.Text title="Description" bind:value={description} />
  </svelte:fragment>
</Hst.Story>
