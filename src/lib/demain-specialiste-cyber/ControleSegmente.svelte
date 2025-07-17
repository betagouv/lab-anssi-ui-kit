<script lang="ts">
  import Conteneur from "$lib/demain-specialiste-cyber/Conteneur.svelte";

  interface SegmentedItem {
    title: string;
    href: string;
  }
  export let items: SegmentedItem[];

  const sections = document.querySelectorAll("section");
  const segmentedItems = document.querySelectorAll(".js-anchor");

  /**
   * Détermine si un élément segmenté est actif en comparant le hash de l'URL courante
   * avec la propriété `href` de l'élément.
   *
   * @param {SegmentedItem} item - L'élément segmenté à vérifier.
   * @returns {boolean} `true` si le hash de l'URL correspond à `item.href`, sinon `false`.
   */
  function isActive(item: SegmentedItem): boolean {
    return window.location.hash === item.href;
  }

  /**
   * Gère le clic sur un élément d'ancrage.
   * Retire la classe "active" de l'élément actuellement sélectionné,
   * puis l'ajoute à l'élément correspondant à l'ancre cliquée.
   *
   * @param {string} anchor - L'attribut href de l'ancre sur laquelle l'utilisateur a cliqué.
   */
  function handleClick(anchor: string) {
    const selectedItem = document.querySelector(`[data-anchor].active`);
    const clickedItem = document.querySelector(`[href="${anchor}"]`);

    selectedItem?.classList.remove("active");
    clickedItem?.classList.add("active");
  }
</script>

<div class="dsc-segmented-control">
  <Conteneur>
    <div class="dsc-segmented-control__container">
      {#each items as item, i}
        <a
          href={item.href}
          class="fr-text dsc-segmented-control__anchor js-anchor"
          class:active={isActive(item)}
          on:click={() => handleClick(item.href)}
          data-anchor
        >
          {item.title}
        </a>
      {/each}
    </div>
  </Conteneur>
</div>

<style lang="scss">
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/setting/breakpoint";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/tool/breakpoint";

  .dsc-segmented-control {
    background-color: var(--grey-1000-50);
    position: sticky;
    padding-block: 1rem; // 16px
    top: 0;
    z-index: 2;

    &__container {
      display: flex;

      @include respond-to("sm") {
        overflow-x: auto;
        scrollbar-width: thin;
      }
    }

    &__anchor {
      height: 2.75rem; // 44px
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border-default-grey);
      background-size: 0;
      flex-grow: 1;
      color: var(--blue-france-sun-113-625);
      min-width: 11.25rem; // 180px

      &:not(:last-child) {
        border-right: 0;
      }

      &:active {
        --active-tint: var(--background-default-grey-active);
      }

      &:hover {
        --hover-tint: var(--background-default-grey-hover);
      }

      &:first-child {
        border-top-left-radius: 0.5rem; // 8px
        border-bottom-left-radius: 0.5rem; // 8px
      }

      &:last-child {
        border-top-right-radius: 0.5rem; // 8px
        border-bottom-right-radius: 0.5rem; // 8px
      }

      // active
      &.active {
        background-color: var(--background-action-low-blue-france);

        &:active {
          --active-tint: var(--background-action-low-blue-france-active);
        }

        &:hover {
          --hover-tint: var(--background-action-low-blue-france-hover);
        }
      }
    }
  }
</style>
