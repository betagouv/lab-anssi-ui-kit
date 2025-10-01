<svelte:options
  customElement={{
    tag: "dsfr-card",
    props: {
      src: { attribute: "src", type: "String" },
      alt: { attribute: "alt", type: "String" },
      id: { attribute: "id", type: "String" },
      title: { attribute: "title", type: "String" },
      hasDescription: { attribute: "has-description", type: "Boolean" },
      description: { attribute: "description", type: "String" },
      hasDetailStart: { attribute: "has-detail-start", type: "Boolean" },
      detailStart: { attribute: "detail-start", type: "String" },
      hasDetailStartIcon: { attribute: "has-detail-start-icon", type: "Boolean" },
      detailStartIcon: { attribute: "detail-start-icon", type: "String" },
      hasDetailEnd: { attribute: "has-detail-end", type: "Boolean" },
      detailEnd: { attribute: "detail-end", type: "String" },
      hasDetailEndIcon: { attribute: "has-detail-end-icon", type: "Boolean" },
      detailEndIcon: { attribute: "detail-end-icon", type: "String" },
      markup: { attribute: "markup", type: "String" },
      hasBadge: { attribute: "has-badge", type: "Boolean" },
      enlarge: { attribute: "enlarge", type: "Boolean" },
      actionMarkup: { attribute: "action-markup", type: "String" },
      actionTitle: { attribute: "action-title", type: "String" },
      href: { attribute: "href", type: "String" },
      blank: { attribute: "blank", type: "Boolean" },
      noLink: { attribute: "no-link", type: "Boolean" },
      disabled: { attribute: "disabled", type: "Boolean" },
      size: { attribute: "size", type: "String" },
      horizontal: { attribute: "horizontal", type: "Boolean" },
      horizontalProportion: { attribute: "horizontal-proportion", type: "String" },
      hasHeaderBadge: { attribute: "has-header-badge", type: "Boolean" },
      imageRatio: { attribute: "image-ratio", type: "String" },
      hasButtons: { attribute: "has-buttons", type: "Boolean" },
      hasLinks: { attribute: "has-links", type: "Boolean" },
      variations: { attribute: "variations", type: "String" },
      download: { attribute: "download", type: "Boolean" },
      lang: { attribute: "lang", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { setIconClass } from "$lib/utilitaires";

  type CardSize = Extract<Size, "sm" | "md" | "lg">;

  interface Props {
    /** Source de l'image */
    src?: string;
    /** L'alternative de l'image */
    alt?: "string";
    /** Attribut 'id' de la carte */
    id?: string;
    /** Titre de la carte */
    title?: string;
    /** Si true, ajoute une description à la carte*/
    hasDescription?: boolean;
    /** Description de la carte */
    description?: string;
    /** Ajoute un texte de détail en haut de carte */
    hasDetailStart?: boolean;
    /** Texte de détail en haut de carte */
    detailStart?: string;
    /** Ajoute une icône dans le détail en haut de carte */
    hasDetailStartIcon?: boolean;
    /** Icône du détail en haut de carte */
    detailStartIcon?: string;
    /** Ajoute un texte de détail en bas de la carte */
    hasDetailEnd?: boolean;
    /** Texte de détail en bas de carte */
    detailEnd?: string;
    /** Ajoute une icône dans le détail en bas de la carte */
    hasDetailEndIcon?: boolean;
    /** Icône du détail en bas de carte */
    detailEndIcon?: string;
    /** Si true, ajoute des badges dans le contenu */
    hasBadge?: boolean;
    /** Niveau de titre de la carte (default: h3) */
    markup?: "h2" | "h3" | "h4" | "h5";
    /** Si true, agrandi la zone de clic à toute la carte */
    enlarge?: boolean;
    /** Balise de l'actionneur du composant (a, button) */
    actionMarkup?: "a" | "button";
    /** Attribut title de l'actionneur. Si blank = true, il est obligatoire et doit reprendre le titre suivi de la mention "- nouvelle fenêtre" */
    actionTitle?: string;
    /** URL de destination du lien */
    href?: string;
    /** Ajoute l'attribut target="_blank" pour ouvrir le lien dans une nouvelle fenêtre, nécessite l'ajout d'un attribut title "intitulé - nouvelle fenêtre" */
    blank?: boolean;
    /** Si true, absence d'actionneur */
    noLink?: boolean;
    /** Si true, retire le href du lien pour le désactiver ou ajoute l'attribut disabled sur le bouton */
    disabled?: boolean;
    /** Taille de la carte ("md" - default | "sm" | "lg"). */
    size?: CardSize;
    /** Si true, passe la carte en mode horizontal */
    horizontal?: boolean;
    /** Proportion de l'image par rapport au contenu en horizontal (par défaut 40% / 60%) */
    horizontalProportion?: "default" | "tier" | "half";
    /** Si true, ajoute un badge dans l'en-tête */
    hasHeaderBadge?: boolean;
    /** Ratio forcé de l'image */
    imageRatio?: "default" | "32x9" | "3x2" | "4x3" | "1x1" | "3x4" | "2x3";
    /** Si true, ajoute des boutons au pied de la carte */
    hasButtons?: boolean;
    /** Si true, ajoute des liens au pied de la carte */
    hasLinks?: boolean;
    /** Variations ésthétiques de la carte */
    variations?: "none" | "grey" | "no-border" | "no-background" | "shadow";
    /** Si true, passe la carte en mode téléchargement */
    download?: boolean;
    /** Ajoute l'attribut hreflang au lien, pour définir la langue du document lié (Ex: 'fr') */
    lang?: string;
  }

  let {
    id,
    actionTitle,
    title,
    hasDescription = true,
    description,
    hasDetailStart = false,
    detailStart,
    hasDetailStartIcon = false,
    detailStartIcon,
    hasDetailEnd = false,
    detailEnd,
    hasDetailEndIcon = false,
    detailEndIcon,
    markup = "h3",
    hasBadge = false,
    enlarge = true,
    actionMarkup = "a",
    href,
    blank = false,
    noLink = false,
    disabled = false,
    size = "md",
    horizontal = false,
    horizontalProportion = "default",
    src,
    alt,
    hasHeaderBadge = false,
    imageRatio = "default",
    hasButtons = false,
    hasLinks = false,
    variations = "none",
    download = false,
    lang,
  }: Props = $props();

  const enlargeClass = $derived.by(() => {
    if (actionMarkup === "button") return "fr-enlarge-button";

    return enlarge && "fr-enlarge-link";
  });
  const detailStartIconClass = $derived.by(() => {
    return hasDetailStartIcon && detailStartIcon && setIconClass(detailStartIcon);
  });
  const detailEndIconClass = $derived.by(() => {
    return hasDetailEndIcon && detailEndIcon && setIconClass(detailEndIcon);
  });
  const sizeClass = $derived(`fr-card--${size}`);
  const horizontalClass = $derived.by(() => horizontal && "fr-card--horizontal");
  const horizontalProportionClass = $derived.by(() => {
    return horizontal && horizontalProportion && `fr-card--horizontal-${horizontalProportion}`;
  });
  const imageRatioClass = $derived(`fr-ratio-${imageRatio}`);
  const variationsClass = $derived(`fr-card--${variations}`);
  const downloadClass = $derived.by(() => download && "fr-card--download");
</script>

<div
  {id}
  class={[
    "fr-card",
    enlargeClass,
    downloadClass,
    horizontalClass,
    horizontalProportionClass,
    sizeClass,
    variationsClass,
  ]}
>
  <div class="fr-card__body">
    <div class="fr-card__content">
      <svelte:element this={markup} class="fr-card__title">
        {#if noLink}
          {title}
        {:else}
          <svelte:element
            this={actionMarkup}
            href={actionMarkup === "a" ? href : undefined}
            target={actionMarkup === "a" && blank ? "_blank" : undefined}
            aria-disabled={actionMarkup === "a" && disabled ? "true" : undefined}
            role={actionMarkup === "a" && disabled ? "link" : undefined}
            type={actionMarkup === "button" ? "button" : undefined}
            disabled={actionMarkup === "button" && disabled}
            hreflang={actionMarkup === "a" && lang ? lang : undefined}
            title={actionTitle}
          >
            {title}
          </svelte:element>
        {/if}
      </svelte:element>
      {#if hasDescription}
        <p class="fr-card__desc">{description}</p>
      {/if}
      {#if hasDetailStart || hasBadge}
        <div class="fr-card__start">
          {#if hasDetailStart && detailStart}
            <p class={["fr-card__detail", detailStartIconClass]}>{detailStart}</p>
          {/if}
          {#if $$slots.badgesgroup}
            <slot name="badgesgroup" />
          {/if}
        </div>
      {/if}
      {#if hasDetailEnd}
        <div class="fr-card__end">
          {#if detailEnd}
            <p class={["fr-card__detail", detailEndIconClass]}>{detailEnd}</p>
          {/if}
          <slot name="contentend" />
        </div>
      {/if}
    </div>
    {#if hasButtons || hasLinks}
      <div class="fr-card__footer">
        {#if hasButtons}
          <slot name="buttonsgroup" />
        {/if}
        {#if hasLinks}
          <slot name="linksgroup" />
        {/if}
      </div>
    {/if}
  </div>
  <div class="fr-card__header">
    <div class="fr-card__img">
      <img class={["fr-responsive-img", imageRatioClass]} {src} {alt} />
    </div>
    {#if hasHeaderBadge}
      <slot name="headerbadges" />
    {/if}
  </div>
</div>

<style lang="scss">
  @use "@gouvfr/dsfr/src/dsfr/core/main" as *;
  @use "@gouvfr/dsfr/dist/component/link/link.main.css";
  @use "@gouvfr/dsfr/dist/component/card/card.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("card");

  .fr-card {
    height: 100%;

    &__header :global(.fr-badges-group),
    :global(::slotted([slot="headerbadges"])) {
      left: 0;
      padding: 0.75rem;
      position: absolute;
      top: 0;
    }
  }
</style>
