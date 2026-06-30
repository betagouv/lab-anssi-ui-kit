<svelte:options
  customElement={{
    tag: "dsfr-tabnav",
    props: {
      links: { attribute: "links", type: "Array" },
      ariaLabel: { attribute: "aria-label", type: "String" },
      centered: { attribute: "centered", type: "Boolean" },
      routerMode: { attribute: "router-mode", type: "Boolean" },
      activeIndex: { attribute: "active-index", type: "Number" },
    },
  }}
/>

<script lang="ts">
  import { setThemeable } from "$lib/utilitaires";
  import { createSlot } from "$lib/directives/actions.svelte.ts";

  setThemeable($host());

  interface TabnavLink {
    /** Libellé du lien */
    label: string;
    /** URL de destination */
    href: string;
    /** Indique si ce lien correspond à la page courante */
    current?: boolean;
  }

  interface Props {
    /** Liste des liens de navigation */
    links: TabnavLink[];
    /** Valeur de aria-label sur l'élément nav */
    ariaLabel?: string;
    /** Si true, la barre de navigation se réduit à la taille de son contenu et est centrée */
    centered?: boolean;
    /**
     * Si true, le clic sur un lien n'entraîne pas de navigation native.
     * Un événement `linkclicked` est émis dans tous les cas.
     */
    routerMode?: boolean;
    /**
     * Index du lien actif. Prend le dessus sur `links[i].current` si fourni.
     * Permet un contrôle externe de l'état actif sans reconstruire le tableau `links`.
     */
    activeIndex?: number;
  }

  let { links = [], ariaLabel, centered, routerMode, activeIndex }: Props = $props();

  let expanded = $state(false);
  let collapseEl: HTMLDivElement;

  const resolvedIndex = $derived(
    activeIndex !== undefined ? activeIndex : links.findIndex((l) => l.current),
  );
  const buttonLabel = $derived(links[resolvedIndex]?.label ?? links[0]?.label ?? "Navigation");

  function toggle() {
    expanded = !expanded;
    collapseEl?.classList.toggle("fr-collapse--expanded", expanded);
  }

  /**
   * Gère le clic sur un lien de navigation.
   * En mode routeur, empêche la navigation native du navigateur.
   * Et émet un événement `linkclicked` avec le lien et son index.
   *
   * @fires linkclicked - `detail: { index: number, link: TabnavLink }`
   */
  function handleLinkClick(event: MouseEvent, link: TabnavLink, index: number) {
    if (!routerMode) return;

    event.preventDefault();

    $host().dispatchEvent(
      new CustomEvent("linkclicked", { detail: { index, link }, bubbles: true }),
    );
  }
</script>

<nav class={["fr-tabnav", centered && "fr-tabnav--centered"]} aria-label={ariaLabel}>
  <div class="fr-sidemenu">
    <div class="fr-sidemenu__inner">
      <button
        type="button"
        class="fr-sidemenu__btn"
        aria-expanded={expanded}
        aria-controls="fr-tabnav-collapse"
        onclick={toggle}
      >
        {buttonLabel}
      </button>
      <div class="fr-collapse" id="fr-tabnav-collapse" bind:this={collapseEl}>
        <ul>
          {#each links as link, i}
            <li>
              {#if i === resolvedIndex}
                <span class="fr-tabnav__link" aria-current="page" use:createSlot={`link-${i + 1}`}>
                  {link.label}
                </span>
              {:else}
                <a
                  class="fr-tabnav__link"
                  href={link.href}
                  onclick={(e) => handleLinkClick(e, link, i)}
                  use:createSlot={`link-${i + 1}`}
                >
                  {link.label}
                </a>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</nav>

<style lang="scss">
  // DSFR Core styles
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  @import "@gouvfr/dsfr/src/dsfr/core/style/collapse/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/sidemenu/sidemenu.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("tabnav");

  .fr-tabnav {
    margin-bottom: 2rem;
    padding-top: 1rem;

    .fr-sidemenu {
      padding-right: 0;
    }

    ul {
      list-style: none;
      margin: 0;
      padding-inline-start: 0;
      padding-top: 1rem;
    }
  }

  .fr-tabnav__link {
    display: block;
    text-align: left;
    width: 100%;
    padding: 0.75rem 0.5rem;
    text-decoration: none;
    color: var(--text-default-grey);
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.5;
    border: 0;
    background-color: transparent;
    background-repeat: no-repeat;
    background-image: linear-gradient(0deg, var(--border-default-grey), var(--border-default-grey));
    background-size: 100% 1px;
    background-position: 0 100%;

    &[aria-current="page"] {
      display: none;
      color: var(--text-active-blue-france);
    }
  }

  @media (min-width: 48em) {
    .fr-tabnav {
      padding-top: 2rem;

      .fr-sidemenu__inner {
        box-shadow: none;
        padding: 0;
      }

      ul {
        display: flex;
        flex-direction: row;
        padding-top: 0;
        background-image: linear-gradient(
          0deg,
          var(--border-default-grey),
          var(--border-default-grey)
        );
        background-size: 100% 2px;
        background-position: 0 100%;
        background-repeat: no-repeat;
      }
    }

    .fr-tabnav--centered {
      ul {
        width: fit-content;
        margin: 0 auto;
      }

      .fr-tabnav__link {
        width: auto;
      }
    }

    .fr-tabnav__link {
      font-size: 0.875rem;
      font-weight: 400;
      padding: 0.75rem;
      background-repeat: no-repeat;
      background-image: linear-gradient(
        0deg,
        var(--border-default-grey),
        var(--border-default-grey)
      );
      background-size: 100% 2px;
      background-position: 0 100%;

      &:hover:not([aria-current="page"]) {
        background-color: var(--background-default-grey-hover) !important;
        background-image: linear-gradient(
          0deg,
          var(--border-contrast-grey),
          var(--border-contrast-grey)
        );
        background-size: 100% 2px;
        background-position: 0 100%;
      }

      &[aria-current="page"] {
        display: block;
        background-image: linear-gradient(
          0deg,
          var(--border-active-blue-france),
          var(--border-active-blue-france)
        );
        background-size: 100% 2px;
        background-position: 0 100%;
      }
    }
  }
</style>
