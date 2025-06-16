<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import ListeArticles from "$lib/lab/blog/ListeArticles.svelte";
  import OutilSelecteurTheme from "../../OutilSelecteurTheme.svelte";

  export let Hst: Hst;

  let articles = [
    {
      titre: "⏱️ L'homologation simplifiée - Quand homologuer et pour quelle durée ?",
      idCategorie: "id-1",
      href: "#",
    },
    {
      titre: "🪪 L'homologation simplifiée - Qu'est-ce qu'une homologation de sécurité ?",
      idCategorie: "id-1",
      href: "#",
    },
    {
      titre: "📝 Réaliser un audit de la sécurité du service",
      idCategorie: "id-2",
      href: "#",
    },
    {
      titre: "📝 Réaliser une analyse de risques de la sécurité du service",
      idCategorie: "id-2",
      href: "#",
    },
  ];
  let categories = {
    "id-1": {
      label: "Sécurisation et homologation",
      couleurTexte: "#09416A",
      couleurFond: "#DCEEFF",
    },
    "id-2": {
      label: "Mise en oeuvre des mesures de sécurité",
      couleurTexte: "#7025DA",
      couleurFond: "#E9DDFF",
    },
  };
  let idCategorieChoisie: string | undefined;
</script>

<Hst.Story title="Composants/Lab/Blog/Liste Articles" icon="material-symbols:event-list-rounded">
  <OutilSelecteurTheme />
  <ListeArticles {articles} {categories} {idCategorieChoisie} />

  <svelte:fragment slot="controls">
    <Hst.Json title="Articles" bind:value={articles} />
    <Hst.Json title="Catégories" bind:value={categories} />
    <Hst.Text title="Id Catégorie présélectionnée" bind:value={idCategorieChoisie} />
  </svelte:fragment>
</Hst.Story>

<style>
</style>
