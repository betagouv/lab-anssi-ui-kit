<svelte:options
  customElement={{
    tag: "dsfr-quote",
    props: {
      text: { attribute: "text", type: "String" },
      size: { attribute: "size", type: "String" },
      hasAuthor: { attribute: "has-author", type: "Boolean" },
      author: { attribute: "author", type: "String" },
      hasDetails: { attribute: "has-details", type: "Boolean" },
      sources: { attribute: "sources", type: "Array" },
      hasImage: { attribute: "has-image", type: "Boolean" },
      src: { attribute: "src", type: "String" },
      alt: { attribute: "alt", type: "String" },
      accent: { attribute: "accent", type: "String" },
      sourceUrl: { attribute: "source-url", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { Accent, Size } from "$lib/types";
  import { setThemeable } from "$lib/utilitaires";

  setThemeable($host());

  type QuoteSize = Extract<Size, "md" | "lg" | "xl">;
  interface Props {
    /** Texte de la citation */
    text: string;
    /** Taille du texte de citation */
    size?: QuoteSize;
    /** Si true, ajoute un auteur à la citation */
    hasAuthor?: boolean;
    /** Nom de l'auteur */
    author?: string;
    /** Si true, ajoute des textes de détail à la citation */
    hasDetails?: boolean;
    /** Tableau des textes de détail */
    sources?: string[];
    /** Si true, ajoute une image à la citation */
    hasImage?: boolean;
    /** Source de l'image */
    src?: string;
    /** L'alternative de l'image doit rester vide car l'image est illustrative et ne doit pas être restituée aux technologies d’assistance) */
    alt?: string;
    /** Couleur d'accentuation de la citation */
    accent?: Accent;
    /** URL de la source de la citation */
    sourceUrl?: string;
  }

  let {
    text,
    size = "md",
    hasAuthor,
    author,
    hasDetails,
    sources,
    hasImage,
    src,
    alt = "",
    accent,
    sourceUrl,
  }: Props = $props();

  let accentClass = $derived(accent && `fr-quote--${accent}`);
  let columnClass = $derived(hasImage && `fr-quote--column`);
</script>

<figure class={["fr-quote", accentClass, columnClass]}>
  <blockquote cite={sourceUrl ? sourceUrl : undefined}>
    <p class="fr-text--{size}">«&nbsp;{text}&nbsp;»</p>
  </blockquote>
  <figcaption>
    {#if hasAuthor}
      <p class="fr-quote__author">{author}</p>
    {/if}
    {#if hasDetails && sources.length > 0}
      <ul class="fr-quote__source">
        {#each sources as source}
          <li>{@html source}</li>
        {/each}
      </ul>
    {/if}
    {#if hasImage}
      <div class="fr-quote__image">
        <img class="fr-responsive-img" {src} {alt} />
      </div>
    {/if}
  </figcaption>
</figure>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/typography";
  @import "@gouvfr/dsfr/src/dsfr/core/style/media/module/responsive";

  // DSFR Component styles
  @import "@gouvfr/dsfr/src/dsfr/component/quote/main";

  @include set-shadow-host();
  @include set-dsfr-sizing("quote");
</style>
