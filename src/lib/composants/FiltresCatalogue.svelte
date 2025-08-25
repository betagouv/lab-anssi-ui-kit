<svelte:options
  customElement={{
    tag: "lab-anssi-filtres",
    props: {
      filtres: { attribute: "filtres", reflect: false, type: "Array" },
      idFiltreActif: { attribute: "id-filtre-actif", reflect: false, type: "String" },
      horizontal: { attribute: "horizontal", reflect: false, type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  import Success from "@gouvfr/dsfr/dist/artwork/pictograms/system/success.svg?raw";

  type Filtre = { id: string; label: string; value: string };

  interface Props {
    horizontal?: boolean;
    filtres?: Filtre[];
    idFiltreActif?: string;
  }

  let {
    filtres = [
      { id: "category1", label: "Libellé", value: "category1" },
      { id: "category2", label: "Libellé", value: "category2" },
      { id: "category3", label: "Libellé", value: "category3" },
      { id: "category4", label: "Libellé", value: "category4" },
    ],
    idFiltreActif = "category1",
    horizontal = false,
  }: Props = $props();

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
          {@html Success}
        </div>
        <span class="lab-anssi-filtres__label">{filtre.label}</span>
      </button>
    {/each}
  </div>
</div>

<style lang="scss">
  @use "@gouvfr/dsfr/src/dsfr/core/style/color/module/_decisions.scss";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/setting/breakpoint";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/tool/breakpoint";

  .lab-anssi-filtres {
    box-sizing: border-box;

    &__conteneur {
      display: flex;
      gap: 0;

      @media (max-width: 768px) {
        overflow-x: auto;
      }
    }

    &__item {
      @include reset-bouton();

      flex: 1;
      border: 1px solid var(--border-default-grey);
      padding: 16px 24px 24px;
      white-space: nowrap;

      // Font properties
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      text-decoration: none;

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
