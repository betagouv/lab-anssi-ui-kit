<svelte:options
  customElement={{
    tag: "dsfr-dropdown",
    props: {
      id: { attribute: "id", type: "String" },
      collapseId: { attribute: "collapse-id", type: "String" },
      buttonId: { attribute: "button-id", type: "String" },
      buttonTitle: { attribute: "button-title", type: "String" },
      buttonKind: { attribute: "button-kind", type: "String" },
      buttonSize: { attribute: "button-size", type: "String" },
      buttonIcon: { attribute: "button-icon", type: "String" },
      buttonIconPlace: { attribute: "button-icon-place", type: "String" },
      contentType: { attribute: "content-type", type: "String" },
      align: { attribute: "align", type: "String" },
    },
  }}
/>

<script lang="ts">
  import { clickOutside } from "$lib/directives/actions.svelte.ts";
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
  let dropdown;

  function handleClick(event: MouseEvent) {
    const button = event.currentTarget as HTMLButtonElement;
    const ariaExpanded = button.ariaExpanded;
    const ariaControls = button.getAttribute("aria-controls");
    const isExpanded = ariaExpanded === "true";
    button.ariaExpanded = (!isExpanded).toString();

    const collapseElement = ariaControls
      ? button.parentElement.querySelector(`#${ariaControls}`)
      : null;
    if (collapseElement) {
      collapseElement.classList.add("fr-collapsing");

      if (isExpanded) {
        collapseElement.classList.remove("fr-collapse--expanded");
      } else {
        collapseElement.classList.add("fr-collapse--expanded");
      }
    }
  }

  function closeDropdown(event: MouseEvent) {
    const button = dropdown.querySelector(`[aria-controls=${collapseId}]`);
    const collapseElement = dropdown.querySelector(`#${collapseId}`);

    if (button) {
      button.ariaExpanded = "false";
    }
    if (collapseElement) {
      collapseElement.classList.add("fr-collapsing");
      collapseElement.classList.remove("fr-collapse--expanded");
    }
  }

  function ontransitionend(event: TransitionEvent) {
    const collapseElement = event.currentTarget as HTMLElement;

    if (collapseElement.classList.contains("fr-collapsing")) {
      collapseElement.classList.remove("fr-collapsing");
    }
  }
</script>

<div {id} class="fr-dropdown fr-nav" use:clickOutside={closeDropdown} bind:this={dropdown}>
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
        aria-expanded="false"
        aria-controls={collapseId}
        onclick={handleClick}
      />
    </slot>
    <div
      id={collapseId}
      class="fr-collapse fr-dropdown__container"
      class:fr-dropdown__container--right={align === "right"}
      {ontransitionend}
    >
      <svelte:element
        this={contentType === "custom" ? "div" : "ul"}
        class="fr-dropdown__content"
        class:fr-dropdown__content--custom={contentType === "custom"}
      >
        <slot></slot>
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
      filter: drop-shadow(var(--overlap-shadow));
      pointer-events: none;
      position: absolute;
      top: 100%;
      margin: -4px -1rem;
      padding: 4px 1rem;
      width: auto;
      z-index: calc(var(--ground) + 1000);

      &--right {
        right: 0;
      }
    }

    &__content {
      --idle: transparent;
      --hover: var(--background-overlap-grey-hover);
      --active: var(--background-overlap-grey-active);

      background-color: var(--background-overlap-grey);
      background-position: 0 0;
      background-repeat: no-repeat;
      background-size: 100% 1px;
      background-image: linear-gradient(
        0deg,
        var(--background-open-blue-france),
        var(--background-open-blue-france)
      );
      margin: 0;
      margin-bottom: 2rem;
      padding: 0 1rem 1rem;
      padding: 0;
      pointer-events: auto;
      width: 20rem;

      &--custom {
        padding: 0.75rem 1rem;
      }
    }
  }
</style>
