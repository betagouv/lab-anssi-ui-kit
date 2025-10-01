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
  }: Props = $props();

  const HIDDEN_CLASS = "fr-hidden fr-unhidden-lg";

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

  function setCurrentPage(index: number): AriaCurrent | undefined {
    return index === currentPageIndex ? "page" : undefined;
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
      href={link.href}
      title={link.title}
      data-index={index}
      aria-current={index ? setCurrentPage(index + 1) : undefined}
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

    {#each pages.slice(0, 3) as page, index}
      {@render pageItem(page, index)}
    {/each}

    <li>
      <span class="fr-pagination__link {HIDDEN_CLASS}"> … </span>
    </li>

    {#each pages.slice(-3) as page}
      {@render pageItem(page, null)}
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
  @use "@gouvfr/dsfr/src/dsfr/core/main" as *;
  @import "@gouvfr/dsfr/dist/component/pagination/pagination.min.css";

  .fr-pagination {
    box-sizing: border-box;
  }
</style>
