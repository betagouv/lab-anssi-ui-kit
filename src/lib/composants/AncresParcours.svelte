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
</script>

<nav class="lab-anssi-ancres">
  <div class="lab-anssi-ancres__conteneur">
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
  @use "@gouvfr/dsfr/src/dsfr/core/style/color/module/_decisions.scss";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/setting/breakpoint";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/tool/breakpoint";

  .lab-anssi-ancres {
    box-sizing: border-box;

    @include respond-to("sm") {
      position: relative;

      &::after {
        content: "";
        background: linear-gradient(90deg, rgba(30, 30, 30, 0) 0%, rgba(0, 0, 0, 0.16) 100%);
        display: block;
        position: absolute;
        height: 100%;
        width: 24px;
        top: 0;
        right: 0;
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
      color: var(--text-action-high-blue-france);

      // Font properties
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      text-align: center;

      &:not(:last-child) {
        border-right: none;
      }

      &:hover {
        background-color: var(--background-alt-grey);
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
