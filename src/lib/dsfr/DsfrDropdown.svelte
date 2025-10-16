<script lang="ts">
  import type { Kind, Size } from "$lib/types";
  import DsfrButton from "./DsfrButton.svelte";

  type ButtonKind = Extract<Kind, "tertiary" | "tertiary-no-outline">;
  type ButtonSize = Extract<Size, "sm" | "md" | "lg">;

  interface Props {
    /** Attribut 'id' du sélecteur de langue */
    id: string;
    /** Attribut 'id' du menu à controler */
    collapseId: string;
    /** Attribut 'id' du bouton */
    buttonId?: string;
    /** Attribut 'title' du bouton */
    buttonTitle?: string;
    /** Variante du bouton de sélection de langue */
    buttonKind?: ButtonKind;
    /** Taille du bouton de sélection de langue */
    buttonSize?: ButtonSize;
    /** Détermine si le bouton est un bouton d'action. L'activation de cette prop ajoute l'attribut `aria-expanded` sur le composant. */
    buttonIcon?: string;
    /** Emplacement de l'icône<br>Si non défini alors que le paramètre icon est défini, bouton avec icône seule, sans label<br>valeurs :<br>- left : icône à gauche du label<br>- right : icône à droite du label */
    buttonIconPlace?: "only" | "left" | "right";
    /** Type de contenu à afficher dans le dropdown<br>valeurs :<br>- buttons : une liste de boutons<br>- links : une liste de liens<br>- custom : un contenu personnalisé (slot) */
    contentType: "buttons" | "links" | "custom";
    /** Alignement du menu déroulant par rapport au bouton<br>valeurs :<br>- left : aligné à gauche (par défaut)<br>- right : aligné à droite */
    align?: "left" | "right";
  }

  let {
    id,
    collapseId,
    buttonId,
    buttonTitle,
    buttonKind = "tertiary",
    buttonSize = "md",
    buttonIcon,
    buttonIconPlace = "left",
    contentType = "custom",
    align = "left",
  }: Props = $props();

  let expanded = $state(false);
</script>

<div {id} class="fr-dropdown fr-nav">
  <div class="fr-nav__item">
    <slot name="button">
      <DsfrButton
        expandable
        id={buttonId}
        kind={buttonKind}
        size={buttonSize}
        label={buttonTitle}
        hasIcon={!!buttonIcon}
        icon={buttonIcon}
        iconPlace={buttonIconPlace}
        onclick={() => (expanded = !expanded)}
      />
    </slot>
    <div
      id={collapseId}
      class="fr-collapse fr-menu fr-translate__menu fr-dropdown__container"
      class:fr-collapse--expanded={expanded}
      class:fr-dropdown__container--right={align === "right"}
    >
      <svelte:element
        this={contentType === "custom" ? "div" : "ul"}
        class="fr-menu__list fr-dropdown__content"
        class:fr-dropdown__content--custom={contentType === "custom"}
      >
        {#if contentType !== "custom"}
          <!-- TODO: Cette partie est pour l'instant hors scope. A planifier dans un second temps. -->
        {:else}
          <slot></slot>
        {/if}
      </svelte:element>
    </div>
  </div>
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/link";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/display/module/hidden";
  @import "@gouvfr/dsfr/src/dsfr/core/style/collapse/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/spacing/module/elevation";
  // DSFR Navigation
  @import "@gouvfr/dsfr/src/dsfr/component/navigation/index";
  @import "@gouvfr/dsfr/src/dsfr/component/navigation/style/module/default";
  @import "@gouvfr/dsfr/src/dsfr/component/navigation/style/module/menu";
  @import "@gouvfr/dsfr/src/dsfr/component/navigation/style/scheme";
  @include _navigation-scheme;
  // DSFR Dropdown
  @include set-shadow-host("inline-flex");
  @include set-dsfr-sizing("dropdown") {
    --rows: 8;

    display: inline-flex;
    position: relative;

    &__container {
      &--right {
        right: 0;
      }
    }

    &__content {
      &--custom {
        padding: 1rem;
      }
    }
  }
</style>
