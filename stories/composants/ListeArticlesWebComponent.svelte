<script lang="ts">
  interface Props {
    articles: ResumeArticle[];
    categories: CategoriesArticle;
    idCategorieChoisie?: string;
  }

  let { articles, categories, idCategorieChoisie }: Props = $props();
</script>

<lab-anssi-liste-articles
  {articles}
  {categories}
  id-categorie-choisie={idCategorieChoisie}
></lab-anssi-liste-articles>
