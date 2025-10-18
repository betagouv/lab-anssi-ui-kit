<svelte:options
  customElement={{
    tag: "dsfr-content",
    props: {
      size: { attribute: "size", type: "String" },
      caption: { attribute: "caption", type: "String" },
      hasLink: { attribute: "has-link", type: "Boolean" },
      linkLabel: { attribute: "link-label", type: "String" },
      linkHref: { attribute: "link-href", type: "String" },
      type: { attribute: "type", type: "String" },
      imgRatio: { attribute: "img-ratio", type: "String" },
      vidRatio: { attribute: "vid-ratio", type: "String" },
      img: { attribute: "img", type: "Object" },
      vid: { attribute: "vid", type: "Object" },
      svg: { attribute: "svg", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";

  type Image = {
    src: string;
    alt: string;
  };
  type Video = {
    src: string;
    title?: string;
    attributes: {
      allow?: string;
      allowfullscreen?: boolean;
    };
  };
  interface Props {
    /** Taille du contenu média */
    size?: Size;
    /** Texte de description ou source */
    caption?: string;
    /** Ajoute un lien à la suite du texte de description */
    hasLink?: boolean;
    /** Libellé du lien */
    linkLabel?: string;
    /** URL de destination du lien */
    linkHref?: string;
    /** Type de contenu */
    type?: "img" | "svg" | "video";
    /** Ratio de l’image */
    imgRatio?: "32x9" | "16x9" | "3x2" | "4x3" | "1x1" | "3x4" | "2x3";
    /** Ratio de la vidéo */
    vidRatio?: "16x9" | "4x3" | "1x1";
    /** Image */
    img?: Image;
    /** Video */
    vid?: Video;
    /** SVG */
    svg?: string;
  }

  let {
    size = "md",
    caption,
    hasLink = false,
    linkLabel,
    linkHref = "#",
    type = "img",
    imgRatio = "16x9",
    vidRatio = "16x9",
    img,
    vid,
    svg,
  }: Props = $props();
</script>

<figure class={["fr-content-media", `fr-content-media--${size}`]} role="group" aria-label={caption}>
  {#if type !== "video"}
    <div class="fr-content-media__img">
      {#if type === "img"}
        <slot name="image">
          <img class={["fr-responsive-img", `fr-ratio-${imgRatio}`]} src={img.src} alt={img.alt} />
        </slot>
      {:else}
        <slot name="svg">
          {@html svg}
        </slot>
      {/if}
    </div>
  {:else}
    <slot name="video">
      <iframe
        title={vid.title}
        class={["fr-responsive-vid", `fr-ratio-${vidRatio}`]}
        src={vid.src}
        allow={vid.attributes.allow}
        allowfullscreen={vid.attributes.allowfullscreen}
      ></iframe>
    </slot>
  {/if}

  <figcaption class="fr-content-media__caption">
    {caption}
    {#if hasLink}
      <a href={linkHref} class="fr-link">{linkLabel}</a>
    {/if}
  </figcaption>
</figure>

<style lang="scss">
  // // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/link";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/media/module/iframe";
  @import "@gouvfr/dsfr/src/dsfr/core/style/media/module/ratio";
  @import "@gouvfr/dsfr/src/dsfr/core/style/media/module/responsive";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/content/content.main.min.css";
  @import "@gouvfr/dsfr/dist/component/link/link.main.min.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("content-media");
</style>
