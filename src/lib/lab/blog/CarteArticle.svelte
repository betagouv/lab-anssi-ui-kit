<script lang="ts">
  import type { ResumeArticle, InfosTag } from "$lib/types";
  import Tag from "$lib/lab/Tag.svelte";
  import Fleche from "$lib/lab/icones/Fleche.svelte";

  interface Props {
    article: ResumeArticle;
    categorie: InfosTag;
  }

  let { article, categorie }: Props = $props();
</script>

<a class="carte-article" href={article.href}>
  <div class="conteneur-texte">
    <Tag
      couleurFond={categorie.couleurFond}
      couleurTexte={categorie.couleurTexte}
      label={categorie.label}
    />
    <p>{article.titre}</p>
  </div>
  <div class="conteneur-fleche">
    <Fleche direction="droite" />
  </div>
</a>

<style lang="scss">
  .carte-article {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 8px;
    border: 1px solid $border-default-grey;
    background: white;
    padding: 24px 24px 52px 24px;
    gap: 12px;
    font-family: Marianne;
    text-decoration: none;
    position: relative;

    &:visited {
      color: unset;
    }

    &:hover {
      background: $background-default-grey-hover;
    }

    &:active {
      background: $background-default-grey-active;
    }

    &:focus-visible {
      outline: 2px solid $couleur-focus;
      outline-offset: 2px;
    }

    .conteneur-texte {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-width: 100%;

      p {
        margin: 0;
        color: $liste-articles-couleur-texte;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.5rem;
      }
    }

    .conteneur-fleche {
      position: absolute;
      bottom: 24px;
      right: 24px;
      width: 16px;
      height: 16px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
