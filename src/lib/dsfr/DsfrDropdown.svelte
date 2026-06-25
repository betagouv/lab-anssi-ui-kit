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
      items: { attribute: "items", type: "Array" },
      disabled: { attribute: "disabled", type: "Boolean", reflect: true },
    },
    extend: withIconsStyleSheet,
  }}
/>

<script lang="ts">
  import type { Kind, Size } from "$lib/types";
  import { clickOutside } from "$lib/directives/actions.svelte.ts";
  import { withIconsStyleSheet, setThemeable } from "$lib/utilitaires";

  import DsfrButton from "./DsfrButton.svelte";

  setThemeable($host());

  type ButtonKind = Extract<Kind, "tertiary" | "tertiary-no-outline">;
  type ButtonSize = Extract<Size, "sm" | "md" | "lg">;
  type ButtonItem = {
    label: string;
    id?: string;
    disabled?: boolean;
    icon?: string;
    iconPlace?: "only" | "left" | "right";
    href?: string;
    target?: "_self" | "_blank";
    attributes?: Record<string, string>;
  };

  interface Props {
    /** Attribut 'id' du sélecteur de langue */
    id: string;
    /** Attribut 'id' du menu à controler */
    collapseId: string;
    /** Attribut 'id' du bouton */
    buttonId?: string;
    /** Attribut 'title' du bouton */
    buttonTitle?: string;
    /** Variante du bouton */
    buttonKind?: ButtonKind;
    /** Taille du bouton */
    buttonSize?: ButtonSize;
    /** Détermine si le bouton est un bouton d'action. L'activation de cette prop ajoute l'attribut `aria-expanded` sur le composant. */
    buttonIcon?: string;
    /** Emplacement de l'icône<br>Si non défini alors que le paramètre icon est défini, bouton avec icône seule, sans label<br>valeurs :<br>- left : icône à gauche du label<br>- right : icône à droite du label */
    buttonIconPlace?: "only" | "left" | "right";
    /** Type de contenu à afficher dans le dropdown<br>valeurs :<br>- buttons : une liste de boutons<br>- links : une liste de liens<br>- custom : un contenu personnalisé (slot) */
    contentType: "buttons" | "links" | "custom";
    /** Alignement du menu déroulant par rapport au bouton<br>valeurs :<br>- left : aligné à gauche (par défaut)<br>- right : aligné à droite */
    align?: "left" | "right";
    /** Items du menu */
    items?: ButtonItem[];
    /** Désactive le bouton d'ouverture du dropdown */
    disabled?: boolean;
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
    items = [],
    disabled,
  }: Props = $props();
  let dropdown: HTMLElement;
  let effectiveAlign = $state<"left" | "right">(align);

  const isLinks = $derived(contentType === "links");
  const isButtons = $derived(contentType === "buttons");

  /**
   * Calcule l'alignement optimal du dropdown en fonction de l'espace disponible dans la viewport.
   *
   * @param {HTMLElement} collapseElement - L'élément dropdown dont l'alignement doit être calculé
   * @returns {"left" | "right"} L'alignement optimal ("left" ou "right")
   *
   * @description
   * Cette fonction détermine si le dropdown doit être aligné à gauche ou à droite en tenant compte :
   * - De l'alignement initial demandé
   * - De l'espace disponible à droite et à gauche de l'élément hôte
   * - De la largeur du conteneur dropdown
   *
   * Si l'alignement à gauche est demandé mais qu'il n'y a pas assez d'espace à droite,
   * le dropdown sera aligné à droite. Inversement, si l'alignement à droite est demandé
   * mais qu'il n'y a pas assez d'espace à gauche, le dropdown sera aligné à gauche.
   */
  function defineAlignment(collapseElement: HTMLElement): "left" | "right" {
    const hostRect = $host().getBoundingClientRect();
    const containerWidth = collapseElement.offsetWidth || collapseElement.scrollWidth;
    const viewportWidth = window.innerWidth;

    const spaceOnRight = viewportWidth - hostRect.right;
    const spaceOnLeft = hostRect.left;

    if (align === "left" && spaceOnRight < containerWidth) {
      return "right";
    }
    if (align === "right" && spaceOnLeft < containerWidth) {
      return "left";
    }

    return align;
  }

  /**
   * Ajuste les propriétés CSS d'un élément pour l'animation de collapse.
   *
   * Cette fonction calcule la hauteur de l'élément et définit les variables CSS
   * nécessaires pour animer l'ouverture et la fermeture de l'élément.
   *
   * @param {HTMLElement} collapseElement - L'élément DOM à ajuster
   */
  function adjustStyleProperties(collapseElement: HTMLElement) {
    collapseElement.style.setProperty("--collapser", "none");

    const height = collapseElement.offsetHeight;

    collapseElement.style.setProperty("--collapse", -height + "px");
    collapseElement.style.setProperty("--collapser", "");
  }

  /**
   * Gère l'animation de collapsing d'un élément avec expansion/réduction.
   *
   * @param {HTMLElement} collapseElement - L'élément HTML à animer
   * @param {boolean} expand - Détermine si l'élément doit s'agrandir (true) ou se réduire (false)
   *
   * @description
   * Cette fonction applique les classes CSS nécessaires pour déclencher l'animation de collapsing.
   * Elle ajoute la classe "fr-collapsing" et ajuste la hauteur de l'élément avant de basculer
   * l'état d'expansion via la classe "fr-collapse--expanded" au prochain frame d'animation.
   */
  function collapsing(collapseElement: HTMLElement, expand: boolean) {
    collapseElement.classList.add("fr-collapsing");

    adjustStyleProperties(collapseElement);

    requestAnimationFrame(() => {
      if (expand) {
        collapseElement.classList.add("fr-collapse--expanded");
      } else {
        collapseElement.classList.remove("fr-collapse--expanded");
      }
    });
  }

  /**
   * Gère le clic sur le "trigger bouton" de la liste déroulante.
   * Bascule l'état d'expansion du dropdown et gère l'alignement dynamique.
   *
   * @function handleClick
   * @param {MouseEvent} event - L'événement de clic souris
   * @returns {void}
   *
   * @description
   * - Arrête la propagation de l'événement
   * - Alterne l'attribut aria-expanded du bouton
   * - Récupère l'élément contrôlé via aria-controls
   * - Calcule l'alignement effectif si le dropdown s'ouvre
   * - Déclenche l'animation de collapse/expand
   */
  function handleClick(event: MouseEvent) {
    event.stopPropagation();

    const button = event.currentTarget as HTMLButtonElement;
    const isExpanded = button.ariaExpanded === "true";
    const ariaControls = button.getAttribute("aria-controls");

    button.ariaExpanded = (!isExpanded).toString();

    const collapseElement = ariaControls
      ? button.parentElement.querySelector(`#${ariaControls}`)
      : null;

    if (collapseElement) {
      if (!isExpanded) {
        effectiveAlign = defineAlignment(collapseElement as HTMLElement);
      }

      collapsing(collapseElement as HTMLElement, !isExpanded);
    }
  }

  /**
   * Ferme le dropdown en mettant à jour l'état ARIA et en appliquant l'animation de fermeture.
   */
  function closeDropdown() {
    const collapseElement = dropdown.querySelector(`#${collapseId}`);

    if (!collapseElement?.classList.contains("fr-collapse--expanded")) return;

    const button = dropdown.querySelector(`[aria-controls=${collapseId}]`);

    if (button) {
      button.ariaExpanded = "false";
    }
    collapsing(collapseElement as HTMLElement, false);
  }

  /**
   * Déclenche un événement personnalisé lorsqu'un élément du dropdown est cliqué.
   * @param {ButtonItem} item - L'élément du menu qui a été cliqué
   * @param {number} index - L'index de l'élément dans la liste
   */
  function handleItemClick(event: MouseEvent, item: ButtonItem, index: number) {
    event.stopPropagation();
    $host().dispatchEvent(
      new CustomEvent("itemclicked", { detail: { item, index }, bubbles: true }),
    );
  }

  /**
   * Gère la fin de la transition CSS et nettoie les classes de transition.
   * @param {TransitionEvent} event - L'événement de transition CSS
   */
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
        {disabled}
      />
    </slot>
    <div
      id={collapseId}
      class="fr-collapse fr-dropdown__container"
      class:fr-dropdown__container--right={effectiveAlign === "right"}
      {ontransitionend}
    >
      {#if contentType === "custom"}
        <div class="fr-dropdown__content fr-dropdown__content--custom">
          <slot></slot>
        </div>
      {:else}
        <ul class="fr-dropdown__list fr-menu__list">
          {#each items as item, index}
            <li class="fr-dropdown__item fr-menu__item">
              <DsfrButton
                label={item.label}
                kind="tertiary-no-outline"
                size={buttonSize}
                id={item.id}
                disabled={isButtons ? item.disabled : undefined}
                aria-disabled={isLinks && item.disabled ? true : undefined}
                hasIcon={!!item.icon}
                icon={item.icon}
                iconPlace={item.iconPlace}
                markup={isLinks ? "a" : "button"}
                href={isLinks && !item.disabled ? item.href : undefined}
                target={isLinks && !item.disabled ? item.target : undefined}
                {...item.attributes}
                onclick={(event) => handleItemClick(event, item, index)}
              />
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  // DSFR Core styles
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/link";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/display/module/hidden";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/collapse/module";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/spacing/module/elevation";
  // DSFR Navigation
  // @import "@gouvfr/dsfr/src/dsfr/component/navigation/index";
  // @import "@gouvfr/dsfr/src/dsfr/component/navigation/style/module/default";
  // @import "@gouvfr/dsfr/src/dsfr/component/navigation/style/module/menu";
  // @import "@gouvfr/dsfr/src/dsfr/component/navigation/style/scheme";
  // @include _navigation-scheme;

  @import "@gouvfr/dsfr/dist/core/core.min.css";
  @import "@gouvfr/dsfr/dist/component/navigation/navigation.main.min.css";

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
        left: auto;
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
      padding: 0;
      pointer-events: auto;
      width: 20rem;

      &--custom {
        padding: 0.75rem 1rem;
      }
    }

    &__list {
      --idle: transparent;
      --hover: var(--background-overlap-grey-hover);
      --active: var(--background-overlap-grey-active);
      background-color: var(--background-overlap-grey);
      padding: 0;

      background-image: linear-gradient(
        0deg,
        var(--background-open-blue-france),
        var(--background-open-blue-france)
      );
      background-position: 0 0;
      background-repeat: no-repeat;
      background-size: 100% 1px;
      margin-bottom: 2rem;
      pointer-events: auto;
      width: 20rem;
    }

    &__item {
      --component-width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      flex: 0 1 auto;
      position: relative;

      &::before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        box-shadow:
          0 -1px 0 0 var(--border-default-grey),
          inset 0 -1px 0 0 var(--border-default-grey);
      }

      &:first-child:last-child::before {
        box-shadow: none;
      }

      &:first-child::before {
        box-shadow: inset 0 -1px 0 0 var(--border-default-grey);
      }
    }
  }
</style>
