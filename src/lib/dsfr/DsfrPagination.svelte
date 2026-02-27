<svelte:options
  customElement={{
    tag: "dsfr-pagination",
    props: {
      pages: { attribute: "pages", type: "Array" },
      hasFirstAndLast: { attribute: "has-first-and-last", type: "Boolean" },
      first: { attribute: "first", type: "Object" },
      last: { attribute: "last", type: "Object" },
      firstAndLastDisplayedLg: { attribute: "first-and-last-displayed-lg", type: "Boolean" },
      hasPrevAndNext: { attribute: "has-prev-and-next", type: "Boolean" },
      prev: { attribute: "prev", type: "Object" },
      next: { attribute: "next", type: "Object" },
      prevAndNextDisplayedLg: { attribute: "prev-and-next-displayed-lg", type: "Boolean" },
      prevAndNextHasLgLabel: { attribute: "prev-and-next-has-lg-label", type: "Boolean" },
      currentPageIndex: { attribute: "current-page-index", type: "Number" },
    },
  }}
/>

<script lang="ts">
  import { setThemeable } from "$lib/utilitaires";

  setThemeable($host());

  type AriaCurrent = "page" | "step" | "location" | "date" | "time" | "true" | "false" | boolean;
  type PageLink = {
    label: string;
    href: string;
    title?: string;
    displayedLg?: boolean;
  };
  type PagePosition = "first" | "prev" | "next" | "last" | undefined;
  interface Props {
    /** Liste des pages à afficher dans la pagination */
    pages: PageLink[];
    /** Ajoute des boutons Première et Dernière page */
    hasFirstAndLast?: boolean;
    /** Données du bouton de Première page */
    first?: PageLink;
    /** Données du bouton de Dernière page */
    last?: PageLink;
    /** Affiche les boutons Première et Dernière page à partir du breakpoint LG */
    firstAndLastDisplayedLg?: boolean;
    /** Ajoute des boutons page Précédente et Suivante */
    hasPrevAndNext?: boolean;
    /** Données du bouton de page Précédente */
    prev?: PageLink;
    /** Données du bouton de page Suivante */
    next?: PageLink;
    /** Affiche les boutons page Précédente et Suivante à partir du breakpoint LG */
    prevAndNextDisplayedLg?: boolean;
    /** Affiche les libellés des boutons page Précédente et Suivante à partir du breakpoint LG */
    prevAndNextHasLgLabel?: boolean;
    /** Page courante */
    currentPageIndex?: number;
    /** Callback appelé lors du changement de page */
    onpagechange?: (page: number) => void;
  }

  let {
    pages = [],
    hasFirstAndLast = false,
    first,
    last,
    firstAndLastDisplayedLg = false,
    hasPrevAndNext = false,
    prev,
    next,
    prevAndNextDisplayedLg = false,
    prevAndNextHasLgLabel = false,
    currentPageIndex,
    onpagechange,
  }: Props = $props();

  const HIDDEN_CLASS = "fr-hidden fr-unhidden-lg";
  const disabledFirst = $derived(currentPageIndex === 1);
  const disabledLast = $derived(currentPageIndex === pages.length);

  /**
   * Retourne la classe CSS à appliquer pour masquer ou styliser un lien de pagination selon sa position et ses propriétés d'affichage.
   *
   * @param {PagePosition} position - La position du lien dans la pagination ("first", "last", "prev", "next", etc.).
   * @param {Object} link - L'objet représentant le lien de pagination, contenant notamment la propriété `displayedLg`.
   * @returns {string|undefined} La classe CSS à appliquer pour masquer ou styliser le lien, ou `undefined` si aucune classe n'est nécessaire.
   */
  function getHiddenClass(position: PagePosition, link): string {
    const isFirstOrLast = position === "first" || position === "last";
    const isPrevOrNext = position === "prev" || position === "next";

    if (!isFirstOrLast && !isPrevOrNext && link.displayedLg) {
      return HIDDEN_CLASS;
    } else if (isFirstOrLast && firstAndLastDisplayedLg) {
      return HIDDEN_CLASS;
    } else if (isPrevOrNext && prevAndNextDisplayedLg) {
      return HIDDEN_CLASS;
    } else if (isPrevOrNext && prevAndNextHasLgLabel) {
      return "fr-pagination__link--lg-label";
    }
  }

  /**
   * Détermine la valeur de l'attribut `aria-current` pour une page de pagination.
   *
   * @param {number} index - L'index de la page à vérifier.
   * @returns {AriaCurrent | undefined} Retourne "page" si l'index correspond à la page courante, sinon `undefined`.
   */
  function setAriaCurrent(index: number): AriaCurrent | undefined {
    if (index === null) return undefined;

    return index + 1 === currentPageIndex ? "page" : undefined;
  }

  /**
   * Génère ou annule le lien de pagination en fonction de la position et de l'état de désactivation.
   *
   * @param {string} href - L'URL à utiliser pour le lien de pagination.
   * @param {PagePosition} position - La position de la page ("first", "prev", "next", "last").
   * @returns {string | undefined} L'URL du lien si la position n'est pas désactivée, sinon `undefined`.
   */
  function setHref(href: string, position: PagePosition): string | undefined {
    if (
      (["first", "prev"].includes(position) && disabledFirst) ||
      (["last", "next"].includes(position) && disabledLast)
    ) {
      return undefined;
    }

    return href;
  }

  /**
   * Détermine si un lien de pagination doit être désactivé selon sa position.
   *
   * @param {PagePosition} position - La position du lien de pagination ('first', 'prev', 'next', 'last').
   * @returns {boolean | string | undefined} Retourne `true` si le lien doit être désactivé, sinon `undefined`.
   */
  function setAriaDisabled(position: PagePosition): string | undefined {
    if (
      (["first", "prev"].includes(position) && disabledFirst) ||
      (["last", "next"].includes(position) && disabledLast)
    ) {
      return "true";
    }

    return undefined;
  }

  /**
   * Gère le clic sur un lien de pagination et appelle le callback de changement de page.
   *
   * @param {MouseEvent} e - L'événement clic.
   * @param {number | null | undefined} index - L'index de la page cliquée, ou null/undefined pour les boutons spéciaux (first, prev, next, last).
   * @param {PagePosition} [position] - La position du lien cliqué ('first', 'prev', 'next', 'last', ou undefined pour un numéro de page).
   */
  function handlePageClick(
    e: MouseEvent,
    index: number | null | undefined,
    position?: PagePosition,
  ) {
    if (!onpagechange) return;
    e.preventDefault();

    if ((position === "first" || position === "prev") && disabledFirst) return;
    if ((position === "last" || position === "next") && disabledLast) return;

    let targetPage: number;
    if (position === "prev") targetPage = (currentPageIndex ?? 2) - 1;
    else if (position === "next") targetPage = (currentPageIndex ?? 0) + 1;
    else if (position === "first") targetPage = 1;
    else if (position === "last") targetPage = pages.length;
    else targetPage = (index ?? 0) + 1;

    onpagechange(targetPage);
  }
</script>

{#snippet pageItem(link: PageLink, index?: number | null, position?: PagePosition)}
  <li>
    <a
      class={[
        "fr-pagination__link",
        getHiddenClass(position, link),
        { [`fr-pagination__link--${position}`]: position },
      ]}
      href={setHref(link.href, position)}
      title={link.title}
      aria-current={setAriaCurrent(index)}
      aria-disabled={setAriaDisabled(position)}
      onclick={(e) => handlePageClick(e, index, position)}
    >
      {link.label}
    </a>
  </li>
{/snippet}

<nav
  role="navigation"
  class="fr-pagination"
  aria-label="Pagination"
  data-fr-analytics-page-total="132"
>
  <ul class="fr-pagination__list">
    {#if hasFirstAndLast}
      {@render pageItem(first, null, "first")}
    {/if}

    {#if hasPrevAndNext}
      {@render pageItem(prev, null, "prev")}
    {/if}

    {#each pages as page, index}
      {@render pageItem(page, index)}
    {/each}

    {#if hasPrevAndNext}
      {@render pageItem(next, null, "next")}
    {/if}

    {#if hasFirstAndLast}
      {@render pageItem(last, null, "last")}
    {/if}
  </ul>
</nav>

<style lang="scss">
  // DSFR Core styles
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/link";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/pagination/pagination.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("pagination") {
    &__link {
      @include set-border-radius();
    }
  }
</style>
