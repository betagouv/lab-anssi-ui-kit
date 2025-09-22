<svelte:options
  customElement={{
    tag: "lab-anssi-filtres",
    props: {
      filtres: { attribute: "filtres", type: "Array" },
      idFiltreActif: { attribute: "id-filtre-actif", type: "String" },
      horizontal: { attribute: "horizontal", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  type Filtre = { icon: string; id: string; label: string; value: string };

  interface Props {
    filtres: Filtre[];
    horizontal?: boolean;
    idFiltreActif?: string;
  }

  let { filtres, horizontal = false, idFiltreActif }: Props = $props();

  // Fonction pour gérer le changement de filtre
  function handleFilterClick(filtre: Filtre) {
    if (idFiltreActif !== filtre.id) {
      idFiltreActif = filtre.id;
    }
  }

  // Fonction pour obtenir le filtre actuel
  function getActiveFilter() {
    return filtres.find((filter) => filter.id === idFiltreActif) || filtres[0];
  }
</script>

<div class={["lab-anssi-filtres", { "lab-anssi-filtres--horizontal": horizontal }]}>
  <div class="lab-anssi-filtres__conteneur">
    {#each filtres as filtre}
      <button
        class="lab-anssi-filtres__item"
        class:active={filtre.id === idFiltreActif}
        onclick={() => handleFilterClick(filtre)}
      >
        <div class="lab-anssi-filtres__icon">
          {@html filtre.icon}
        </div>
        <span class="lab-anssi-filtres__label">{filtre.label}</span>
      </button>
    {/each}
  </div>
</div>

<style lang="scss">
  @use "@gouvfr/dsfr/src/dsfr/core/style/color/module/decisions";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/setting/breakpoint";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/tool/breakpoint";

  .lab-anssi-filtres {
    box-sizing: border-box;
    background: var(--filtres-bg, #ffffff);
    border-radius: 4px;

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
      padding: 16px 24px 24px;

      // Font properties
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      text-decoration: none;

      &:not(:last-child) {
        border-right: none;
      }

      &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
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

      // Modifier pour l'élément actif
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

    &__icon,
    &__label {
      cursor: pointer;
    }

    &__icon {
      margin: 0 auto;
      width: 56px;
      height: 56px;

      :global(svg) {
        max-width: 100%;
        height: auto;
        display: block;
      }
    }

    &--horizontal {
      .lab-anssi-filtres {
        &__item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-block: 8px;
          gap: 8px;
        }

        &__icon {
          margin: 0;
          height: 42px;
          width: 42px;
        }
      }
    }
  }
</style>
