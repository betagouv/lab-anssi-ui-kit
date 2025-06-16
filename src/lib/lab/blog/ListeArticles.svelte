<script lang="ts">
  import type { CategoriesArticle, ResumeArticle } from "$lib/types";
  import CarteArticle from "$lib/lab/blog/CarteArticle.svelte";
  import ListeDeroulante from "$lib/lab/blog/ListeDeroulante.svelte";

  export let articles: ResumeArticle[];
  export let categories: CategoriesArticle;

  let idCategorieChoisie: string = "tous";
  const optionsFiltrage = [
    { label: "Tous les articles", valeur: "tous" },
    ...Object.entries(categories).map(([idCategorie, donnees]) => ({
      label: donnees.label,
      valeur: idCategorie,
    })),
  ];

  $: articlesVisibles =
    idCategorieChoisie === "tous"
      ? articles
      : articles.filter((a) => a.idCategorie === idCategorieChoisie);
</script>

<div class="liste-articles">
  <ListeDeroulante bind:valeur={idCategorieChoisie} options={optionsFiltrage} />
  <h2>
    {idCategorieChoisie === "tous" ? "Tous les articles" : categories[idCategorieChoisie].label}
  </h2>
  <div class="conteneur-articles">
    {#each articlesVisibles as article, index (index)}
      <CarteArticle {article} categorie={categories[article.idCategorie]} />
    {/each}
  </div>
</div>

<style lang="scss">
  .liste-articles {
    padding: 48px 16px;
    max-width: 1200px;
    margin: 0 auto;
    font-family: Marianne;
    display: flex;
    flex-direction: column;
    gap: 32px;

    @include a-partir-de(desktop) {
      padding: 48px 24px;
    }

    h2 {
      margin: 0;
      color: $texte-defaut;
      font-size: 1.75rem;
      font-style: normal;
      font-weight: 700;
      line-height: 2.25rem;
    }

    .conteneur-articles {
      gap: 16px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));
    }
  }
</style>
