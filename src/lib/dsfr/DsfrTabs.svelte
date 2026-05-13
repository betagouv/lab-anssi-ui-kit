<svelte:options
  customElement={{
    tag: "dsfr-tabs",
    props: {
      hasIcon: { attribute: "has-icon", type: "Boolean" },
      tabs: { attribute: "tabs", type: "Array" },
      ariaLabel: { attribute: "aria-label", type: "String" },
      activeTabIndex: { attribute: "active-tab-index", type: "Number" },
    },
    extend: (CustomElementClass) => {
      return class extends CustomElementClass {
        connectedCallback() {
          super.connectedCallback();

          const iconsStyleSheet = getIconsStyleSheet();
          const shadow = this.shadowRoot;

          if (shadow && !shadow.adoptedStyleSheets.includes(iconsStyleSheet)) {
            shadow.adoptedStyleSheets = [iconsStyleSheet, ...shadow.adoptedStyleSheets];
          }
        }
      };
    },
  }}
/>

<script lang="ts">
  import { untrack } from "svelte";
  import { getIconsStyleSheet, setIconClass, setThemeable } from "$lib/utilitaires";
  import { createSlot } from "$lib/directives/actions.svelte.ts";

  setThemeable($host());

  interface Tab {
    /** Identifiant unique de l'onglet, utilisé pour les attributs ARIA */
    id: string;
    /** Libellé du bouton d'onglet */
    label: string;
    /** Contenu HTML du panneau (⚠️ XSS — ne pas passer de contenu non maîtrisé) */
    content: string;
    /** Nom de l'icône DSFR (ex: "checkbox-circle-line") */
    icon?: string;
  }

  interface Props {
    /** Si true, ajoute une icone dans le titre des onglets */
    hasIcon?: boolean;
    /** Liste des onglets */
    tabs: Tab[];
    /** Valeur de aria-label sur la liste des onglets */
    ariaLabel?: string;
    /** Index de l'onglet actif à l'initialisation */
    activeTabIndex?: number;
  }

  let { hasIcon, tabs = [], ariaLabel, activeTabIndex = 0 }: Props = $props();

  let activeIndex = $state(untrack(() => activeTabIndex));

  let tabsElement: HTMLDivElement | undefined;
  let tabsListElement: HTMLUListElement | undefined;

  let tabButtons: (HTMLButtonElement | null)[] = [];
  let panelEls: (HTMLDivElement | null)[] = [];

  /**
   * Détermine la direction d'animation du panneau d'onglet
   *
   * @param {number} index - L'index du panneau à analyser
   * @returns {false|string} - false si c'est le panneau actif, sinon la classe de direction
   * "fr-tabs__panel--direction-start" si index < activeIndex, sinon "fr-tabs__panel--direction-end"
   */
  function panelDirection(index: number) {
    if (index === activeIndex) return false;

    return index < activeIndex
      ? "fr-tabs__panel--direction-start"
      : "fr-tabs__panel--direction-end";
  }

  $effect(() => {
    const panel = panelEls[activeIndex];
    if (!tabsElement || !panel || !tabsListElement) return;

    const updateHeight = () => {
      const panelHeight = panel.offsetHeight;
      const listHeight = tabsListElement!.offsetHeight;
      tabsElement!.style.setProperty("--tabs-height", `${panelHeight + listHeight - 4}px`);
    };

    const observer = new ResizeObserver(updateHeight);
    observer.observe(panel);

    return () => observer.disconnect();
  });

  /**
   * Sélectionne un onglet et émet un événement personnalisé.
   *
   * @param {number} index - L'index de l'onglet à sélectionner
   * @fires tabchanged - Événement déclenché avec l'index et l'onglet sélectionné
   */
  function selectTab(index: number) {
    activeIndex = index;

    $host().dispatchEvent(
      new CustomEvent("tabchanged", { detail: { index, tab: tabs[index] }, bubbles: true }),
    );
  }
</script>

<div class="fr-tabs" bind:this={tabsElement}>
  <ul class="fr-tabs__list" role="tablist" aria-label={ariaLabel} bind:this={tabsListElement}>
    {#each tabs as tab, i}
      <li role="presentation">
        <button
          type="button"
          id={tab.id}
          class={[
            "fr-tabs__tab",
            tab.icon && `fr-icon-${tab.icon} fr-tabs__tab--icon-left`,
            hasIcon && setIconClass(tab.icon),
          ]}
          tabindex={activeIndex === i ? 0 : -1}
          role="tab"
          aria-selected={activeIndex === i}
          aria-controls={`${tab.id}-panel`}
          bind:this={tabButtons[i]}
          onclick={() => selectTab(i)}
          use:createSlot={`tab-${i + 1}`}
        >
          {tab.label}
        </button>
      </li>
    {/each}
  </ul>
  {#each tabs as tab, i}
    <div
      id={`${tab.id}-panel`}
      class={["fr-tabs__panel", activeIndex === i && "fr-tabs__panel--selected", panelDirection(i)]}
      role="tabpanel"
      aria-labelledby={tab.id}
      tabindex="0"
      bind:this={panelEls[i]}
      use:createSlot={`panel-${i + 1}`}
    >
      {@html tab.content}
    </div>
  {/each}
</div>

<style lang="scss">
  // DSFR Core styles
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/motion/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @include _core-scheme;
  // DSFR Component styles
  @import "@gouvfr/dsfr/src/dsfr/component/tab/main";

  @include set-shadow-host();
  @include set-dsfr-sizing("tabs");
</style>
