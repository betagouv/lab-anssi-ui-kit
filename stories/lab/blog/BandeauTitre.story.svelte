<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import BandeauTitre from "$lib/lab/blog/BandeauTitre.svelte";
  import OutilSelecteurTheme from "../../OutilSelecteurTheme.svelte";

  export let Hst: Hst;

  let titre = "Titre de la page";
  let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  let avecFilAriane = true;
  let filAriane = [
    { label: "Accueil", href: "#" },
    { label: "Page N2", href: "#" },
    { label: "Page N3", href: "#" },
  ];
  let avecTag = true;
  let tag = {
    label: "Sécurisation et homologation",
    couleurTexte: "#0279D0",
    couleurFond: "#DCEEFF",
  };

  // Un bug d'histoire, qui utilise JSDom lors d'une des phases de montage du composant
  // https://github.com/histoire-dev/histoire/issues/420
  if (!window.matchMedia) {
    // @ts-ignore
    window.matchMedia = () => ({
      matches: false,
    });
  }
</script>

<Hst.Story
  title="Composants/Lab/Blog/Bandeau titre"
  icon="material-symbols:page-header-outline-sharp"
>
  <OutilSelecteurTheme />
  <BandeauTitre
    {titre}
    {description}
    filAriane={avecFilAriane ? filAriane : []}
    tag={avecTag ? tag : null}
  />

  <svelte:fragment slot="controls">
    <Hst.Checkbox title="Avec Fil d'Ariane" bind:value={avecFilAriane} />
    {#if avecFilAriane}
      <Hst.Json title="Fil d'Ariane" bind:value={filAriane} />
    {/if}
    <Hst.Checkbox title="Avec tag" bind:value={avecTag} />
    {#if avecTag}
      <Hst.Json title="Tag" bind:value={tag} />
    {/if}
    <Hst.Text title="Titre" bind:value={titre} />
    <Hst.Text title="Description" bind:value={description} />
  </svelte:fragment>
</Hst.Story>
