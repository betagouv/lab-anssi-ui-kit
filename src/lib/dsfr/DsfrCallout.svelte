<svelte:options
  customElement={{
    tag: "dsfr-callout",
    props: {
      hasTitle: { attribute: "has-title", type: "Boolean" },
      title: { attribute: "title", type: "String" },
      text: { attribute: "text", type: "String" },
      id: { attribute: "id", type: "String" },
      hasIcon: { attribute: "has-icon", type: "Boolean" },
      icon: { attribute: "icon", type: "String" },
      titleMarkup: { attribute: "title-markup", type: "String" },
      hasButton: { attribute: "has-button", type: "Boolean" },
      buttonLabel: { attribute: "button-label", type: "String" },
      accent: { attribute: "accent", type: "String" },
    },
    extend: withIconsStyleSheet,
  }}
/>

<script lang="ts">
  import type { Accent } from "$lib/types";
  import { withIconsStyleSheet, setIconClass, setThemeable } from "$lib/utilitaires";

  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";

  setThemeable($host());

  export type TitleMarkup = "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  export interface Props {
    /** Ajoute un titre dans la mise en avant */
    hasTitle?: boolean;
    /** Titre de la mise en avant */
    title?: string;
    /** Contenu texte de la mise en avant */
    text: string;
    /** Attribut id de la mise en avant */
    id?: string;
    /** Affiche une icône */
    hasIcon?: boolean;
    /** Nom de l'icône */
    icon?: string;
    /** Niveau d'entête du titre */
    titleMarkup?: TitleMarkup;
    /** Affiche un bouton */
    hasButton?: boolean;
    /** Libellé du bouton */
    buttonLabel?: string;
    /** Couleur d'accentuation */
    accent?: Accent;
  }

  let {
    hasTitle = true,
    title,
    text,
    id,
    hasIcon = false,
    icon,
    titleMarkup = "h3",
    hasButton = false,
    buttonLabel,
    accent,
  }: Props = $props();

  const accentClass = $derived(accent && `fr-callout--${accent}`);
  const iconClass = $derived(hasIcon && icon && setIconClass(icon));
</script>

<div {id} class={["fr-callout", accentClass, iconClass]}>
  {#if hasTitle}
    <slot name="title">
      <svelte:element this={titleMarkup} class="fr-callout__title">{title}</svelte:element>
    </slot>
  {/if}
  <slot name="description">
    <p class="fr-callout__text">{text}</p>
  </slot>
  {#if hasButton}
    <slot name="button">
      {#if buttonLabel}
        <DsfrButton label={buttonLabel} />
      {/if}
    </slot>
  {/if}
</div>

<style lang="scss">
  // DSFR Core styles
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @use "@gouvfr/dsfr/src/module/color";
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/heading";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/callout/callout.main.min.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("callout") {
    &__text:not(:last-child) {
      margin-bottom: 1rem;
    }

    :global(::slotted([slot="title"])) {
      @include title-style(h4);
      @include margin(var(--title-spacing));
      @include color.text(
        title grey,
        (
          legacy: false,
        )
      );
    }

    :global(::slotted([slot="description"])) {
      @include text-style(lg, true);
    }
  }
</style>
