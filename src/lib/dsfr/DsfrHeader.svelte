<script lang="ts">
  import DsfrButton from "./DsfrButton.svelte";
  import DsfrNavigation from "./DsfrNavigation.svelte";
  import DsfrSearch from "./DsfrSearch.svelte";
  import DsfrTranslate from "./DsfrTranslate.svelte";

  type TranslateLanguage = {
    active: boolean;
    id: string;
    name: string;
    locale: string;
    href: string;
  };
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
    menuId: string;
    /** Attribut id de la fenêtre modale du menu */
    menuModalId: string;
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
    translateCollapseId: string;
    /** Titre du bouton du menu de traduction */
    translateButtonTitle?: string;
    /** Type du bouton du menu de traduction */
    translateButtonKind?: "tertiary" | "tertiary-no-outline";
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
    navigationId: string;
    /** Attribut aria-label de la navigation principale */
    navigationAriaLabel: string;
    /** Éléments de la navigation principale */
    navigationItems: MenuItem[];
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
    brandLogoTitle,
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
  }: Props = $props();

  let openedModalMenu = $state(false);

  function handleOpenMenu(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const isOpened = button.getAttribute("data-fr-opened") === "true";
    const modalId = button.getAttribute("aria-controls");
    const modal = modalId ? button.closest("header").querySelector(`#${modalId}`) : null;

    openedModalMenu = !isOpened;

    if (modal) {
      if (openedModalMenu) {
        modal.classList.remove("fr-modal--opened");
      } else {
        modal.classList.add("fr-modal--opened");
      }
    }

    // openedModalMenu = !openedModalMenu;

    // console.log("modalElement", modalElement);
    // console.log('openedModalMenu"', openedModalMenu);

    // if (menuBtn && menu) {
    //   const isOpened = menuBtn.getAttribute("data-fr-opened") === "true";
    //   menuBtn.setAttribute("data-fr-opened", String(!isOpened));
    //   menu.setAttribute("data-fr-opened", String(!isOpened));
    // }
  }
</script>

{#snippet buttonGroup()}
  {#if hasToolLinks && toolLinks && toolLinks.length > 0}
    <ul class="fr-btns-group">
      {#each toolLinks as link}
        <li>
          <svelte:element
            this={link.markup ?? "a"}
            href={link.markup === "a" ? link.url : undefined}
            type={link.markup === "button" ? "button" : undefined}
            class={["fr-btn", ...(link.classes ?? [])]}
          >
            {link.label}
          </svelte:element>
        </li>
      {/each}
    </ul>
  {/if}
{/snippet}

{#snippet translate(isMobile)}
  {#if hasTranslate}
    <DsfrTranslate
      id={isMobile ? `${translateId}-mobile` : translateId}
      collapseId={isMobile ? `${translateCollapseId}-mobile` : translateCollapseId}
      buttonTitle={translateButtonTitle}
      buttonKind={translateButtonKind}
      languages={translateLanguages}
    />
  {/if}
{/snippet}

<header role="banner" class="fr-header" {id}>
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
                    class="fr-btn--search fr-btn"
                  >
                    {searchTitle}
                  </button>
                {/if}

                {#if hasNavigation}
                  <button
                    data-fr-opened={openedModalMenu}
                    aria-controls={menuModalId}
                    title="Menu"
                    type="button"
                    id={menuId}
                    class="fr-btn--menu fr-btn"
                    onclick={handleOpenMenu}
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
              </p>
            {:else}
              <a href={brandLinkHref} title={brandLinkTitle} id={brandLinkId}>
                <p class="fr-header__service-title">
                  {brandService}
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
                {@render buttonGroup()}

                <!-- Translate -->
                {@render translate(false)}
              </div>
            {/if}
            {#if hasSearch}
              <div
                class={["fr-header__search fr-modal", { "fr-modal--opened": openedSearchModal }]}
                id={searchModalId}
              >
                <div class="fr-container fr-container-lg--fluid">
                  <button
                    aria-controls={searchModalId}
                    title="Fermer"
                    type="button"
                    class="fr-btn--close fr-btn"
                  >
                    Fermer
                  </button>
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
  <!-- Start -->
  {#if hasNavigation || duplicateToolLinks}
    <div
      class={["fr-header__menu fr-modal", { "fr-modal--opened": openedModalMenu }]}
      id={menuModalId}
      aria-labelledby={menuId}
      aria-modal={openedModalMenu ? "true" : undefined}
      role={openedModalMenu ? "dialog" : undefined}
    >
      <div class="fr-container">
        {#if hasNavigation}
          <button
            aria-controls={menuModalId}
            title="Fermer"
            type="button"
            id={`${menuId}-close`}
            class="fr-btn--close fr-btn"
            onclick={handleOpenMenu}
          >
            Fermer
          </button>
        {/if}

        <div class="fr-header__menu-links">
          {#if duplicateToolLinks}
            <!-- Tool Links -->
            {@render buttonGroup()}

            <!-- Translate -->
            {@render translate(true)}
          {/if}
        </div>

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
</header>

<style lang="scss">
  @import "@gouvfr/dsfr/dist/core/core.min.css";
  @import "@gouvfr/dsfr/src/dsfr/utility/main";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/logo/logo.min.css";
  @import "@gouvfr/dsfr/dist/component/header/header.main.css";
  @import "@gouvfr/dsfr/dist/component/button/button.main.css";
  @import "@gouvfr/dsfr/dist/component/modal/modal.min.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("header");

  .fr-header :global(.fr-nav__list) {
    @media (min-width: 62em) {
      margin: 0 -1rem;
      max-width: calc(100% + 1rem);
    }
  }
</style>
