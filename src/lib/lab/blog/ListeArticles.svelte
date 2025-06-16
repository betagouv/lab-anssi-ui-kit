<script lang="ts">
  import type { CategoriesArticle, ResumeArticle } from "$lib/types";
  import CarteArticle from "$lib/lab/blog/CarteArticle.svelte";

  export let articles: ResumeArticle[];
  export let categories: CategoriesArticle;
</script>

<div class="liste-articles">
  <div class="conteneur-articles">
    {#each articles as article, index (index)}
      <CarteArticle {article} categorie={categories[article.idCategorie]} />
    {/each}
  </div>
</div>

<style lang="scss">
  .liste-articles {
    padding: 48px 16px;
    max-width: 1200px;
    margin: 0 auto;

    @include a-partir-de(desktop) {
      padding: 48px 24px;
    }

    .conteneur-articles {
      gap: 16px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));
    }
  }
</style>
