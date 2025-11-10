<svelte:options
  customElement={{
    tag: "dsfr-header",
    props: {
      id: { attribute: "id", type: "String" },
      isMourning: { attribute: "is-mourning", type: "Boolean" },
      menuId: { attribute: "menu-id", type: "String" },
      menuModalId: { attribute: "menu-modal-id", type: "String" },
      hasToolLinks: { attribute: "has-tool-links", type: "Boolean" },
      toolLinks: { attribute: "tool-links", type: "Object" },
      duplicateToolLinks: { attribute: "duplicate-tool-links", type: "Boolean" },
      hasTranslate: { attribute: "has-translate", type: "Boolean" },
      translateId: { attribute: "translate-id", type: "String" },
      translateCollapseId: { attribute: "translate-collapse-id", type: "String" },
      translateButtonTitle: { attribute: "translate-button-title", type: "String" },
      translateButtonKind: { attribute: "translate-button-kind", type: "String" },
      translateLanguages: { attribute: "translate-languages", type: "Object" },
      hasSearch: { attribute: "has-search", type: "Boolean" },
      searchId: { attribute: "search-id", type: "String" },
      searchModalId: { attribute: "search-modal-id", type: "String" },
      searchBtnId: { attribute: "search-btn-id", type: "String" },
      searchInputId: { attribute: "search-input-id", type: "String" },
      searchLabel: { attribute: "search-label", type: "String" },
      searchPlaceholder: { attribute: "search-placeholder", type: "String" },
      searchTitle: { attribute: "search-title", type: "String" },
      brandLogoTitle: { attribute: "brand-logo-title", type: "String" },
      brandService: { attribute: "brand-service", type: "String" },
      hasBrandTagline: { attribute: "has-brand-tagline", type: "Boolean" },
      brandTagline: { attribute: "brand-tagline", type: "String" },
      brandLinkId: { attribute: "brand-link-id", type: "String" },
      brandLinkTitle: { attribute: "brand-link-title", type: "String" },
      brandLinkHref: { attribute: "brand-link-href", type: "String" },
      hasBrandOperator: { attribute: "has-brand-operator", type: "Boolean" },
      brandOperatorAlt: { attribute: "brand-operator-alt", type: "String" },
      brandOperatorSrc: { attribute: "brand-operator-src", type: "String" },
      brandOperatorStyle: { attribute: "brand-operator-style", type: "String" },
      hasNavigation: { attribute: "has-navigation", type: "Boolean" },
      navigationId: { attribute: "navigation-id", type: "String" },
      navigationAriaLabel: { attribute: "navigation-aria-label", type: "String" },
      navigationItems: { attribute: "navigation-items", type: "Object" },
      hasHeaderTag: { attribute: "has-header-tag", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  import type { Kind, TranslateLanguage } from "$lib/types";
  import DsfrButton from "./DsfrButton.svelte";
  import DsfrNavigation from "./DsfrNavigation.svelte";
  import DsfrSearch from "./DsfrSearch.svelte";

  type ButtonKind = Extract<Kind, "tertiary" | "tertiary-no-outline">;
  type ToolLink = {
    label: string;
    url: string;
    classes?: string[];
    markup?: "a" | "button";
  };
  type MenuItem = {
    id: string;
    type?: "link" | "menu" | "mega-menu";
    active?: boolean;
    collapsable?: boolean;
    collapseId?: string;
    label: string;
    href?: string;
    items?: MenuItem[];
  };
  interface Props {
    /** Attribut id du header */
    id?: string;
    /** Passe le header en mode deuil */
    isMourning?: boolean;
    /** Attribut id du bouton de menu */
    menuId?: string;
    /** Attribut id de la fenêtre modale du menu */
    menuModalId?: string;
    /** Ajoute des liens d‘accès rapide */
    hasToolLinks?: boolean;
    /** Liens d‘accès rapide */
    toolLinks?: ToolLink[];
    /** Duplique les liens d‘accès rapide dans la modale mobile (pour les SPA) */
    duplicateToolLinks?: boolean;
    /** Ajoute un menu de traduction */
    hasTranslate?: boolean;
    /** Attribut id du menu de traduction */
    translateId?: string;
    /** Attribut id du collapse du menu de traduction */
    translateCollapseId?: string;
    /** Titre du bouton du menu de traduction */
    translateButtonTitle?: string;
    /** Type du bouton du menu de traduction */
    translateButtonKind?: ButtonKind;
    /** Langues du menu de traduction */
    translateLanguages?: TranslateLanguage[];
    /** Ajoute un champ de recherche */
    hasSearch?: boolean;
    /** Attribut id du champ de recherche */
    searchId?: string;
    /** Attribut id de la fenêtre modale de recherche */
    searchModalId?: string;
    /** Attribut id du bouton de recherche */
    searchBtnId?: string;
    /** Attribut id du champ de recherche */
    searchInputId?: string;
    /** Libellé du champ de recherche */
    searchLabel?: string;
    /** Placeholder du champ de recherche */
    searchPlaceholder?: string;
    /** Titre du champ de recherche */
    searchTitle?: string;
    /** Intitulé du logo */
    brandLogoTitle: string;
    /** Titre du service */
    brandService?: string;
    /** Ajoute une baseline */
    hasBrandTagline?: boolean;
    /** Baseline - précisions sur l‘organisation */
    brandTagline?: string;
    /** Attribut id du lien du bloc marque */
    brandLinkId?: string;
    /** Attribut title du lien du bloc marque */
    brandLinkTitle?: string;
    /** Lien du bloc marque */
    brandLinkHref?: string;
    /** Ajoute un logo opérateur dans le bloc marque */
    hasBrandOperator?: boolean;
    /** Texte alternatif du logo opérateur */
    brandOperatorAlt?: string;
    /** Chemin de l‘image du logo opérateur */
    brandOperatorSrc?: string;
    /** Attribut style du logo opérateur (permet de définir la taille) */
    brandOperatorStyle?: string;
    /** Ajoute une navigation principale */
    hasNavigation?: boolean;
    /** Attribut id de la navigation principale */
    navigationId?: string;
    /** Attribut aria-label de la navigation principale */
    navigationAriaLabel?: string;
    /** Éléments de la navigation principale */
    navigationItems?: MenuItem[];
    /** Utiliser une balise <header> pour le composant */
    hasHeaderTag?: boolean;
  }

  let {
    id,
    isMourning,
    menuId,
    menuModalId,
    hasToolLinks,
    toolLinks,
    duplicateToolLinks,
    hasTranslate,
    translateId,
    translateCollapseId,
    translateButtonTitle,
    translateButtonKind,
    translateLanguages,
    hasSearch,
    searchId,
    searchModalId,
    searchBtnId,
    searchInputId,
    searchLabel,
    searchPlaceholder,
    searchTitle,
    brandLogoTitle = "République<br>Française",
    brandService,
    hasBrandTagline,
    brandTagline,
    brandLinkId,
    brandLinkTitle,
    brandLinkHref,
    hasBrandOperator,
    brandOperatorAlt = "",
    brandOperatorSrc,
    brandOperatorStyle,
    hasNavigation,
    navigationId,
    navigationAriaLabel,
    navigationItems,
    hasHeaderTag = true,
  }: Props = $props();

  let openedMenuModal = $state(false);
  let openedSearchModal = $state(false);

  /**
   * Gère l'ouverture et la fermeture des modales du menu ou de la recherche dans le Header.
   *
   * @param {MouseEvent} event - L'événement de clic sur le bouton d'ouverture.
   * @param {"menu" | "search"} [type] - Le type de modal à ouvrir ou fermer ("menu" ou "search").
   *
   * Cette fonction bascule l'état d'ouverture de la modal correspondante et met à jour la classe CSS
   * pour afficher ou masquer la modal. Elle utilise les attributs `data-fr-opened` et `aria-controls`
   * du bouton déclencheur pour cibler la bonne modal.
   */
  function handleOpenMenu(event: MouseEvent, type?: "menu" | "search") {
    const button = event.target as HTMLButtonElement;
    const isOpened = button.getAttribute("data-fr-opened") === "true";
    const modalId = button.getAttribute("aria-controls");
    const modal = modalId ? button.closest(".fr-header").querySelector(`#${modalId}`) : null;

    if (type === "menu") {
      openedMenuModal = !isOpened;
    } else if (type === "search") {
      openedSearchModal = !isOpened;
    }

    if (modal) {
      if (isOpened) {
        modal.classList.remove("fr-modal--opened");
      } else {
        modal.classList.add("fr-modal--opened");
      }
    }
  }

  $effect(() => {
    const rootElement = $host() ?? document.documentElement;

    if (isMourning) {
      rootElement.setAttribute("data-fr-mourning", "");
    } else {
      rootElement.removeAttribute("data-fr-mourning");
    }
  });
</script>

<svelte:element
  this={hasHeaderTag ? "header" : "div"}
  role={hasHeaderTag ? "banner" : undefined}
  class="fr-header"
  {id}
>
  <div class="fr-header__body">
    <div class="fr-container">
      <div class="fr-header__body-row">
        <div class="fr-header__brand fr-enlarge-link">
          <div class="fr-header__brand-top">
            <div class="fr-header__logo">
              <p class="fr-logo">{@html brandLogoTitle}</p>
            </div>
            {#if hasBrandOperator}
              <div class="fr-header__operator">
                <a href={brandLinkHref} title={brandLinkTitle}>
                  <img
                    class="fr-responsive-img"
                    style={brandOperatorStyle}
                    src={brandOperatorSrc}
                    alt={brandOperatorAlt}
                  />
                </a>
              </div>
            {/if}
            {#if hasNavigation || hasSearch}
              <div class="fr-header__navbar">
                {#if hasSearch}
                  <button
                    data-fr-opened={openedSearchModal}
                    aria-controls={searchModalId}
                    title={searchTitle}
                    type="button"
                    id={searchId}
                    class="fr-btn--search fr-btn"
                    onclick={(event) => handleOpenMenu(event, "search")}
                  >
                    {searchTitle}
                  </button>
                {/if}

                {#if hasNavigation}
                  <button
                    data-fr-opened={openedMenuModal}
                    aria-controls={menuModalId}
                    title="Menu"
                    type="button"
                    id={menuId}
                    class="fr-btn--menu fr-btn"
                    onclick={(event) => handleOpenMenu(event, "menu")}
                  >
                    Menu
                  </button>
                {/if}
              </div>
            {/if}
          </div>
          <div class="fr-header__service">
            {#if hasBrandOperator}
              <p class="fr-header__service-title">
                {brandService}

                <slot name="headerbadge"></slot>
              </p>
            {:else}
              <a href={brandLinkHref} title={brandLinkTitle} id={brandLinkId}>
                <p class="fr-header__service-title">
                  {brandService}

                  <slot name="headerbadge"></slot>
                </p>
              </a>
            {/if}
            {#if hasBrandTagline && brandTagline}
              <p class="fr-header__service-tagline">
                {brandTagline}
              </p>
            {/if}
          </div>
        </div>
        {#if hasToolLinks || hasTranslate || hasSearch}
          <div class="fr-header__tools">
            {#if hasToolLinks || hasTranslate}
              <div class="fr-header__tools-links">
                <!-- Tool Links -->
                <slot name="toolLinks"></slot>

                <!-- Translate -->
                <slot name="translate"></slot>
              </div>
            {/if}
            {#if hasSearch}
              <div
                class={["fr-header__search fr-modal", { "fr-modal--opened": openedSearchModal }]}
                id={searchModalId}
                aria-labelledby={searchId}
                aria-modal={openedSearchModal ? "true" : undefined}
                role={openedSearchModal ? "dialog" : undefined}
              >
                <div class="fr-container fr-container-lg--fluid">
                  <DsfrButton
                    data-fr-opened={openedSearchModal}
                    aria-controls={searchModalId}
                    title="Fermer"
                    id={`${searchId}-close`}
                    preset="close"
                    onclick={(event) => handleOpenMenu(event, "search")}
                  >
                    Fermer
                  </DsfrButton>
                  <slot name="searchbar">
                    <DsfrSearch
                      inputId={searchInputId}
                      inputLabel={searchLabel}
                      inputPlaceholder={searchPlaceholder}
                      buttonLabel={searchTitle}
                      buttonTitle={searchTitle}
                    />
                  </slot>
                </div>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
  {#if hasNavigation || duplicateToolLinks}
    <div
      class={["fr-header__menu fr-modal", { "fr-modal--opened": openedMenuModal }]}
      id={menuModalId}
      aria-labelledby={menuId}
      aria-modal={openedMenuModal ? "true" : undefined}
      role={openedMenuModal ? "dialog" : undefined}
    >
      <div class="fr-container">
        {#if hasNavigation}
          <DsfrButton
            data-fr-opened={openedMenuModal}
            aria-controls={menuModalId}
            label="Fermer"
            id={`${menuId}-close`}
            preset="close"
            onclick={(event) => handleOpenMenu(event, "menu")}
          >
            Fermer
          </DsfrButton>
        {/if}

        {#if hasToolLinks}
          <div class="fr-header__menu-links">
            <slot name="modalToolLinks"></slot>
          </div>
        {/if}

        <!-- Navigation -->
        {#if hasNavigation}
          <slot name="navigation">
            <DsfrNavigation
              id={navigationId}
              ariaLabel={navigationAriaLabel}
              items={navigationItems}
            />
          </slot>
        {/if}
      </div>
    </div>
  {/if}
</svelte:element>

<style lang="scss">
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/grid/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/collapse/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @include _core-scheme();
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/logo/logo.main.min.css";
  @import "@gouvfr/dsfr/dist/component/header/header.main.css";
  @import "@gouvfr/dsfr/dist/component/modal/modal.main.min.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("header") {
    &__service-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    :global(.fr-modal > * > .fr-btn--close) {
      margin-bottom: 1.5rem;
    }

    :global(
      .fr-btns-group:not(.fr-btns-group--sm):not(.fr-btns-group--lg):not(
          [class^="fr-btns-group--icon-"]
        ):not([class*=" fr-btns-group--icon-"])
        .fr-btn
    ) {
      justify-content: flex-start;
      max-height: none;
      max-width: 100%;
      overflow: initial;
    }

    :global(
      .fr-header__menu-links
        .fr-btns-group:not(.fr-btns-group--sm):not(.fr-btns-group--lg):not(
          [class^="fr-btns-group--icon-"]
        ):not([class*=" fr-btns-group--icon-"])
        .fr-btn
    ) {
      margin-bottom: 0;
    }

    :global(
      .fr-btns-group:not(.fr-btns-group--sm):not(.fr-btns-group--lg):not(
          [class^="fr-btns-group--icon-"]
        ):not([class*=" fr-btns-group--icon-"])
        .fr-btn::before
    ) {
      --icon-size: 1rem;
      margin-left: -0.125rem;
      margin-right: 0.5rem;
    }

    &__menu-links {
      :global(.fr-btn) {
        --hover: inherit;
        --active: inherit;
        background-color: transparent;
        box-shadow: none;
        color: var(--text-action-high-blue-france);
      }

      :global(
        .fr-btns-group:not(.fr-btns-group--sm):not(.fr-btns-group--lg):not(
            [class^="fr-btns-group--icon-"]
          ):not([class*=" fr-btns-group--icon-"])
          .fr-btn:not([class^="fr-icon-"]):not([class*=" fr-icon-"]):not([class^="fr-fi-"]):not(
            [class*=" fr-fi-"]
          )
      ),
      :global(
        .fr-btns-group:not(.fr-btns-group--sm):not(.fr-btns-group--lg):not(
            [class^="fr-btns-group--icon-"]
          ):not([class*=" fr-btns-group--icon-"])
          .fr-btn[class*=" fr-fi-"]
      ),
      :global(
        .fr-btns-group:not(.fr-btns-group--sm):not(.fr-btns-group--lg):not(
            [class^="fr-btns-group--icon-"]
          ):not([class*=" fr-btns-group--icon-"])
          .fr-btn[class*=" fr-icon-"]
      ),
      :global(
        .fr-btns-group:not(.fr-btns-group--sm):not(.fr-btns-group--lg):not(
            [class^="fr-btns-group--icon-"]
          ):not([class*=" fr-btns-group--icon-"])
          .fr-btn[class^="fr-fi-"]
      ),
      :global(
        .fr-btns-group:not(.fr-btns-group--sm):not(.fr-btns-group--lg):not(
            [class^="fr-btns-group--icon-"]
          ):not([class*=" fr-btns-group--icon-"])
          .fr-btn[class^="fr-icon-"]
      ) {
        min-height: 3rem;
        padding-left: 0;
        padding-right: 0;
      }
    }

    @media (min-width: 62em) {
      :global(.fr-modal > * > .fr-btn--close) {
        display: none;
      }
    }
  }

  .fr-header :global(.fr-nav__list) {
    @media (min-width: 62em) {
      margin: 0 -1rem;
      max-width: calc(100% + 1rem);
    }
  }
</style>
