<svelte:options
  customElement={{
    tag: "dsfr-tile",
    props: {
      title: { attribute: "title", type: "String" },
      hasDescription: { attribute: "has-description", type: "Boolean" },
      description: { attribute: "description", type: "String" },
      hasDetails: { attribute: "has-details", type: "Boolean" },
      details: { attribute: "details", type: "String" },
      markup: { attribute: "markup", type: "String" },
      pictogramName: { attribute: "pictogram-name", type: "String" },
      hasBadge: { attribute: "has-badge", type: "Boolean" },
      hasTag: { attribute: "has-tag", type: "Boolean" },
      enlarge: { attribute: "enlarge", type: "Boolean" },
      actionMarkup: { attribute: "action-markup", type: "String" },
      href: { attribute: "href", type: "String" },
      actionTitle: { attribute: "action-title", type: "String" },
      noLink: { attribute: "no-link", type: "Boolean" },
      disabled: { attribute: "disabled", type: "Boolean" },
      blank: { attribute: "blank", type: "Boolean" },
      download: { attribute: "download", type: "Boolean" },
      lang: { attribute: "lang", type: "String" },
      assess: { attribute: "assess", type: "Boolean" },
      assessBytes: { attribute: "assess-bytes", type: "Boolean" },
      size: { attribute: "size", type: "String" },
      horizontal: { attribute: "horizontal", type: "Boolean" },
      verticalBreakpoint: { attribute: "vertical-breakpoint", type: "String" },
      variations: { attribute: "variations", type: "String" },
      markupLevel: { attribute: "markup-level", type: "Number" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { setThemeable } from "$lib/utilitaires";

  setThemeable($host());

  type TitleMarkup = "h2" | "h3" | "h4" | "h5";
  type TileSize = Extract<Size, "sm" | "md">;
  interface Props {
    /** Titre de la tuile */
    title: string;
    /** Si true, ajoute une description dans le contenu */
    hasDescription?: boolean;
    /** Description de la tuile */
    description?: string;
    /** Si true, ajoute une ligne détails dans le contenu */
    hasDetails?: boolean;
    /** Détails de la tuile. Obligatoire si download = true */
    details?: string;
    /** Niveau de titre de la tuile (default: h3) */
    markupLevel?: 2 | 3 | 4 | 5;
    /** Nom du pictogramme de la tuile */
    pictogramName?: string;
    /** Si true, ajoute un badge dans le contenu */
    hasBadge?: boolean;
    /** Si true, ajoute un tag dans le contenu */
    hasTag?: boolean;
    /** Si true, agrandi la zone de clic à toute la tuile */
    enlarge?: boolean;
    /** balise de l'actionneur du composant (a, button) */
    actionMarkup?: "a" | "button" | "false";
    /** URL de destination du lien */
    href?: string;
    /** Attribut title de l'actionneur. Si blank = true, il est obligatoire et doit reprendre le titre suivi de la mention "- nouvelle fenêtre" */
    actionTitle?: string;
    /** Si true, absence d'actionneur */
    noLink?: boolean;
    /** Si true, retire le href du lien pour le désactiver ou ajoute l'attribut disabled sur le bouton */
    disabled?: boolean;
    /** Ajoute l'attribut target="_blank" pour ouvrir le lien dans une nouvelle fenêtre, nécessite l'ajout d'un attribut title "intitulé - nouvelle fenêtre" */
    blank?: boolean;
    /** Si true, passe la tuile en mode téléchargement */
    download?: boolean;
    /** Ajoute l'attribut hreflang au lien, pour définir la langue du document lié (Ex: 'fr') */
    lang?: string;
    /** Si true, évaluation automatique des détails du fichier à télécharger (poids, format, etc.). <br>Testez avec href = "img/placeholder.16x9.png" */
    assess?: boolean;
    /** Si true, change l'unité de mesure de l'évaluation automatique du poids en Bytes */
    assessBytes?: boolean;
    /** Taille de la tuile ("md" - default | "sm"). */
    size?: TileSize;
    /** Si true, passe la tuile en mode horizontal */
    horizontal?: boolean;
    /** Valeur de breakpoint du passage en mode vertical */
    verticalBreakpoint?: "false" | "md" | "lg";
    /** Variations esthétiques de la carte */
    variations?: "none" | "grey" | "no-border" | "no-background" | "shadow";
  }

  let {
    title,
    hasDescription = false,
    description,
    hasDetails = false,
    details,
    markupLevel = 3,
    pictogramName,
    hasBadge = false,
    hasTag = false,
    enlarge = false,
    actionMarkup = "a",
    href,
    actionTitle = "",
    noLink = false,
    disabled = false,
    blank = false,
    download = false,
    lang,
    assess = false,
    assessBytes = false,
    size = "md",
    horizontal = false,
    verticalBreakpoint = "false",
    variations = "none",
  }: Props = $props();

  const actionMarkupTag = $derived.by(() => {
    return actionMarkup !== "false" ? actionMarkup : "a";
  });

  const classEnlarge = $derived.by(() => {
    if (actionMarkup === "a" && enlarge) return "fr-enlarge-link";

    return actionMarkup === "button" ? "fr-enlarge-button" : "";
  });
  const classVertical = $derived.by(() => {
    return horizontal && verticalBreakpoint !== "false"
      ? `fr-tile--vertical@${verticalBreakpoint}`
      : "";
  });
  const classVariation = $derived.by(() => {
    return variations !== "none" ? `fr-tile--${variations}` : "";
  });
  const titleTag: TitleMarkup = $derived.by(
    () => ([2, 3, 4, 5].includes(markupLevel) ? `h${markupLevel}` : `h3`) as TitleMarkup,
  );
  const actionTag = $derived.by(() => {
    return actionMarkup.toString() !== "false" ? actionMarkup : "a";
  });
</script>

<div
  class={["fr-tile", classEnlarge, classVertical, classVariation, `fr-tile--${size}`]}
  class:fr-tile--download={download}
  class:fr-tile--horizontal={horizontal}
>
  <div class="fr-tile__body">
    <div class="fr-tile__content">
      <svelte:element this={titleTag} class="fr-tile__title">
        {#if actionMarkup === "false" && noLink}
          {title}
        {:else}
          <svelte:element
            this={actionTag}
            href={actionTag === "a" && !disabled ? href : undefined}
            type={actionTag === "button" ? "button" : undefined}
            target={actionTag === "a" && blank ? "_blank" : undefined}
            rel={actionTag === "a" && blank ? "noopener external" : undefined}
            disabled={actionTag === "button" && disabled ? true : undefined}
            aria-disabled={actionTag === "a" && disabled ? "true" : undefined}
            role={actionTag === "a" && disabled ? "link" : undefined}
            hreflang={actionTag === "a" && download ? lang : undefined}
            title={actionTitle}
          >
            {title}
          </svelte:element>
        {/if}
      </svelte:element>
      {#if hasDescription}
        <p class="fr-tile__desc">{description}</p>
      {/if}
      {#if hasDetails || download}
        <p class="fr-tile__detail">{details}</p>
      {/if}
      {#if hasBadge || hasTag}
        <div class="fr-tile__start">
          {#if hasBadge && !hasTag}
            <slot name="badge"></slot>
          {:else}
            <slot name="tag"></slot>
          {/if}
        </div>
      {/if}
    </div>
  </div>
  {#if $$slots.pictogram}
    <div class="fr-tile__header">
      <div class="fr-tile__pictogram">
        <span class="fr-artwork">
          <slot name="pictogram"></slot>
        </span>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/link";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/enlarge";
  @import "@gouvfr/dsfr/src/dsfr/core/style/artwork/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/heading";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  @import "@gouvfr/dsfr/src/dsfr/core/style/color/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/spacing/module/margin";
  @import "@gouvfr/dsfr/src/dsfr/core/style/spacing/module/elevation";
  // DSFR Tile
  @import "@gouvfr/dsfr/dist/component/tile/tile.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("tile") {
    height: 100%;
  }
</style>
