<svelte:options
  customElement={{
    tag: "dsfr-navigation",
    props: {
      id: { attribute: "id", type: "String" },
      ariaLabel: { attribute: "aria-label", type: "String" },
      items: { attribute: "items", type: "Array" },
    },
    extend: withIconsStyleSheet,
  }}
/>

<script lang="ts">
  import { setThemeable, withIconsStyleSheet } from "$lib/utilitaires";
  import { createSlot } from "$lib/directives/actions.svelte.ts";

  import DsfrButton from "./DsfrButton.svelte";
  import DsfrLink from "./DsfrLink.svelte";

  setThemeable($host());

  type LeaderLink = {
    id?: string;
    label: string;
    href?: string;
    iconPlace?: "left" | "right";
    icon?: string;
  };

  type Leader = {
    title?: string;
    text: string;
    link?: LeaderLink;
  };

  type Category = {
    label: string;
    href?: string;
    items?: MenuItem[];
  };

  type MenuItem = {
    label: string;
    id?: string;
    type?: "link" | "menu" | "mega-menu";
    active?: boolean;
    collapsable?: boolean;
    collapseId?: string;
    href?: string;
    items?: MenuItem[];
    close?: string;
    leader?: Leader;
    categories?: Category[];
    /**
     * Active les slots nommés à l'intérieur des "mega menu".
     * Ces slots sont nommés au format suivant `<collapseId>-<index>`
     * où `collapseId` est la valeur de l'attribut `collapseId` de l'item<MenuItem> de type "mega-menu"
     * et `index` est l'index de cet item dans le tableau des items<MenuItem[]>.
     *
     * Par exemple, pour un item de type "mega-menu" avec `collapseId` égal à "menu-info" et situé à l'index 2 du tableau des items,
     * le slot correspondant serait nommé "menu-info-2".
     */
    rich?: boolean;
  };

  interface Props {
    /** Attribut id de la navigation principale */
    id: string;
    /** Attribut aria-label de la navigation principale */
    ariaLabel: string;
    /** Éléments de la navigation principale */
    items: MenuItem[];
  }

  let { id, ariaLabel, items = [] }: Props = $props();

  const COLLAPSE_ID_PREFIX = "navigation-collapse";
  let openedIndex: number = $state(-1);
  let navElement: HTMLElement;

  const isLink = (item) =>
    !item.type || item.type === "link" || (item.type === "menu" && !item.collapsable);
  const getMarkup = (item: MenuItem) => (isLink(item) ? "a" : "button");

  /**
   * Génère un identifiant unique pour un élément de collapse.
   *
   * @param {string | undefined} collapseId - L'identifiant de base du collapse, ou undefined
   * @param {number} index - L'index de l'élément
   *
   * @returns {string} L'identifiant généré en concaténant le préfixe/collapseId avec l'index
   */
  function setCollapseId(collapseId: string | undefined, index: number): string {
    return collapseId ? `${collapseId}-${index}` : `${COLLAPSE_ID_PREFIX}-${index}`;
  }

  /**
   * Bascule l'ouverture/fermeture du sous-menu à l'index spécifié.
   *
   * @param {number} index - L'index du sous-menu à basculer
   */
  function toggleSubMenu(index: number) {
    openedIndex = openedIndex === index ? -1 : index;
  }

  $effect(() => {
    function closeOnClickOutside(event: MouseEvent) {
      if (openedIndex === -1) return;
      if (!event.composedPath().includes(navElement)) openedIndex = -1;
    }

    document.addEventListener("mousedown", closeOnClickOutside);

    return () => document.removeEventListener("mousedown", closeOnClickOutside);
  });
</script>

<nav bind:this={navElement} {id} class="fr-nav" role="navigation" aria-label={ariaLabel}>
  {#if items && items.length > 0}
    <ul class="fr-nav__list">
      {#each items as item, index}
        <li class="fr-nav__item">
          <svelte:element
            this={getMarkup(item)}
            class={[isLink(item) ? "fr-nav__link" : "fr-nav__btn"]}
            href={isLink(item) ? item.href : undefined}
            id={item.id}
            type={!isLink(item) ? "button" : undefined}
            aria-expanded={!isLink(item) && item.collapsable
              ? (openedIndex === index).toString()
              : undefined}
            aria-controls={!isLink(item) ? setCollapseId(item.collapseId, index) : undefined}
            aria-current={item.active ? (isLink(item) ? "page" : true) : undefined}
            role={!isLink(item) ? "button" : undefined}
            onclick={item.collapsable ? () => toggleSubMenu(index) : undefined}
          >
            {item.label}
          </svelte:element>
          {#if item.type === "menu" && item.collapsable && item.collapseId}
            <div
              id={setCollapseId(item.collapseId, index)}
              class={["fr-collapse fr-menu", openedIndex === index && "fr-collapse--expanded"]}
            >
              {#if item.items && item.items.length > 0}
                <ul class="fr-menu__list">
                  {#each item.items as subItem, subIndex (subItem.id ?? subIndex)}
                    <li>
                      <a
                        id={subItem.id}
                        href={subItem.href}
                        class="fr-nav__link"
                        aria-current={subItem.active
                          ? isLink(subItem)
                            ? "page"
                            : true
                          : undefined}
                      >
                        {subItem.label}
                      </a>
                    </li>
                  {/each}
                </ul>
              {/if}
            </div>
          {/if}
          {#if item.type === "mega-menu" && item.collapsable && item.collapseId}
            <div
              id={setCollapseId(item.collapseId, index)}
              class={["fr-collapse fr-mega-menu", openedIndex === index && "fr-collapse--expanded"]}
            >
              <div class="fr-container fr-container--fluid fr-container-lg">
                <div class="fr-grid-row fr-grid-row-lg--gutters">
                  <div class="fr-col-12 fr-mb-n3v">
                    <DsfrButton
                      label={item.close ?? "Fermer"}
                      aria-controls={setCollapseId(item.collapseId, index)}
                      onclick={() => toggleSubMenu(index)}
                      preset="close"
                    />
                  </div>

                  {#if !item.rich}
                    {#if item.leader}
                      <div class="fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right">
                        <div class="fr-mega-menu__leader">
                          {#if item.leader.title}
                            <h4 class="fr-h4 fr-mb-2v">{item.leader.title}</h4>
                          {/if}
                          <p>{item.leader.text}</p>
                          {#if item.leader.link}
                            <DsfrLink
                              id={item.leader.link.id}
                              href={item.leader.link.href ?? "#"}
                              label={item.leader.link.label}
                              hasIcon={!!item.leader.link.icon}
                              icon={item.leader.link.icon}
                              iconPlace={item.leader.link.iconPlace}
                              size="sm"
                            />
                          {/if}
                        </div>
                      </div>
                    {/if}
                    {#if item.categories}
                      {#each item.categories as category}
                        <div class="fr-col-12 fr-col-lg-3">
                          <h5 class="fr-mega-menu__category">
                            <a href={category.href ?? "#"} class="fr-nav__link">
                              {category.label}
                            </a>
                          </h5>
                          {#if category.items && category.items.length > 0}
                            <ul class="fr-mega-menu__list">
                              {#each category.items as catItem}
                                <li>
                                  <a
                                    id={catItem.id}
                                    href={catItem.href}
                                    class="fr-nav__link"
                                    aria-current={catItem.active ? "page" : undefined}
                                  >
                                    {catItem.label}
                                  </a>
                                </li>
                              {/each}
                            </ul>
                          {/if}
                        </div>
                      {/each}
                    {/if}
                  {:else}
                    <div
                      class="fr-col-12"
                      use:createSlot={setCollapseId(item.collapseId, index)}
                    ></div>
                  {/if}
                </div>
              </div>
            </div>
          {/if}
        </li>
      {/each}
      {#if $$slots.afternavigation}
        <li class="fr-nav__item">
          <slot name="afternavigation"></slot>
        </li>
      {/if}
    </ul>
  {/if}
</nav>

<style lang="scss">
  // DSFR Core styles
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/link";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/heading";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/collapse/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/spacing/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/grid/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @include _core-scheme;
  // DSFR Navigation
  @import "@gouvfr/dsfr/src/dsfr/component/navigation/index";
  @import "@gouvfr/dsfr/src/dsfr/component/navigation/style/module/default";
  @import "@gouvfr/dsfr/src/dsfr/component/navigation/style/module/menu";
  @import "@gouvfr/dsfr/src/dsfr/component/navigation/style/module/mega-menu";
  @import "@gouvfr/dsfr/src/dsfr/component/navigation/style/scheme";
  @include _navigation-scheme;

  @include set-shadow-host("block", $tag: "dsfr-navigation");
  @include set-dsfr-sizing("nav") {
    position: var(--dsfr-nav-position, relative);
  }
</style>
