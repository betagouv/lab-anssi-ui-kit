<svelte:options
  customElement={{
    tag: "lab-anssi-ancres",
    props: {
      ancres: { attribute: "ancres", type: "Array" },
      indexActif: { attribute: "index-actif", type: "Number" },
    },
  }}
/>

<script lang="ts">
  type Ancre = {
    label: string;
    cible: string;
  };

  interface Props {
    ancres: Ancre[];
    indexActif?: number;
  }

  let { ancres, indexActif = 0 }: Props = $props();
  let scrollStart = $state(false);
  let scrollEnd = $state(true);

  /**
   * Gère le clic sur une ancre de navigation.
   * Met à jour l'index actif et effectue un défilement fluide vers l'élément cible correspondant à l'ancre.
   *
   * @param {string} cible - Sélecteur CSS de l'élément cible vers lequel scroller.
   * @param {number} index - Index de l'ancre sélectionnée, utilisé pour mettre à jour l'état actif.
   */
  function gestionClicAncre(cible: string, index: number): void {
    indexActif = index;

    // Scroll vers l'élément avec l'ancre
    const element = document.querySelector(cible);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  /**
   * Gère l'affichage des ombres en fonction de la position du scroll.
   * Met à jour les indicateurs `scrollStart` et `scrollEnd` selon la position du scroll :
   * - Si le scroll est au début, `scrollStart` est false et `scrollEnd` est true.
   * - Si le scroll est à la fin, `scrollStart` est true et `scrollEnd` est false.
   * - Sinon, les deux sont true.
   *
   * @param {Event} event - L'événement de scroll déclenché sur le conteneur.
   */
  function handleScroll(event: Event) {
    const container = event.currentTarget as HTMLElement;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    if (scrollLeft === 0) {
      scrollStart = false;
      scrollEnd = true;
    } else if (scrollLeft + clientWidth >= scrollWidth) {
      scrollStart = true;
      scrollEnd = false;
    } else {
      scrollStart = true;
      scrollEnd = true;
    }
  }
</script>

<nav
  class="lab-anssi-ancres"
  class:lab-anssi-ancres--shadow-start={scrollStart}
  class:lab-anssi-ancres--shadow-end={scrollEnd}
>
  <div class="lab-anssi-ancres__conteneur" onscroll={handleScroll}>
    {#each ancres as ancre, index}
      <a
        href={ancre.cible}
        class={["lab-anssi-ancres__item", { active: index === indexActif }]}
        onclick={() => gestionClicAncre(ancre.cible, index)}
      >
        {ancre.label}
      </a>
    {/each}
  </div>
</nav>

<style lang="scss">
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/setting/breakpoint";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/tool/breakpoint";

  .lab-anssi-ancres {
    box-sizing: border-box;

    @include respond-to("sm") {
      position: relative;

      &::after {
        content: "";
        box-shadow:
          inset 0 0 0 0 hsla(0, 0%, 9%, 0),
          inset 0 0 0 0 hsla(0, 0%, 9%, 0);
        display: block;
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        right: 0;
        pointer-events: none;
      }

      &--shadow-start::after {
        box-shadow:
          inset 2rem 0 1.5rem -2rem #161616,
          inset 0 0 0 0 hsla(0, 0%, 9%, 0);
      }

      &--shadow-end {
        &::after {
          box-shadow:
            inset 0 0 0 0 hsla(0, 0%, 9%, 0),
            inset -2rem 0 1.5rem -2rem #161616;
        }

        &.lab-anssi-ancres--shadow-start::after {
          box-shadow:
            inset 2rem 0 1.5rem -2rem #161616,
            inset -2rem 0 1.5rem -2rem #161616;
        }
      }
    }

    &__conteneur {
      display: flex;
      gap: 0;

      @include respond-to("sm") {
        overflow-x: auto;
      }
    }

    &__item {
      @include reset-bouton();

      flex: 1;
      border: 1px solid var(--border-default-grey);
      padding: 10px 24px;
      white-space: nowrap;

      // Reset link styles
      text-decoration: none;
      color: var(--text-action-high-grey);

      // Font properties
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      text-align: center;

      &:not(:last-child) {
        border-right: none;
      }

      &:hover {
        background-color: var(--background-default-grey-hover);
      }

      &:active {
        background-color: var(--background-default-grey-active);
      }

      &:focus-visible {
        @include set-focus();
      }

      // Etat Actif
      &.active {
        background-color: var(--background-action-low-blue-france);
        color: var(--text-action-high-blue-france);

        &:hover {
          background-color: var(--background-action-low-blue-france-hover);
        }

        &:active {
          background-color: var(--background-action-low-blue-france-active);
        }
      }
    }
  }
</style>
