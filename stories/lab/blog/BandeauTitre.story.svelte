<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import BandeauTitre from "$lib/lab/blog/BandeauTitre.svelte";
  import OutilSelecteurTheme from "../../OutilSelecteurTheme.svelte";

  export let Hst: Hst;

  let titre = "Titre de la page";
  let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  let filAriane = [
    { label: "Accueil", href: "#" },
    { label: "Page N2", href: "#" },
    { label: "Page N3", href: "#" },
  ];
</script>

<Hst.Story
  title="Composants/Lab/Blog/Bandeau entête"
  icon="material-symbols:page-header-outline-sharp"
>
  <OutilSelecteurTheme />
  <BandeauTitre {titre} {description} {filAriane} />

  <svelte:fragment slot="controls">
    <Hst.Text title="Titre" bind:value={titre} />
    <Hst.Text title="Description" bind:value={description} />
    <Hst.Json title="Fil d'Ariane" bind:value={filAriane} />
  </svelte:fragment>
</Hst.Story>
